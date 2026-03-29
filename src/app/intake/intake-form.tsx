"use client"

import React, { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Turnstile } from "@marsidev/react-turnstile"
import {
  User, Mail, Phone, ChevronLeft, ChevronRight,
  CheckCircle2, Loader2, Ruler, Weight, Target,
  Activity, UtensilsCrossed, FileText, Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

// --- Types ---
type Gender = "male" | "female"
type Goal = "חיטוב" | "ניטראלי" | "מסה"
type ActivityLevel =
  | "רמה 1 - יושבנית במלואה"
  | "רמה 2 - יושבנית למחצה"
  | "רמה 3 - חצי פעילה"
  | "רמה 4 - פעילה"

interface FormData {
  name: string
  email: string
  phone: string
  birthday: { day: string; month: string; year: string }
  gender: Gender | null
  height: string
  weight: string
  goal: Goal | null
  activity: ActivityLevel | null
  foodLimitations: string
  usersNotes: string
}

const INITIAL_FORM: FormData = {
  name: "",
  email: "",
  phone: "",
  birthday: { day: "", month: "", year: "" },
  gender: null,
  height: "170",
  weight: "70",
  goal: null,
  activity: null,
  foodLimitations: "",
  usersNotes: "",
}

const TOTAL_STEPS = 7

const GOALS: { value: Goal; label: string; desc: string; emoji: string }[] = [
  { value: "חיטוב", label: "חיטוב", desc: "ירידה באחוזי שומן", emoji: "🔥" },
  { value: "ניטראלי", label: "ניטראלי", desc: "שמירה על הקיים", emoji: "⚖️" },
  { value: "מסה", label: "מסה", desc: "עלייה במסת שריר", emoji: "💪" },
]

const ACTIVITIES: { value: ActivityLevel; title: string; desc: string }[] = [
  { value: "רמה 1 - יושבנית במלואה", title: "רמה 1 — יושבנית", desc: "ללא אימונים" },
  { value: "רמה 2 - יושבנית למחצה", title: "רמה 2 — יושבנית למחצה", desc: "1-2 אימונים בשבוע" },
  { value: "רמה 3 - חצי פעילה", title: "רמה 3 — חצי פעילה", desc: "3-4 אימונים בשבוע" },
  { value: "רמה 4 - פעילה", title: "רמה 4 — פעילה", desc: "5-7 אימונים בשבוע" },
]

const STEP_TITLES = ["פרטים אישיים", "תאריך לידה ומין", "גובה ומשקל", "מטרה", "רמת פעילות", "הערות", "סיכום ושליחה"]

const MONTHS = [
  "ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני",
  "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר",
]

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
}

export default function IntakeForm() {
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(0)
  const [form, setForm] = useState<FormData>(INITIAL_FORM)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const goNext = useCallback(() => {
    if (step < TOTAL_STEPS - 1) { setDirection(1); setStep(s => s + 1) }
  }, [step])

  const goBack = useCallback(() => {
    if (step > 0) { setDirection(-1); setStep(s => s - 1) }
  }, [step])

  const canProceed = useCallback((): boolean => {
    switch (step) {
      case 0: return form.name.trim().length > 0 && form.email.trim().length > 0
      default: return true
    }
  }, [step, form])

  const handleSubmit = async () => {
    if (!turnstileToken) {
      setErrorMessage("ממתין לאימות — אנא נסו שוב")
      setStatus("error")
      return
    }
    setStatus("loading")
    setErrorMessage("")

    const birthdayStr = form.birthday.year && form.birthday.month && form.birthday.day
      ? `${form.birthday.year}-${form.birthday.month.padStart(2, "0")}-${form.birthday.day.padStart(2, "0")}`
      : null

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || undefined,
          birthday: birthdayStr,
          gender: form.gender,
          height: form.height ? Number(form.height) : null,
          weight: form.weight ? Number(form.weight) : null,
          goal: form.goal,
          activity: form.activity,
          food_limitations: form.foodLimitations || null,
          users_notes: form.usersNotes || null,
          turnstileToken,
        }),
      })
      const data = await res.json()
      if (!res.ok) { setStatus("error"); setErrorMessage(data.error || "שגיאה לא צפויה"); return }
      setStatus("success")
    } catch {
      setStatus("error")
      setErrorMessage("שגיאה בחיבור לשרת — אנא נסו שוב")
    }
  }

  if (status === "success") {
    return (
      <div className="w-full max-w-lg mx-auto text-center py-12">
        <CheckCircle2 className="w-20 h-20 text-teal-400 mx-auto mb-5" />
        <h3 className="text-3xl font-bold text-white mb-3">נשלח בהצלחה!</h3>
        <p className="text-gray-400 text-lg">תודה רבה! נתראה בפגישה הראשונה.</p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-lg mx-auto" dir="rtl">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">שלב {step + 1} מתוך {TOTAL_STEPS}</span>
          <span className="text-sm text-teal-400 font-medium">{STEP_TITLES[step]}</span>
        </div>
        <div className="h-1.5 rounded-full bg-gray-800 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-l from-teal-400 to-teal-600"
            animate={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Steps */}
      <div className="min-h-[340px] relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {step === 0 && <StepContact form={form} setForm={setForm} />}
            {step === 1 && <StepBirthdayGender form={form} setForm={setForm} />}
            {step === 2 && <StepBody form={form} setForm={setForm} />}
            {step === 3 && <StepGoal form={form} setForm={setForm} />}
            {step === 4 && <StepActivity form={form} setForm={setForm} />}
            {step === 5 && <StepNotes form={form} setForm={setForm} />}
            {step === 6 && (
              <StepReview
                form={form}
                turnstileToken={turnstileToken}
                onTurnstileSuccess={setTurnstileToken}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {status === "error" && (
        <p className="text-red-400 text-sm text-center mt-3">{errorMessage}</p>
      )}

      {/* Navigation */}
      <div className="flex items-center gap-3 mt-8">
        {step > 0 && (
          <Button
            type="button"
            variant="outline"
            onClick={goBack}
            className="flex-1 h-12 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            <ChevronRight className="w-4 h-4 ml-1" />
            הקודם
          </Button>
        )}

        {step < TOTAL_STEPS - 1 ? (
          <Button
            type="button"
            onClick={goNext}
            disabled={!canProceed()}
            className="flex-1 h-12 bg-teal-500 hover:bg-teal-600 text-white font-bold disabled:opacity-40"
          >
            הבא
            <ChevronLeft className="w-4 h-4 mr-1" />
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={status === "loading" || !turnstileToken}
            className="flex-1 h-12 bg-teal-500 hover:bg-teal-600 text-white font-bold disabled:opacity-40"
          >
            {status === "loading" ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "שליחה"
            )}
          </Button>
        )}
      </div>
    </div>
  )
}

// --- Step Components ---

type StepProps = { form: FormData; setForm: React.Dispatch<React.SetStateAction<FormData>> }

function StepContact({ form, setForm }: StepProps) {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label className="text-gray-300 flex items-center gap-2"><User className="w-4 h-4 text-teal-400" />שם מלא</Label>
        <Input
          placeholder="השם שלך"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          required
          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-teal-500/30 focus-visible:border-teal-500 h-12"
        />
      </div>
      <div className="space-y-2">
        <Label className="text-gray-300 flex items-center gap-2"><Mail className="w-4 h-4 text-teal-400" />אימייל</Label>
        <Input
          type="email"
          placeholder="your@email.com"
          dir="ltr"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          required
          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-teal-500/30 focus-visible:border-teal-500 h-12 text-right"
        />
      </div>
      <div className="space-y-2">
        <Label className="text-gray-300 flex items-center gap-2">
          <Phone className="w-4 h-4 text-teal-400" />טלפון <span className="text-gray-500 text-xs">(אופציונלי)</span>
        </Label>
        <Input
          type="tel"
          placeholder="050-0000000"
          dir="ltr"
          value={form.phone}
          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-teal-500/30 focus-visible:border-teal-500 h-12 text-right"
        />
      </div>
    </div>
  )
}

function StepBirthdayGender({ form, setForm }: StepProps) {
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 80 }, (_, i) => currentYear - 10 - i)
  const days = Array.from({ length: 31 }, (_, i) => i + 1)

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label className="text-gray-300 flex items-center gap-2"><Calendar className="w-4 h-4 text-teal-400" />תאריך לידה</Label>
        <div className="grid grid-cols-3 gap-3">
          <select
            value={form.birthday.day}
            onChange={e => setForm(f => ({ ...f, birthday: { ...f.birthday, day: e.target.value } }))}
            className="bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-3 text-center focus:border-teal-500 focus:outline-none"
          >
            <option value="">יום</option>
            {days.map(d => <option key={d} value={String(d)}>{d}</option>)}
          </select>
          <select
            value={form.birthday.month}
            onChange={e => setForm(f => ({ ...f, birthday: { ...f.birthday, month: e.target.value } }))}
            className="bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-3 text-center focus:border-teal-500 focus:outline-none"
          >
            <option value="">חודש</option>
            {MONTHS.map((m, i) => <option key={i} value={String(i + 1)}>{m}</option>)}
          </select>
          <select
            value={form.birthday.year}
            onChange={e => setForm(f => ({ ...f, birthday: { ...f.birthday, year: e.target.value } }))}
            className="bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-3 text-center focus:border-teal-500 focus:outline-none"
          >
            <option value="">שנה</option>
            {years.map(y => <option key={y} value={String(y)}>{y}</option>)}
          </select>
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-gray-300">מין</Label>
        <div className="grid grid-cols-2 gap-3">
          {([
            { value: "male" as Gender, label: "גבר", icon: "♂" },
            { value: "female" as Gender, label: "אישה", icon: "♀" },
          ]).map(g => (
            <button
              key={g.value}
              type="button"
              onClick={() => setForm(f => ({ ...f, gender: g.value }))}
              className={cn(
                "flex flex-col items-center gap-2 py-5 rounded-xl border-2 transition-all duration-200",
                form.gender === g.value
                  ? "border-teal-500 bg-teal-500/10 text-teal-400"
                  : "border-gray-700 bg-gray-800/50 text-gray-400 hover:border-gray-600"
              )}
            >
              <span className="text-3xl">{g.icon}</span>
              <span className="text-sm font-medium">{g.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function StepBody({ form, setForm }: StepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label className="text-gray-300 flex items-center gap-2">
          <Ruler className="w-4 h-4 text-teal-400" />גובה (ס״מ)
        </Label>
        <div className="flex items-center gap-4">
          <Input
            type="number"
            min={100}
            max={250}
            value={form.height}
            onChange={e => setForm(f => ({ ...f, height: e.target.value }))}
            className="bg-gray-800 border-gray-700 text-white text-center text-2xl font-bold h-14 w-28 focus-visible:ring-teal-500/30 focus-visible:border-teal-500"
          />
          <input
            type="range"
            min={100}
            max={250}
            value={form.height}
            onChange={e => setForm(f => ({ ...f, height: e.target.value }))}
            className="flex-1 accent-teal-500 h-2"
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-gray-300 flex items-center gap-2">
          <Weight className="w-4 h-4 text-teal-400" />משקל (ק״ג)
        </Label>
        <div className="flex items-center gap-4">
          <Input
            type="number"
            min={30}
            max={250}
            value={form.weight}
            onChange={e => setForm(f => ({ ...f, weight: e.target.value }))}
            className="bg-gray-800 border-gray-700 text-white text-center text-2xl font-bold h-14 w-28 focus-visible:ring-teal-500/30 focus-visible:border-teal-500"
          />
          <input
            type="range"
            min={30}
            max={250}
            value={form.weight}
            onChange={e => setForm(f => ({ ...f, weight: e.target.value }))}
            className="flex-1 accent-teal-500 h-2"
          />
        </div>
      </div>
    </div>
  )
}

function StepGoal({ form, setForm }: StepProps) {
  return (
    <div className="space-y-3">
      <Label className="text-gray-300 flex items-center gap-2 mb-1">
        <Target className="w-4 h-4 text-teal-400" />מה המטרה שלך?
      </Label>
      <div className="grid gap-3">
        {GOALS.map(g => (
          <button
            key={g.value}
            type="button"
            onClick={() => setForm(f => ({ ...f, goal: g.value }))}
            className={cn(
              "flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 text-right",
              form.goal === g.value
                ? "border-teal-500 bg-teal-500/10"
                : "border-gray-700 bg-gray-800/50 hover:border-gray-600"
            )}
          >
            <span className="text-3xl">{g.emoji}</span>
            <div>
              <div className={cn("font-bold text-lg", form.goal === g.value ? "text-teal-400" : "text-white")}>
                {g.label}
              </div>
              <div className="text-sm text-gray-400">{g.desc}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

function StepActivity({ form, setForm }: StepProps) {
  return (
    <div className="space-y-3">
      <Label className="text-gray-300 flex items-center gap-2 mb-1">
        <Activity className="w-4 h-4 text-teal-400" />רמת פעילות
      </Label>
      <div className="grid gap-3">
        {ACTIVITIES.map((a, i) => (
          <button
            key={a.value}
            type="button"
            onClick={() => setForm(f => ({ ...f, activity: a.value }))}
            className={cn(
              "flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 text-right",
              form.activity === a.value
                ? "border-teal-500 bg-teal-500/10"
                : "border-gray-700 bg-gray-800/50 hover:border-gray-600"
            )}
          >
            <div className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center text-lg font-black shrink-0",
              form.activity === a.value ? "bg-teal-500 text-white" : "bg-gray-700 text-gray-400"
            )}>
              {i + 1}
            </div>
            <div>
              <div className={cn("font-bold", form.activity === a.value ? "text-teal-400" : "text-white")}>
                {a.title}
              </div>
              <div className="text-sm text-gray-400">{a.desc}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

function StepNotes({ form, setForm }: StepProps) {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label className="text-gray-300 flex items-center gap-2">
          <UtensilsCrossed className="w-4 h-4 text-teal-400" />מגבלות תזונתיות / אלרגיות
        </Label>
        <textarea
          placeholder="לדוגמה: צמחוני, אלרגיה לגלוטן, ללא לקטוז..."
          value={form.foodLimitations}
          onChange={e => setForm(f => ({ ...f, foodLimitations: e.target.value }))}
          rows={3}
          className="w-full bg-gray-800 border border-gray-700 text-white placeholder:text-gray-500 rounded-lg px-4 py-3 resize-none focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500/30"
        />
      </div>
      <div className="space-y-2">
        <Label className="text-gray-300 flex items-center gap-2">
          <FileText className="w-4 h-4 text-teal-400" />הערות נוספות
        </Label>
        <textarea
          placeholder="משהו נוסף שחשוב לי לדעת?"
          value={form.usersNotes}
          onChange={e => setForm(f => ({ ...f, usersNotes: e.target.value }))}
          rows={3}
          className="w-full bg-gray-800 border border-gray-700 text-white placeholder:text-gray-500 rounded-lg px-4 py-3 resize-none focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500/30"
        />
      </div>
    </div>
  )
}

function StepReview({ form, turnstileToken, onTurnstileSuccess }: {
  form: FormData
  turnstileToken: string | null
  onTurnstileSuccess: (token: string) => void
}) {
  const birthdayStr = form.birthday.day && form.birthday.month && form.birthday.year
    ? `${form.birthday.day}/${form.birthday.month}/${form.birthday.year}`
    : null

  const rows: { label: string; value: string | null }[] = [
    { label: "שם", value: form.name },
    { label: "אימייל", value: form.email },
    { label: "טלפון", value: form.phone || null },
    { label: "תאריך לידה", value: birthdayStr },
    { label: "מין", value: form.gender === "male" ? "גבר" : form.gender === "female" ? "אישה" : null },
    { label: "גובה", value: form.height ? `${form.height} ס״מ` : null },
    { label: "משקל", value: form.weight ? `${form.weight} ק״ג` : null },
    { label: "מטרה", value: form.goal },
    { label: "רמת פעילות", value: form.activity },
    { label: "מגבלות", value: form.foodLimitations || null },
    { label: "הערות", value: form.usersNotes || null },
  ]

  return (
    <div className="space-y-5">
      <h3 className="text-lg font-bold text-white text-center mb-2">סיכום הפרטים</h3>
      <div className="bg-gray-800/60 rounded-xl border border-gray-700 divide-y divide-gray-700/50">
        {rows.filter(r => r.value).map(r => (
          <div key={r.label} className="flex items-start justify-between px-4 py-3">
            <span className="text-gray-400 text-sm shrink-0">{r.label}</span>
            <span className="text-white text-sm font-medium text-left max-w-[60%]">{r.value}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-center pt-2">
        {!turnstileToken ? (
          <Turnstile
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
            onSuccess={onTurnstileSuccess}
            options={{ theme: "dark", size: "normal" }}
          />
        ) : (
          <div className="flex items-center gap-2 text-teal-400 text-sm">
            <CheckCircle2 className="w-4 h-4" />
            <span>אומת בהצלחה</span>
          </div>
        )}
      </div>
    </div>
  )
}
