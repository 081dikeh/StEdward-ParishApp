"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

export function BaptismRegistrationForm({ userId }: { userId: string }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    child_name: "",
    child_age: "",
    name_to_be_given: "",
    parent_names: "",
    sponsor_name: "",
    contact: "",
    email: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    try {
      const { error: insertError } = await supabase.from("baptism_registrations").insert([
        {
          user_id: userId,
          ...formData,
          child_age: Number.parseInt(formData.child_age),
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
        <p className="text-emerald-700">Your baptism registration has been submitted. We will contact you soon.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="child_name">Child's Name *</Label>
          <Input
            id="child_name"
            required
            value={formData.child_name}
            onChange={(e) => setFormData({ ...formData, child_name: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="child_age">Child's Age *</Label>
          <Input
            id="child_age"
            type="number"
            required
            value={formData.child_age}
            onChange={(e) => setFormData({ ...formData, child_age: e.target.value })}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="name_to_be_given">Baptismal Name Wished *</Label>
        <Input
          id="name_to_be_given"
          required
          value={formData.name_to_be_given}
          onChange={(e) => setFormData({ ...formData, name_to_be_given: e.target.value })}
          placeholder="e.g., John, Mary, etc."
        />
      </div>

      <div>
        <Label htmlFor="parent_names">Parent(s) Full Names *</Label>
        <Input
          id="parent_names"
          required
          value={formData.parent_names}
          onChange={(e) => setFormData({ ...formData, parent_names: e.target.value })}
        />
      </div>

      <div>
        <Label htmlFor="sponsor_name">Godparent/Sponsor Name *</Label>
        <Input
          id="sponsor_name"
          required
          value={formData.sponsor_name}
          onChange={(e) => setFormData({ ...formData, sponsor_name: e.target.value })}
        />
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

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
        {isLoading ? "Submitting..." : "Submit Baptism Registration"}
      </Button>
    </form>
  )
}
