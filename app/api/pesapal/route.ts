import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const PESAPAL_API = 'https://pay.pesapal.com/v3/api'
const CALLBACK_URL = 'https://kla-meet.vercel.app/api/pesapal/callback'

type PaymentRequest = { email?: string; phone?: string; currency?: 'UGX' | 'USD'; amount?: number }

async function pesapalToken() {
  const response = await fetch(`${PESAPAL_API}/Auth/RequestToken`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ consumer_key: process.env.PESAPAL_KEY, consumer_secret: process.env.PESAPAL_SECRET }),
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok || !data.token) throw new Error(data.message || 'PesaPal authentication failed')
  return data.token as string
}

async function ipnId(token: string) {
  if (process.env.PESAPAL_IPN_ID) return process.env.PESAPAL_IPN_ID
  const response = await fetch(`${PESAPAL_API}/URLSetup/RegisterIPN`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ url: CALLBACK_URL, ipn_notification_type: 'POST' }),
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok || !data.ipn_id) throw new Error(data.message || 'Could not register PesaPal IPN')
  console.info(`PesaPal IPN registered. Save PESAPAL_IPN_ID=${data.ipn_id}`)
  return data.ipn_id as string
}

export async function POST(request: Request) {
  try {
    const { email, phone, currency = 'UGX', amount }: PaymentRequest = await request.json()
    if (!email || !phone || !amount || !['UGX', 'USD'].includes(currency)) return NextResponse.json({ error: 'email, phone, currency and amount are required' }, { status: 400 })
    if (!process.env.PESAPAL_KEY || !process.env.PESAPAL_SECRET) return NextResponse.json({ error: 'PesaPal is not configured' }, { status: 503 })
    const token = await pesapalToken()
    const notificationId = await ipnId(token)
    const merchantReference = `kla-${Date.now()}`
    const response = await fetch(`${PESAPAL_API}/Transactions/SubmitOrderRequest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        id: merchantReference,
        currency,
        amount: Number(amount),
        description: 'KLA-MEET Premium',
        callback_url: `${CALLBACK_URL}?email=${encodeURIComponent(email)}`,
        notification_id: notificationId,
        billing_address: { email, phone_number: phone, first_name: 'KLA', last_name: 'User' },
      }),
    })
    const order = await response.json().catch(() => ({}))
    if (!response.ok || !order.redirect_url) return NextResponse.json({ error: order.message || 'Could not create PesaPal order' }, { status: 502 })
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
    await supabase.from('subscriptions').insert({ tx_ref: merchantReference, order_tracking_id: order.order_tracking_id, merchant_reference: merchantReference, email, phone, amount: currency === 'UGX' ? Number(amount) : Math.round(Number(amount) * 3700), amount_usd: currency === 'USD' ? Number(amount) : Number(amount) / 3700, currency, status: 'pending', provider: 'pesapal' })
    return NextResponse.json({ redirect_url: order.redirect_url, order_tracking_id: order.order_tracking_id })
  } catch (error) {
    console.error('PesaPal order error', error)
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Payment service unavailable' }, { status: 500 })
  }
}
