import { NextResponse } from "next/server"
import Stripe from "stripe"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const body = await request.json()
    const { amount, paymentType, description } = body

    if (!amount || !paymentType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: "Payment service not configured" }, { status: 500 })
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-12-15.clover",
    })

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL || "http://localhost:3000"

    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "ngn",
            product_data: {
              name:
                paymentType === "tithe"
                  ? "Tithe - St Edwards Parish"
                  : "Donation - St Edwards Parish",
              description: description || "Church offering",
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${baseUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/protected/payment`,
      metadata: { userId: session.user.id, paymentType },
    })

    await db`
      INSERT INTO payments (user_id, amount, payment_type, stripe_payment_id, status, description)
      VALUES (${session.user.id}, ${amount / 100}, ${paymentType}, ${stripeSession.id}, 'pending', ${description || null})
    `

    return NextResponse.json({ sessionId: stripeSession.id })
  } catch (error) {
    console.error("[Payment Error]:", error)
    return NextResponse.json({ error: "Payment creation failed" }, { status: 500 })
  }
}
