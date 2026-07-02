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

export const metadata = { title: "Baptism Registrations - Admin" }

export default async function AdminBaptismsPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect("/auth/login")
  if (!session.user.isAdmin) redirect("/protected/dashboard")

  const baptisms = await db`SELECT * FROM baptism_registrations ORDER BY created_at DESC`

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
              <h1 className="text-3xl font-bold text-slate-900">Baptism Registrations</h1>
              <p className="text-slate-600">Total: {baptisms.length} registrations</p>
            </div>
          </div>
          <div className="space-y-4">
            {baptisms.length > 0 ? baptisms.map((b) => (
              <Card key={b.id as string}>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div><p className="text-xs text-slate-500 mb-1">Child's Name</p><p className="font-semibold text-slate-900">{b.child_name as string}</p></div>
                    <div><p className="text-xs text-slate-500 mb-1">Baptismal Name</p><p className="font-semibold text-slate-900">{b.name_to_be_given as string}</p></div>
                    <div><p className="text-xs text-slate-500 mb-1">Age</p><p className="font-semibold text-slate-900">{b.child_age as string} yrs</p></div>
                    <div><p className="text-xs text-slate-500 mb-1">Parent(s)</p><p className="text-slate-700">{b.parent_names as string}</p></div>
                    <div><p className="text-xs text-slate-500 mb-1">Sponsor</p><p className="text-slate-700">{b.sponsor_name as string}</p></div>
                    <div><p className="text-xs text-slate-500 mb-1">Contact</p><p className="text-slate-700">{b.contact as string}</p></div>
                  </div>
                </CardContent>
              </Card>
            )) : (
              <Card><CardContent className="py-12 text-center text-slate-500">No baptism registrations yet</CardContent></Card>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
