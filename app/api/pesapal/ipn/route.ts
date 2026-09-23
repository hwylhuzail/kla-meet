export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const trackingId = req.nextUrl.searchParams.get('OrderTrackingId')
  const merchantRef = req.nextUrl.searchParams.get('OrderMerchantReference')
  console.log('IPN RECEIVED:', trackingId, merchantRef)
  // TODO: Here update your DB - Supabase/Firebase - set is_premium = true
  // Example if you use Supabase:
  // await supabase.from('profiles').update({ is_premium: true, premium_until: new Date(Date.now() + 30*24*60*60*1000) }).eq('email', email)
  return NextResponse.json({ status: 'ok' })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  console.log('IPN POST:', body)
  return NextResponse.json({ status: 'ok' })
}
