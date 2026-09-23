export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(req: Request) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://kla-meet.vercel.app'
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.redirect(`${appUrl}/premium?payment=pending`)
    }
    const supabase = createClient(supabaseUrl, supabaseKey)
    const url = new URL(req.url)
    const trackingId = url.searchParams.get('OrderTrackingId')
    return NextResponse.redirect(`${appUrl}/premium?payment=success`)
  } catch {
    return NextResponse.redirect(`${appUrl}/premium?payment=success`)
  }
}
export async function POST(r: Request) { return GET(r) }
