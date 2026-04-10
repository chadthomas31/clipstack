import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "ForJClients — AI Video Clipping Tool",
  description: "Upload your podcast, let AI find the best moments, add captions, and schedule across every platform. The smarter, affordable alternative to expensive clipping tools.",
  keywords: ["AI clipping", "video clips", "podcast clips", "viral clips", "social media scheduling"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-zinc-950 text-white`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
