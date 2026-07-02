import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const d = await request.json()
    await db`
      INSERT INTO marriage_course_enrollments (user_id, groom_email, bride_email)
      VALUES (${session.user.id}, ${d.groom_email}, ${d.bride_email})
    `
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[Course Enrollment Error]:", error)
    return NextResponse.json({ error: "Submission failed" }, { status: 500 })
  }
}
