import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json()
    if (!token || !password) return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    if (password.length < 8) return NextResponse.json({ error: "Password too short" }, { status: 400 })

    const tokens = await db`
      SELECT * FROM password_reset_tokens
      WHERE token = ${token} AND used = FALSE AND expires_at > NOW()
      LIMIT 1
    `
    if (tokens.length === 0) return NextResponse.json({ error: "Invalid or expired reset link" }, { status: 400 })

    const hash = await bcrypt.hash(password, 12)
    await db`UPDATE users SET password_hash = ${hash} WHERE id = ${tokens[0].user_id}`
    await db`UPDATE password_reset_tokens SET used = TRUE WHERE id = ${tokens[0].id}`

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[Reset Password Error]:", error)
    return NextResponse.json({ error: "Reset failed" }, { status: 500 })
  }
}
