import { Upload, Scissors, Calendar, TrendingUp, Clock, Zap } from "lucide-react";
import Link from "next/link";

const recentClips = [
  { id: "1", title: "The Future of AI in Marketing", viralScore: 94, duration: "0:47", status: "complete", createdAt: "2 hours ago" },
  { id: "2", title: "Why Most Startups Fail", viralScore: 87, duration: "1:12", status: "complete", createdAt: "5 hours ago" },
  { id: "3", title: "Remote Work Best Practices", viralScore: 72, duration: "0:34", status: "captioning", createdAt: "1 day ago" },
];

const stats = [
  { label: "Total Clips", value: "127", icon: Scissors, change: "+12 this week" },
  { label: "Scheduled Posts", value: "8", icon: Calendar, change: "3 today" },
  { label: "Credits Remaining", value: "87", icon: Zap, change: "of 120" },
  { label: "Avg. Viral Score", value: "84", icon: TrendingUp, change: "+3 vs last month" },
];

export default function DashboardPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-zinc-400 text-sm mt-1">Welcome back. Here&apos;s your clipping overview.</p>
        </div>
        <Link href="/dashboard/upload" className="btn-primary">
          <Upload className="w-4 h-4 mr-2" />
          Upload Video
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-zinc-400">{stat.label}</span>
              <stat.icon className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="text-3xl font-bold">{stat.value}</div>
            <div className="text-xs text-zinc-500 mt-1">{stat.change}</div>
          </div>
        ))}
      </div>

      {/* Recent Clips */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Clips</h2>
          <Link href="/dashboard/clips" className="text-sm text-indigo-400 hover:text-indigo-300">
            View all
          </Link>
        </div>
        <div className="space-y-3">
          {recentClips.map((clip) => (
            <div
              key={clip.id}
              className="flex items-center justify-between py-3 px-4 rounded-xl bg-zinc-800/30 hover:bg-zinc-800/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-10 rounded-lg bg-zinc-700 flex items-center justify-center">
                  <Scissors className="w-4 h-4 text-zinc-400" />
                </div>
                <div>
                  <div className="font-medium text-sm">{clip.title}</div>
                  <div className="flex items-center gap-3 text-xs text-zinc-500 mt-0.5">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {clip.duration}
                    </span>
                    <span>{clip.createdAt}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm font-medium text-indigo-400">{clip.viralScore}</div>
                  <div className="text-xs text-zinc-500">Viral Score</div>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    clip.status === "complete"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-amber-500/10 text-amber-400"
                  }`}
                >
                  {clip.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
