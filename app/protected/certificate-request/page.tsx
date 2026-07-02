import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CertificateRequestForm } from "@/components/forms/certificate-request-form"

export const dynamic = "force-dynamic"

export const metadata = { title: "Certificate Request - St Edwards Parish" }

export default async function Page() {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect("/auth/login")

  return (
    <main className="min-h-screen bg-white">
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Certificate Request</h1>
            <p className="text-slate-600">Please fill out all required fields marked with *</p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Registration Form</CardTitle>
              <CardDescription>All information is kept confidential</CardDescription>
            </CardHeader>
            <CardContent>
              <CertificateRequestForm userId={session.user.id} />
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}
