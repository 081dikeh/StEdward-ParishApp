"use client"

import type React from "react"
import { useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

function ResetForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get("token") || ""

  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirm) { setError("Passwords do not match"); return }
    if (password.length < 8) { setError("Password must be at least 8 characters"); return }

    setIsLoading(true); setError(null)
    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    })
    const data = await res.json()
    setIsLoading(false)
    if (res.ok) { setSuccess(true); setTimeout(() => router.push("/auth/login"), 2000) }
    else setError(data.error || "Reset failed")
  }

  if (!token) return (
    <p className="text-center text-red-600">Invalid reset link. <Link href="/auth/forgot-password" className="underline">Request a new one</Link>.</p>
  )

  return success ? (
    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-center">
      <p className="font-semibold text-emerald-900">Password updated!</p>
      <p className="text-sm text-emerald-700">Redirecting to login…</p>
    </div>
  ) : (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div><Label htmlFor="password">New Password</Label>
        <Input id="password" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} /></div>
      <div><Label htmlFor="confirm">Confirm Password</Label>
        <Input id="confirm" type="password" required value={confirm} onChange={(e) => setConfirm(e.target.value)} /></div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
        {isLoading ? "Updating…" : "Set New Password"}
      </Button>
    </form>
  )
}

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 bg-slate-50">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>Set New Password</CardTitle>
            <CardDescription>Choose a strong password for your account</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<p className="text-slate-500 text-sm">Loading…</p>}>
              <ResetForm />
            </Suspense>
            <div className="mt-4 text-center text-sm">
              <Link href="/auth/login" className="text-emerald-600 hover:underline">Back to Login</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
