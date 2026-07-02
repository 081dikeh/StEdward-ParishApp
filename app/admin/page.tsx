import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { Navigation } from "@/components/navigation"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const dynamic = "force-dynamic"

export const metadata = { title: "Admin Panel - St Edwards Parish" }

export default async function AdminPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect("/auth/login")
  if (!session.user.isAdmin) redirect("/protected/dashboard")

  const [members, weddings, baptisms, certificates, payments, courses] = await Promise.all([
    db`SELECT COUNT(*) as count FROM member_registrations`,
    db`SELECT COUNT(*) as count FROM wedding_registrations`,
    db`SELECT COUNT(*) as count FROM baptism_registrations`,
    db`SELECT COUNT(*) as count FROM marriage_certificate_requests WHERE status = 'pending'`,
    db`SELECT COALESCE(SUM(amount),0) as total FROM payments WHERE status = 'completed'`,
    db`SELECT COUNT(*) as count FROM marriage_course_enrollments`,
  ])

  const stats = [
    { label: "Members", value: members[0].count, href: "/admin/members", color: "text-emerald-600" },
    { label: "Weddings", value: weddings[0].count, href: "/admin/weddings", color: "text-red-600" },
    { label: "Baptisms", value: baptisms[0].count, href: "/admin/baptisms", color: "text-blue-600" },
    { label: "Pending Certs", value: certificates[0].count, href: "/admin/certificates", color: "text-yellow-600" },
    { label: "Total Donations", value: `₦${Number(payments[0].total).toLocaleString()}`, href: "/admin/payments", color: "text-purple-600" },
    { label: "Course Enrollments", value: courses[0].count, href: "/admin/courses", color: "text-slate-600" },
  ]

  const sections = [
    { title: "Registrations", links: [
      { href: "/admin/members", label: "Member Registrations" },
      { href: "/admin/weddings", label: "Wedding Registrations" },
      { href: "/admin/baptisms", label: "Baptism Registrations" },
    ]},
    { title: "Requests & Payments", links: [
      { href: "/admin/certificates", label: "Certificate Requests" },
      { href: "/admin/payments", label: "Tithe & Donation Payments" },
      { href: "/admin/courses", label: "Course Enrollments" },
    ]},
  ]

  return (
    <main className="min-h-screen bg-slate-50">
      <Navigation />
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-slate-900 mb-1">Admin Panel</h1>
            <p className="text-slate-500">St Edwards Parish — management overview</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
            {stats.map((s) => (
              <Link key={s.href} href={s.href}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="pt-5 pb-4 text-center">
                    <p className={`text-2xl font-bold ${s.color}`}>{s.value as string}</p>
                    <p className="text-xs text-slate-500 mt-1">{s.label}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Quick navigation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sections.map((sec) => (
              <Card key={sec.title}>
                <CardHeader><CardTitle>{sec.title}</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  {sec.links.map((l) => (
                    <Button key={l.href} asChild className="w-full justify-start" variant="ghost">
                      <Link href={l.href}>{l.label}</Link>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
