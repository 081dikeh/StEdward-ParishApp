import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

// The protected landing page just redirects straight to the dashboard.
export default async function ProtectedPage() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }
  redirect("/protected/dashboard")
}
