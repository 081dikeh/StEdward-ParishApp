import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const dynamic = "force-dynamic"

const courseDetails: Record<string, { title: string; description: string; content: string[] }> = {
  foundation: {
    title: "Marriage Foundation Course",
    description: "Essential preparation for couples beginning their marriage journey",
    content: [
      "Module 1: Understanding Marriage in the Catholic Faith",
      "Module 2: Building Strong Communication",
      "Module 3: Conflict Resolution and Intimacy",
      "Module 4: Family Planning and Life Goals",
    ],
  },
  communication: {
    title: "Communication & Intimacy",
    description: "Develop deeper emotional and spiritual connection",
    content: [
      "Module 1: Effective Communication Techniques",
      "Module 2: Emotional Intelligence in Marriage",
      "Module 3: Spiritual Intimacy",
      "Module 4: Physical Affection and Love Languages",
    ],
  },
  finances: {
    title: "Marriage & Financial Planning",
    description: "Master finances together for a secure future",
    content: [
      "Module 1: Joint Financial Planning",
      "Module 2: Budgeting & Saving",
      "Module 3: Debt Management",
      "Module 4: Planning for Children",
    ],
  },
  spirituality: {
    title: "Spiritual Life in Marriage",
    description: "Strengthen your marriage through faith",
    content: [
      "Module 1: Prayer as a Couple",
      "Module 2: Catholic Sacrament of Marriage",
      "Module 3: Faith-Based Decision Making",
      "Module 4: Building a Spiritual Home",
    ],
  },
}

export default async function CourseEnrollPage({ params }: { params: Promise<{ courseId: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect("/auth/login")

  const { courseId } = await params
  const course = courseDetails[courseId]
  if (!course) redirect("/courses")

  return (
    <main className="min-h-screen bg-white">
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">{course.title}</h1>
            <p className="text-lg text-slate-600">{course.description}</p>
          </div>
          <div className="grid gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Course Content</CardTitle>
                <CardDescription>What you'll cover in this course</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {course.content.map((module, idx) => (
                  <div key={idx} className="flex gap-4 pb-4 border-b last:border-0 last:pb-0">
                    <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      <span className="text-emerald-600 font-semibold text-sm">{idx + 1}</span>
                    </div>
                    <p className="text-slate-700">{module}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="bg-emerald-50 border-emerald-200">
              <CardHeader>
                <CardTitle className="text-emerald-900">Ready to Enroll?</CardTitle>
                <CardDescription className="text-emerald-700">Enrollment is free</CardDescription>
              </CardHeader>
              <CardContent className="flex gap-3">
                <Button className="bg-emerald-600 hover:bg-emerald-700" asChild>
                  <Link href={`/protected/course-enrollment/${courseId}`}>Complete Enrollment</Link>
                </Button>
                <Button variant="outline" className="bg-white border-emerald-600 text-emerald-600" asChild>
                  <Link href="/courses">Back to Courses</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}
