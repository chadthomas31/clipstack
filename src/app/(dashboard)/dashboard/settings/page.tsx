"use client";

import { useState } from "react";
import { User, Bell, Palette, Globe, Key, Save } from "lucide-react";

export default function SettingsPage() {
  const [captionDefaults, setCaptionDefaults] = useState({
    font: "Inter",
    animation: "highlight",
    position: "bottom",
    fontSize: 24,
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-zinc-400 text-sm mt-1">Manage your account and preferences.</p>
      </div>

      <div className="space-y-6 max-w-2xl">
        {/* Profile */}
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <User className="w-5 h-5 text-indigo-400" />
            <h2 className="font-semibold">Profile</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-zinc-400 block mb-1">Name</label>
              <input className="input" defaultValue="Chad McCluskey" />
            </div>
            <div>
              <label className="text-sm text-zinc-400 block mb-1">Email</label>
              <input className="input" defaultValue="chad@stackconsultingai.com" />
            </div>
          </div>
        </div>

        {/* Caption Defaults */}
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <Palette className="w-5 h-5 text-indigo-400" />
            <h2 className="font-semibold">Default Caption Style</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-zinc-400 block mb-1">Font</label>
              <select className="input">
                <option>Inter</option>
                <option>Montserrat</option>
                <option>Poppins</option>
                <option>Roboto</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-zinc-400 block mb-1">Animation</label>
              <select className="input">
                <option value="highlight">Word Highlight</option>
                <option value="karaoke">Karaoke</option>
                <option value="bounce">Bounce</option>
                <option value="fade">Fade In</option>
                <option value="none">None</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-zinc-400 block mb-1">Position</label>
              <select className="input">
                <option value="bottom">Bottom</option>
                <option value="center">Center</option>
                <option value="top">Top</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-zinc-400 block mb-1">Font Size</label>
              <input type="number" className="input" defaultValue={24} />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-5 h-5 text-indigo-400" />
            <h2 className="font-semibold">Notifications</h2>
          </div>
          <div className="space-y-3">
            {[
              { label: "Clip processing complete", desc: "Get notified when your clips are ready" },
              { label: "Scheduled post published", desc: "Confirmation when posts go live" },
              { label: "Credit usage alerts", desc: "Warn when credits are running low" },
            ].map((item) => (
              <label key={item.label} className="flex items-center justify-between py-2 cursor-pointer">
                <div>
                  <div className="text-sm font-medium">{item.label}</div>
                  <div className="text-xs text-zinc-500">{item.desc}</div>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded accent-indigo-500" />
              </label>
            ))}
          </div>
        </div>

        {/* API Keys */}
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <Key className="w-5 h-5 text-indigo-400" />
            <h2 className="font-semibold">API Keys</h2>
          </div>
          <p className="text-sm text-zinc-400 mb-4">
            Use API keys to integrate ForJClients with your own tools.
          </p>
          <button className="btn-secondary text-sm">Generate API Key</button>
        </div>

        <button className="btn-primary">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </button>
      </div>
    </div>
  );
}
