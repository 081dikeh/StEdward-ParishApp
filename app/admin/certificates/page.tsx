import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { CertificateStatusAction } from "./status-action"

export const metadata = {
  title: "Certificate Requests - Admin",
}

export default async function AdminCertificatesPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  const { data: profileData } = await supabase.from("profiles").select("is_admin").eq("id", data.user.id).single()

  if (!profileData?.is_admin) {
    redirect("/protected")
  }

  const { data: certificates } = await supabase
    .from("marriage_certificate_requests")
    .select("*")
    .order("created_at", { ascending: false })

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
              <h1 className="text-3xl font-bold text-slate-900">Certificate Requests</h1>
              <p className="text-slate-600">Total: {certificates?.length || 0} requests</p>
            </div>
          </div>

          <div className="space-y-4">
            {certificates && certificates.length > 0 ? (
              certificates.map((cert) => (
                <Card key={cert.id}>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Groom</p>
                        <p className="font-semibold text-slate-900">{cert.groom_full_name}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Bride</p>
                        <p className="font-semibold text-slate-900">{cert.bride_full_name}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Certificate Type</p>
                        <p className="font-semibold capitalize text-slate-900">{cert.certificate_type}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Copies Needed</p>
                        <p className="font-semibold text-slate-900">{cert.copies_needed}</p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
                      <div className="text-sm text-slate-500">
                        Contact: <span className="font-medium text-slate-700">{cert.contact}</span>
                        {cert.wedding_date && (
                          <span className="ml-4">
                            Wedding:{" "}
                            <span className="font-medium text-slate-700">
                              {new Date(cert.wedding_date).toLocaleDateString()}
                            </span>
                          </span>
                        )}
                      </div>
                      <CertificateStatusAction certId={cert.id} currentStatus={cert.status} />
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="py-12 text-center text-slate-500">
                  No certificate requests yet
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
