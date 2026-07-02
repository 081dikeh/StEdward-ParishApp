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
      INSERT INTO marriage_certificate_requests
        (user_id, groom_full_name, bride_full_name, wedding_date, certificate_type, copies_needed, contact, email)
      VALUES
        (${session.user.id}, ${d.groom_full_name}, ${d.bride_full_name},
         ${d.wedding_date || null}, ${d.certificate_type}, ${parseInt(d.copies_needed)},
         ${d.contact}, ${d.email})
    `
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[Certificate Request Error]:", error)
    return NextResponse.json({ error: "Submission failed" }, { status: 500 })
  }
}
