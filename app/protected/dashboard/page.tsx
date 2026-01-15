import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { LogOut, User, FileText, Heart, Baby } from "lucide-react"

export const metadata = {
  title: "User Dashboard - St Edwards Parish",
}

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  const user = data.user

  // Fetch user's submissions
  const [memberData, weddingData, baptismData, certificateData] = await Promise.all([
    supabase.from("member_registrations").select("*").eq("user_id", user.id),
    supabase.from("wedding_registrations").select("*").eq("user_id", user.id),
    supabase.from("baptism_registrations").select("*").eq("user_id", user.id),
    supabase.from("marriage_certificate_requests").select("*").eq("user_id", user.id),
  ])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    redirect("/")
  }

  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">My Dashboard</h1>
            <p className="text-slate-600">Welcome, {user.email}</p>
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

        {/* My Registrations */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">My Registrations</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Member Registration */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <User size={20} className="text-emerald-600" />
                  <CardTitle className="text-lg">Member Registration</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {memberData.data && memberData.data.length > 0 ? (
                  <div className="space-y-2">
                    <p className="text-sm text-slate-600">
                      <strong>Name:</strong> {memberData.data[0].full_name}
                    </p>
                    <p className="text-sm text-slate-600">
                      <strong>Zone:</strong> {memberData.data[0].zone}
                    </p>
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-emerald-700 bg-emerald-100 rounded">
                      Submitted
                    </span>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-slate-600 mb-3">No registration submitted yet</p>
                    <Button asChild size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700">
                      <Link href="/protected/member-registration">Register</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Wedding Registration */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <Heart size={20} className="text-red-600" />
                  <CardTitle className="text-lg">Wedding Registration</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {weddingData.data && weddingData.data.length > 0 ? (
                  <div className="space-y-2">
                    <p className="text-sm text-slate-600">
                      <strong>Couple:</strong> {weddingData.data[0].groom_full_name} &{" "}
                      {weddingData.data[0].bride_full_name}
                    </p>
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-emerald-700 bg-emerald-100 rounded">
                      Submitted
                    </span>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-slate-600 mb-3">No registration submitted yet</p>
                    <Button asChild size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700">
                      <Link href="/protected/wedding-registration">Register</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Baptism Registration */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <Baby size={20} className="text-blue-600" />
                  <CardTitle className="text-lg">Baptism Registration</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {baptismData.data && baptismData.data.length > 0 ? (
                  <div className="space-y-2">
                    <p className="text-sm text-slate-600">
                      <strong>Child:</strong> {baptismData.data[0].child_name}
                    </p>
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-emerald-700 bg-emerald-100 rounded">
                      Submitted
                    </span>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-slate-600 mb-3">No registration submitted yet</p>
                    <Button asChild size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700">
                      <Link href="/protected/baptism-registration">Register</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Certificate Request */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <FileText size={20} className="text-purple-600" />
                  <CardTitle className="text-lg">Certificate Request</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {certificateData.data && certificateData.data.length > 0 ? (
                  <div className="space-y-2">
                    <p className="text-sm text-slate-600">
                      <strong>Status:</strong> {certificateData.data[0].status}
                    </p>
                    <span
                      className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                        certificateData.data[0].status === "completed"
                          ? "text-emerald-700 bg-emerald-100"
                          : "text-blue-700 bg-blue-100"
                      }`}
                    >
                      {certificateData.data[0].status}
                    </span>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-slate-600 mb-3">No request submitted yet</p>
                    <Button asChild size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700">
                      <Link href="/protected/certificate-request">Request</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Marriage Courses</CardTitle>
              <CardDescription>Enroll in marriage preparation courses</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700">
                <Link href="/courses">View Courses</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Make a Donation</CardTitle>
              <CardDescription>Support the parish with tithe or donation</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700">
                <Link href="/donate">Donate Now</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
              <CardDescription>Get help or speak to a staff member</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <a href="mailto:info@stedwardsparish.org">Send Email</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
