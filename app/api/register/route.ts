import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const existing = await db`SELECT id FROM users WHERE email = ${email} LIMIT 1`
    if (existing.length > 0) {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 })
    }

    const password_hash = await bcrypt.hash(password, 12)
    await db`INSERT INTO users (email, password_hash) VALUES (${email}, ${password_hash})`

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[Register Error]:", error)
    return NextResponse.json({ error: "Registration failed" }, { status: 500 })
  }
}
