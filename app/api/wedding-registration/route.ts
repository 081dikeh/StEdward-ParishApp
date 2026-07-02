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
      INSERT INTO wedding_registrations
        (user_id, groom_full_name, groom_nationality, groom_state, groom_local_government,
         groom_town, groom_age, groom_contact, groom_email, groom_employment_status,
         groom_married_before, groom_parents_name, groom_home_parish,
         bride_full_name, bride_nationality, bride_state, bride_local_government,
         bride_town, bride_age, bride_contact, bride_email, bride_employment_status,
         bride_married_before, bride_parents_name, bride_home_parish, wedding_date)
      VALUES
        (${session.user.id}, ${d.groom_full_name}, ${d.groom_nationality}, ${d.groom_state},
         ${d.groom_local_government}, ${d.groom_town}, ${d.groom_age ? parseInt(d.groom_age) : null},
         ${d.groom_contact}, ${d.groom_email}, ${d.groom_employment_status},
         ${d.groom_married_before === "true"}, ${d.groom_parents_name}, ${d.groom_home_parish},
         ${d.bride_full_name}, ${d.bride_nationality}, ${d.bride_state}, ${d.bride_local_government},
         ${d.bride_town}, ${d.bride_age ? parseInt(d.bride_age) : null},
         ${d.bride_contact}, ${d.bride_email}, ${d.bride_employment_status},
         ${d.bride_married_before === "true"}, ${d.bride_parents_name}, ${d.bride_home_parish},
         ${d.wedding_date || null})
    `
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[Wedding Registration Error]:", error)
    return NextResponse.json({ error: "Submission failed" }, { status: 500 })
  }
}
