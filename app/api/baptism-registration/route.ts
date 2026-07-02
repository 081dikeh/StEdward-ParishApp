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
      INSERT INTO baptism_registrations
        (user_id, child_name, child_age, name_to_be_given, parent_names, sponsor_name, contact, email)
      VALUES
        (${session.user.id}, ${d.child_name}, ${d.child_age ? parseInt(d.child_age) : null},
         ${d.name_to_be_given}, ${d.parent_names}, ${d.sponsor_name}, ${d.contact}, ${d.email})
    `
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[Baptism Registration Error]:", error)
    return NextResponse.json({ error: "Submission failed" }, { status: 500 })
  }
}
