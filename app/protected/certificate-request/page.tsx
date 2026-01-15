import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CertificateRequestForm } from "@/components/forms/certificate-request-form"

export const metadata = {
  title: "Marriage Certificate Request - St Edwards Parish",
}

export default async function CertificateRequestPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  return (
    <main className="min-h-screen bg-white">

      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Marriage Certificate Request</h1>
            <p className="text-slate-600">Request your marriage certificate from the church or government</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Certificate Request Form</CardTitle>
              <CardDescription>Select the type of certificate you need</CardDescription>
            </CardHeader>
            <CardContent>
              <CertificateRequestForm userId={data.user.id} />
            </CardContent>
          </Card>
        </div>
      </section>

    </main>
  )
}
