"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { loadStripe } from "@stripe/stripe-js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function PaymentForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const paymentType = searchParams.get("type") || "tithe"
  const initialAmount = searchParams.get("amount") || ""

  const [amount, setAmount] = useState(initialAmount === "custom" ? "" : initialAmount)
  const [description, setDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      if (!amount || Number.parseFloat(amount) <= 0) {
        throw new Error("Please enter a valid amount")
      }

      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("User not found")

      // Create payment intent on backend
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Math.round(Number.parseFloat(amount) * 100), // Stripe expects cents
          paymentType,
          description:
            description || `${paymentType.charAt(0).toUpperCase() + paymentType.slice(1)} - St Edwards Parish`,
          userId: user.id,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create payment")
      }

      const { sessionId } = await response.json()

      // Redirect to Stripe Checkout
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
      if (!stripe) throw new Error("Stripe failed to load")

      await stripe.redirectToCheckout({ sessionId })
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-white">

      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2 capitalize">
              {paymentType === "tithe" ? "Give Tithe" : "Make Donation"}
            </h1>
            <p className="text-slate-600">
              {paymentType === "tithe"
                ? "Support the church through your tithe"
                : "Your donation helps us serve our community"}
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
              <CardDescription>
                {paymentType === "tithe" ? "Enter your tithe amount" : "Enter your donation amount"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="amount">Amount (₦) *</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Input
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add a note (e.g., In memory of...)"
                  />
                </div>

                <div className="p-4 bg-slate-100 rounded-lg">
                  <p className="text-sm text-slate-600 mb-2">Amount to pay:</p>
                  <p className="text-3xl font-bold text-slate-900">₦{amount || "0"}</p>
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
                  {isLoading ? "Processing..." : "Proceed to Payment"}
                </Button>

                <p className="text-xs text-slate-600 text-center">
                  You will be redirected to Stripe to complete your payment securely
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

    </main>
  )
}
