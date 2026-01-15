import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Wedding Registrations - Admin",
}

export default async function AdminWeddingsPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  const { data: profileData } = await supabase.from("profiles").select("is_admin").eq("id", data.user.id).single()

  if (!profileData?.is_admin) {
    redirect("/protected")
  }

  const { data: weddings } = await supabase.from("wedding_registrations").select("*")

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
              <h1 className="text-3xl font-bold text-slate-900">Wedding Registrations</h1>
              <p className="text-slate-600">Total: {weddings?.length || 0} couples</p>
            </div>
          </div>

          <div className="space-y-4">
            {weddings && weddings.length > 0 ? (
              weddings.map((wedding) => (
                <Card key={wedding.id}>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-slate-600">Groom</p>
                        <p className="font-semibold text-slate-900">{wedding.groom_full_name}</p>
                        <p className="text-xs text-slate-600 mt-1">{wedding.groom_email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Bride</p>
                        <p className="font-semibold text-slate-900">{wedding.bride_full_name}</p>
                        <p className="text-xs text-slate-600 mt-1">{wedding.bride_email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Wedding Date</p>
                        <p className="font-semibold text-slate-900">
                          {wedding.wedding_date ? new Date(wedding.wedding_date).toLocaleDateString() : "Not specified"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Status</p>
                        <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
                          Pending Review
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="pt-6 text-center text-slate-600">No wedding registrations yet</CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
