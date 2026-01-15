import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { WeddingRegistrationForm } from "@/components/forms/wedding-registration-form"

export const metadata = {
  title: "Wedding Registration - St Edwards Parish",
}

export default async function WeddingRegistrationPage() {
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
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Wedding Registration</h1>
            <p className="text-slate-600">Register for marriage preparation and courses</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Wedding Registration Form</CardTitle>
              <CardDescription>Please provide information for both the groom and bride</CardDescription>
            </CardHeader>
            <CardContent>
              <WeddingRegistrationForm userId={data.user.id} />
            </CardContent>
          </Card>
        </div>
      </section>

    </main>
  )
}
