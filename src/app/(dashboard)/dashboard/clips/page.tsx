"use client";

import { useState } from "react";
import { Scissors, Clock, TrendingUp, Download, Share2, Pencil, Trash2, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

const clips = [
  { id: "1", title: "The Future of AI in Marketing", source: "Marketing Podcast Ep 47", viralScore: 94, duration: "0:47", status: "complete", platform: "tiktok", createdAt: "2 hours ago" },
  { id: "2", title: "Why Most Startups Fail in Year One", source: "Startup Stories Ep 12", viralScore: 87, duration: "1:12", status: "complete", platform: "youtube", createdAt: "5 hours ago" },
  { id: "3", title: "Remote Work Changed Everything", source: "Future of Work Ep 8", viralScore: 72, duration: "0:34", status: "complete", platform: "instagram", createdAt: "1 day ago" },
  { id: "4", title: "The $100M Content Strategy", source: "Growth Hacking Ep 23", viralScore: 91, duration: "0:58", status: "complete", platform: "x", createdAt: "2 days ago" },
  { id: "5", title: "How to Build in Public", source: "Indie Hackers Ep 5", viralScore: 68, duration: "1:24", status: "captioning", platform: "linkedin", createdAt: "3 days ago" },
  { id: "6", title: "AI Tools Every Creator Needs", source: "Creator Economy Ep 15", viralScore: 83, duration: "0:42", status: "complete", platform: "tiktok", createdAt: "3 days ago" },
];

const filters = ["All", "Complete", "Processing", "Scheduled"];

export default function ClipsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">My Clips</h1>
          <p className="text-zinc-400 text-sm mt-1">{clips.length} clips generated</p>
        </div>
        <div className="flex items-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                activeFilter === f
                  ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {clips.map((clip) => (
          <div key={clip.id} className="card group hover:border-zinc-700 transition-all">
            {/* Thumbnail */}
            <div className="aspect-[9/16] max-h-48 rounded-xl bg-zinc-800 mb-4 flex items-center justify-center relative overflow-hidden">
              <Scissors className="w-8 h-8 text-zinc-600" />
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/60 text-xs font-medium">
                {clip.duration}
              </div>
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-indigo-600/80 text-xs font-medium flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {clip.viralScore}
              </div>
              {/* Hover actions */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                  <Pencil className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                  <Download className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <h3 className="font-medium text-sm mb-1 truncate">{clip.title}</h3>
            <p className="text-xs text-zinc-500 mb-3">{clip.source}</p>

            <div className="flex items-center justify-between">
              <span
                className={cn(
                  "px-2 py-0.5 rounded-full text-xs font-medium",
                  clip.status === "complete"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-amber-500/10 text-amber-400"
                )}
              >
                {clip.status}
              </span>
              <span className="text-xs text-zinc-500">{clip.createdAt}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
