import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  try {
    const { id, status } = await request.json()
    await db`
      UPDATE marriage_certificate_requests
      SET status = ${status}, updated_at = NOW()
      WHERE id = ${id}
    `
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[Certificate Status Error]:", error)
    return NextResponse.json({ error: "Update failed" }, { status: 500 })
  }
}
