import { NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@/lib/supabase/server"

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY environment variable is not set")
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { amount, paymentType, description, userId } = body

    if (!amount || !paymentType || !userId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create Stripe checkout session
    const stripe = getStripe()
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "ngn", // Nigerian Naira
            product_data: {
              name: paymentType === "tithe" ? "Tithe - St Edwards Parish" : "Donation - St Edwards Parish",
              description: description,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || process.env.VERCEL_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || process.env.VERCEL_URL}/protected/payment`,
      metadata: {
        userId,
        paymentType,
      },
    })

    // Store payment record in database
    const supabase = await createClient()
    await supabase.from("payments").insert([
      {
        user_id: userId,
        amount: amount / 100,
        payment_type: paymentType,
        stripe_payment_id: session.id,
        status: "pending",
        description,
      },
    ])

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error("[Payment Error]:", error)
    return NextResponse.json({ error: "Payment creation failed" }, { status: 500 })
  }
}
