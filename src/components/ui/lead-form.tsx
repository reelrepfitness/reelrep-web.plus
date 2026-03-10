"use client"

import * as React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle2, Loader2 } from "lucide-react"

export default function LeadForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMessage("")

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone: phone || undefined }),
      })

      const data = await res.json()

      if (!res.ok) {
        setStatus("error")
        setErrorMessage(data.error || "שגיאה לא צפויה")
        return
      }

      setStatus("success")
    } catch {
      setStatus("error")
      setErrorMessage("שגיאה בחיבור לשרת — אנא נסו שוב")
    }
  }

  if (status === "success") {
    return (
      <div className="w-full max-w-md mx-auto text-center py-8">
        <CheckCircle2 className="w-16 h-16 text-teal-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">נרשמת בהצלחה!</h3>
        <p className="text-gray-400">שלחנו לך אימייל אישור עם פרטי ההטבה.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-5" dir="rtl">
      <div className="space-y-2">
        <Label htmlFor="lead-name" className="text-gray-300">שם מלא</Label>
        <Input
          id="lead-name"
          type="text"
          placeholder="השם שלך"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-teal-500/30 focus-visible:border-teal-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="lead-email" className="text-gray-300">אימייל</Label>
        <Input
          id="lead-email"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          dir="ltr"
          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-teal-500/30 focus-visible:border-teal-500 text-right"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="lead-phone" className="text-gray-300">
          טלפון <span className="text-gray-500">(אופציונלי)</span>
        </Label>
        <Input
          id="lead-phone"
          type="tel"
          placeholder="050-0000000"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          dir="ltr"
          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-teal-500/30 focus-visible:border-teal-500 text-right"
        />
      </div>

      {status === "error" && (
        <p className="text-red-400 text-sm text-center">{errorMessage}</p>
      )}

      <Button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold text-base h-12"
      >
        {status === "loading" ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          "הרשמו עכשיו"
        )}
      </Button>
    </form>
  )
}
