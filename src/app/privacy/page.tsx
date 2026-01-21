import Link from "next/link";

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-gray-50 py-12 px-6" dir="rtl">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-lg">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">מדיניות פרטיות</h1>

                <div className="prose prose-lg text-gray-700 space-y-6">
                    <p>
                        ברוכים הבאים לאפליקציית Reel Rep Plus. אנו מחויבים להגן על הפרטיות שלכם ולהבטיח שהמידע האישי שלכם מוגן.
                    </p>

                    <h2 className="text-xl font-bold text-gray-900 mt-8">איסוף מידע</h2>
                    <p>
                        אנו אוספים מידע שאתם מספקים לנו ישירות, כגון שם, כתובת דוא״ל, מספר טלפון ומידע בריאותי הקשור לתזונה ופעילות גופנית.
                    </p>

                    <h2 className="text-xl font-bold text-gray-900 mt-8">שימוש במידע</h2>
                    <p>
                        המידע שאנו אוספים משמש אותנו כדי לספק לכם את השירותים שלנו, לשפר את האפליקציה, ולשלוח לכם עדכונים והתראות רלוונטיות.
                    </p>

                    <h2 className="text-xl font-bold text-gray-900 mt-8">שיתוף מידע</h2>
                    <p>
                        אנו לא מוכרים או משכירים את המידע האישי שלכם לצדדים שלישיים. אנו עשויים לשתף מידע עם ספקי שירות שעוזרים לנו להפעיל את האפליקציה.
                    </p>

                    <h2 className="text-xl font-bold text-gray-900 mt-8">אבטחת מידע</h2>
                    <p>
                        אנו נוקטים באמצעי אבטחה סבירים כדי להגן על המידע האישי שלכם מפני גישה בלתי מורשית, שינוי או מחיקה.
                    </p>

                    <h2 className="text-xl font-bold text-gray-900 mt-8">יצירת קשר</h2>
                    <p>
                        לכל שאלה בנוגע למדיניות הפרטיות שלנו, אנא צרו קשר בכתובת: privacy@reelrep.plus
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
