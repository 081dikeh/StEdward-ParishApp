import { redirect } from "next/navigation"

// NextAuth middleware already guards this route.
// Just redirect straight to the dashboard.
export default function ProtectedPage() {
  redirect("/protected/dashboard")
}
