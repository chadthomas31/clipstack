import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

const UPLOAD_DIR = path.join(process.cwd(), "uploads");

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const clipDuration = parseInt(formData.get("clipDuration") as string) || 60;
    const numClips = formData.get("numClips") as string || "auto";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ["video/mp4", "video/quicktime", "video/webm", "video/x-matroska"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type. Supported: MP4, MOV, WebM, MKV" }, { status: 400 });
    }

    // Check file size (2GB max)
    if (file.size > 2 * 1024 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large. Maximum 2GB." }, { status: 400 });
    }

    // Check credits
    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const remaining = user.creditsTotal - user.creditsUsed + user.rolloverCredits;
    if (remaining <= 0) {
      return NextResponse.json({ error: "Insufficient credits" }, { status: 402 });
    }

    // Save file
    await mkdir(UPLOAD_DIR, { recursive: true });
    const ext = path.extname(file.name) || ".mp4";
    const filename = `${randomUUID()}${ext}`;
    const filepath = path.join(UPLOAD_DIR, filename);
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filepath, buffer);

    // Create video record
    const video = await db.video.create({
      data: {
        userId,
        title: file.name.replace(/\.[^/.]+$/, ""),
        filename,
        url: `/uploads/${filename}`,
        fileSize: file.size,
        status: "pending",
        progress: 0,
        currentStep: "Queued for processing",
      },
    });

    // Start async processing (in production this would be a job queue)
    processVideo(video.id, filepath, clipDuration, numClips).catch(console.error);

    return NextResponse.json({
      id: video.id,
      status: "pending",
      message: "Video uploaded. Processing will begin shortly.",
    }, { status: 201 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

async function processVideo(videoId: string, filepath: string, clipDuration: number, numClips: string) {
  const { execSync } = await import("child_process");

  try {
    // Step 1: Get video duration
    await db.video.update({
      where: { id: videoId },
      data: { status: "transcribing", progress: 10, currentStep: "Extracting audio..." },
    });

    let duration = 0;
    try {
      const probe = execSync(
        `ffprobe -v error -show_entries format=duration -of csv=p=0 "${filepath}"`,
        { encoding: "utf8" }
      ).trim();
      duration = parseFloat(probe) || 0;
    } catch {
      duration = 0;
    }

    await db.video.update({
      where: { id: videoId },
      data: { duration, progress: 20, currentStep: "Transcribing audio..." },
    });

    // Step 2: Extract audio for transcription
    const audioPath = filepath.replace(/\.[^/.]+$/, ".wav");
    try {
      execSync(`ffmpeg -i "${filepath}" -ar 16000 -ac 1 -f wav "${audioPath}" -y`, {
        stdio: "pipe",
      });
    } catch (e) {
      console.error("FFmpeg audio extraction failed:", e);
    }

    await db.video.update({
      where: { id: videoId },
      data: { progress: 40, currentStep: "Detecting viral moments..." },
    });

    // Step 3: Generate clips based on duration segments
    // In production, this would use Whisper + LLM scoring
    // For now, generate evenly-spaced clips as placeholders
    const maxClips = numClips === "auto" ? Math.min(Math.floor(duration / 60) + 1, 10) : parseInt(numClips) || 5;
    const clips = [];

    for (let i = 0; i < maxClips && i * clipDuration < duration; i++) {
      const startTime = Math.min(i * (duration / maxClips), duration - clipDuration);
      const endTime = Math.min(startTime + clipDuration, duration);

      // Generate clip file
      const clipFilename = `clip-${videoId}-${i}.mp4`;
      const clipPath = path.join(UPLOAD_DIR, clipFilename);

      try {
        execSync(
          `ffmpeg -i "${filepath}" -ss ${startTime} -t ${endTime - startTime} -c:v libx264 -c:a aac -y "${clipPath}"`,
          { stdio: "pipe" }
        );
      } catch {
        // Clip generation failed, skip
        continue;
      }

      clips.push({
        videoId,
        title: `Clip ${i + 1}`,
        startTime,
        endTime,
        duration: endTime - startTime,
        viralScore: Math.floor(Math.random() * 30) + 70, // Placeholder score
        clipUrl: `/uploads/${clipFilename}`,
        thumbnailUrl: "",
        status: "complete",
        captionStyle: JSON.stringify({
          fontFamily: "Inter",
          fontSize: 24,
          fontColor: "#FFFFFF",
          backgroundColor: "rgba(0,0,0,0.5)",
          position: "bottom",
          animation: "highlight",
        }),
      });
    }

    await db.video.update({
      where: { id: videoId },
      data: { progress: 80, currentStep: "Generating clips..." },
    });

    // Create clip records
    if (clips.length > 0) {
      await db.clip.createMany({ data: clips });
    }

    // Deduct credits (1 per minute of source video)
    const creditsUsed = Math.ceil(duration / 60) || 1;
    const video = await db.video.findUnique({
      where: { id: videoId },
      include: { user: true },
    });

    if (video) {
      await db.user.update({
        where: { id: video.userId },
        data: { creditsUsed: { increment: creditsUsed } },
      });
    }

    await db.video.update({
      where: { id: videoId },
      data: {
        status: "complete",
        progress: 100,
        currentStep: `Complete — ${clips.length} clips generated`,
      },
    });
  } catch (error) {
    console.error("Processing error:", error);
    await db.video.update({
      where: { id: videoId },
      data: { status: "failed", currentStep: "Processing failed" },
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const videos = await db.video.findMany({
      where: { userId },
      include: { clips: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(videos);
  } catch (error) {
    console.error("Fetch videos error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
