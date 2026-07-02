import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { User, FileText, Heart, Baby } from "lucide-react"

export const dynamic = "force-dynamic"

export const metadata = { title: "My Dashboard - St Edwards Parish" }

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect("/auth/login")

  const userId = session.user.id

  const [members, weddings, baptisms, certificates] = await Promise.all([
    db`SELECT * FROM member_registrations WHERE user_id = ${userId} LIMIT 1`,
    db`SELECT * FROM wedding_registrations WHERE user_id = ${userId} LIMIT 1`,
    db`SELECT * FROM baptism_registrations WHERE user_id = ${userId} LIMIT 1`,
    db`SELECT * FROM marriage_certificate_requests WHERE user_id = ${userId} ORDER BY created_at DESC LIMIT 1`,
  ])

  const member = members[0]
  const wedding = weddings[0]
  const baptism = baptisms[0]
  const certificate = certificates[0]

  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">My Dashboard</h1>
          <p className="text-slate-600">Welcome, {session.user.email}</p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">My Registrations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <User size={20} className="text-emerald-600" />
                  <CardTitle className="text-lg">Member Registration</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {member ? (
                  <div className="space-y-2">
                    <p className="text-sm text-slate-600"><strong>Name:</strong> {member.full_name as string}</p>
                    <p className="text-sm text-slate-600"><strong>Zone:</strong> {member.zone as string}</p>
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-emerald-700 bg-emerald-100 rounded">Submitted</span>
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

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <Heart size={20} className="text-red-600" />
                  <CardTitle className="text-lg">Wedding Registration</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {wedding ? (
                  <div className="space-y-2">
                    <p className="text-sm text-slate-600"><strong>Couple:</strong> {wedding.groom_full_name as string} & {wedding.bride_full_name as string}</p>
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-emerald-700 bg-emerald-100 rounded">Submitted</span>
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

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <Baby size={20} className="text-blue-600" />
                  <CardTitle className="text-lg">Baptism Registration</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {baptism ? (
                  <div className="space-y-2">
                    <p className="text-sm text-slate-600"><strong>Child:</strong> {baptism.child_name as string}</p>
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-emerald-700 bg-emerald-100 rounded">Submitted</span>
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

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <FileText size={20} className="text-purple-600" />
                  <CardTitle className="text-lg">Certificate Request</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {certificate ? (
                  <div className="space-y-2">
                    <p className="text-sm text-slate-600"><strong>Status:</strong> {certificate.status as string}</p>
                    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                      certificate.status === "completed" ? "text-emerald-700 bg-emerald-100" : "text-blue-700 bg-blue-100"
                    }`}>
                      {certificate.status as string}
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
