"use client"

import * as React from "react"
import * as motion from "motion/react-client"
import type { Variants } from "motion/react"
import Image from "next/image"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { X } from "lucide-react"

// Food item interface
interface FoodItem {
    id: number
    name: string
    img_url: string
    category: string
    grams_per_single_item: string
    items_per_unit: string
    grams_per_cup: string
    grams_per_tbsp: string
    notes?: string | null
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
]

// Measurement method
interface MeasurementMethod {
    icon: string
    value: string
    label: string
}

// Card animation variants
const cardVariants: Variants = {
    offscreen: {
        y: 300,
        opacity: 0,
    },
    onscreen: {
        y: 50,
        opacity: 1,
        rotate: -10,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.8,
        },
    },
}

// Helper to get random hue for gradient
const getRandomHue = (index: number) => {
    const hues = [
        { hueA: 30, hueB: 50 },   // orange
        { hueA: 100, hueB: 140 }, // green
        { hueA: 280, hueB: 320 }, // purple
        { hueA: 0, hueB: 20 },    // red
        { hueA: 200, hueB: 240 }, // blue
    ]
    return hues[index % hues.length]
}

const hue = (h: number) => `hsl(${h}, 70%, 50%)`

// Helper to get measurement methods for a food item
const getMeasurementMethods = (item: FoodItem): MeasurementMethod[] => {
    const methods: MeasurementMethod[] = []

    if (item.grams_per_single_item && parseFloat(item.grams_per_single_item) > 0) {
        methods.push({
            icon: "/images/grams.png",
            value: item.grams_per_single_item,
            label: "גרם"
        })
    }

    if (item.items_per_unit && parseFloat(item.items_per_unit) > 0) {
        methods.push({
            icon: "/images/unit.png",
            value: item.items_per_unit,
            label: "יחידות"
        })
    }

    if (item.grams_per_cup && parseFloat(item.grams_per_cup) > 0) {
        methods.push({
            icon: "/images/cup.png",
            value: item.grams_per_cup,
            label: "כוס"
        })
    }

    if (item.grams_per_tbsp && parseFloat(item.grams_per_tbsp) > 0) {
        methods.push({
            icon: "/images/tbsp.png",
            value: item.grams_per_tbsp,
            label: "כפות"
        })
    }

    return methods
}

interface FoodCardProps {
    item: FoodItem
    index: number
}

function FoodCard({ item, index }: FoodCardProps) {
    const { hueA, hueB } = getRandomHue(index)
    const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`
    const measurements = getMeasurementMethods(item)

    return (
        <motion.div
            style={{
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                paddingTop: 20,
                marginBottom: -100,
            }}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 0.8 }}
        >
            {/* Splash background */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background,
                    clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
                }}
            />
            {/* Card */}
            <motion.div
                variants={cardVariants}
                style={{
                    width: 260,
                    height: 340,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 20,
                    background: "#ffffff",
                    boxShadow:
                        "0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075), 0 0 4px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075), 0 0 16px hsl(0deg 0% 0% / 0.075)",
                    transformOrigin: "10% 60%",
                    padding: "20px",
                    textAlign: "center",
                }}
            >
                {/* Food Image */}
                <div className="relative w-24 h-24 mb-4">
                    <Image
                        src={item.img_url}
                        alt={item.name}
                        fill
                        className="object-contain"
                    />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>

                {/* Measurement methods */}
                <div className="flex flex-wrap gap-2 justify-center mt-2">
                    {measurements.map((method, idx) => (
                        <div key={idx} className="flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-full">
                            <Image
                                src={method.icon}
                                alt={method.label}
                                width={20}
                                height={20}
                                className="object-contain"
                            />
                            <span className="text-sm font-semibold text-gray-700">
                                {method.value}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Notes if available */}
                {item.notes && (
                    <p className="text-xs text-gray-500 mt-3">{item.notes}</p>
                )}
            </motion.div>
        </motion.div>
    )
}


// Category mapping from macro title to category
const MACRO_TO_CATEGORY: Record<string, string> = {
    "מנת חלבון": "חלבון",
    "מנת פחמימה": "פחמימה",
    "מנת שומן": "שומן",
    "מנת ירק": "ירק",
    "מנת פרי": "פרי",
}

interface MacroExamplesModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    macroTitle: string
    macroColor: string
}

export function MacroExamplesModal({
    open,
    onOpenChange,
    macroTitle,
}: MacroExamplesModalProps) {
    // Filter food items by category based on macro title
    const foodItems = React.useMemo(() => {
        const category = MACRO_TO_CATEGORY[macroTitle]
        if (!category) return []
        return FOOD_ITEMS.filter(item => item.category === category)
    }, [macroTitle])

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="max-w-[480px] max-h-[90vh] overflow-y-auto p-0 bg-transparent border-0 shadow-none"
                dir="rtl"
            >
                <DialogHeader className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm p-4 rounded-2xl mx-4 shadow-lg">
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-xl font-bold text-gray-900">
                            דוגמאות ל{macroTitle}
                        </DialogTitle>
                        <button
                            onClick={() => onOpenChange(false)}
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                        דוגמאות למזון מתאים
                    </p>
                </DialogHeader>

                <div
                    className="px-0 pb-[100px] pt-[20px]"
                    style={{
                        maxWidth: 480,
                        margin: "0 auto",
                    }}
                >
                    {foodItems.length > 0 ? (
                        foodItems.map((item, index) => (
                            <FoodCard key={item.id} item={item} index={index} />
                        ))
                    ) : (
                        <div className="text-center text-gray-500 py-10">
                            לא נמצאו דוגמאות
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
