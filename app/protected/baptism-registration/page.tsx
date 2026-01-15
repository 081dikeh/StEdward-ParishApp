import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BaptismRegistrationForm } from "@/components/forms/baptism-registration-form"

export const metadata = {
  title: "Baptism Registration - St Edwards Parish",
}

export default async function BaptismRegistrationPage() {
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
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Baptism Registration</h1>
            <p className="text-slate-600">Register your child for baptism at St Edwards Parish</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Baptism Registration Form</CardTitle>
              <CardDescription>Please fill out all required fields</CardDescription>
            </CardHeader>
            <CardContent>
              <BaptismRegistrationForm userId={data.user.id} />
            </CardContent>
          </Card>
        </div>
      </section>

    </main>
  )
}
