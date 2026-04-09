"use client";

import { useState } from "react";
import { Calendar, Clock, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";


const scheduledPosts = [
  { id: "1", clipTitle: "The Future of AI in Marketing", platform: "tiktok", time: "9:00 AM", date: "Today", status: "scheduled" },
  { id: "2", clipTitle: "Why Most Startups Fail", platform: "instagram", time: "12:00 PM", date: "Today", status: "scheduled" },
  { id: "3", clipTitle: "Remote Work Changed Everything", platform: "youtube", time: "3:00 PM", date: "Tomorrow", status: "scheduled" },
  { id: "4", clipTitle: "The $100M Content Strategy", platform: "x", time: "10:00 AM", date: "Apr 12", status: "scheduled" },
  { id: "5", clipTitle: "AI Tools Every Creator Needs", platform: "linkedin", time: "8:00 AM", date: "Apr 13", status: "scheduled" },
];

const connectedAccounts = [
  { platform: "TikTok", connected: true, handle: "@stackconsulting" },
  { platform: "Instagram", connected: true, handle: "@stackconsultingai" },
  { platform: "YouTube", connected: false, handle: null },
  { platform: "X", connected: true, handle: "@stackconsulting" },
  { platform: "LinkedIn", connected: false, handle: null },
];

export default function SchedulePage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Schedule</h1>
          <p className="text-zinc-400 text-sm mt-1">Manage your posting schedule across platforms.</p>
        </div>
        <button className="btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Schedule Post
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upcoming posts */}
        <div className="lg:col-span-2 space-y-4">
          <div className="card">
            <h2 className="font-semibold mb-4">Upcoming Posts</h2>
            <div className="space-y-3">
              {scheduledPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between py-3 px-4 rounded-xl bg-zinc-800/30 hover:bg-zinc-800/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-zinc-700 flex items-center justify-center text-xs font-bold uppercase text-zinc-300">
                      {post.platform.slice(0, 2)}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{post.clipTitle}</div>
                      <div className="flex items-center gap-2 text-xs text-zinc-500 mt-0.5">
                        <Clock className="w-3 h-3" />
                        {post.date} at {post.time}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400">
                      {post.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Connected accounts */}
        <div className="space-y-4">
          <div className="card">
            <h3 className="font-semibold mb-4">Connected Accounts</h3>
            <div className="space-y-3">
              {connectedAccounts.map((account) => (
                <div
                  key={account.platform}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-xs font-bold">
                      {account.platform.slice(0, 2)}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{account.platform}</div>
                      {account.handle && (
                        <div className="text-xs text-zinc-500">{account.handle}</div>
                      )}
                    </div>
                  </div>
                  {account.connected ? (
                    <span className="text-xs text-emerald-400">Connected</span>
                  ) : (
                    <button className="text-xs text-indigo-400 hover:text-indigo-300">
                      Connect
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
