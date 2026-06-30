// app/api/create-payment-intent/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, paymentType, description, userId } = body;

    if (!amount || !paymentType || !userId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // â”€â”€ Only here (runtime) we create Stripe â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("STRIPE_SECRET_KEY is missing in environment variables");
      return NextResponse.json(
        { error: "Payment service not configured on the server" },
        { status: 500 }
      );
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-12-15.clover",
    });
    // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "ngn",
            product_data: {
              name:
                paymentType === "tithe"
                  ? "Tithe - St William Parish"
                  : "Donation - St William Parish",
              description: description || "Church donation / offering",
            },
            unit_amount: amount, // â† should be in kobo (smallest unit)
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${
        process.env.NEXT_PUBLIC_BASE_URL ||
        process.env.VERCEL_URL ||
        "http://localhost:3000"
      }/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${
        process.env.NEXT_PUBLIC_BASE_URL ||
        process.env.VERCEL_URL ||
        "http://localhost:3000"
      }/protected/payment`,
      metadata: {
        userId,
        paymentType,
      },
    });

    // Store in Supabase
    const supabase = await createClient();
    const { error } = await supabase.from("payments").insert([
      {
        user_id: userId,
        amount: amount / 100, // convert kobo â†’ NGN if you store in Naira
        payment_type: paymentType,
        stripe_payment_id: session.id,
        status: "pending",
        description,
      },
    ]);

    if (error) {
      console.error("Supabase insert failed:", error);
      // You can decide whether to fail or continue
    }

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("[Payment Error]:", error);
    return NextResponse.json(
      { error: "Payment creation failed" },
      { status: 500 }
    );
  }
}

// Optional but recommended â€“ prevent static prerendering of this route
export const dynamic = "force-dynamic";