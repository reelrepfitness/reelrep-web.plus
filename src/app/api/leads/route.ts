import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            name, email, phone,
            birthday, gender, height, weight,
            goal, activity, food_limitations, users_notes,
            turnstileToken,
        } = body;

        if (!name || !email) {
            return NextResponse.json(
                { error: "שם ואימייל הם שדות חובה" },
                { status: 400 }
            );
        }

        // --- Turnstile verification ---
        const turnstileSecret = process.env.CLOUDFLARE_TURNSTILE_SECRET;
        if (turnstileSecret) {
            if (!turnstileToken) {
                return NextResponse.json(
                    { error: "אימות CAPTCHA נדרש" },
                    { status: 403 }
                );
            }

            const verifyRes = await fetch(
                "https://challenges.cloudflare.com/turnstile/v0/siteverify",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        secret: turnstileSecret,
                        response: turnstileToken,
                    }),
                }
            );
            const verifyData = await verifyRes.json();

            if (!verifyData.success) {
                console.error("Turnstile verification failed:", verifyData);
                return NextResponse.json(
                    { error: "אימות CAPTCHA נכשל — אנא נסו שוב" },
                    { status: 403 }
                );
            }
        }

        // --- Supabase insert ---
        const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
        const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
        const resendApiKey = process.env.RESEND_API_KEY;
        const notificationEmail = process.env.NOTIFICATION_EMAIL;

        if (!supabaseUrl || !serviceRoleKey) {
            console.error("Missing Supabase credentials");
            return NextResponse.json(
                { error: "שגיאת שרת — אנא נסו שוב מאוחר יותר" },
                { status: 500 }
            );
        }

        const insertResponse = await fetch(`${supabaseUrl}/rest/v1/website_leads`, {
            method: "POST",
            headers: {
                apikey: serviceRoleKey,
                Authorization: `Bearer ${serviceRoleKey}`,
                "Content-Type": "application/json",
                Prefer: "return=minimal",
            },
            body: JSON.stringify({
                name,
                email,
                phone: phone || null,
                birthday: birthday || null,
                gender: gender || null,
                height: height || null,
                weight: weight || null,
                goal: goal || null,
                activity: activity || null,
                food_limitations: food_limitations || null,
                users_notes: users_notes || null,
            }),
        });

        if (!insertResponse.ok) {
            const errorText = await insertResponse.text();
            console.error("Lead insert error:", errorText);

            if (insertResponse.status === 409 || errorText.includes("duplicate") || errorText.includes("unique")) {
                return NextResponse.json(
                    { error: "כתובת האימייל כבר רשומה במערכת" },
                    { status: 409 }
                );
            }

            return NextResponse.json(
                { error: "שגיאה בשמירת הפרטים — אנא נסו שוב" },
                { status: 500 }
            );
        }

        // --- Email notifications ---
        if (resendApiKey) {
            const resend = new Resend(resendApiKey);

            if (notificationEmail) {
                const genderHe = gender === "male" ? "גבר" : gender === "female" ? "אישה" : "";
                await resend.emails.send({
                    from: "Reel Rep Plus <onboarding@resend.dev>",
                    to: notificationEmail,
                    subject: `ליד חדש: ${name}`,
                    html: `
                        <div dir="rtl" style="font-family: Arial, sans-serif; padding: 20px;">
                            <h2 style="color: #1FA09B;">ליד חדש נרשם!</h2>
                            <table style="border-collapse: collapse; margin-top: 16px;">
                                <tr><td style="padding: 8px; font-weight: bold;">שם:</td><td style="padding: 8px;">${name}</td></tr>
                                <tr><td style="padding: 8px; font-weight: bold;">אימייל:</td><td style="padding: 8px;">${email}</td></tr>
                                ${phone ? `<tr><td style="padding: 8px; font-weight: bold;">טלפון:</td><td style="padding: 8px;">${phone}</td></tr>` : ""}
                                ${genderHe ? `<tr><td style="padding: 8px; font-weight: bold;">מין:</td><td style="padding: 8px;">${genderHe}</td></tr>` : ""}
                                ${birthday ? `<tr><td style="padding: 8px; font-weight: bold;">תאריך לידה:</td><td style="padding: 8px;">${birthday}</td></tr>` : ""}
                                ${height ? `<tr><td style="padding: 8px; font-weight: bold;">גובה:</td><td style="padding: 8px;">${height} ס״מ</td></tr>` : ""}
                                ${weight ? `<tr><td style="padding: 8px; font-weight: bold;">משקל:</td><td style="padding: 8px;">${weight} ק״ג</td></tr>` : ""}
                                ${goal ? `<tr><td style="padding: 8px; font-weight: bold;">מטרה:</td><td style="padding: 8px;">${goal}</td></tr>` : ""}
                                ${activity ? `<tr><td style="padding: 8px; font-weight: bold;">רמת פעילות:</td><td style="padding: 8px;">${activity}</td></tr>` : ""}
                                ${food_limitations ? `<tr><td style="padding: 8px; font-weight: bold;">מגבלות:</td><td style="padding: 8px;">${food_limitations}</td></tr>` : ""}
                                ${users_notes ? `<tr><td style="padding: 8px; font-weight: bold;">הערות:</td><td style="padding: 8px;">${users_notes}</td></tr>` : ""}
                            </table>
                        </div>
                    `,
                });
            }

            await resend.emails.send({
                from: "Reel Rep Plus <onboarding@resend.dev>",
                to: email,
                template: {
                    id: "pre-sale",
                    variables: { name },
                },
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Lead submission error:", error);
        return NextResponse.json(
            { error: "שגיאה לא צפויה — אנא נסו שוב" },
            { status: 500 }
        );
    }
}
