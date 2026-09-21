import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const PESAPAL_API = 'https://pay.pesapal.com/v3'
const BASE_APP_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://kla-meet.vercel.app'
const CALLBACK_URL = `${BASE_APP_URL}/api/pesapal/callback`

type PaymentRequest = { email?: string; amount?: number; plan?: 'basic' | 'pro' }

function getPesapalKeys() {
  // Support BOTH naming conventions
  const key = process.env.PESAPAL_KEY || process.env.PESAPAL_CONSUMER_KEY
  const secret = process.env.PESAPAL_SECRET || process.env.PESAPAL_CONSUMER_SECRET
  return { key, secret }
}

async function pesapalToken() {
  const { key, secret } = getPesapalKeys()
  const response = await fetch(`${PESAPAL_API}/api/Auth/RequestToken`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ consumer_key: key, consumer_secret: secret }),
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok ||!data.token) throw new Error(data.message || 'PesaPal auth failed - check KEY/SECRET in Vercel')
  return data.token as string
}

async function getOrCreateIPN(token: string) {
  if (process.env.PESAPAL_IPN_ID) return process.env.PESAPAL_IPN_ID as string
  try {
    const listRes = await fetch(`${PESAPAL_API}/api/URLSetup/GetIpnList`, {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    })
    const list = await listRes.json()
    const existing = Array.isArray(list)? list.find((i: any) => i.url === CALLBACK_URL) : null
    if (existing?.ipn_id) return existing.ipn_id as string
  } catch {}
  const response = await fetch(`${PESAPAL_API}/api/URLSetup/RegisterIPN`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, Accept: 'application/json' },
    body: JSON.stringify({ url: CALLBACK_URL, ipn_notification_type: 'POST' }),
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok ||!data.ipn_id) throw new Error(data.message || 'Could not register IPN')
  console.log(`AUTO-CREATED IPN: ${data.ipn_id}`)
  return data.ipn_id as string
}

export async function POST(request: Request) {
  try {
    const { email, plan = 'pro', amount }: PaymentRequest = await request.json()
    if (!email ||!amount) return NextResponse.json({ error: 'email and amount required' }, { status: 400 })

    const { key, secret } = getPesapalKeys()
    if (!key ||!secret) {
      console.error('Missing keys:', { hasKey:!!key, hasSecret:!!secret, envs: Object.keys(process.env).filter(k=>k.includes('PESAPAL')) })
      return NextResponse.json({ error: `PesaPal is not configured - found: ${Object.keys(process.env).filter(k=>k.includes('PESAPAL')).join(', ')}` }, { status: 503 })
    }

    const token = await pesapalToken()
    const notificationId = await getOrCreateIPN(token)
    const usdAmount = plan === 'basic'? 5.41 : 13.51
    const merchantReference = `KLA-${Date.now()}-${Math.random().toString(36).slice(2,7)}`

    const response = await fetch(`${PESAPAL_API}/api/Transactions/SubmitOrderRequest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, Accept: 'application/json' },
      body: JSON.stringify({
        id: merchantReference,
        currency: 'USD',
        amount: usdAmount,
        description: `KLA-MEET Premium ${plan.toUpperCase()} - Worldwide`,
        callback_url: `${CALLBACK_URL}?email=${encodeURIComponent(email)}&plan=${plan}`,
        notification_id: notificationId,
        billing_address: { email_address: email, first_name: 'KLA', last_name: 'User' },
      }),
    })
    const order = await response.json().catch(() => ({}))
    if (!response.ok ||!order.redirect_url) return NextResponse.json({ error: order.message || 'Order failed', details: order }, { status: 502 })

    try {
      const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.EXPO_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
      await supabase.from('subscriptions').insert({ tx_ref: merchantReference, order_tracking_id: order.order_tracking_id, merchant_reference: merchantReference, email, amount_usd: usdAmount, amount: usdAmount, currency: 'USD', status: 'pending', provider: 'pesapal', plan })
    } catch(e){ console.warn('DB insert failed', e) }

    return NextResponse.json({ redirect_url: order.redirect_url, order_tracking_id: order.order_tracking_id })
  } catch (error) {
    console.error('PesaPal order error', error)
    return NextResponse.json({ error: error instanceof Error? error.message : 'Payment error' }, { status: 500 })
  }
}
