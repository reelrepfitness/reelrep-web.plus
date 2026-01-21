"use client";

import React, { useCallback, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Food item interface
interface FoodItem {
    id: number;
    name: string;
    img_url: string;
    category: string;
    grams_per_single_item: string;
    items_per_unit: string;
    grams_per_cup: string;
    grams_per_tbsp: string;
    notes?: string | null;
}

// Static food items data
const FOOD_ITEMS: FoodItem[] = [
    { id: 488, name: "בשר בקר (אחרי בישול)", img_url: "https://res.cloudinary.com/dtffqhujt/image/upload/v1759759699/%D7%93%D7%A2%D7%93%D7%92%D7%93%D7%A2_oxtnze.webp", category: "חלבון", grams_per_single_item: "60", items_per_unit: "0", grams_per_cup: "0.5", grams_per_tbsp: "0", notes: "| טחון | עד 15% שומן |" },
    { id: 533, name: "פילה סלומון", img_url: "https://res.cloudinary.com/dtffqhujt/image/upload/v1758382393/%D7%A1%D7%9C%D7%9E%D7%95%D7%9F_chb0ee.png", category: "חלבון", grams_per_single_item: "96.2", items_per_unit: "0.5", grams_per_cup: "0", grams_per_tbsp: "0", notes: null },
    { id: 534, name: "פילה טונה", img_url: "https://res.cloudinary.com/dtffqhujt/image/upload/v1758382387/%D7%98%D7%95%D7%A0%D7%94_ubbssq.png", category: "חלבון", grams_per_single_item: "138.9", items_per_unit: "0.5", grams_per_cup: "0", grams_per_tbsp: "0", notes: null },
    { id: 571, name: "קוטג׳ 3%", img_url: "https://res.cloudinary.com/dtffqhujt/image/upload/v1758382407/%D7%A7%D7%95%D7%98%D7%92_ejobzr.png", category: "חלבון", grams_per_single_item: "259.7", items_per_unit: "1", grams_per_cup: "0", grams_per_tbsp: "13", notes: null },
    { id: 700, name: "טופו (אחרי בישול)", img_url: "https://res.cloudinary.com/dtffqhujt/image/upload/v1758382388/%D7%98%D7%95%D7%A4%D7%95_teljcp.png", category: "חלבון", grams_per_single_item: "130", items_per_unit: "0", grams_per_cup: "0.5", grams_per_tbsp: "0", notes: null },
    { id: 502, name: "אורז (אחרי בישול)", img_url: "https://res.cloudinary.com/dtffqhujt/image/upload/v1760619769/1_2_lovld5.webp", category: "פחמימה", grams_per_single_item: "92.3", items_per_unit: "0", grams_per_cup: "0", grams_per_tbsp: "5", notes: null },
    { id: 504, name: "אבוקדו", img_url: "https://res.cloudinary.com/dtffqhujt/image/upload/v1758405256/%D7%A4%D7%A9%D7%AA%D7%9F_2_hopiup.png", category: "שומן", grams_per_single_item: "75", items_per_unit: "0.5", grams_per_cup: "0", grams_per_tbsp: "0", notes: null },
    { id: 510, name: "פיסטוקים", img_url: "https://res.cloudinary.com/dtffqhujt/image/upload/v1758405260/%D7%97%D7%9E%D7%90%D7%94_17_shuaf5.png", category: "שומן", grams_per_single_item: "21.4", items_per_unit: "11", grams_per_cup: "0", grams_per_tbsp: "0", notes: null },
    { id: 515, name: "פקאן", img_url: "https://res.cloudinary.com/dtffqhujt/image/upload/v1758405253/%D7%97%D7%9E%D7%90%D7%94_14_sdqru7.png", category: "שומן", grams_per_single_item: "17.4", items_per_unit: "12", grams_per_cup: "0", grams_per_tbsp: "0", notes: null },
    { id: 517, name: "חמאת שקדים", img_url: "https://res.cloudinary.com/dtffqhujt/image/upload/v1758405277/%D7%97%D7%9E%D7%90%D7%94_12_zngxff.png", category: "שומן", grams_per_single_item: "19.5", items_per_unit: "0", grams_per_cup: "0", grams_per_tbsp: "1", notes: null },
    { id: 591, name: "אננס", img_url: "https://res.cloudinary.com/dtffqhujt/image/upload/v1758489337/%D7%AA%D7%A4%D7%95%D7%97_4_rg9y54.png", category: "פרי", grams_per_single_item: "160", items_per_unit: "0", grams_per_cup: "1", grams_per_tbsp: "0", notes: null },
    { id: 612, name: "קיווי", img_url: "https://res.cloudinary.com/dtffqhujt/image/upload/v1758489321/%D7%AA%D7%A4%D7%95%D7%97_9_jcknzy.png", category: "פרי", grams_per_single_item: "131.1", items_per_unit: "2", grams_per_cup: "0", grams_per_tbsp: "0", notes: "| בלי קליפה |" },
    { id: 614, name: "ענבים", img_url: "https://res.cloudinary.com/dtffqhujt/image/upload/v1758489324/%D7%AA%D7%A4%D7%95%D7%97_11_dpmksv.png", category: "פרי", grams_per_single_item: "115.9", items_per_unit: "23", grams_per_cup: "1", grams_per_tbsp: "0", notes: "(בלי חרצנים)" },
    { id: 616, name: "אבטיח", img_url: "https://res.cloudinary.com/dtffqhujt/image/upload/v1758489340/%D7%AA%D7%A4%D7%95%D7%97_2_ufdepd.png", category: "פרי", grams_per_single_item: "266.7", items_per_unit: "0", grams_per_cup: "2", grams_per_tbsp: "0", notes: "(בלי קליפה)" },
    { id: 631, name: "כרוב סגול", img_url: "https://res.cloudinary.com/dtffqhujt/image/upload/v1759760057/%D7%9B%D7%A8%D7%95%D7%91%D7%99%D7%AA_%D7%91%D7%A8%D7%95%D7%A7%D7%95%D7%9C%D7%99_4_vsjffz.webp", category: "ירק", grams_per_single_item: "112.9", items_per_unit: "0.25", grams_per_cup: "1.5", grams_per_tbsp: "0", notes: "| קצוץ |" },
    { id: 633, name: "גמבה", img_url: "https://res.cloudinary.com/dtffqhujt/image/upload/v1758489197/%D7%92%D7%9E%D7%91%D7%94_getlkr.png", category: "ירק", grams_per_single_item: "112.9", items_per_unit: "0.5", grams_per_cup: "0", grams_per_tbsp: "0", notes: null },
    { id: 635, name: "עגבניות שרי תמר", img_url: "https://res.cloudinary.com/dtffqhujt/image/upload/v1758489226/%D7%A9%D7%A8%D7%99_%D7%AA%D7%9E%D7%A8_rooqde.png", category: "ירק", grams_per_single_item: "116.7", items_per_unit: "15", grams_per_cup: "0", grams_per_tbsp: "0", notes: null },
    // New Carbs
    { id: 588, name: "פסטה (אחרי בישול)", img_url: "https://res.cloudinary.com/dtffqhujt/image/upload/v1760619771/5_3_hewiyo.webp", category: "פחמימה", grams_per_single_item: "75", items_per_unit: "0", grams_per_cup: "0", grams_per_tbsp: "5", notes: null },
    { id: 581, name: "תפוח אדמה", img_url: "https://res.cloudinary.com/dtffqhujt/image/upload/v1758386526/6_ka43ce.png", category: "פחמימה", grams_per_single_item: "155.8", items_per_unit: "1", grams_per_cup: "1", grams_per_tbsp: "0", notes: "| חתוך לקוביות |" },
    { id: 580, name: "בטטה", img_url: "https://res.cloudinary.com/dtffqhujt/image/upload/v1758386527/7_arx0si.png", category: "פחמימה", grams_per_single_item: "139.5", items_per_unit: "0.5", grams_per_cup: "1", grams_per_tbsp: "0", notes: "| חתוך לקוביות |" },
    { id: 579, name: "לחם קל", img_url: "https://res.cloudinary.com/dtffqhujt/image/upload/v1758386530/10_efeinn.png", category: "פחמימה", grams_per_single_item: "50", items_per_unit: "2", grams_per_cup: "0", grams_per_tbsp: "0", notes: null },
];

// Category mapping
const MACRO_TO_CATEGORY: Record<string, string> = {
    "מנת חלבון": "חלבון",
    "מנת פחמימה": "פחמימה",
    "מנת שומן": "שומן",
    "מנת ירק": "ירק",
    "מנת פרי": "פרי",
};

// Measurement methods helper
interface MeasurementMethod {
    icon: string;
    value: string;
    label: string;
}

const getUnitLabel = (item: FoodItem, value: number): string => {
    const name = item.name.toLowerCase();
    const isSingular = value === 1 || value === 0.5 || value === 0.25;
    if (name.includes("לחם") || name.includes("פיתה") || name.includes("טורטיה")) return isSingular ? "פרוסה" : "פרוסות";
    if (name.includes("קוטג") || name.includes("יוגורט") || name.includes("גבינה")) return isSingular ? "גביע" : "גביעים";
    return isSingular ? "יחידה" : "יחידות";
};

const getCupLabel = (value: number): string => (value === 1 || value === 0.5 || value === 0.25) ? "כוס" : "כוסות";
const getTbspLabel = (value: number): string => (value === 1 || value === 0.5 || value === 0.25) ? "כף" : "כפות";

const getMeasurementMethods = (item: FoodItem): MeasurementMethod[] => {
    const methods: MeasurementMethod[] = [];
    const formatValue = (v: string): string => {
        const num = parseFloat(v);
        if (num === 0.5) return "חצי";
        if (num === 0.25) return "רבע";
        return Math.round(num).toString();
    };

    if (item.grams_per_single_item && parseFloat(item.grams_per_single_item) > 0) {
        methods.push({ icon: "/images/grams.png", value: formatValue(item.grams_per_single_item), label: "גרם" });
    }
    if (item.items_per_unit && parseFloat(item.items_per_unit) > 0) {
        const val = parseFloat(item.items_per_unit);
        methods.push({ icon: "/images/unit.png", value: formatValue(item.items_per_unit), label: getUnitLabel(item, val) });
    }
    if (item.grams_per_cup && parseFloat(item.grams_per_cup) > 0) {
        const val = parseFloat(item.grams_per_cup);
        methods.push({ icon: "/images/cup.png", value: formatValue(item.grams_per_cup), label: getCupLabel(val) });
    }
    if (item.grams_per_tbsp && parseFloat(item.grams_per_tbsp) > 0) {
        const val = parseFloat(item.grams_per_tbsp);
        methods.push({ icon: "/images/tbsp.png", value: formatValue(item.grams_per_tbsp), label: getTbspLabel(val) });
    }
    return methods;
};

// Helper for Hebrew singular formatting
const formatMeasurementDisplay = (val: string, lab: string): { displayValue: string, displayLabel: string } => {
    if (val === "1") {
        if (lab === "כף") return { displayValue: "כף אחת", displayLabel: "" };
        if (lab === "כוס") return { displayValue: "כוס אחת", displayLabel: "" };
        if (lab === "יחידה") return { displayValue: "יחידה אחת", displayLabel: "" };
        if (lab === "פרוסה") return { displayValue: "פרוסה אחת", displayLabel: "" };
        if (lab === "גביע") return { displayValue: "גביע אחד", displayLabel: "" };
    }
    return { displayValue: val, displayLabel: lab };
};

// Mini food card
function InlineFoodCard({ item }: { item: FoodItem }) {
    const measurements = getMeasurementMethods(item);
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-shrink-0 w-[150px] bg-white rounded-xl shadow-lg p-3 text-center"
        >
            <div className="relative w-20 h-20 mx-auto mb-2">
                <Image src={item.img_url} alt={item.name} fill className="object-contain" />
            </div>
            <h4 className="text-xs font-bold text-gray-900 mb-2 line-clamp-2">{item.name}</h4>
            <div className="flex flex-col gap-1">
                {measurements.slice(0, 2).map((method, idx) => {
                    const { displayValue, displayLabel } = formatMeasurementDisplay(method.value, method.label);
                    return (
                        <div key={idx} className="flex items-center justify-center gap-1 bg-gray-100 px-2 py-1 rounded-full whitespace-nowrap">
                            <Image src={method.icon} alt={method.label} width={14} height={14} />
                            <span className="text-xs font-bold text-gray-700">{displayValue}</span>
                            {displayLabel && <span className="text-xs text-gray-500">{displayLabel}</span>}
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
}

interface MacroCardProps {
    title: string;
    subtitle: string;
    icon: string;
    gradientFrom: string;
    gradientTo: string;
    isCenter: boolean;
    isAdjacent: boolean;
}

function MacroCard({ title, subtitle, icon, gradientFrom, gradientTo, isCenter, isAdjacent }: MacroCardProps) {
    return (
        <div className="group relative w-[280px] h-[320px]">
            {/* Skewed gradient panels */}
            <span
                className={cn(
                    "absolute top-0 w-1/2 h-full rounded-2xl transform transition-all duration-500",
                    isCenter ? "skew-x-0 left-[15px] w-[calc(100%-70px)]" : "skew-x-[15deg] left-[40px]"
                )}
                style={{ background: `linear-gradient(315deg, ${gradientFrom}, ${gradientTo})` }}
            />
            <span
                className={cn(
                    "absolute top-0 w-1/2 h-full rounded-2xl transform blur-[30px] transition-all duration-500",
                    isCenter ? "skew-x-0 left-[15px] w-[calc(100%-70px)]" : "skew-x-[15deg] left-[40px]"
                )}
                style={{ background: `linear-gradient(315deg, ${gradientFrom}, ${gradientTo})` }}
            />

            {/* Animated blurs - only show when center */}
            {isCenter && (
                <span className="pointer-events-none absolute inset-0 z-10">
                    <span className="absolute top-[-40px] left-[40px] w-[80px] h-[80px] rounded-2xl opacity-100 bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.08)] animate-blob" />
                    <span className="absolute bottom-[-40px] right-[40px] w-[80px] h-[80px] rounded-2xl opacity-100 bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.08)] animate-blob animation-delay-1000" />
                </span>
            )}

            {/* Content */}
            <div className={cn(
                "relative z-20 p-[30px] bg-[rgba(255,255,255,0.05)] backdrop-blur-[10px] shadow-lg rounded-2xl text-white transition-all duration-500 h-full flex flex-col items-center justify-center text-center",
                isCenter && "left-[-20px]"
            )}>
                <Image
                    src={icon}
                    alt={title}
                    width={isCenter ? 180 : 140}
                    height={isCenter ? 180 : 140}
                    className="mb-4 drop-shadow-[0_15px_25px_rgba(0,0,0,0.4)] transition-all duration-300"
                />
                <h2 className="text-xl font-bold mb-0.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">{title}</h2>
                <h3 className="text-base text-white font-semibold mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">{subtitle}</h3>
            </div>
        </div>
    );
}

interface GradientMacroCardsProps {
    macros: {
        title: string;
        subtitle: string;
        examples?: string;
        icon: string;
        gradientFrom: string;
        gradientTo: string;
    }[];
}

export default function GradientMacroCards({ macros }: GradientMacroCardsProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % macros.length);
    }, [macros.length]);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + macros.length) % macros.length);
    };

    // Auto-advance disabled for now - can enable if wanted
    // useEffect(() => {
    //     const timer = setInterval(handleNext, 4000);
    //     return () => clearInterval(timer);
    // }, [handleNext]);

    // Get food items for current macro
    const currentMacro = macros[currentIndex];
    const category = MACRO_TO_CATEGORY[currentMacro?.title || ""];
    const foodItems = category ? FOOD_ITEMS.filter(item => item.category === category) : [];

    // Touch handling for swipe
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStart === null) return;
        const diff = touchStart - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            diff > 0 ? handleNext() : handlePrev();
        }
        setTouchStart(null);
    };

    return (
        <div className="py-10">
            {/* 3D Carousel */}
            <div
                className="relative w-full h-[420px] md:h-[450px] flex items-center justify-center"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {/* Carousel with perspective */}
                <div className="relative w-full h-full flex items-center justify-center [perspective:1000px]">
                    {macros.map((macro, index) => {
                        const offset = index - currentIndex;
                        const total = macros.length;
                        let pos = (offset + total) % total;
                        if (pos > Math.floor(total / 2)) {
                            pos = pos - total;
                        }

                        const isCenter = pos === 0;
                        const isAdjacent = Math.abs(pos) === 1;
                        const isFar = Math.abs(pos) === 2;

                        return (
                            <div
                                key={macro.title}
                                onClick={() => setCurrentIndex(index)}
                                className={cn(
                                    "absolute transition-all duration-500 ease-in-out cursor-pointer",
                                    "flex items-center justify-center"
                                )}
                                style={{
                                    transform: `
                                        translateX(${pos * 60}%) 
                                        scale(${isCenter ? 1 : isAdjacent ? 0.8 : 0.65})
                                        rotateY(${pos * -8}deg)
                                    `,
                                    zIndex: isCenter ? 10 : isAdjacent ? 5 : 1,
                                    opacity: isCenter ? 1 : isAdjacent ? 0.6 : 0.3,
                                    filter: isCenter ? 'blur(0px)' : isAdjacent ? 'blur(1px)' : 'blur(2px)',
                                }}
                            >
                                <MacroCard
                                    {...macro}
                                    isCenter={isCenter}
                                    isAdjacent={isAdjacent}
                                />
                            </div>
                        );
                    })}
                </div>

                {/* Navigation Buttons */}
                <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 rounded-full h-10 w-10 z-20 bg-gray-800/50 backdrop-blur-sm border-white/20 text-white hover:bg-gray-700/50 hover:text-white"
                    onClick={handlePrev}
                >
                    <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 rounded-full h-10 w-10 z-20 bg-gray-800/50 backdrop-blur-sm border-white/20 text-white hover:bg-gray-700/50 hover:text-white"
                    onClick={handleNext}
                >
                    <ChevronRight className="h-5 w-5" />
                </Button>
            </div>



            {/* Food examples */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentMacro?.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="mt-8"
                >
                    <p className="text-center text-xl md:text-2xl font-bold text-white mb-6" dir="rtl">
                        דוגמאות <span style={{ color: currentMacro?.gradientFrom, textShadow: '0 0 20px rgba(255,255,255,0.2)' }}>ל{currentMacro?.title}</span>
                    </p>
                    <div className="flex gap-3 overflow-x-auto pb-4 px-4 scrollbar-hide justify-start md:justify-center" dir="rtl">
                        {foodItems.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.08 }}
                            >
                                <InlineFoodCard item={item} />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Styles */}
            <style>{`
                @keyframes blob {
                    0%, 100% { transform: translateY(10px); }
                    50% { transform: translate(-10px); }
                }
                .animate-blob { animation: blob 2s ease-in-out infinite; }
                .animation-delay-1000 { animation-delay: -1s; }
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
}
