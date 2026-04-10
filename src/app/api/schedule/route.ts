import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const posts = await db.scheduledPost.findMany({
      where: { clip: { video: { userId } } },
      include: {
        clip: { select: { title: true, clipUrl: true, thumbnailUrl: true } },
      },
      orderBy: { scheduledAt: "asc" },
    });

    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { clipId, platform, scheduledAt, caption } = await req.json();

    if (!clipId || !platform || !scheduledAt) {
      return NextResponse.json({ error: "clipId, platform, and scheduledAt required" }, { status: 400 });
    }

    // Verify clip belongs to user
    const clip = await db.clip.findUnique({
      where: { id: clipId },
      include: { video: { select: { userId: true } } },
    });

    if (!clip || clip.video.userId !== userId) {
      return NextResponse.json({ error: "Clip not found" }, { status: 404 });
    }

    // Check platform is connected
    const connected = await db.connectedPlatform.findUnique({
      where: { userId_platform: { userId, platform } },
    });

    if (!connected) {
      return NextResponse.json({ error: `${platform} not connected. Connect it in Settings.` }, { status: 400 });
    }

    const post = await db.scheduledPost.create({
      data: {
        clipId,
        platform,
        scheduledAt: new Date(scheduledAt),
        caption: caption || "",
        status: "scheduled",
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
