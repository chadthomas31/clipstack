import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const clip = await db.clip.findUnique({
      where: { id },
      include: {
        video: { select: { title: true, userId: true } },
        scheduledPosts: true,
      },
    });

    if (!clip || clip.video.userId !== (session.user as any).id) {
      return NextResponse.json({ error: "Clip not found" }, { status: 404 });
    }

    return NextResponse.json(clip);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const clip = await db.clip.findUnique({
      where: { id },
      include: { video: { select: { userId: true } } },
    });

    if (!clip || clip.video.userId !== userId) {
      return NextResponse.json({ error: "Clip not found" }, { status: 404 });
    }

    const body = await req.json();
    const updated = await db.clip.update({
      where: { id },
      data: {
        title: body.title,
        captionStyle: body.captionStyle,
        startTime: body.startTime,
        endTime: body.endTime,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const clip = await db.clip.findUnique({
      where: { id },
      include: { video: { select: { userId: true } } },
    });

    if (!clip || clip.video.userId !== userId) {
      return NextResponse.json({ error: "Clip not found" }, { status: 404 });
    }

    await db.clip.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
