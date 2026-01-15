"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"

export function WeddingRegistrationForm({ userId }: { userId: string }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    groom_full_name: "",
    groom_nationality: "",
    groom_state: "",
    groom_local_government: "",
    groom_town: "",
    groom_age: "",
    groom_contact: "",
    groom_email: "",
    groom_employment_status: "",
    groom_married_before: "false",
    groom_parents_name: "",
    groom_home_parish: "",
    bride_full_name: "",
    bride_nationality: "",
    bride_state: "",
    bride_local_government: "",
    bride_town: "",
    bride_age: "",
    bride_contact: "",
    bride_email: "",
    bride_employment_status: "",
    bride_married_before: "false",
    bride_parents_name: "",
    bride_home_parish: "",
    wedding_date: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    try {
      const { error: insertError } = await supabase.from("wedding_registrations").insert([
        {
          user_id: userId,
          ...formData,
          groom_age: Number.parseInt(formData.groom_age),
          bride_age: Number.parseInt(formData.bride_age),
          groom_married_before: formData.groom_married_before === "true",
          bride_married_before: formData.bride_married_before === "true",
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
        <p className="text-emerald-700">
          Your wedding registration has been submitted. You will be contacted with next steps.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Groom Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">Groom Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="groom_full_name">Full Name *</Label>
            <Input
              id="groom_full_name"
              required
              value={formData.groom_full_name}
              onChange={(e) => setFormData({ ...formData, groom_full_name: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="groom_email">Email *</Label>
            <Input
              id="groom_email"
              type="email"
              required
              value={formData.groom_email}
              onChange={(e) => setFormData({ ...formData, groom_email: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="groom_nationality">Nationality</Label>
            <Input
              id="groom_nationality"
              value={formData.groom_nationality}
              onChange={(e) => setFormData({ ...formData, groom_nationality: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="groom_state">State</Label>
            <Input
              id="groom_state"
              value={formData.groom_state}
              onChange={(e) => setFormData({ ...formData, groom_state: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="groom_local_government">Local Government</Label>
            <Input
              id="groom_local_government"
              value={formData.groom_local_government}
              onChange={(e) => setFormData({ ...formData, groom_local_government: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="groom_town">Town</Label>
            <Input
              id="groom_town"
              value={formData.groom_town}
              onChange={(e) => setFormData({ ...formData, groom_town: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="groom_age">Age</Label>
            <Input
              id="groom_age"
              type="number"
              value={formData.groom_age}
              onChange={(e) => setFormData({ ...formData, groom_age: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="groom_contact">Contact *</Label>
            <Input
              id="groom_contact"
              required
              value={formData.groom_contact}
              onChange={(e) => setFormData({ ...formData, groom_contact: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="groom_employment_status">Employment Status</Label>
            <Input
              id="groom_employment_status"
              value={formData.groom_employment_status}
              onChange={(e) => setFormData({ ...formData, groom_employment_status: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="groom_parents_name">Parents' Names</Label>
            <Input
              id="groom_parents_name"
              value={formData.groom_parents_name}
              onChange={(e) => setFormData({ ...formData, groom_parents_name: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="groom_home_parish">Home Parish</Label>
            <Input
              id="groom_home_parish"
              value={formData.groom_home_parish}
              onChange={(e) => setFormData({ ...formData, groom_home_parish: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="groom_married_before">Married Before?</Label>
            <Select
              value={formData.groom_married_before}
              onValueChange={(value) => setFormData({ ...formData, groom_married_before: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="false">No</SelectItem>
                <SelectItem value="true">Yes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Bride Information */}
      <div className="space-y-4 pt-6 border-t">
        <h3 className="text-lg font-semibold text-slate-900">Bride Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="bride_full_name">Full Name *</Label>
            <Input
              id="bride_full_name"
              required
              value={formData.bride_full_name}
              onChange={(e) => setFormData({ ...formData, bride_full_name: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="bride_email">Email *</Label>
            <Input
              id="bride_email"
              type="email"
              required
              value={formData.bride_email}
              onChange={(e) => setFormData({ ...formData, bride_email: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="bride_nationality">Nationality</Label>
            <Input
              id="bride_nationality"
              value={formData.bride_nationality}
              onChange={(e) => setFormData({ ...formData, bride_nationality: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="bride_state">State</Label>
            <Input
              id="bride_state"
              value={formData.bride_state}
              onChange={(e) => setFormData({ ...formData, bride_state: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="bride_local_government">Local Government</Label>
            <Input
              id="bride_local_government"
              value={formData.bride_local_government}
              onChange={(e) => setFormData({ ...formData, bride_local_government: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="bride_town">Town</Label>
            <Input
              id="bride_town"
              value={formData.bride_town}
              onChange={(e) => setFormData({ ...formData, bride_town: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="bride_age">Age</Label>
            <Input
              id="bride_age"
              type="number"
              value={formData.bride_age}
              onChange={(e) => setFormData({ ...formData, bride_age: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="bride_contact">Contact *</Label>
            <Input
              id="bride_contact"
              required
              value={formData.bride_contact}
              onChange={(e) => setFormData({ ...formData, bride_contact: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="bride_employment_status">Employment Status</Label>
            <Input
              id="bride_employment_status"
              value={formData.bride_employment_status}
              onChange={(e) => setFormData({ ...formData, bride_employment_status: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="bride_parents_name">Parents' Names</Label>
            <Input
              id="bride_parents_name"
              value={formData.bride_parents_name}
              onChange={(e) => setFormData({ ...formData, bride_parents_name: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="bride_home_parish">Home Parish</Label>
            <Input
              id="bride_home_parish"
              value={formData.bride_home_parish}
              onChange={(e) => setFormData({ ...formData, bride_home_parish: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="bride_married_before">Married Before?</Label>
            <Select
              value={formData.bride_married_before}
              onValueChange={(value) => setFormData({ ...formData, bride_married_before: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="false">No</SelectItem>
                <SelectItem value="true">Yes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Wedding Details */}
      <div className="space-y-4 pt-6 border-t">
        <h3 className="text-lg font-semibold text-slate-900">Wedding Details</h3>
        <div>
          <Label htmlFor="wedding_date">Wedding Date</Label>
          <Input
            id="wedding_date"
            type="date"
            value={formData.wedding_date}
            onChange={(e) => setFormData({ ...formData, wedding_date: e.target.value })}
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
        {isLoading ? "Submitting..." : "Submit Wedding Registration"}
      </Button>
    </form>
  )
}
