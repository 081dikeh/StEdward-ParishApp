import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import crypto from "crypto"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 })

    const users = await db`SELECT id FROM users WHERE email = ${email} LIMIT 1`

    // Always return success to prevent email enumeration
    if (users.length === 0) return NextResponse.json({ success: true })

    const token = crypto.randomBytes(32).toString("hex")
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60) // 1 hour

    await db`
      INSERT INTO password_reset_tokens (user_id, token, expires_at)
      VALUES (${users[0].id}, ${token}, ${expiresAt.toISOString()})
      ON CONFLICT DO NOTHING
    `

    // In production: send email with reset link containing token
    // Reset URL: /auth/reset-password?token=${token}
    // For now, log to console so admin can share the link manually
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000"
    console.log(`[Password Reset] ${email}: ${baseUrl}/auth/reset-password?token=${token}`)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[Forgot Password Error]:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
