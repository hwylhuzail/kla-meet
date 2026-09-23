export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'

const PESAPAL_BASE = 'https://pay.pesapal.com/v3'

async function getToken() {
  const key = process.env.PESAPAL_CONSUMER_KEY!
  const secret = process.env.PESAPAL_CONSUMER_SECRET!
  const res = await fetch(`${PESAPAL_BASE}/api/Auth/RequestToken`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ consumer_key: key, consumer_secret: secret }),
  })
  const data = await res.json()
  if (!data.token) throw new Error('Auth failed: ' + JSON.stringify(data))
  return data.token
}

async function getOrCreateIpnId(token: string, appUrl: string) {
  // If user already set IPN ID, use it
  if (process.env.PESAPAL_IPN_ID) return process.env.PESAPAL_IPN_ID

  // Auto-create IPN
  const ipnUrl = `${appUrl}/api/pesapal/ipn`
  console.log('Auto-creating IPN for:', ipnUrl)
  
  const res = await fetch(`${PESAPAL_BASE}/api/URLSetup/RegisterIPN`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      url: ipnUrl,
      ipn_notification_type: 'GET',
    }),
  })
  const data = await res.json()
  console.log('IPN create response:', data)
  
  // Pesapal returns { ipn_id: "..." } or { ipnId: "..." }
  return data.ipn_id || data.ipnId || data.ipnID
}

export async function POST(req: NextRequest) {
  try {
    const { email, amount, plan, currency = 'USD' } = await req.json()
    if (!email || !amount) {
      return NextResponse.json({ error: 'Missing email or amount' }, { status: 400 })
    }

    const token = await getToken()
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://kla-meet.vercel.app'
    const ipnId = await getOrCreateIpnId(token, appUrl)

    if (!ipnId) {
      return NextResponse.json({ error: 'Failed to get IPN ID. Check Pesapal dashboard.' }, { status: 500 })
    }

    const orderRes = await fetch(`${PESAPAL_BASE}/api/Transactions/SubmitOrderRequest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: `KLA-${Date.now()}`,
        currency,
        amount: Number(amount),
        description: `${plan || 'Premium'} - KLA Meet`,
        callback_url: `${appUrl}/api/pesapal/callback`,
        notification_id: ipnId,
        billing_address: {
          email_address: email,
          first_name: 'KLA',
          last_name: 'User',
        },
      }),
    })

    const orderData = await orderRes.json()
    
    if (!orderData.redirect_url) {
      return NextResponse.json({ error: 'Pesapal order failed', details: orderData, usedIpnId: ipnId }, { status: 500 })
    }

    return NextResponse.json({
      redirect_url: orderData.redirect_url,
      orderTrackingId: orderData.order_tracking_id,
      ipnIdUsed: ipnId,
    })
    
  } catch (e: any) {
    console.error('PESAPAL ERROR:', e)
    return NextResponse.json({ error: e.message || 'Server error' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ status: 'ok', message: 'Pesapal order endpoint - use POST' })
}
