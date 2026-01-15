import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const courseDetails: Record<
  string,
  {
    title: string
    description: string
    content: string[]
  }
> = {
  foundation: {
    title: "Marriage Foundation Course",
    description: "Essential preparation for couples beginning their marriage journey",
    content: [
      "Module 1: Understanding Marriage in the Catholic Faith - Learn about the sacrament of marriage and its importance in Catholic life",
      "Module 2: Building Strong Communication - Develop the communication skills that will sustain your marriage",
      "Module 3: Conflict Resolution and Intimacy - Learn healthy ways to resolve disagreements and deepen intimacy",
      "Module 4: Family Planning and Life Goals - Discuss and plan your future together",
    ],
  },
  communication: {
    title: "Communication & Intimacy",
    description: "Develop deeper emotional and spiritual connection",
    content: [
      "Module 1: Effective Communication Techniques - Master the art of truly listening and being heard",
      "Module 2: Emotional Intelligence in Marriage - Understand and manage emotions for better relationships",
      "Module 3: Spiritual Intimacy - Connect spiritually as a couple",
      "Module 4: Physical Affection and Love Languages - Express love in ways your spouse understands",
    ],
  },
  finances: {
    title: "Marriage & Financial Planning",
    description: "Master finances together for a secure future",
    content: [
      "Module 1: Joint Financial Planning - Create a shared financial vision",
      "Module 2: Budgeting & Saving - Build financial security together",
      "Module 3: Debt Management - Handle financial obligations wisely",
      "Module 4: Planning for Children - Prepare financially for growing your family",
    ],
  },
  spirituality: {
    title: "Spiritual Life in Marriage",
    description: "Strengthen your marriage through faith",
    content: [
      "Module 1: Prayer as a Couple - Develop a spiritual practice together",
      "Module 2: Catholic Sacrament of Marriage - Deepen your understanding of the sacrament",
      "Module 3: Faith-Based Decision Making - Make decisions rooted in Catholic values",
      "Module 4: Building a Spiritual Home - Create a faith-filled family environment",
    ],
  },
}

export default async function CourseEnrollPage({
  params,
}: {
  params: Promise<{ courseId: string }>
}) {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  const { courseId } = await params
  const course = courseDetails[courseId]

  if (!course) {
    redirect("/courses")
  }

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
                <CardDescription>What you'll learn in this course</CardDescription>
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
                <CardDescription className="text-emerald-700">
                  Complete your enrollment and start learning today
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-700">
                  Enrollment is free! Access course materials immediately after completing this form.
                </p>
                <div className="flex gap-3">
                  <Button className="bg-emerald-600 hover:bg-emerald-700" asChild>
                    <Link href={`/protected/course-enrollment/${courseId}`}>Complete Enrollment</Link>
                  </Button>
                  <Button variant="outline" className="bg-white border-emerald-600 text-emerald-600" asChild>
                    <Link href="/courses">Back to Courses</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

    </main>
  )
}
