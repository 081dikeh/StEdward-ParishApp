"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"

export function MemberRegistrationForm({ userId }: { userId: string }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    full_name: "",
    nationality: "",
    state: "",
    local_government: "",
    town: "",
    age: "",
    marital_status: "",
    employment_status: "",
    contact: "",
    email: "",
    birthday: "",
    zone: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    try {
      const { error: insertError } = await supabase.from("member_registrations").insert([
        {
          user_id: userId,
          ...formData,
          zone: Number.parseInt(formData.zone),
          age: Number.parseInt(formData.age),
        },
      ])

      if (insertError) throw insertError
      setSuccess(true)
      setTimeout(() => router.push("/protected"), 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-lg text-center">
        <h3 className="text-lg font-semibold text-emerald-900 mb-2">Registration Successful!</h3>
        <p className="text-emerald-700">Your membership registration has been submitted.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="full_name">Full Name *</Label>
          <Input
            id="full_name"
            required
            value={formData.full_name}
            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="nationality">Nationality</Label>
          <Input
            id="nationality"
            value={formData.nationality}
            onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="local_government">Local Government</Label>
          <Input
            id="local_government"
            value={formData.local_government}
            onChange={(e) => setFormData({ ...formData, local_government: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="town">Town</Label>
          <Input id="town" value={formData.town} onChange={(e) => setFormData({ ...formData, town: e.target.value })} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="birthday">Birthday</Label>
          <Input
            id="birthday"
            type="date"
            value={formData.birthday}
            onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="marital_status">Marital Status</Label>
          <Select
            value={formData.marital_status}
            onValueChange={(value) => setFormData({ ...formData, marital_status: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Single</SelectItem>
              <SelectItem value="married">Married</SelectItem>
              <SelectItem value="widowed">Widowed</SelectItem>
              <SelectItem value="divorced">Divorced</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="employment_status">Employment Status</Label>
          <Input
            id="employment_status"
            value={formData.employment_status}
            onChange={(e) => setFormData({ ...formData, employment_status: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="contact">Contact *</Label>
          <Input
            id="contact"
            required
            value={formData.contact}
            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="zone">Zone *</Label>
          <Select value={formData.zone} onValueChange={(value) => setFormData({ ...formData, zone: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select zone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Zone 1</SelectItem>
              <SelectItem value="2">Zone 2</SelectItem>
              <SelectItem value="3">Zone 3</SelectItem>
              <SelectItem value="4">Zone 4</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
        {isLoading ? "Submitting..." : "Submit Registration"}
      </Button>
    </form>
  )
}
