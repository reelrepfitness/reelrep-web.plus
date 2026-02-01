import Link from "next/link";

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-gray-50 py-12 px-6" dir="rtl">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-lg">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">תנאי שימוש</h1>

                <div className="prose prose-lg text-gray-700 space-y-6">
                    <p>
                        ברוכים הבאים לאפליקציית Reel Rep Plus. השימוש באפליקציה כפוף לתנאים הבאים.
                    </p>

                    <h2 className="text-xl font-bold text-gray-900 mt-8">קבלת התנאים</h2>
                    <p>
                        בשימוש באפליקציה, אתם מסכימים לתנאי שימוש אלה. אם אינכם מסכימים לתנאים, אנא הימנעו משימוש באפליקציה.
                    </p>

                    <h2 className="text-xl font-bold text-gray-900 mt-8">השירותים</h2>
                    <p>
                        Reel Rep Plus מציעה כלים לניהול תזונה ומעקב אחר צריכת מאקרו נוטריאנטים. המידע הניתן באפליקציה הוא להנחיה כללית בלבד ואינו מהווה ייעוץ רפואי.
                    </p>

                    <h2 className="text-xl font-bold text-gray-900 mt-8">מנויים ותשלומים</h2>
                    <p>
                        מנוי שנתי עולה 360₪ ומתחדש אוטומטית. ניתן לבטל את המנוי בכל עת דרך הגדרות החשבון.
                    </p>

                    <h2 className="text-xl font-bold text-gray-900 mt-8">הגבלת אחריות</h2>
                    <p>
                        השירותים ניתנים "כמות שהם" ללא אחריות מפורשת או משתמעת. אנו לא אחראים לתוצאות השימוש באפליקציה.
                    </p>

                    <h2 className="text-xl font-bold text-gray-900 mt-8">יצירת קשר</h2>
                    <p>
                        לכל שאלה בנוגע לתנאי השימוש, אנא צרו קשר: ivan@reelrep.com
                    </p>
                </div>

                <div className="mt-8 pt-6 border-t">
                    <Link href="/" className="text-teal-600 hover:text-teal-700 font-medium">
                        ← חזרה לעמוד הראשי
                    </Link>
                </div>
            </div>
        </main>
    );
}
