import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            name,
            email,
            phone,
            password,
            birthday,
            age,
            gender,
            height,
            weight,
            goal,
            activity,
            foodLimitations,
            usersNotes,
        } = body;

        // Validate required fields
        if (!name || !email || !password || !birthday || !gender || !goal || !activity) {
            return NextResponse.json(
                { error: "חסרים שדות חובה" },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { error: "הסיסמה חייבת להכיל לפחות 6 תווים" },
                { status: 400 }
            );
        }

        const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
        const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!supabaseUrl || !serviceRoleKey) {
            console.error("Missing Supabase credentials");
            return NextResponse.json(
                { error: "שגיאת שרת — אנא נסו שוב מאוחר יותר" },
                { status: 500 }
            );
        }

        // 1. Create Auth user via Supabase Admin API
        const authResponse = await fetch(`${supabaseUrl}/auth/v1/admin/users`, {
            method: "POST",
            headers: {
                apikey: serviceRoleKey,
                Authorization: `Bearer ${serviceRoleKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
                email_confirm: true,
            }),
        });

        if (!authResponse.ok) {
            const authError = await authResponse.json();
            console.error("Auth creation error:", authError);

            // Handle duplicate email
            if (authResponse.status === 422 || authError?.msg?.includes("already")) {
                return NextResponse.json(
                    { error: "כתובת האימייל כבר קיימת במערכת" },
                    { status: 409 }
                );
            }

            return NextResponse.json(
                { error: authError?.msg || "שגיאה ביצירת חשבון" },
                { status: authResponse.status }
            );
        }

        const authData = await authResponse.json();
        const userId = authData.id;

        if (!userId) {
            return NextResponse.json(
                { error: "שגיאה ביצירת חשבון — לא התקבל מזהה משתמש" },
                { status: 500 }
            );
        }

        // 2. Insert profile row
        const profilePayload = {
            user_id: userId,
            email,
            name,
            phone_number: phone || null,
            birthday,
            age: age?.toString() || null,
            gender,
            body_weight: weight,
            height,
            goal,
            activity,
            food_limitations: foodLimitations || null,
            users_notes: usersNotes || null,
            privacy_approved: true,
            terms_of_use_approved: true,
            health_policy_approved: true,
            "is_active?": true,
            with_ivan: true,
            updated_at: new Date().toISOString(),
        };

        const profileResponse = await fetch(`${supabaseUrl}/rest/v1/profiles`, {
            method: "POST",
            headers: {
                apikey: serviceRoleKey,
                Authorization: `Bearer ${serviceRoleKey}`,
                "Content-Type": "application/json",
                Prefer: "return=minimal",
            },
            body: JSON.stringify(profilePayload),
        });

        if (!profileResponse.ok) {
            const profileError = await profileResponse.text();
            console.error("Profile insert error:", profileError);

            // Try to clean up the auth user if profile insert fails
            await fetch(`${supabaseUrl}/auth/v1/admin/users/${userId}`, {
                method: "DELETE",
                headers: {
                    apikey: serviceRoleKey,
                    Authorization: `Bearer ${serviceRoleKey}`,
                },
            });

            return NextResponse.json(
                { error: "שגיאה בשמירת הפרופיל — אנא נסו שוב" },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Onboarding error:", error);
        return NextResponse.json(
            { error: "שגיאה לא צפויה — אנא נסו שוב" },
            { status: 500 }
        );
    }
}
