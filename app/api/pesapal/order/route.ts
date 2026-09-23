export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const PESAPAL_BASE = 'https://pay.pesapal.com/v3'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

async function getToken() {
  const res = await fetch(`${PESAPAL_BASE}/api/Auth/RequestToken`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ consumer_key: process.env.PESAPAL_CONSUMER_KEY!, consumer_secret: process.env.PESAPAL_CONSUMER_SECRET! }),
  })
  const data = await res.json()
  if (!data.token) throw new Error(JSON.stringify(data))
  return data.token
}

async function getOrCreateIpnId(token: string, appUrl: string) {
  if (process.env.PESAPAL_IPN_ID) return process.env.PESAPAL_IPN_ID
  const res = await fetch(`${PESAPAL_BASE}/api/URLSetup/RegisterIPN`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ url: `${appUrl}/api/pesapal/ipn`, ipn_notification_type: 'GET' }),
  })
  const data = await res.json()
  return data.ipn_id || data.ipnId
}

export async function POST(req: NextRequest) {
  try {
    const { email, amount, plan } = await req.json()
    const token = await getToken()
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://kla-meet.vercel.app'
    const ipnId = await getOrCreateIpnId(token, appUrl)
    const amountInUGX = Math.round(Number(amount) * 3700)
    const merchantRef = `KLA-${Date.now()}`

    // SAVE PENDING ORDER IN SUPABASE
    await supabase.from('pesapal_orders').insert({ id: merchantRef, email, plan, amount: amountInUGX, status: 'pending' })

    const orderRes = await fetch(`${PESAPAL_BASE}/api/Transactions/SubmitOrderRequest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        id: merchantRef,
        currency: 'UGX',
        amount: amountInUGX,
        description: `${plan} - KLA Meet`,
        callback_url: `${appUrl}/api/pesapal/callback`,
        notification_id: ipnId,
        billing_address: { email_address: email, first_name: 'KLA', last_name: 'User' },
      }),
    })
    const orderData = await orderRes.json()
    if (!orderData.redirect_url) return NextResponse.json({ error: 'Order failed', details: orderData }, { status: 500 })

    // SAVE TRACKING ID
    await supabase.from('pesapal_orders').update({ tracking_id: orderData.order_tracking_id }).eq('id', merchantRef)

    return NextResponse.json({ redirect_url: orderData.redirect_url, orderTrackingId: orderData.order_tracking_id })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
export async function GET(){ return NextResponse.json({status:'ok'}) }
