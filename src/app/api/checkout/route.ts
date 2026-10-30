import { NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe (uses dummy fallback key if not set yet)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_mock_secret_key", {
  apiVersion: "2025-01-27.acacia" as any,
});

export async function POST(req: Request) {
  try {
    const { planName, priceAmount, billingInterval } = await req.json();

    // If real Stripe key is missing, return a simulated test checkout session
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({
        simulated: true,
        message: "Stripe key not configured yet. Set STRIPE_SECRET_KEY in .env.local to activate live Stripe checkout.",
        plan: planName,
        price: priceAmount,
        checkoutUrl: "/dashboard/billing?status=success"
      });
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `DocuMind ${planName} Plan`,
              description: "Ad-free experience with unlimited verified AI document questions.",
            },
            unit_amount: priceAmount * 100,
            recurring: {
              interval: billingInterval === "annual" ? "year" : "month",
            },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${req.headers.get("origin")}/dashboard/billing?success=true`,
      cancel_url: `${req.headers.get("origin")}/dashboard/billing?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe Checkout Error:", err);
    return NextResponse.json(
      { error: err?.message || "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
