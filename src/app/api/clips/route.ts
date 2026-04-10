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
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const videoId = searchParams.get("videoId");

    const clips = await db.clip.findMany({
      where: {
        video: { userId },
        ...(status && status !== "all" ? { status } : {}),
        ...(videoId ? { videoId } : {}),
      },
      include: {
        video: { select: { title: true } },
        scheduledPosts: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(clips);
  } catch (error) {
    console.error("Fetch clips error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
