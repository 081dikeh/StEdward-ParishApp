import { Navigation } from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Users, Heart, Baby, BookOpen, FileText } from "lucide-react"

const registrationTypes = [
  {
    icon: Users,
    title: "Member Registration",
    description: "Register as a parish member in your zone (1-4)",
    href: "/protected/member-registration",
  },
  {
    icon: Heart,
    title: "Wedding Registration",
    description: "Register for marriage preparation and courses",
    href: "/protected/wedding-registration",
  },
  {
    icon: Baby,
    title: "Baptism Registration",
    description: "Register your child for baptism",
    href: "/protected/baptism-registration",
  },
  {
    icon: FileText,
    title: "Marriage Certificate",
    description: "Request church or government marriage certificates",
    href: "/protected/certificate-request",
  },
  {
    icon: BookOpen,
    title: "Marriage Courses",
    description: "Enroll in marriage preparation courses",
    href: "/protected/marriage-courses",
  },
]

export const metadata = {
  title: "Registrations - St Edwards Parish",
  description: "Register for parish services and programs",
}

export default function RegistrationsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Parish Services Registration</h1>
            <p className="text-lg text-slate-600">
              Choose a service below to get started. You'll need to sign in or create an account.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {registrationTypes.map((service, idx) => {
              const Icon = service.icon
              return (
                <Card key={idx} className="flex flex-col hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-2">
                      <Icon className="text-emerald-600" size={24} />
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex items-end">
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700" asChild>
                      <Link href={service.href}>Register</Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="mt-16 p-8 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Not registered yet?</h3>
            <p className="text-blue-800 mb-4">
              You need to create an account before you can access these registration forms.
            </p>
            <Button className="bg-emerald-600 hover:bg-emerald-700" asChild>
              <Link href="/auth/sign-up">Create Account</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
