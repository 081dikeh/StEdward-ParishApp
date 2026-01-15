import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MemberRegistrationForm } from "@/components/forms/member-registration-form"

export const metadata = {
  title: "Member Registration - St Edwards Parish",
}

export default async function MemberRegistrationPage() {
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
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Member Registration</h1>
            <p className="text-slate-600">Register as a member of St Edwards Parish in your zone</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Registration Form</CardTitle>
              <CardDescription>Please fill out all required fields marked with *</CardDescription>
            </CardHeader>
            <CardContent>
              <MemberRegistrationForm userId={data.user.id} />
            </CardContent>
          </Card>
        </div>
      </section>

    </main>
  )
}
