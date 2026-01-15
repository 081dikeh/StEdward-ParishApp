import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { CallToAction } from "@/components/call-to-action"
import Footer from "@/components/footer"

export const metadata = {
  title: "St Edwards Parish, Amawbia - Welcome",
  description: "A vibrant Catholic community dedicated to faith, service, and spiritual growth.",
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <Features />
      <CallToAction />
      <Footer />
    </main>
  )
}
