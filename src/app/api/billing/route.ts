import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

const PLANS = {
  starter: { price: 9, credits: 120, maxRollover: 0, socialAccounts: 1 },
  creator: { price: 29, credits: 450, maxRollover: 900, socialAccounts: 5 },
  agency: { price: 99, credits: 1200, maxRollover: 2400, socialAccounts: -1 },
};

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const plan = PLANS[user.plan as keyof typeof PLANS] || PLANS.starter;
    const remaining = user.creditsTotal - user.creditsUsed + user.rolloverCredits;

    return NextResponse.json({
      plan: user.plan,
      credits: {
        total: user.creditsTotal,
        used: user.creditsUsed,
        remaining: Math.max(0, remaining),
        rollover: user.rolloverCredits,
      },
      planDetails: plan,
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { plan } = await req.json();

    if (!PLANS[plan as keyof typeof PLANS]) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const planConfig = PLANS[plan as keyof typeof PLANS];

    // In production, this would create a Stripe checkout session
    // For now, just update the plan directly
    const user = await db.user.update({
      where: { id: userId },
      data: {
        plan,
        creditsTotal: planConfig.credits,
        creditsUsed: 0,
      },
    });

    return NextResponse.json({
      success: true,
      plan: user.plan,
      credits: planConfig.credits,
      // checkoutUrl: "https://checkout.stripe.com/..." // Would be Stripe URL
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
