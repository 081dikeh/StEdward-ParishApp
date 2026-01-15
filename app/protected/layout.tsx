import type React from "react"
import { Navigation } from "@/components/navigation"
import Footer from "@/components/footer"

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  )
}
