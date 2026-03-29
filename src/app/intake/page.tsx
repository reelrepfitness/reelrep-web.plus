import type { Metadata } from "next";
import IntakeForm from "./intake-form";

export const metadata: Metadata = {
    title: "שאלון היכרות | Reel Rep Plus",
    description: "שאלון היכרות ללקוחות חדשים לפני הפגישה הראשונה",
    robots: { index: false, follow: false },
};

export default function IntakePage() {
    return (
        <main className="min-h-dvh relative overflow-hidden bg-[#0a0a0a]" dir="rtl">
            {/* Background effects */}
            <div className="pointer-events-none fixed inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-900/10 via-transparent to-teal-800/5" />
                <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-teal-500/[0.04] blur-[100px]" />
            </div>

            <div className="relative z-10 flex flex-col items-center px-4 py-10">
                {/* Logo */}
                <img
                    src="/images/logo.png"
                    alt="Reel Rep Plus"
                    className="h-12 mb-2 object-contain"
                />
                <h1 className="text-2xl font-bold text-white mb-1">שאלון היכרות</h1>
                <p className="text-gray-400 text-sm mb-8">מלא/י את הפרטים לפני הפגישה הראשונה</p>

                <div className="w-full max-w-lg">
                    <IntakeForm />
                </div>
            </div>
        </main>
    );
}
