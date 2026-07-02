import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const data = await request.json()
    await db`
      INSERT INTO member_registrations
        (user_id, full_name, nationality, state, local_government, town, age,
         marital_status, employment_status, contact, email, birthday, zone)
      VALUES
        (${session.user.id}, ${data.full_name}, ${data.nationality}, ${data.state},
         ${data.local_government}, ${data.town}, ${data.age ? parseInt(data.age) : null},
         ${data.marital_status}, ${data.employment_status}, ${data.contact},
         ${data.email}, ${data.birthday || null}, ${data.zone ? parseInt(data.zone) : null})
    `
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[Member Registration Error]:", error)
    return NextResponse.json({ error: "Submission failed" }, { status: 500 })
  }
}
