import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const PESAPAL_API = 'https://pay.pesapal.com/v3'

async function getToken() {
  const r = await fetch(`${PESAPAL_API}/api/Auth/RequestToken`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ consumer_key: process.env.PESAPAL_KEY, consumer_secret: process.env.PESAPAL_SECRET })
  })
  const d = await r.json()
  return d.token
}

export async function GET(req: NextRequest) {
  const trackingId = req.nextUrl.searchParams.get('OrderTrackingId')
  const email = req.nextUrl.searchParams.get('email')
  const plan = req.nextUrl.searchParams.get('plan') || 'pro'
  
  if (!trackingId) return NextResponse.redirect('https://kla-meet.vercel.app/premium?status=failed')

  try {
    const token = await getToken()
    const res = await fetch(`${PESAPAL_API}/api/Transactions/GetTransactionStatus?orderTrackingId=${trackingId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const statusData = await res.json()
    
    if (statusData.payment_status_description === 'Completed') {
      const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
      await supabase.from('subscriptions').update({ status: 'completed' }).eq('order_tracking_id', trackingId)
      await supabase.from('profiles').update({ is_premium: true, premium_plan: plan }).eq('email', email)
    }
    
    return NextResponse.redirect(`https://kla-meet.vercel.app/premium/success?status=${statusData.payment_status_description}&email=${email}`)
  } catch (e) {
    return NextResponse.redirect('https://kla-meet.vercel.app/premium?status=error')
  }
}

export async function POST(req: NextRequest) {
  // IPN webhook from Pesapal
  const body = await req.json()
  console.log('IPN received:', body)
  return NextResponse.json({ status: 'ok' })
}
