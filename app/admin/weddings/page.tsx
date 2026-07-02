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

export const metadata = { title: "Wedding Registrations - Admin" }

export default async function AdminWeddingsPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect("/auth/login")
  if (!session.user.isAdmin) redirect("/protected/dashboard")

  const weddings = await db`SELECT * FROM wedding_registrations ORDER BY created_at DESC`

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
              <h1 className="text-3xl font-bold text-slate-900">Wedding Registrations</h1>
              <p className="text-slate-600">Total: {weddings.length} couples</p>
            </div>
          </div>
          <div className="space-y-4">
            {weddings.length > 0 ? weddings.map((w) => (
              <Card key={w.id as string}>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Groom</p>
                      <p className="font-semibold text-slate-900">{w.groom_full_name as string}</p>
                      <p className="text-xs text-slate-500">{w.groom_email as string} · {w.groom_contact as string}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Bride</p>
                      <p className="font-semibold text-slate-900">{w.bride_full_name as string}</p>
                      <p className="text-xs text-slate-500">{w.bride_email as string} · {w.bride_contact as string}</p>
                    </div>
                  </div>
                  <div className="flex gap-6 pt-3 border-t border-slate-100 text-sm text-slate-600">
                    <span>Wedding: <strong>{w.wedding_date ? new Date(w.wedding_date as string).toLocaleDateString() : "TBD"}</strong></span>
                    <span className="inline-block px-2 py-0.5 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">Pending Review</span>
                  </div>
                </CardContent>
              </Card>
            )) : (
              <Card><CardContent className="py-12 text-center text-slate-500">No wedding registrations yet</CardContent></Card>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
