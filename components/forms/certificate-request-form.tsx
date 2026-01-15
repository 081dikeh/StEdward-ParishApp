"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"

export function CertificateRequestForm({ userId }: { userId: string }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    groom_full_name: "",
    bride_full_name: "",
    wedding_date: "",
    certificate_type: "",
    copies_needed: "1",
    contact: "",
    email: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    try {
      const { error: insertError } = await supabase.from("marriage_certificate_requests").insert([
        {
          user_id: userId,
          ...formData,
          copies_needed: Number.parseInt(formData.copies_needed),
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
        <h3 className="text-lg font-semibold text-emerald-900 mb-2">Request Submitted!</h3>
        <p className="text-emerald-700">Your certificate request has been submitted. We will process it soon.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="groom_full_name">Groom's Full Name *</Label>
          <Input
            id="groom_full_name"
            required
            value={formData.groom_full_name}
            onChange={(e) => setFormData({ ...formData, groom_full_name: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="bride_full_name">Bride's Full Name *</Label>
          <Input
            id="bride_full_name"
            required
            value={formData.bride_full_name}
            onChange={(e) => setFormData({ ...formData, bride_full_name: e.target.value })}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="wedding_date">Wedding Date</Label>
        <Input
          id="wedding_date"
          type="date"
          value={formData.wedding_date}
          onChange={(e) => setFormData({ ...formData, wedding_date: e.target.value })}
        />
      </div>

      <div>
        <Label htmlFor="certificate_type">Certificate Type *</Label>
        <Select
          value={formData.certificate_type}
          onValueChange={(value) => setFormData({ ...formData, certificate_type: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select certificate type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="church">Church Certificate</SelectItem>
            <SelectItem value="government">Government Certificate</SelectItem>
            <SelectItem value="both">Both Certificates</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="copies_needed">Number of Copies *</Label>
        <Input
          id="copies_needed"
          type="number"
          min="1"
          required
          value={formData.copies_needed}
          onChange={(e) => setFormData({ ...formData, copies_needed: e.target.value })}
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
        {isLoading ? "Submitting..." : "Submit Certificate Request"}
      </Button>
    </form>
  )
}
