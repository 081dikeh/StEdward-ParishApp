import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Course Enrollments - Admin",
}

export default async function AdminCoursesPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  const { data: profileData } = await supabase.from("profiles").select("is_admin").eq("id", data.user.id).single()

  if (!profileData?.is_admin) {
    redirect("/protected")
  }

  const { data: enrollments } = await supabase.from("marriage_course_enrollments").select("*")

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
              <h1 className="text-3xl font-bold text-slate-900">Course Enrollments</h1>
              <p className="text-slate-600">Total: {enrollments?.length || 0} couples enrolled</p>
            </div>
          </div>

          <div className="space-y-4">
            {enrollments && enrollments.length > 0 ? (
              enrollments.map((enrollment) => (
                <Card key={enrollment.id}>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-slate-600">Groom's Email</p>
                        <p className="font-semibold text-slate-900 text-sm">{enrollment.groom_email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Bride's Email</p>
                        <p className="font-semibold text-slate-900 text-sm">{enrollment.bride_email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Status</p>
                        <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
                          {enrollment.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-slate-500 mt-3 pt-3 border-t">
                      Enrolled on {new Date(enrollment.created_at).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="pt-6 text-center text-slate-600">No course enrollments yet</CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
