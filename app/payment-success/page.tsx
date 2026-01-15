import { Suspense } from "react"
import { Navigation } from "@/components/navigation"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle } from "lucide-react"

async function PaymentSuccessContent({
  sessionId,
}: {
  sessionId: string
}) {
  // Verify payment with Stripe
  // This is a simplified version - in production you'd validate the session

  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-emerald-200 bg-emerald-50">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle size={64} className="text-emerald-600" />
              </div>
              <CardTitle className="text-emerald-900 text-3xl">Payment Successful!</CardTitle>
              <CardDescription className="text-emerald-700">Thank you for your generous contribution</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-emerald-900 text-center">
                Your payment has been processed successfully. A confirmation receipt has been sent to your email.
              </p>

              <div className="p-4 bg-white rounded-lg border border-emerald-200">
                <p className="text-sm text-slate-600">Session ID:</p>
                <p className="font-mono text-xs text-slate-900 break-all">{sessionId}</p>
              </div>

              <div className="space-y-3">
                <p className="text-emerald-900 font-semibold">What happens next?</p>
                <ul className="space-y-2 text-sm text-emerald-800">
                  <li>• A receipt has been sent to your email</li>
                  <li>• Your payment will be processed within 24 hours</li>
                  <li>• You can view payment history in your dashboard</li>
                </ul>
              </div>

              <div className="flex flex-col gap-3 pt-4">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700" asChild>
                  <Link href="/protected/dashboard">Back to Dashboard</Link>
                </Button>
                <Button variant="outline" className="w-full bg-transparent border-emerald-600 text-emerald-600" asChild>
                  <Link href="/">Return Home</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const { session_id } = await searchParams

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccessContent sessionId={session_id || ""} />
    </Suspense>
  )
}
