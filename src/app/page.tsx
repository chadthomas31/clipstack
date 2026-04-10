import Link from "next/link";
import { Scissors, Captions, Calendar, Zap, Globe, Shield, ArrowRight, Check, Play, Star } from "lucide-react";

const features = [
  {
    icon: Scissors,
    title: "AI Clipping",
    description: "Upload any podcast or video and let AI find the most viral-worthy moments automatically. Get clips in minutes, not hours.",
  },
  {
    icon: Captions,
    title: "Smart Captions",
    description: "Generate word-level captions with customizable fonts, colors, and animations. Supports 99+ languages out of the box.",
  },
  {
    icon: Calendar,
    title: "Multi-Platform Scheduling",
    description: "Schedule and post clips to TikTok, Instagram, YouTube Shorts, X, LinkedIn, and more from one dashboard.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Process a 2-hour podcast in under 10 minutes. Our pipeline is optimized for speed without sacrificing quality.",
  },
  {
    icon: Globe,
    title: "99+ Languages",
    description: "Transcribe and caption in any language. Reach global audiences with automatic translation support.",
  },
  {
    icon: Shield,
    title: "Your Content, Your Data",
    description: "Enterprise-grade security. Your videos are processed and deleted. We never train on your content.",
  },
];

const plans = [
  {
    name: "Starter",
    price: 9,
    credits: 120,
    features: ["120 credits per month", "1 social account", "Scheduling & posting", "AI viral detection", "Auto-generated captions", "Clip editor"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Creator",
    price: 29,
    credits: 450,
    features: ["450 credits per month", "5 social accounts", "Unlimited posting", "Credits rollover (up to 900)", "Priority processing", "Clip editor", "API access"],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Agency",
    price: 99,
    credits: 1200,
    features: ["1,200 credits per month", "Unlimited social accounts", "Unlimited posting", "Credits rollover (up to 2,400)", "Team collaboration (5 seats)", "Priority support", "API access", "White-label option"],
    cta: "Get Started",
    popular: false,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold gradient-text">ClipStack</Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <Link href="/login" className="hover:text-white transition-colors">Sign In</Link>
            <Link href="/signup" className="btn-primary text-sm !py-2 !px-4">Start Clipping</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-sm mb-8">
            <Zap className="w-4 h-4" />
            AI-Powered Clipping Tool
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            The Easiest Way to Make{" "}
            <span className="gradient-text">Viral Clips</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
            Upload your podcast, let AI find the best moments, add captions, and schedule across every platform. 10x faster than doing it manually.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="btn-primary text-lg !py-4 !px-8 group">
              Start Clipping Free
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="btn-secondary text-lg !py-4 !px-8 group">
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </button>
          </div>
          <p className="text-sm text-zinc-500 mt-4">No credit card required. 10 free credits to start.</p>
        </div>

        {/* Hero visual */}
        <div className="max-w-5xl mx-auto mt-16">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-2 shadow-2xl shadow-indigo-500/5">
            <div className="rounded-xl bg-zinc-800/50 aspect-video flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-indigo-600/20 flex items-center justify-center mx-auto mb-4">
                  <Play className="w-8 h-8 text-indigo-400 ml-1" />
                </div>
                <p className="text-zinc-400">Product Demo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 border-y border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "50K+", label: "Clips Created" },
              { value: "2,500+", label: "Creators" },
              { value: "99+", label: "Languages" },
              { value: "6", label: "Platforms" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-zinc-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Everything You Need to <span className="gradient-text">Go Viral</span>
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              AI-powered tools to clip podcasts, add captions, and schedule across every platform.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="card group hover:border-indigo-500/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-indigo-600/10 flex items-center justify-center mb-4 group-hover:bg-indigo-600/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Simple, Credit-Based Pricing</h2>
            <p className="text-lg text-zinc-400">Only pay for what you process. No hidden fees.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`card relative ${plan.popular ? "border-indigo-500/50 shadow-lg shadow-indigo-500/10" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-indigo-600 text-xs font-semibold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-zinc-500">/month</span>
                </div>
                <p className="text-sm text-zinc-500 mb-6">{plan.credits} credits/month</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-zinc-300">
                      <Check className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/signup"
                  className={plan.popular ? "btn-primary w-full" : "btn-secondary w-full"}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Start Clipping <span className="gradient-text">Today</span>
          </h2>
          <p className="text-lg text-zinc-400 mb-8">
            Upload your first video and let the AI find your best moments. 10 free credits, no credit card required.
          </p>
          <Link href="/signup" className="btn-primary text-lg !py-4 !px-8">
            Start Clipping Free <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-zinc-500">
            &copy; {new Date().getFullYear()} ClipStack. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-zinc-500">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
