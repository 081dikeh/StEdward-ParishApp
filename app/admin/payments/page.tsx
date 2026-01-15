import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Payments - Admin",
}

export default async function AdminPaymentsPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  const { data: profileData } = await supabase.from("profiles").select("is_admin").eq("id", data.user.id).single()

  if (!profileData?.is_admin) {
    redirect("/protected")
  }

  const { data: payments } = await supabase.from("payments").select("*").order("created_at", { ascending: false })

  const totalCompleted =
    payments?.reduce((sum, p) => {
      if (p.status === "completed") return sum + p.amount
      return sum
    }, 0) || 0

  return (
    <main className="min-h-screen bg-slate-50">
      <Navigation />

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" asChild size="sm">
              <Link href="/admin" className="flex items-center gap-2">
                <ArrowLeft size={16} />
                Back
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Tithe & Donation Payments</h1>
              <p className="text-slate-600">
                Total Payments: ₦{totalCompleted.toLocaleString()} ({payments?.length || 0} transactions)
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {payments && payments.length > 0 ? (
              payments.map((payment) => (
                <Card key={payment.id}>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-slate-600">Type</p>
                        <p className="font-semibold capitalize text-slate-900">{payment.payment_type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Amount</p>
                        <p className="font-semibold text-slate-900">₦{payment.amount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Status</p>
                        <span
                          className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                            payment.status === "completed"
                              ? "text-emerald-700 bg-emerald-100"
                              : payment.status === "failed"
                                ? "text-red-700 bg-red-100"
                                : "text-yellow-700 bg-yellow-100"
                          }`}
                        >
                          {payment.status}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Date</p>
                        <p className="font-semibold text-slate-900">
                          {new Date(payment.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    {payment.description && (
                      <p className="text-sm text-slate-600 mt-3 pt-3 border-t">
                        <strong>Note:</strong> {payment.description}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="pt-6 text-center text-slate-600">No payments yet</CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
