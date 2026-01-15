import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function ProtectedPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  return (
    <main className="min-h-screen bg-white">

      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Welcome to Your Dashboard</h1>
            <p className="text-slate-600">Select a service to begin</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/protected/member-registration"
              className="p-6 bg-white rounded-lg border border-slate-200 hover:border-emerald-600 hover:shadow-md transition-all"
            >
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Member Registration</h3>
              <p className="text-slate-600 mb-4">Register as a parish member in your zone</p>
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                Register
              </Button>
            </Link>

            <Link
              href="/protected/wedding-registration"
              className="p-6 bg-white rounded-lg border border-slate-200 hover:border-emerald-600 hover:shadow-md transition-all"
            >
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Wedding Registration</h3>
              <p className="text-slate-600 mb-4">Register for marriage preparation</p>
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                Register
              </Button>
            </Link>

            <Link
              href="/protected/baptism-registration"
              className="p-6 bg-white rounded-lg border border-slate-200 hover:border-emerald-600 hover:shadow-md transition-all"
            >
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Baptism Registration</h3>
              <p className="text-slate-600 mb-4">Register your child for baptism</p>
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                Register
              </Button>
            </Link>

            <Link
              href="/protected/certificate-request"
              className="p-6 bg-white rounded-lg border border-slate-200 hover:border-emerald-600 hover:shadow-md transition-all"
            >
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Certificate Request</h3>
              <p className="text-slate-600 mb-4">Request marriage certificates</p>
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                Request
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
