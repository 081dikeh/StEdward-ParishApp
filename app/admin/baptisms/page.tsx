import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Baptism Registrations - Admin",
}

export default async function AdminBaptismsPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  const { data: profileData } = await supabase.from("profiles").select("is_admin").eq("id", data.user.id).single()

  if (!profileData?.is_admin) {
    redirect("/protected")
  }

  const { data: baptisms } = await supabase.from("baptism_registrations").select("*")

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
              <h1 className="text-3xl font-bold text-slate-900">Baptism Registrations</h1>
              <p className="text-slate-600">Total: {baptisms?.length || 0} registrations</p>
            </div>
          </div>

          <div className="space-y-4">
            {baptisms && baptisms.length > 0 ? (
              baptisms.map((baptism) => (
                <Card key={baptism.id}>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-slate-600">Child's Name</p>
                        <p className="font-semibold text-slate-900">{baptism.child_name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Baptismal Name</p>
                        <p className="font-semibold text-slate-900">{baptism.name_to_be_given}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Age</p>
                        <p className="font-semibold text-slate-900">{baptism.child_age} years</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Parent(s)</p>
                        <p className="font-semibold text-slate-900">{baptism.parent_names}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Sponsor</p>
                        <p className="font-semibold text-slate-900">{baptism.sponsor_name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Status</p>
                        <span className="inline-block px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                          Scheduled
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="pt-6 text-center text-slate-600">No baptism registrations yet</CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
