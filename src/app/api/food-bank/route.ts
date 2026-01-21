import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const limit = parseInt(searchParams.get('limit') || '10')

    if (!category) {
        return NextResponse.json(
            { error: 'Category parameter is required', items: [] },
            { status: 400 }
        )
    }

    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

        if (!supabaseUrl || !supabaseKey) {
            throw new Error('Supabase credentials not configured')
        }

        const response = await fetch(
            `${supabaseUrl}/rest/v1/food_bank?category=eq.${encodeURIComponent(category)}&limit=${limit}`,
            {
                headers: {
                    'apikey': supabaseKey,
                    'Authorization': `Bearer ${supabaseKey}`,
                    'Content-Type': 'application/json',
                }
            }
        )

        if (!response.ok) {
            const errorText = await response.text()
            console.error('Supabase error:', errorText)
            throw new Error(`Supabase returned ${response.status}: ${errorText}`)
        }

        const items = await response.json()

        return NextResponse.json({ items })
    } catch (error) {
        console.error('Error fetching food items:', error)
        return NextResponse.json(
            { error: 'Failed to fetch food items', items: [] },
            { status: 500 }
        )
    }
}
