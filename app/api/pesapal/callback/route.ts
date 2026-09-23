export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const PESAPAL_BASE = 'https://pay.pesapal.com/v3'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

async function getToken() {
  const res = await fetch(`${PESAPAL_BASE}/api/Auth/RequestToken`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ consumer_key: process.env.PESAPAL_CONSUMER_KEY!, consumer_secret: process.env.PESAPAL_CONSUMER_SECRET! }),
  })
  const data = await res.json()
  return data.token
}

export async function GET(req: NextRequest) {
  const trackingId = req.nextUrl.searchParams.get('OrderTrackingId')
  const merchantRef = req.nextUrl.searchParams.get('OrderMerchantReference')
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://kla-meet.vercel.app'
  try {
    const token = await getToken()
    const statusRes = await fetch(`${PESAPAL_BASE}/api/Transactions/GetTransactionStatus?orderTrackingId=${trackingId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    const s = await statusRes.json()
    if (s.payment_status_description === 'Completed' || s.status_code === 1) {
      const { data: order } = await supabase.from('pesapal_orders').select('*').eq('id', merchantRef).single()
      if (order) {
        await supabase.from('pesapal_orders').update({ status: 'completed' }).eq('id', merchantRef)
        await supabase.from('profiles').update({
          is_premium: true,
          premium_plan: order.plan,
          premium_until: new Date(Date.now() + 30*24*60*60*1000).toISOString()
        }).eq('email', order.email)
      }
      return NextResponse.redirect(`${appUrl}/premium?payment=success`)
    }
    return NextResponse.redirect(`${appUrl}/premium?payment=pending`)
  } catch {
    return NextResponse.redirect(`${appUrl}/premium?payment=success`)
  }
}
