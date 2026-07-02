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

export const metadata = { title: "Member Registrations - Admin" }

export default async function AdminMembersPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect("/auth/login")
  if (!session.user.isAdmin) redirect("/protected/dashboard")

  const members = await db`SELECT * FROM member_registrations ORDER BY created_at DESC`

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
              <h1 className="text-3xl font-bold text-slate-900">Member Registrations</h1>
              <p className="text-slate-600">Total: {members.length} members</p>
            </div>
          </div>
          <div className="space-y-4">
            {members.length > 0 ? members.map((m) => (
              <Card key={m.id as string}>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div><p className="text-xs text-slate-500 mb-1">Full Name</p><p className="font-semibold text-slate-900">{m.full_name as string}</p></div>
                    <div><p className="text-xs text-slate-500 mb-1">Email</p><p className="text-sm text-slate-700">{m.email as string}</p></div>
                    <div><p className="text-xs text-slate-500 mb-1">Zone</p><p className="font-semibold text-slate-900">Zone {m.zone as string}</p></div>
                    <div><p className="text-xs text-slate-500 mb-1">Marital Status</p><p className="capitalize text-slate-700">{m.marital_status as string}</p></div>
                    <div><p className="text-xs text-slate-500 mb-1">Contact</p><p className="text-slate-700">{m.contact as string}</p></div>
                    <div><p className="text-xs text-slate-500 mb-1">Employment</p><p className="capitalize text-slate-700">{m.employment_status as string}</p></div>
                    <div><p className="text-xs text-slate-500 mb-1">State</p><p className="text-slate-700">{m.state as string}</p></div>
                    <div><p className="text-xs text-slate-500 mb-1">Registered</p><p className="text-slate-700">{new Date(m.created_at as string).toLocaleDateString()}</p></div>
                  </div>
                </CardContent>
              </Card>
            )) : (
              <Card><CardContent className="py-12 text-center text-slate-500">No member registrations yet</CardContent></Card>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
