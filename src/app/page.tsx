import { AuroraBackground } from "@/components/ui/aurora-background";
import { Highlight } from "@/components/ui/hero-highlight";
import GradientMacroCards from "@/components/ui/gradient-card-showcase";
import { ScreenshotCarousel } from "@/components/ui/screenshot-carousel";
import { PricingCards } from "@/components/ui/pricing-cards";
import { ScrollPinContainer } from "@/components/ui/scroll-3d-pin";
import { Meteors } from "@/components/ui/meteors";
import { AppStoreButton } from "@/components/ui/app-store-button";
import { PlayStoreButton } from "@/components/ui/play-store-button";
import { SubHeroText } from "@/components/ui/subhero-text";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { Award } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const MACROS = [
  {
    title: "מנת חלבון",
    subtitle: "כ-200 קלוריות למנה",
    examples: "לדוגמה: 3 חתיכות חזה עוף או גביע קוטג׳",
    icon: "/images/protein.png",
    gradientFrom: "#ef4444",
    gradientTo: "#dc2626",
  },
  {
    title: "מנת פחמימה",
    subtitle: "כ-120 קלוריות למנה",
    examples: "לדוגמה: 5 כפות אורז אחרי בישול או תפוח אדמה בינוני",
    icon: "/images/carbs.png",
    gradientFrom: "#facc15",
    gradientTo: "#eab308",
  },
  {
    title: "מנת שומן",
    subtitle: "כ-120 קלוריות למנה",
    examples: "לדוגמה: חצי אבוקדו או כף שמן זית",
    icon: "/images/fats.png",
    gradientFrom: "#22c55e",
    gradientTo: "#16a34a",
  },
  {
    title: "מנת ירק",
    subtitle: "כ-35 קלוריות למנה",
    examples: "לדוגמה: מלפפון אחד או 10 עגבניות שרי",
    icon: "/images/veg.png",
    gradientFrom: "#fdba74",
    gradientTo: "#fb923c",
  },
  {
    title: "מנת פרי",
    subtitle: "כ-80 קלוריות למנה",
    examples: "לדוגמה: כוס אננס חתוך או תפוח בינוני",
    icon: "/images/fruit.png",
    gradientFrom: "#a855f7",
    gradientTo: "#9333ea",
  },
];

const PRINCIPLES = [
  {
    icon: "/images/scale-icon.png",
    title: "לא שוקלים אוכל",
    description: "כל השקילות והחישובים נעשו מראש, כדי שלכם יהיה קל יותר."
  },
  {
    icon: "/images/knowledge-icon.png",
    title: "זה לא מידע, זה ידע.",
    description: "אפלקציה שנבנתה ע״י דיאטנים קליניים ובוגרי תואר ראשון בתזונה."
  },
  {
    icon: "/images/timeless-icon.png",
    title: "זה לא דיאטה",
    description: "דיאטה זה זמני.\nכאן נהפוך לך את זה לאורח חיים."
  }
];

const TESTIMONIALS = [
  {
    text: 'ירדתי 3.5 ק״ג בשבועיים הראשונים בלי לשקול אוכל אפילו פעם אחת. המערכת של המנות פשוט עובדת!',
    name: 'הילה מ.',
    role: 'בוחנת בטא',
  },
  {
    text: 'כדיאטנית, הייתי סקפטית. אבל הדיוק של המנות מרשים, והלקוחות שלי סוף סוף עומדים בתוכנית.',
    name: 'אורית ל.',
    role: 'דיאטנית קלינית',
  },
  {
    text: 'ה-AI שמזהה אוכל מתמונה חוסך לי 10 דקות בכל ארוחה. גם עם 3 ילדים אני מצליחה לעקוב.',
    name: 'מיכל ש.',
    role: 'אמא ל-3',
  }
];

// Hero Section
function HeroSection() {
  return (
    <AuroraBackground className="!h-auto min-h-[130vh] pb-20 relative z-30 rounded-b-[40px] overflow-hidden">
      <div className="relative z-10 flex flex-col items-center justify-start text-center px-6 w-full pt-[5vh]">
        <Image
          src="/images/logo-reelrep-plus-black.png"
          alt="Reel Rep Plus"
          width={1200}
          height={300}
          className="w-[280px] md:w-full md:max-w-4xl h-auto mb-6 md:mt-[25vh]"
        />
        <p className="text-gray-600 text-lg md:text-2xl mb-12" dir="rtl">
          זו לא דיאטה כי{" "}
          <Highlight className="text-white font-bold">
            השליטה היא בידיים שלך
          </Highlight>
        </p>

        {/* Phone mockup with scroll animation */}
        <ScrollPinContainer containerClassName="mt-8 relative z-30">
          <div className="relative">
            {/* Phone frame */}
            <div className="relative w-[280px] h-[560px] md:w-[320px] md:h-[640px] bg-gray-900 rounded-[3rem] p-2 shadow-2xl shadow-black/50">
              {/* Screen with actual app screenshot */}
              <div className="w-full h-full rounded-[2.5rem] overflow-hidden relative">
                <Image
                  src="/images/app-screenshot-6.png"
                  alt="Reel Rep Plus App"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </ScrollPinContainer>

      </div>
    </AuroraBackground >
  );
}

// App Download Section - Black background, overlapping with Hero
function AppDownloadSection() {
  return (
    <section className="bg-[#1c1c1c] relative z-20 pt-72 pb-20 -mt-48 md:-mt-56 overflow-hidden" dir="rtl">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-900/40 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-900/30 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3" />
      </div>

      <SubHeroText className="text-white mt-0 md:mt-0 relative z-10" />

      {/* App Icon */}
      <div className="mt-8 relative z-50 flex flex-col items-center">
        {/* Divider - White/Gray on black */}
        <div className="w-16 h-1 bg-zinc-700 rounded-full mb-8" />

        <div className="relative shine-effect rounded-[22%]">
          <Image
            src="/images/icon.png"
            alt="Reel Rep Icon"
            width={128}
            height={128}
            className="w-28 h-28 md:w-32 md:h-32 object-contain drop-shadow-lg relative z-10"
          />
        </div>
      </div>

      {/* Store Buttons */}
      <div className="flex flex-row gap-4 mt-8 md:mt-12 relative z-50 items-center justify-center">
        <AppStoreButton className="bg-white text-black hover:bg-gray-200 border-none" />
        <PlayStoreButton className="bg-white text-black hover:bg-gray-200 border-none" />
      </div>
    </section>
  );
}

// Doing It Right Section
function DoingItRightSection() {
  return (
    <section className="bg-white pt-8 pb-20 md:pt-20 px-6" dir="rtl">
      <div className="text-center mb-16">
        <div className="w-16 h-1 bg-teal-500 rounded-full mx-auto mb-4" />
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          הפעם, עושים את זה נכון.
        </h2>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {PRINCIPLES.map((item, index) => (
          <div key={index} className="w-full relative max-w-sm mx-auto">
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-teal-500 to-blue-500 transform scale-[0.80] opacity-50 blur-3xl" />
            <div className="group relative shadow-xl bg-white border border-gray-100 px-6 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-start items-center text-center transition-transform duration-300 hover:scale-105">

              <div className="mb-6 relative z-50">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={64}
                  height={64}
                  className="w-16 h-16 object-contain"
                />
              </div>

              <h3 className="font-bold text-xl text-gray-900 mb-4 relative z-50">
                {item.title}
              </h3>

              <p className="font-normal text-base text-gray-600 mb-4 relative z-50">
                {item.description}
              </p>

              {/* Meteor effect: Visible on mobile, hover only on desktop */}
              <div className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
                <Meteors number={20} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Macro Cards Section
function MacroSection() {
  return (
    <section className="bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 py-20 px-6" dir="rtl">
      <div className="text-center mb-12">
        <h2 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter" dir="ltr">
          the<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1FA09B] to-teal-400">.</span>macroz
        </h2>
        <p className="text-xl md:text-2xl text-white font-bold mb-12 max-w-2xl mx-auto">
          בזכותם אנחנו הופכים את ״התהליך״ <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1FA09B] to-teal-400">לאורח חיים</span>.
        </p>

        <div className="w-16 h-1 bg-teal-500 rounded-full mx-auto mb-4" />
      </div>
      <div className="max-w-6xl mx-auto">
        <GradientMacroCards macros={MACROS} />
      </div>
    </section>
  );
}

// App Screenshots Section
const APP_SCREENSHOTS = [
  { src: "/images/screenshots/home-screen.png", alt: "מסך הבית", icon: "/images/dashbaord-icon.png", description: "ממשק ברור וקל להבנה." },
  { src: "/images/screenshots/barcode-screen.png", alt: "סריקת ברקוד", icon: "/images/barcode-icon.png", description: "סרקו מוצרים בקלות" },
  { src: "/images/screenshots/guides-screen.png", alt: "מדריכים", icon: "/images/guides-icon.png", description: "טיפים ומדריכים כדי שלכם לא יהיה ספק." },
  { src: "/images/screenshots/recipe-screen.png", alt: "מתכונים", icon: "/images/recepies-icon.png", description: "מתכונים שמתעדכנים מדי שבוע" },
  { src: "/images/screenshots/food-bank-screen.png", alt: "מאגר מזון", icon: "/images/food-bank-icon.png", description: "מאגר מזון עצום." },
  { src: "/images/screenshots/ai-screen.png", alt: "ניתוח AI", icon: "/images/ai-scan-icon.png", description: "ניתוח צלחת באמצעות בינה מלאכותית" },
];

function AppScreenshotsSection() {
  return (
    <AuroraBackground className="!h-auto pt-20 pb-20" auroraClassName="opacity-30">
      <ScreenshotCarousel
        title={
          <>
            הצצה <span className="text-teal-400">לאפליקציה</span>
          </>
        }
        images={APP_SCREENSHOTS}
        className="py-0"
      />
    </AuroraBackground>
  );
}

// Testimonials Section
function TestimonialsSection() {
  return (
    <section className="bg-gray-50 pt-0 pb-20 px-6" dir="rtl">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
        מה הבוחנים שלנו אומרים?
      </h2>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400">★</span>
              ))}
            </div>
            <p className="text-gray-700 mb-4 leading-relaxed">{item.text}</p>
            <div className="border-t pt-4">
              <p className="font-bold text-gray-900">{item.name}</p>
              <p className="text-gray-500 text-sm">{item.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Pricing Section
function PricingSection() {
  return <PricingCards />;
}

// FAQ Section
function FaqSection() {
  return (
    <section className="bg-white py-20 px-6" dir="rtl">
      <div className="text-center mb-12">
        <div className="w-16 h-1 bg-teal-500 rounded-full mx-auto mb-4" />
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          שאלות נפוצות
        </h2>
      </div>
      <FaqAccordion />
    </section>
  );
}



// Footer
function Footer() {
  return (
    <footer className="bg-gray-900 py-8 px-6" dir="rtl">
      <div className="max-w-4xl mx-auto text-center">
        <Image
          src="/images/logo-reelrepplus-white.png"
          alt="Reel Rep Plus"
          width={150}
          height={50}
          className="mx-auto mb-4"
        />

        {/* Store Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <a href="#" aria-label="Download on App Store">
            <AppStoreButton className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-700" />
          </a>
          <a href="#" aria-label="Get it on Google Play">
            <PlayStoreButton className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-700" />
          </a>
        </div>

        <div className="flex justify-center gap-6 text-gray-400 text-sm mb-4">
          <Link href="/privacy" className="hover:text-white transition-colors">מדיניות פרטיות</Link>
          <Link href="/terms" className="hover:text-white transition-colors">תנאי שימוש</Link>
        </div>
        <p className="text-gray-500 text-sm">© 2024 Reel Rep Plus. כל הזכויות שמורות.</p>
      </div>
    </footer>
  );
}

// Main Page
export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AppDownloadSection />
      <DoingItRightSection />
      <MacroSection />
      <AppScreenshotsSection />
      <TestimonialsSection />
      <FaqSection />
      <PricingSection />
      <Footer />
    </main>
  );
}
