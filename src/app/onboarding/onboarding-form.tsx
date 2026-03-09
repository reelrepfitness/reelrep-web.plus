"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    User,
    Mail,
    Phone,
    Lock,
    ChevronLeft,
    ChevronRight,
    Check,
    Loader2,
    Eye,
    EyeOff,
    UtensilsCrossed,
    FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Calendar as CalendarPicker } from "@/components/ui/calendar";

// --- Types ---
type Gender = "male" | "female";
type Goal = "חיטוב" | "ניטראלי" | "מסה";
type ActivityLevel =
    | "רמה 1 - יושבנית במלואה"
    | "רמה 2 - יושבנית למחצה"
    | "רמה 3 - חצי פעילה"
    | "רמה 4 - פעילה";

interface FormData {
    name: string;
    email: string;
    phone: string;
    password: string;
    birthday: string;
    gender: Gender | null;
    height: number;
    weight: number;
    foodLimitations: string;
    usersNotes: string;
    goal: Goal | null;
    activity: ActivityLevel | null;
    privacyApproved: boolean;
    termsApproved: boolean;
    healthApproved: boolean;
}

const INITIAL_FORM: FormData = {
    name: "",
    email: "",
    phone: "",
    password: "",
    birthday: "",
    gender: null,
    height: 170,
    weight: 70,
    foodLimitations: "",
    usersNotes: "",
    goal: null,
    activity: null,
    privacyApproved: false,
    termsApproved: false,
    healthApproved: false,
};

const TOTAL_STEPS = 8;

// --- Data ---
const GOALS: { value: Goal; label: string; image: string; desc: string; gradient: string }[] = [
    { value: "חיטוב", label: "חיטוב", image: "/images/goal-hitov.png", desc: "ירידה באחוזי שומן", gradient: "linear-gradient(135deg, #fce4ec, #f8bbd0)" },
    { value: "ניטראלי", label: "ניטראלי", image: "/images/goal-nutral.png", desc: "שמירה על הקיים", gradient: "linear-gradient(135deg, #e0f2f1, #b2dfdb)" },
    { value: "מסה", label: "מסה", image: "/images/goal-masa.png", desc: "עלייה במסת שריר", gradient: "linear-gradient(135deg, #e8eaf6, #c5cae9)" },
];

const ACTIVITIES: { value: ActivityLevel; title: string; subtitle: string; desc: string; gradient: string }[] = [
    { value: "רמה 1 - יושבנית במלואה", title: "רמה 1", subtitle: "יושבנית", desc: "ללא אימונים", gradient: "linear-gradient(135deg, #c3b1e1, #a8d8ea)" },
    { value: "רמה 2 - יושבנית למחצה", title: "רמה 2", subtitle: "יושבנית למחצה", desc: "1-2 אימונים בשבוע", gradient: "linear-gradient(135deg, #f9c4d2, #fbd5b5)" },
    { value: "רמה 3 - חצי פעילה", title: "רמה 3", subtitle: "חצי פעילה", desc: "3-4 אימונים בשבוע", gradient: "linear-gradient(135deg, #a8d8ea, #b5ead7)" },
    { value: "רמה 4 - פעילה", title: "רמה 4", subtitle: "פעילה", desc: "5-7 אימונים בשבוע", gradient: "linear-gradient(135deg, #b5ead7, #c1f0c1)" },
];

// --- Animations ---
const slideVariants = {
    enter: (dir: number) => ({
        x: dir > 0 ? -60 : 60,
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (dir: number) => ({
        x: dir > 0 ? 60 : -60,
        opacity: 0,
    }),
};

// --- Sub-components ---

const STEP_TITLES = ["שנתחיל?", "תאריך לידה", "מין", "גובה ומשקל", "תזונה ובריאות", "מה המטרה שלך?", "רמת פעילות", "קביעת פגישה"];

function ProgressBar({ current, total, onDoubleClick }: { current: number; total: number; onDoubleClick?: () => void }) {
    const progress = ((current + 1) / total) * 100;
    return (
        <div className="mb-8" onDoubleClick={onDoubleClick}>
            <div className="relative h-8 rounded-full bg-gray-100 overflow-hidden cursor-default select-none">
                <motion.div
                    className="h-full rounded-full bg-[#2EC4B6]"
                    initial={false}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                />
                <span className="absolute inset-0 flex items-center justify-center text-2xl font-black text-gray-600">
                    {STEP_TITLES[current]}
                </span>
            </div>
        </div>
    );
}



function CheckboxField({
    checked,
    onChange,
    label,
}: {
    checked: boolean;
    onChange: (v: boolean) => void;
    label: React.ReactNode;
}) {
    return (
        <label className="flex items-center gap-3 cursor-pointer group">
            <div
                className={cn(
                    "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0",
                    checked
                        ? "bg-[#1FA09B] border-[#1FA09B]"
                        : "border-gray-300 group-hover:border-[#1FA09B]/50"
                )}
                onClick={() => onChange(!checked)}
            >
                {checked && <Check className="w-3 h-3 text-white" />}
            </div>
            <span className="text-sm text-gray-600 leading-tight">{label}</span>
        </label>
    );
}

// --- Steps ---

function StepAccount({ form, setForm }: { form: FormData; setForm: React.Dispatch<React.SetStateAction<FormData>> }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="space-y-5">
            <div className="space-y-1.5">
                <Label htmlFor="name" className="flex items-center gap-2 text-gray-700">
                    <User className="w-4 h-4 text-[#1FA09B]" />
                    שם מלא
                </Label>
                <Input
                    id="name"
                    placeholder="השם שלך"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    autoComplete="name"
                />
            </div>

            <div className="space-y-1.5">
                <Label htmlFor="email" className="flex items-center gap-2 text-gray-700">
                    <Mail className="w-4 h-4 text-[#1FA09B]" />
                    אימייל
                </Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    dir="ltr"
                    className="text-left"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    autoComplete="email"
                />
            </div>

            <div className="space-y-1.5">
                <Label htmlFor="phone" className="flex items-center gap-2 text-gray-700">
                    <Phone className="w-4 h-4 text-[#1FA09B]" />
                    טלפון
                </Label>
                <Input
                    id="phone"
                    type="tel"
                    placeholder="050-0000000"
                    dir="ltr"
                    className="text-left"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    autoComplete="tel"
                />
            </div>

            <div className="space-y-1.5">
                <Label htmlFor="password" className="flex items-center gap-2 text-gray-700">
                    <Lock className="w-4 h-4 text-[#1FA09B]" />
                    סיסמה
                </Label>
                <div className="relative">
                    <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="לפחות 6 תווים"
                        dir="ltr"
                        className="text-left pl-10"
                        value={form.password}
                        onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                        autoComplete="new-password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((s) => !s)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                </div>
                {form.password.length > 0 && form.password.length < 6 && (
                    <p className="text-xs text-red-500 mt-1">הסיסמה חייבת להכיל לפחות 6 תווים</p>
                )}
            </div>
        </div>
    );
}

function StepBirthday({ form, setForm }: { form: FormData; setForm: React.Dispatch<React.SetStateAction<FormData>> }) {
    const selected = form.birthday ? new Date(form.birthday + "T00:00:00") : undefined;

    return (
        <div className="onboarding-calendar rounded-xl border border-gray-200 bg-white p-4">
            <CalendarPicker
                mode="single"
                selected={selected}
                onSelect={(date: Date | undefined) => {
                    if (date) {
                        const yyyy = date.getFullYear();
                        const mm = String(date.getMonth() + 1).padStart(2, "0");
                        const dd = String(date.getDate()).padStart(2, "0");
                        setForm((f) => ({ ...f, birthday: `${yyyy}-${mm}-${dd}` }));
                    }
                }}
                captionLayout="dropdown"
                showOutsideDays={false}
                fromYear={1940}
                toYear={new Date().getFullYear()}
                defaultMonth={selected || new Date(2000, 0)}
            />
        </div>
    );
}

function StepGender({ form, setForm }: { form: FormData; setForm: React.Dispatch<React.SetStateAction<FormData>> }) {
    return (
        <div className="space-y-5">
            <div className="flex items-center justify-center gap-16 py-8 w-full mx-auto">
                <button
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, gender: "male" }))}
                    className="flex flex-col items-center gap-3 focus:outline-none"
                >
                    <div className={cn(
                        "transition-all duration-300 ease-out",
                        form.gender === "male"
                            ? "opacity-100 scale-110"
                            : "opacity-35 scale-100 hover:opacity-60"
                    )}>
                        <Image src="/images/man.png" alt="זכר" width={120} height={120} />
                    </div>
                    <span className={cn(
                        "text-lg font-semibold transition-colors duration-300",
                        form.gender === "male" ? "text-gray-900" : "text-gray-400"
                    )}>זכר</span>
                </button>
                <button
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, gender: "female" }))}
                    className="flex flex-col items-center gap-3 focus:outline-none"
                >
                    <div className={cn(
                        "transition-all duration-300 ease-out",
                        form.gender === "female"
                            ? "opacity-100 scale-110"
                            : "opacity-35 scale-100 hover:opacity-60"
                    )}>
                        <Image src="/images/woman.png" alt="נקבה" width={120} height={120} />
                    </div>
                    <span className={cn(
                        "text-lg font-semibold transition-colors duration-300",
                        form.gender === "female" ? "text-gray-900" : "text-gray-400"
                    )}>נקבה</span>
                </button>
            </div>
        </div>
    );
}

function StepHeightWeight({ form, setForm }: { form: FormData; setForm: React.Dispatch<React.SetStateAction<FormData>> }) {
    const heightPercent = ((form.height - 100) / (250 - 100)) * 100;
    const weightPercent = ((form.weight - 30) / (250 - 30)) * 100;

    return (
        <div className="space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="flex items-center gap-3 mb-2">
                    <Image src="/images/height-icon.png" alt="גובה" width={28} height={28} />
                    <span className="text-gray-700 font-semibold">גובה</span>
                </div>
                <div className="text-center mb-4">
                    <span className="text-4xl font-black text-gray-900">{form.height}</span>
                    <span className="text-lg text-gray-400 mr-1">ס״מ</span>
                </div>
                <input
                    type="range"
                    min={100}
                    max={250}
                    step={1}
                    value={form.height}
                    onChange={(e) => setForm((f) => ({ ...f, height: parseInt(e.target.value, 10) }))}
                    className="range-slider w-full dir-ltr"
                    dir="ltr"
                    style={{ background: `linear-gradient(to right, #1FA09B ${heightPercent}%, #e5e7eb ${heightPercent}%)` }}
                />
                <div className="flex justify-between mt-2 text-xs text-gray-400" dir="ltr">
                    <span>100</span>
                    <span>250</span>
                </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="flex items-center gap-3 mb-2">
                    <Image src="/images/weight-icon.png" alt="משקל" width={28} height={28} />
                    <span className="text-gray-700 font-semibold">משקל</span>
                </div>
                <div className="text-center mb-4">
                    <span className="text-4xl font-black text-gray-900">{form.weight}</span>
                    <span className="text-lg text-gray-400 mr-1">ק״ג</span>
                </div>
                <input
                    type="range"
                    min={30}
                    max={250}
                    step={1}
                    value={form.weight}
                    onChange={(e) => setForm((f) => ({ ...f, weight: parseInt(e.target.value, 10) }))}
                    className="range-slider w-full"
                    dir="ltr"
                    style={{ background: `linear-gradient(to right, #1FA09B ${weightPercent}%, #e5e7eb ${weightPercent}%)` }}
                />
                <div className="flex justify-between mt-2 text-xs text-gray-400" dir="ltr">
                    <span>30</span>
                    <span>250</span>
                </div>
            </div>
        </div>
    );
}

function StepNutrition({ form, setForm }: { form: FormData; setForm: React.Dispatch<React.SetStateAction<FormData>> }) {
    return (
        <div className="space-y-5">
            <div className="space-y-1.5">
                <Label htmlFor="foodLimitations" className="flex items-center gap-2 text-gray-700">
                    <UtensilsCrossed className="w-4 h-4 text-[#1FA09B]" />
                    מגבלות תזונתיות
                </Label>
                <textarea
                    id="foodLimitations"
                    placeholder="לדוגמה: צמחוני, ללא גלוטן, אלרגיה לאגוזים..."
                    value={form.foodLimitations}
                    onChange={(e) => setForm((f) => ({ ...f, foodLimitations: e.target.value }))}
                    rows={3}
                    className={cn(
                        "flex w-full rounded-lg border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1FA09B]/40 focus-visible:border-[#1FA09B] disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 resize-none"
                    )}
                />
            </div>

            <div className="space-y-1.5">
                <Label htmlFor="usersNotes" className="flex items-center gap-2 text-gray-700">
                    <FileText className="w-4 h-4 text-[#1FA09B]" />
                    משהו נוסף שחשוב שנדע?
                </Label>
                <textarea
                    id="usersNotes"
                    placeholder="בעיות בריאותיות, תרופות, פציעות, העדפות מיוחדות..."
                    value={form.usersNotes}
                    onChange={(e) => setForm((f) => ({ ...f, usersNotes: e.target.value }))}
                    rows={4}
                    className={cn(
                        "flex w-full rounded-lg border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1FA09B]/40 focus-visible:border-[#1FA09B] disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 resize-none"
                    )}
                />
            </div>

            <p className="text-xs text-gray-400 text-center">
                השדות האלו אופציונליים — אם אין מגבלות, פשוט המשיכו לשלב הבא
            </p>
        </div>
    );
}

function StepGoal({ form, setForm }: { form: FormData; setForm: React.Dispatch<React.SetStateAction<FormData>> }) {
    const currentIdx = GOALS.findIndex((g) => g.value === form.goal);
    const activeIdx = currentIdx >= 0 ? currentIdx : 0;

    const paginate = (dir: number) => {
        const next = activeIdx + dir;
        if (next >= 0 && next < GOALS.length) {
            setForm((f) => ({ ...f, goal: GOALS[next].value }));
        }
    };

    return (
        <div className="space-y-5">
            <div className="overflow-hidden relative">
                <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                        key={activeIdx}
                        initial={{ x: -80, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 80, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={(_, info) => {
                            if (info.offset.x > 60) paginate(-1);
                            else if (info.offset.x < -60) paginate(1);
                        }}
                    >
                        <div
                            className="w-full rounded-xl p-6 shadow-lg"
                            style={{ background: GOALS[activeIdx].gradient }}
                        >
                            <div className="flex flex-col items-center py-4 gap-3">
                                <Image src={GOALS[activeIdx].image} alt={GOALS[activeIdx].label} width={100} height={100} />
                                <div className="text-2xl font-black text-gray-800">{GOALS[activeIdx].label}</div>
                                <div className="text-sm text-gray-600">{GOALS[activeIdx].desc}</div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2">
                {GOALS.map((g, i) => (
                    <button
                        key={g.value}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, goal: g.value }))}
                        className={cn(
                            "w-2.5 h-2.5 rounded-full transition-all duration-200",
                            i === activeIdx ? "bg-[#1FA09B] scale-125" : "bg-gray-300"
                        )}
                    />
                ))}
            </div>
        </div>
    );
}

function StepActivity({ form, setForm }: { form: FormData; setForm: React.Dispatch<React.SetStateAction<FormData>> }) {
    const currentIdx = ACTIVITIES.findIndex((a) => a.value === form.activity);
    const activeIdx = currentIdx >= 0 ? currentIdx : 0;

    const paginate = (dir: number) => {
        const next = activeIdx + dir;
        if (next >= 0 && next < ACTIVITIES.length) {
            setForm((f) => ({ ...f, activity: ACTIVITIES[next].value }));
        }
    };

    return (
        <div className="space-y-5">
            <div className="overflow-hidden relative">
                <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                        key={activeIdx}
                        initial={{ x: -80, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 80, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={(_, info) => {
                            if (info.offset.x > 60) paginate(-1);
                            else if (info.offset.x < -60) paginate(1);
                        }}
                    >
                        <div
                            className="w-full rounded-xl p-6 shadow-lg"
                            style={{ background: ACTIVITIES[activeIdx].gradient }}
                        >
                            <div className="text-center py-4">
                                <div className="text-xl font-black text-gray-800">{ACTIVITIES[activeIdx].title}</div>
                                <div className="text-2xl font-black text-gray-700 mt-1">{ACTIVITIES[activeIdx].subtitle}</div>
                                <div className="text-base text-gray-700 mt-1">{ACTIVITIES[activeIdx].desc}</div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2">
                {ACTIVITIES.map((a, i) => (
                    <button
                        key={a.value}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, activity: a.value }))}
                        className={cn(
                            "w-2.5 h-2.5 rounded-full transition-all duration-200",
                            i === activeIdx ? "bg-[#1FA09B] scale-125" : "bg-gray-300"
                        )}
                    />
                ))}
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-100">
                <CheckboxField
                    checked={form.privacyApproved}
                    onChange={(v) => setForm((f) => ({ ...f, privacyApproved: v }))}
                    label={<>קראתי ואני מאשר/ת את <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-[#1FA09B] underline hover:text-[#178A85]" onClick={(e) => e.stopPropagation()}>מדיניות הפרטיות</a></>}
                />
                <CheckboxField
                    checked={form.termsApproved}
                    onChange={(v) => setForm((f) => ({ ...f, termsApproved: v }))}
                    label={<>קראתי ואני מאשר/ת את <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-[#1FA09B] underline hover:text-[#178A85]" onClick={(e) => e.stopPropagation()}>תנאי השימוש</a></>}
                />
                <CheckboxField
                    checked={form.healthApproved}
                    onChange={(v) => setForm((f) => ({ ...f, healthApproved: v }))}
                    label="אני מצהיר/ה כי אני בריא/ה ואין מניעה רפואית"
                />
            </div>
        </div>
    );
}

function StepBooking() {
    return (
        <div className="space-y-4">
            <p className="text-center text-gray-500 text-sm">בחרו תאריך ושעה לפגישה הראשונה</p>
            <div className="rounded-xl overflow-hidden border border-gray-200">
                <iframe
                    src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ08VRs8WUgnvPFUM0_Gw_25P_VosGk4WGwqNmeRVj09u9vkT8ow4tvbMCyLTwLfhFd2ClVNJCjB?gv=true"
                    style={{ border: 0 }}
                    width="100%"
                    height="600"
                />
            </div>
        </div>
    );
}

// --- Success Screen ---

function SuccessScreen() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center py-8"
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 rounded-full bg-[#1FA09B] mx-auto mb-6 flex items-center justify-center shadow-lg shadow-[#1FA09B]/30"
            >
                <Check className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className="text-2xl font-black text-gray-900 mb-2">!ההרשמה הושלמה בהצלחה</h2>
            <p className="text-gray-500 max-w-sm mx-auto">
                החשבון שלך נוצר. כעת תוכל/י להוריד את האפליקציה ולהתחבר עם האימייל והסיסמה שבחרת.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                    href="https://apps.apple.com/app/reel-rep-plus/id6746387817"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-black text-white rounded-xl px-6 py-3 font-medium hover:bg-gray-800 transition-colors"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" /></svg>
                    App Store
                </a>
                <a
                    href="https://play.google.com/store/apps/details?id=com.reelrep.reelrepplus"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-black text-white rounded-xl px-6 py-3 font-medium hover:bg-gray-800 transition-colors"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" /></svg>
                    Google Play
                </a>
            </div>
        </motion.div>
    );
}

// --- Main Form ---

const LAST_STEP = TOTAL_STEPS - 1;

export function OnboardingForm() {
    const [step, setStep] = useState(0);
    const [direction, setDirection] = useState(1);
    const [form, setForm] = useState<FormData>(INITIAL_FORM);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [adminTaps, setAdminTaps] = useState(0);

    const validateStep = useCallback(
        (s: number): string | null => {
            switch (s) {
                case 0:
                    if (!form.name.trim()) return "נא להזין שם מלא";
                    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                        return "נא להזין אימייל תקין";
                    if (!form.phone.trim()) return "נא להזין מספר טלפון";
                    if (form.password.length < 6) return "הסיסמה חייבת להכיל לפחות 6 תווים";
                    return null;
                case 1:
                    if (!form.birthday) return "נא לבחור תאריך לידה";
                    return null;
                case 2:
                    if (!form.gender) return "נא לבחור מין";
                    return null;
                case 3:
                    return null; // height/weight has defaults
                case 4:
                    return null; // optional step
                case 5:
                    if (!form.goal) return "נא לבחור מטרה";
                    return null;
                case 6:
                    if (!form.activity) return "נא לבחור רמת פעילות";
                    if (!form.privacyApproved || !form.termsApproved || !form.healthApproved)
                        return "נא לאשר את כל התנאים";
                    return null;
                case 7:
                    return null;
                default:
                    return null;
            }
        },
        [form]
    );

    const goNext = useCallback(() => {
        const err = validateStep(step);
        if (err) {
            setError(err);
            return;
        }
        setError(null);
        setDirection(1);
        setStep((s) => Math.min(s + 1, LAST_STEP));
    }, [step, validateStep]);

    const goBack = useCallback(() => {
        setError(null);
        setDirection(-1);
        setStep((s) => Math.max(s - 1, 0));
    }, []);

    const handleSubmit = useCallback(async () => {
        const err = validateStep(LAST_STEP);
        if (err) {
            setError(err);
            return;
        }
        setError(null);
        setLoading(true);

        try {
            const birthdayDate = new Date(form.birthday);
            const age = new Date().getFullYear() - birthdayDate.getFullYear();

            const res = await fetch("/api/onboarding", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name.trim(),
                    email: form.email.trim().toLowerCase(),
                    phone: form.phone.trim(),
                    password: form.password,
                    birthday: form.birthday,
                    age,
                    gender: form.gender,
                    height: form.height,
                    weight: form.weight,
                    goal: form.goal,
                    activity: form.activity,
                    foodLimitations: form.foodLimitations.trim() || null,
                    usersNotes: form.usersNotes.trim() || null,
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "שגיאה בהרשמה");

            setSuccess(true);
        } catch (e: unknown) {
            const message = e instanceof Error ? e.message : "שגיאה לא צפויה";
            setError(message);
        } finally {
            setLoading(false);
        }
    }, [form, validateStep]);

    if (success) {
        return (
            <div className="w-full max-w-lg">
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-black/5 border border-white/60 p-6 sm:p-8">
                    <SuccessScreen />
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-lg">
            {/* Logo & Subtitle — tap logo 5x to skip to next step */}
            <div className="text-center mb-6">
                <button
                    type="button"
                    onClick={() => {
                        setAdminTaps((t) => {
                            const next = t + 1;
                            if (next >= 5) {
                                setError(null);
                                setDirection(1);
                                if (step < LAST_STEP) {
                                    setStep((s) => s + 1);
                                }
                                return 0;
                            }
                            return next;
                        });
                    }}
                    className="cursor-default focus:outline-none"
                    aria-hidden
                >
                    <Image
                        src="/images/logo-reelrep-plus-black.png"
                        alt="Reel Rep Plus"
                        width={300}
                        height={68}
                        className="mx-auto h-auto"
                        priority
                    />
                </button>
            </div>

            {/* Card */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-black/5 border border-white/60 p-6 sm:p-8">
                <p className="text-gray-500 text-2xl font-bold text-center mb-4">אנמנזה תזונתית ראשונית</p>
                <ProgressBar
                    current={step}
                    total={TOTAL_STEPS}
                    onDoubleClick={() => {
                        if (step < LAST_STEP) {
                            setError(null);
                            setDirection(1);
                            setStep((s) => s + 1);
                        }
                    }}
                />

                {/* Error */}
                <AnimatePresence mode="wait">
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm text-center"
                        >
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Steps */}
                <div className="relative overflow-hidden min-h-[380px]">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={step}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            {step === 0 && <StepAccount form={form} setForm={setForm} />}
                            {step === 1 && <StepBirthday form={form} setForm={setForm} />}
                            {step === 2 && <StepGender form={form} setForm={setForm} />}
                            {step === 3 && <StepHeightWeight form={form} setForm={setForm} />}
                            {step === 4 && <StepNutrition form={form} setForm={setForm} />}
                            {step === 5 && <StepGoal form={form} setForm={setForm} />}
                            {step === 6 && <StepActivity form={form} setForm={setForm} />}
                            {step === 7 && <StepBooking />}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-100">
                    {step > 0 && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={goBack}
                            className="gap-1.5"
                        >
                            <ChevronRight className="w-4 h-4" />
                            חזרה
                        </Button>
                    )}
                    <div className="flex-1" />
                    {step < LAST_STEP ? (
                        <Button
                            type="button"
                            onClick={goNext}
                            className="gap-1.5 bg-[#1FA09B] hover:bg-[#178A85] text-white shadow-md shadow-[#1FA09B]/25"
                        >
                            המשך
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                    ) : (
                        <Button
                            type="button"
                            onClick={handleSubmit}
                            disabled={loading}
                            className="gap-1.5 bg-[#1FA09B] hover:bg-[#178A85] text-white shadow-md shadow-[#1FA09B]/25 min-w-[120px]"
                        >
                            {loading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <>
                                    סיום הרשמה
                                    <Check className="w-4 h-4" />
                                </>
                            )}
                        </Button>
                    )}
                </div>
            </div>

            {/* Footer */}
            <p className="text-center text-xs text-gray-400 mt-4">
                © {new Date().getFullYear()} Reel Rep Plus. כל הזכויות שמורות.
            </p>
        </div>
    );
}
