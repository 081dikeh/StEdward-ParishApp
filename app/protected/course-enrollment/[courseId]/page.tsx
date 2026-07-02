"use client"

import type React from "react"
import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function CourseEnrollmentPage() {
  const router = useRouter()
  const params = useParams()
  const courseId = params.courseId as string

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({ groom_email: "", bride_email: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/course-enrollment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, courseId }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Enrollment failed")
      setSuccess(true)
      setTimeout(() => router.push("/protected/dashboard"), 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <main className="min-h-screen bg-white">
        <section className="py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4">
            <Card className="border-emerald-200 bg-emerald-50">
              <CardHeader>
                <CardTitle className="text-emerald-900">Enrollment Successful!</CardTitle>
                <CardDescription className="text-emerald-700">Welcome to the Marriage Courses</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-emerald-900">You have been enrolled. Course materials will be sent to your email.</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Complete Your Enrollment</h1>
            <p className="text-slate-600">Provide the email addresses for both members of the couple</p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Enrollment Information</CardTitle>
              <CardDescription>Enter both email addresses to get started</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="groom_email">Groom's Email *</Label>
                  <Input id="groom_email" type="email" required placeholder="groom@example.com"
                    value={formData.groom_email} onChange={(e) => setFormData({ ...formData, groom_email: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="bride_email">Bride's Email *</Label>
                  <Input id="bride_email" type="email" required placeholder="bride@example.com"
                    value={formData.bride_email} onChange={(e) => setFormData({ ...formData, bride_email: e.target.value })} />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
                  {isLoading ? "Enrolling…" : "Complete Enrollment"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}
