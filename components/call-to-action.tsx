import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CallToAction() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-emerald-600 to-emerald-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to Join Our Parish?</h2>
          <p className="text-lg text-emerald-100 max-w-2xl mx-auto">
            Register as a member, sign up for marriage courses, request baptism, or make a donation online
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-white text-emerald-600 hover:bg-slate-100" asChild>
            <Link href="/registrations">Start Registration</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-emerald-600 bg-transparent"
            asChild
          >
            <Link href="/donate">Make a Donation</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
