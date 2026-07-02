import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { Navigation } from "@/components/navigation"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const dynamic = "force-dynamic"

export const metadata = { title: "Payments - Admin" }

export default async function AdminPaymentsPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect("/auth/login")
  if (!session.user.isAdmin) redirect("/protected/dashboard")

  const payments = await db`SELECT * FROM payments ORDER BY created_at DESC`
  const total = payments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + Number(p.amount), 0)

  return (
    <main className="min-h-screen bg-slate-50">
      <Navigation />
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" asChild size="sm">
              <Link href="/admin" className="flex items-center gap-2"><ArrowLeft size={16} />Back</Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Payments</h1>
              <p className="text-slate-600">
                {payments.length} transactions · Total received:{" "}
                <span className="font-semibold text-emerald-700">₦{total.toLocaleString()}</span>
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {payments.length > 0 ? payments.map((p) => (
              <Card key={p.id as string}>
                <CardContent className="pt-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Type</p>
                        <p className="font-semibold capitalize text-slate-900">{p.payment_type as string}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Amount</p>
                        <p className="font-bold text-emerald-700">₦{Number(p.amount).toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Date</p>
                        <p className="text-slate-700">{new Date(p.created_at as string).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Description</p>
                        <p className="text-slate-700 text-sm">{(p.description as string) || "—"}</p>
                      </div>
                    </div>
                    <span className={`shrink-0 px-3 py-1 text-xs font-semibold rounded-full ${
                      p.status === "completed"
                        ? "bg-emerald-100 text-emerald-700"
                        : p.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {p.status as string}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )) : (
              <Card><CardContent className="py-12 text-center text-slate-500">No payments yet</CardContent></Card>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
