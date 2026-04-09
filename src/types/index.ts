export type ClipStatus = "pending" | "transcribing" | "detecting" | "clipping" | "captioning" | "complete" | "failed";
export type Platform = "tiktok" | "instagram" | "youtube" | "x" | "linkedin";

export interface Video {
  id: string;
  title: string;
  url: string;
  duration: number;
  fileSize: number;
  status: ClipStatus;
  createdAt: Date;
  userId: string;
}

export interface Clip {
  id: string;
  videoId: string;
  title: string;
  startTime: number;
  endTime: number;
  duration: number;
  viralScore: number;
  thumbnailUrl: string;
  clipUrl: string;
  captionStyle: CaptionStyle;
  status: ClipStatus;
  createdAt: Date;
}

export interface CaptionStyle {
  fontFamily: string;
  fontSize: number;
  fontColor: string;
  backgroundColor: string;
  position: "bottom" | "center" | "top";
  animation: "none" | "highlight" | "karaoke" | "bounce" | "fade";
}

export interface ScheduledPost {
  id: string;
  clipId: string;
  platform: Platform;
  scheduledAt: Date;
  status: "scheduled" | "posted" | "failed";
  caption: string;
}

export interface UserCredits {
  total: number;
  used: number;
  remaining: number;
  plan: "starter" | "creator" | "agency";
  rollover: number;
}

export interface ProcessingJob {
  id: string;
  videoId: string;
  status: ClipStatus;
  progress: number;
  currentStep: string;
  clipsFound: number;
  startedAt: Date;
}
