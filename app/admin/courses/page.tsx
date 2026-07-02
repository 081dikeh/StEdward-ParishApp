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

export const metadata = { title: "Course Enrollments - Admin" }

export default async function AdminCoursesPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect("/auth/login")
  if (!session.user.isAdmin) redirect("/protected/dashboard")

  const enrollments = await db`SELECT * FROM marriage_course_enrollments ORDER BY created_at DESC`

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
              <h1 className="text-3xl font-bold text-slate-900">Course Enrollments</h1>
              <p className="text-slate-600">Total: {enrollments.length} enrollments</p>
            </div>
          </div>

          <div className="space-y-4">
            {enrollments.length > 0 ? enrollments.map((e) => (
              <Card key={e.id as string}>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Groom Email</p>
                      <p className="font-semibold text-slate-900">{e.groom_email as string}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Bride Email</p>
                      <p className="font-semibold text-slate-900">{e.bride_email as string}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Enrolled On</p>
                      <p className="text-slate-700">{new Date(e.created_at as string).toLocaleDateString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )) : (
              <Card><CardContent className="py-12 text-center text-slate-500">No course enrollments yet</CardContent></Card>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
