import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, phone } = body;

        if (!name || !email) {
            return NextResponse.json(
                { error: "שם ואימייל הם שדות חובה" },
                { status: 400 }
            );
        }

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

        // Insert lead into Supabase
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
            }),
        });

        if (!insertResponse.ok) {
            const errorText = await insertResponse.text();
            console.error("Lead insert error:", errorText);

            // Handle duplicate email
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

        // Send emails via Resend
        if (resendApiKey) {
            const resend = new Resend(resendApiKey);

            // Admin notification email
            if (notificationEmail) {
                await resend.emails.send({
                    from: "Reel Rep Plus <onboarding@resend.dev>",
                    to: notificationEmail,
                    subject: `ליד חדש: ${name}`,
                    html: `
                        <div dir="rtl" style="font-family: Arial, sans-serif; padding: 20px;">
                            <h2 style="color: #1FA09B;">ליד חדש נרשם לרשימת ההמתנה!</h2>
                            <table style="border-collapse: collapse; margin-top: 16px;">
                                <tr><td style="padding: 8px; font-weight: bold;">שם:</td><td style="padding: 8px;">${name}</td></tr>
                                <tr><td style="padding: 8px; font-weight: bold;">אימייל:</td><td style="padding: 8px;">${email}</td></tr>
                                ${phone ? `<tr><td style="padding: 8px; font-weight: bold;">טלפון:</td><td style="padding: 8px;">${phone}</td></tr>` : ""}
                            </table>
                        </div>
                    `,
                });
            }

            // User confirmation email via Resend template
            await resend.emails.send({
                from: "Reel Rep Plus <onboarding@resend.dev>",
                to: email,
                template: {
                    id: "pre-sale",
                    variables: {
                        name: name,
                    },
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
