import { Navigation } from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Heart, Users } from "lucide-react"

export const metadata = {
  title: "Donate - St Edwards Parish",
  description: "Support the parish with tithes and donations",
}

export default function DonatePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      <section className="py-16 md:py-24 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Support St Edwards Parish</h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Your generous contributions help us serve our community and fulfill our mission of faith and service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Tithe */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Users size={24} className="text-emerald-600" />
                  <CardTitle>Regular Tithe</CardTitle>
                </div>
                <CardDescription>Support the church through regular tithes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-700">
                  Tithing is a traditional practice of giving 10% of your income to support the church's ministry and
                  services.
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-slate-600">Quick amounts:</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button asChild variant="outline" size="sm" className="bg-emerald-50 border-emerald-200">
                      <Link href="/protected/payment?type=tithe&amount=5000">₦5,000</Link>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="bg-emerald-50 border-emerald-200">
                      <Link href="/protected/payment?type=tithe&amount=10000">₦10,000</Link>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="bg-emerald-50 border-emerald-200">
                      <Link href="/protected/payment?type=tithe&amount=20000">₦20,000</Link>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="bg-emerald-50 border-emerald-200">
                      <Link href="/protected/payment?type=tithe&amount=custom">Custom</Link>
                    </Button>
                  </div>
                </div>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700" asChild>
                  <Link href="/protected/payment?type=tithe">Give Tithe</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Donation */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Heart size={24} className="text-red-600" />
                  <CardTitle>Donation</CardTitle>
                </div>
                <CardDescription>Make a one-time donation to support our mission</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-700">
                  Your donations support our charitable programs, community outreach, and maintenance of our facilities.
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-slate-600">Quick amounts:</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button asChild variant="outline" size="sm" className="bg-red-50 border-red-200">
                      <Link href="/protected/payment?type=donation&amount=5000">₦5,000</Link>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="bg-red-50 border-red-200">
                      <Link href="/protected/payment?type=donation&amount=10000">₦10,000</Link>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="bg-red-50 border-red-200">
                      <Link href="/protected/payment?type=donation&amount=20000">₦20,000</Link>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="bg-red-50 border-red-200">
                      <Link href="/protected/payment?type=donation&amount=custom">Custom</Link>
                    </Button>
                  </div>
                </div>
                <Button className="w-full bg-red-600 hover:bg-red-700" asChild>
                  <Link href="/protected/payment?type=donation">Make Donation</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="p-8 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Login Required</h3>
            <p className="text-blue-800 mb-4">
              You need to be logged in to make payments. If you don't have an account yet, create one now.
            </p>
            <div className="flex gap-3">
              <Button className="bg-emerald-600 hover:bg-emerald-700" asChild>
                <Link href="/auth/sign-up">Create Account</Link>
              </Button>
              <Button variant="outline" className="bg-transparent border-blue-600 text-blue-600" asChild>
                <Link href="/auth/login">Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
