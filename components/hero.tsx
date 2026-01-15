import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-br from-emerald-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wider">Welcome to our parish</p>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                St Edwards Parish, Amawbia
              </h1>
            </div>
            <p className="text-lg text-slate-600 leading-relaxed">
              A vibrant Catholic community dedicated to faith, spiritual growth, and service to our neighbors. Join us
              in celebrating the divine and building a stronger parish family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700" asChild>
                <Link href="/registrations">Join Us Today</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 bg-transparent"
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>

          <div className="relative h-96 md:h-96 rounded-2xl overflow-hidden bg-slate-200 flex items-center justify-center">
            <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center">
              <div className="text-white text-6xl">⛪</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
