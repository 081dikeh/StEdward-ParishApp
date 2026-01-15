import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Users, Heart, Baby, FileText, DollarSign, BookOpen, LogOut } from "lucide-react"

export const metadata = {
  title: "Admin Dashboard - St Edwards Parish",
}

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Check if user is admin
  const { data: profileData } = await supabase.from("profiles").select("is_admin").eq("id", data.user.id).single()

  if (!profileData?.is_admin) {
    redirect("/protected")
  }

  // Fetch all statistics
  const [memberCount, weddingCount, baptismCount, certificateCount, paymentData, courseEnrollmentCount] =
    await Promise.all([
      supabase.from("member_registrations").select("id", { count: "exact" }),
      supabase.from("wedding_registrations").select("id", { count: "exact" }),
      supabase.from("baptism_registrations").select("id", { count: "exact" }),
      supabase.from("marriage_certificate_requests").select("id", { count: "exact" }),
      supabase.from("payments").select("amount, status"),
      supabase.from("marriage_course_enrollments").select("id", { count: "exact" }),
    ])

  const totalRevenue =
    paymentData.data?.reduce((sum, payment) => {
      if (payment.status === "completed") return sum + payment.amount
      return sum
    }, 0) || 0

  const handleLogout = async () => {
    await supabase.auth.signOut()
    redirect("/")
  }

  const stats = [
    {
      icon: Users,
      label: "Member Registrations",
      value: memberCount.count || 0,
      href: "/admin/members",
      color: "emerald",
    },
    {
      icon: Heart,
      label: "Wedding Registrations",
      value: weddingCount.count || 0,
      href: "/admin/weddings",
      color: "red",
    },
    {
      icon: Baby,
      label: "Baptism Registrations",
      value: baptismCount.count || 0,
      href: "/admin/baptisms",
      color: "blue",
    },
    {
      icon: FileText,
      label: "Certificate Requests",
      value: certificateCount.count || 0,
      href: "/admin/certificates",
      color: "purple",
    },
    {
      icon: DollarSign,
      label: "Total Revenue",
      value: `₦${totalRevenue.toLocaleString()}`,
      href: "/admin/payments",
      color: "green",
    },
    {
      icon: BookOpen,
      label: "Course Enrollments",
      value: courseEnrollmentCount.count || 0,
      href: "/admin/courses",
      color: "indigo",
    },
  ]

  return (
    <main className="min-h-screen bg-slate-50">
      <Navigation />

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">Admin Dashboard</h1>
              <p className="text-slate-600">Manage parish registrations and services</p>
            </div>
            <form action={handleLogout}>
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <LogOut size={20} />
                Logout
              </button>
            </form>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {stats.map((stat) => {
              const Icon = stat.icon
              const colorClasses: Record<string, string> = {
                emerald: "bg-emerald-100 text-emerald-600",
                red: "bg-red-100 text-red-600",
                blue: "bg-blue-100 text-blue-600",
                purple: "bg-purple-100 text-purple-600",
                green: "bg-green-100 text-green-600",
                indigo: "bg-indigo-100 text-indigo-600",
              }

              return (
                <Link key={stat.href} href={stat.href}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-600 mb-1">{stat.label}</p>
                          <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                        </div>
                        <div className={`p-3 rounded-lg ${colorClasses[stat.color]}`}>
                          <Icon size={24} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Submissions</CardTitle>
                <CardDescription>View and manage registrations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button asChild className="w-full justify-start" variant="ghost">
                  <Link href="/admin/members">Member Registrations</Link>
                </Button>
                <Button asChild className="w-full justify-start" variant="ghost">
                  <Link href="/admin/weddings">Wedding Registrations</Link>
                </Button>
                <Button asChild className="w-full justify-start" variant="ghost">
                  <Link href="/admin/baptisms">Baptism Registrations</Link>
                </Button>
                <Button asChild className="w-full justify-start" variant="ghost">
                  <Link href="/admin/certificates">Certificate Requests</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Financial & Engagement</CardTitle>
                <CardDescription>Track payments and courses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button asChild className="w-full justify-start" variant="ghost">
                  <Link href="/admin/payments">Tithe & Donation Payments</Link>
                </Button>
                <Button asChild className="w-full justify-start" variant="ghost">
                  <Link href="/admin/courses">Course Enrollments</Link>
                </Button>
                <Button asChild className="w-full justify-start" variant="ghost">
                  <Link href="/admin/analytics">Analytics & Reports</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
