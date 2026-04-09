"use client";

import { useState, useCallback } from "react";
import { Upload, Film, X, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { cn, formatFileSize } from "@/lib/utils";

type UploadState = "idle" | "uploading" | "processing" | "complete" | "error";

export default function UploadPage() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [clipDuration, setClipDuration] = useState<number>(60);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("video/")) {
      setFile(droppedFile);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setFile(selectedFile);
  }, []);

  const handleUpload = async () => {
    if (!file) return;
    setUploadState("uploading");

    // Simulated upload progress
    for (let i = 0; i <= 100; i += 5) {
      await new Promise((r) => setTimeout(r, 100));
      setProgress(i);
    }

    setUploadState("processing");
    setProgress(0);

    // Simulated processing
    const steps = ["Extracting audio...", "Transcribing...", "Finding viral moments...", "Generating clips..."];
    for (let i = 0; i < steps.length; i++) {
      await new Promise((r) => setTimeout(r, 1500));
      setProgress(((i + 1) / steps.length) * 100);
    }

    setUploadState("complete");
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Upload Video</h1>
        <p className="text-zinc-400 text-sm mt-1">
          Upload a podcast or video and let AI find the best clips.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upload area */}
        <div className="lg:col-span-2">
          <div
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={cn(
              "card !p-12 border-2 border-dashed text-center cursor-pointer transition-all duration-300",
              dragActive ? "border-indigo-500 bg-indigo-500/5" : "border-zinc-700 hover:border-zinc-500",
              file ? "!border-solid" : ""
            )}
          >
            {!file ? (
              <label className="cursor-pointer block">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <div className="w-16 h-16 rounded-2xl bg-indigo-600/10 flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-indigo-400" />
                </div>
                <p className="text-lg font-medium mb-2">Drop your video here</p>
                <p className="text-sm text-zinc-500 mb-4">or click to browse</p>
                <p className="text-xs text-zinc-600">MP4, MOV, WebM up to 2GB</p>
              </label>
            ) : uploadState === "idle" ? (
              <div>
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-indigo-600/10 flex items-center justify-center">
                    <Film className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-zinc-500">{formatFileSize(file.size)}</p>
                  </div>
                  <button
                    onClick={() => setFile(null)}
                    className="ml-auto p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <button onClick={handleUpload} className="btn-primary">
                  <Upload className="w-4 h-4 mr-2" />
                  Start Processing
                </button>
              </div>
            ) : uploadState === "uploading" ? (
              <div>
                <Loader2 className="w-12 h-12 text-indigo-400 animate-spin mx-auto mb-4" />
                <p className="font-medium mb-2">Uploading...</p>
                <div className="w-full max-w-xs mx-auto h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-sm text-zinc-500 mt-2">{Math.round(progress)}%</p>
              </div>
            ) : uploadState === "processing" ? (
              <div>
                <Loader2 className="w-12 h-12 text-purple-400 animate-spin mx-auto mb-4" />
                <p className="font-medium mb-2">AI is analyzing your video...</p>
                <div className="w-full max-w-xs mx-auto h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-sm text-zinc-500 mt-2">Finding viral moments...</p>
              </div>
            ) : uploadState === "complete" ? (
              <div>
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                <p className="font-medium mb-2">Processing Complete!</p>
                <p className="text-sm text-zinc-500 mb-4">Found 5 potential viral clips</p>
                <a href="/dashboard/clips" className="btn-primary">
                  View Clips
                </a>
              </div>
            ) : (
              <div>
                <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <p className="font-medium mb-2">Processing Failed</p>
                <button onClick={() => { setUploadState("idle"); setFile(null); }} className="btn-secondary">
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Settings panel */}
        <div className="space-y-4">
          <div className="card">
            <h3 className="font-semibold mb-4">Clip Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-zinc-400 mb-2 block">Max Clip Duration</label>
                <div className="grid grid-cols-4 gap-2">
                  {[15, 30, 60, 90].map((d) => (
                    <button
                      key={d}
                      onClick={() => setClipDuration(d)}
                      className={cn(
                        "py-2 rounded-lg text-sm font-medium transition-all",
                        clipDuration === d
                          ? "bg-indigo-600 text-white"
                          : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                      )}
                    >
                      {d}s
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm text-zinc-400 mb-2 block">Number of Clips</label>
                <select className="input">
                  <option>Auto (AI decides)</option>
                  <option>Top 3</option>
                  <option>Top 5</option>
                  <option>Top 10</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-zinc-400 mb-2 block">Language</label>
                <select className="input">
                  <option>Auto-detect</option>
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>Japanese</option>
                </select>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold mb-2">Credits Cost</h3>
            <p className="text-sm text-zinc-400">
              ~1 credit per minute of video. A 60-min podcast uses ~60 credits.
            </p>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-zinc-500">Your balance</span>
              <span className="text-indigo-400 font-medium">87 credits</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
