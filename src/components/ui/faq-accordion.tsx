"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const items = [
    {
        id: "1",
        title: "מה זה Reel Rep Plus?",
        content:
            "Reel Rep Plus היא אפליקציית תזונה חכמה שמאפשרת לכם לעקוב אחרי הצריכה היומית שלכם בקלות, עם סריקת ברקוד, ניתוח תמונות באמצעות AI, ומאגר מזון עצום.",
    },
    {
        id: "2",
        title: "האם צריך לשקול אוכל?",
        content:
            "לא! האפליקציה מציעה הערכות מדויקות לפי כמויות ביתיות כמו כפות, כוסות ויחידות. אתם יכולים להוסיף מזון בלי לשקול כלום.",
    },
    {
        id: "3",
        title: "איך עובד הסורק החכם?",
        content:
            "פשוט מצלמים את הצלחת או המוצר, והבינה המלאכותית שלנו מזהה את המרכיבים ומחשבת את הערכים התזונתיים באופן אוטומטי.",
    },
    {
        id: "4",
        title: "האם יש מתכונים באפליקציה?",
        content:
            "כן! מתכונים בריאים שמתעדכנים כל שבוע, עם ערכים תזונתיים מחושבים מראש ואפשרות להתאמה אישית.",
    },
    {
        id: "5",
        title: "מה כלול במנוי?",
        content:
            "המנוי כולל גישה מלאה לכל הפיצ'רים: סריקת ברקוד, ניתוח AI, מאגר מזון מלא, מתכונים ומדריכים.",
    },
    {
        id: "6",
        title: "האם יש תקופת ניסיון?",
        content:
            "כן! אתם מקבלים 14 ימים במתנה כדי להתנסות בכל הפיצ'רים. בנוסף, רוכשי המנוי השנתי מקבלים חודש נוסף חינם!",
    },
];

interface FaqAccordionProps {
    className?: string;
}

export function FaqAccordion({ className }: FaqAccordionProps) {
    return (
        <div className={cn("w-full max-w-3xl mx-auto", className)} dir="rtl">
            <Accordion type="single" defaultValue="1" collapsible className="w-full">
                {items.map((item) => (
                    <AccordionItem value={item.id} key={item.id} className="last:border-b border-gray-200">
                        <AccordionTrigger className="text-right pr-4 overflow-hidden text-gray-900 duration-200 hover:no-underline cursor-pointer data-[state=open]:text-teal-600 [&>svg]:hidden">
                            <div className="flex flex-1 items-center gap-4">
                                <span className="text-xs text-gray-400 font-mono">{item.id.padStart(2, '0')}</span>
                                <h3 className="text-lg md:text-xl font-bold text-right">
                                    {item.title}
                                </h3>
                            </div>
                        </AccordionTrigger>

                        <AccordionContent className="text-gray-600 pb-6 pr-12 text-right text-base">
                            {item.content}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}
