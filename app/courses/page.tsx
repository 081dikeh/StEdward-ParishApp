import { Navigation } from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Clock, Users } from "lucide-react"

export const metadata = {
  title: "Marriage Courses - St Edwards Parish",
  description: "Prepare for marriage with our comprehensive courses",
}

const courses = [
  {
    id: "foundation",
    title: "Marriage Foundation Course",
    description: "Essential preparation for couples beginning their marriage journey",
    duration: "4 weeks",
    sessions: "8 sessions",
    topics: [
      "Understanding Marriage in the Catholic Faith",
      "Building Strong Communication",
      "Conflict Resolution and Intimacy",
      "Family Planning and Life Goals",
    ],
  },
  {
    id: "communication",
    title: "Communication & Intimacy",
    description: "Develop deeper emotional and spiritual connection",
    duration: "3 weeks",
    sessions: "6 sessions",
    topics: [
      "Effective Communication Techniques",
      "Emotional Intelligence in Marriage",
      "Spiritual Intimacy",
      "Physical Affection and Love Languages",
    ],
  },
  {
    id: "finances",
    title: "Marriage & Financial Planning",
    description: "Master finances together for a secure future",
    duration: "2 weeks",
    sessions: "4 sessions",
    topics: ["Joint Financial Planning", "Budgeting & Saving", "Debt Management", "Planning for Children"],
  },
  {
    id: "spirituality",
    title: "Spiritual Life in Marriage",
    description: "Strengthen your marriage through faith",
    duration: "3 weeks",
    sessions: "6 sessions",
    topics: [
      "Prayer as a Couple",
      "Catholic Sacrament of Marriage",
      "Faith-Based Decision Making",
      "Building a Spiritual Home",
    ],
  },
]

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      <section className="py-16 md:py-24 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Marriage Courses</h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Comprehensive courses designed to prepare couples for a strong, fulfilling Catholic marriage
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {courses.map((course) => (
              <Card key={course.id} className="flex flex-col hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Clock size={18} className="text-emerald-600" />
                      <div>
                        <p className="text-xs text-slate-600">Duration</p>
                        <p className="font-semibold text-slate-900">{course.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={18} className="text-emerald-600" />
                      <div>
                        <p className="text-xs text-slate-600">Sessions</p>
                        <p className="font-semibold text-slate-900">{course.sessions}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-slate-900 text-sm">Course Topics:</h4>
                    <ul className="space-y-2">
                      {course.topics.map((topic, idx) => (
                        <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                          <span className="text-emerald-600 font-bold mt-0.5">•</span>
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700" asChild>
                    <Link href={`/protected/enroll-course/${course.id}`}>Enroll Now</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 p-8 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Get Started</h3>
            <p className="text-blue-800 mb-4">
              You need to be logged in to enroll in courses. If you don't have an account yet, create one now.
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
