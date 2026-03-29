import type { Metadata } from "next";
import { OnboardingForm } from "./onboarding-form";

export const metadata: Metadata = {
    title: "הרשמה | Reel Rep Plus",
    description: "טופס הרשמה ללקוחות חדשים של Reel Rep Plus",
    robots: { index: false, follow: false },
    openGraph: {
        title: "הרשמה | Reel Rep Plus",
        description: "טופס הרשמה ללקוחות חדשים של Reel Rep Plus",
        images: [{ url: "/images/plus-social-share.png" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "הרשמה | Reel Rep Plus",
        description: "טופס הרשמה ללקוחות חדשים של Reel Rep Plus",
        images: ["/images/plus-social-share.png"],
    },
};

export default function OnboardingPage() {
    return (
        <main className="min-h-dvh relative overflow-hidden bg-[#f8fafa]">
            {/* Subtle gradient background */}
            <div className="pointer-events-none fixed inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1FA09B]/5 via-transparent to-[#1FA09B]/8" />
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#1FA09B]/[0.04] blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-[#1FA09B]/[0.06] blur-[80px]" />
            </div>

            <div className="relative z-10 flex min-h-dvh items-center justify-center px-4 py-8 sm:py-12">
                <OnboardingForm />
            </div>
        </main>
    );
}
