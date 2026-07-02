import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Link from "next/link"
import { CheckCircle } from "lucide-react"

export const metadata = { title: "Payment Successful - St Edwards Parish" }

export default function PaymentSuccessPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-md border-emerald-200 bg-emerald-50">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle size={56} className="text-emerald-600" />
          </div>
          <CardTitle className="text-2xl text-emerald-900">Payment Successful!</CardTitle>
          <CardDescription className="text-emerald-700">
            Thank you for your generous contribution to St Edwards Parish, Amawbia.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700">
            <Link href="/protected/dashboard">Go to Dashboard</Link>
          </Button>
          <Button asChild variant="outline" className="w-full bg-white">
            <Link href="/donate">Make Another Donation</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}
