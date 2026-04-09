import { Check, Zap, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    price: 9,
    credits: 120,
    features: ["120 credits/month", "1 social account", "Scheduling & posting", "AI viral detection", "Auto captions", "Clip editor"],
    current: true,
  },
  {
    name: "Creator",
    price: 29,
    credits: 450,
    features: ["450 credits/month", "5 social accounts", "Unlimited posting", "Rollover (up to 900)", "Priority processing", "API access"],
    current: false,
    popular: true,
  },
  {
    name: "Agency",
    price: 99,
    credits: 1200,
    features: ["1,200 credits/month", "Unlimited accounts", "Unlimited posting", "Rollover (up to 2,400)", "5 team seats", "White-label"],
    current: false,
  },
];

const usageHistory = [
  { date: "Apr 8", action: "Processed: Marketing Podcast Ep 47", credits: -45 },
  { date: "Apr 7", action: "Processed: Startup Stories Ep 12", credits: -62 },
  { date: "Apr 5", action: "Processed: Future of Work Ep 8", credits: -28 },
  { date: "Apr 1", action: "Monthly credit refresh", credits: 120 },
];

export default function BillingPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Billing & Credits</h1>
        <p className="text-zinc-400 text-sm mt-1">Manage your plan and track credit usage.</p>
      </div>

      {/* Current usage */}
      <div className="card mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Current Usage</h2>
          <span className="text-sm text-zinc-400">Resets Apr 1, 2026</span>
        </div>
        <div className="flex items-end gap-2 mb-2">
          <span className="text-4xl font-bold">87</span>
          <span className="text-zinc-500 mb-1">/ 120 credits remaining</span>
        </div>
        <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style={{ width: "72%" }} />
        </div>
        <p className="text-xs text-zinc-500 mt-2">33 credits used this billing cycle</p>
      </div>

      {/* Plans */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Plans</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "card relative",
                plan.current && "border-indigo-500/50",
                plan.popular && !plan.current && "border-zinc-700"
              )}
            >
              {plan.current && (
                <div className="absolute -top-3 left-4 px-2 py-0.5 rounded-full bg-indigo-600 text-xs font-semibold">
                  Current Plan
                </div>
              )}
              {plan.popular && !plan.current && (
                <div className="absolute -top-3 left-4 px-2 py-0.5 rounded-full bg-purple-600 text-xs font-semibold">
                  Most Popular
                </div>
              )}
              <h3 className="font-semibold mb-1">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-bold">${plan.price}</span>
                <span className="text-zinc-500">/mo</span>
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-zinc-300">
                    <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              {plan.current ? (
                <button className="btn-secondary w-full" disabled>Current Plan</button>
              ) : (
                <button className="btn-primary w-full">
                  Upgrade <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Usage history */}
      <div className="card">
        <h2 className="font-semibold mb-4">Usage History</h2>
        <div className="space-y-3">
          {usageHistory.map((item, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-zinc-800/50 last:border-0">
              <div>
                <div className="text-sm">{item.action}</div>
                <div className="text-xs text-zinc-500">{item.date}</div>
              </div>
              <span className={cn("text-sm font-medium", item.credits > 0 ? "text-emerald-400" : "text-zinc-400")}>
                {item.credits > 0 ? "+" : ""}{item.credits}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
