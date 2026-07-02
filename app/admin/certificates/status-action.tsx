"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

type CertStatus = "pending" | "processing" | "completed" | "rejected"

const statusColors: Record<CertStatus, string> = {
  pending: "text-yellow-700 bg-yellow-100",
  processing: "text-blue-700 bg-blue-100",
  completed: "text-emerald-700 bg-emerald-100",
  rejected: "text-red-700 bg-red-100",
}

export function CertificateStatusAction({ certId, currentStatus }: { certId: string; currentStatus: CertStatus }) {
  const [status, setStatus] = useState<CertStatus>(currentStatus)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    setSaving(true); setSaved(false)
    await fetch("/api/certificate-status", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: certId, status }),
    })
    setSaving(false); setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Select value={status} onValueChange={(v) => { setStatus(v as CertStatus); setSaved(false) }}>
        <SelectTrigger className="w-36 h-8 text-xs"><SelectValue /></SelectTrigger>
        <SelectContent>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="processing">Processing</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="rejected">Rejected</SelectItem>
        </SelectContent>
      </Select>
      <Button size="sm" variant="outline" onClick={handleSave}
        disabled={saving || status === currentStatus} className="h-8 text-xs">
        {saving ? "Saving…" : saved ? "✓ Saved" : "Update"}
      </Button>
      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColors[status]}`}>
        {status}
      </span>
    </div>
  )
}
