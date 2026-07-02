"use client"
import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"

const EmpSelect = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
  <Select value={value} onValueChange={onChange}>
    <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
    <SelectContent>
      <SelectItem value="employed">Employed</SelectItem>
      <SelectItem value="self-employed">Self-Employed</SelectItem>
      <SelectItem value="unemployed">Unemployed</SelectItem>
      <SelectItem value="student">Student</SelectItem>
      <SelectItem value="retired">Retired</SelectItem>
    </SelectContent>
  </Select>
)

export function WeddingRegistrationForm({ userId }: { userId: string }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    groom_full_name: "", groom_nationality: "", groom_state: "", groom_local_government: "",
    groom_town: "", groom_age: "", groom_contact: "", groom_email: "", groom_employment_status: "",
    groom_married_before: "false", groom_parents_name: "", groom_home_parish: "",
    bride_full_name: "", bride_nationality: "", bride_state: "", bride_local_government: "",
    bride_town: "", bride_age: "", bride_contact: "", bride_email: "", bride_employment_status: "",
    bride_married_before: "false", bride_parents_name: "", bride_home_parish: "", wedding_date: "",
  })
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [k]: e.target.value })
  const setS = (k: string) => (v: string) => setFormData({ ...formData, [k]: v })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setIsLoading(true); setError(null)
    try {
      const res = await fetch("/api/wedding-registration", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Submission failed")
      setSuccess(true); setTimeout(() => router.push("/protected/dashboard"), 2000)
    } catch (err) { setError(err instanceof Error ? err.message : "An error occurred") }
    finally { setIsLoading(false) }
  }

  if (success) return <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-lg text-center"><h3 className="text-lg font-semibold text-emerald-900 mb-2">Registration Successful!</h3><p className="text-emerald-700">Your wedding registration has been submitted.</p></div>

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900 pb-2 border-b">Groom Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label>Full Name *</Label><Input required value={formData.groom_full_name} onChange={set("groom_full_name")} /></div>
          <div><Label>Email *</Label><Input type="email" required value={formData.groom_email} onChange={set("groom_email")} /></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label>Nationality</Label><Input value={formData.groom_nationality} onChange={set("groom_nationality")} /></div>
          <div><Label>State</Label><Input value={formData.groom_state} onChange={set("groom_state")} /></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label>Local Government</Label><Input value={formData.groom_local_government} onChange={set("groom_local_government")} /></div>
          <div><Label>Town</Label><Input value={formData.groom_town} onChange={set("groom_town")} /></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label>Age</Label><Input type="number" value={formData.groom_age} onChange={set("groom_age")} /></div>
          <div><Label>Contact *</Label><Input required value={formData.groom_contact} onChange={set("groom_contact")} /></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label>Employment Status</Label><EmpSelect value={formData.groom_employment_status} onChange={setS("groom_employment_status")} /></div>
          <div><Label>Parents' Names</Label><Input value={formData.groom_parents_name} onChange={set("groom_parents_name")} /></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label>Home Parish</Label><Input value={formData.groom_home_parish} onChange={set("groom_home_parish")} /></div>
          <div><Label>Married Before?</Label>
            <Select value={formData.groom_married_before} onValueChange={setS("groom_married_before")}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="false">No</SelectItem><SelectItem value="true">Yes</SelectItem></SelectContent>
            </Select></div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900 pb-2 border-b">Bride Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label>Full Name *</Label><Input required value={formData.bride_full_name} onChange={set("bride_full_name")} /></div>
          <div><Label>Email *</Label><Input type="email" required value={formData.bride_email} onChange={set("bride_email")} /></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label>Nationality</Label><Input value={formData.bride_nationality} onChange={set("bride_nationality")} /></div>
          <div><Label>State</Label><Input value={formData.bride_state} onChange={set("bride_state")} /></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label>Local Government</Label><Input value={formData.bride_local_government} onChange={set("bride_local_government")} /></div>
          <div><Label>Town</Label><Input value={formData.bride_town} onChange={set("bride_town")} /></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label>Age</Label><Input type="number" value={formData.bride_age} onChange={set("bride_age")} /></div>
          <div><Label>Contact *</Label><Input required value={formData.bride_contact} onChange={set("bride_contact")} /></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label>Employment Status</Label><EmpSelect value={formData.bride_employment_status} onChange={setS("bride_employment_status")} /></div>
          <div><Label>Parents' Names</Label><Input value={formData.bride_parents_name} onChange={set("bride_parents_name")} /></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label>Home Parish</Label><Input value={formData.bride_home_parish} onChange={set("bride_home_parish")} /></div>
          <div><Label>Married Before?</Label>
            <Select value={formData.bride_married_before} onValueChange={setS("bride_married_before")}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="false">No</SelectItem><SelectItem value="true">Yes</SelectItem></SelectContent>
            </Select></div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900 pb-2 border-b">Wedding Details</h3>
        <div><Label>Wedding Date</Label><Input type="date" value={formData.wedding_date} onChange={set("wedding_date")} /></div>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
      <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
        {isLoading ? "Submitting…" : "Submit Wedding Registration"}
      </Button>
    </form>
  )
}
