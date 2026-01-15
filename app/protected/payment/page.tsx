"use client"

import { Suspense } from "react"
import PaymentForm from "./payment-form"

export default function PaymentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentForm />
    </Suspense>
  )
}
