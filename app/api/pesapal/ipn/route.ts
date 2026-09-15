import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    const orderTrackingId = body.OrderTrackingId || body.order_tracking_id || new URL(request.url).searchParams.get('OrderTrackingId')
    if (orderTrackingId && process.env.PESAPAL_CONSUMER_KEY && process.env.PESAPAL_CONSUMER_SECRET) {
      const auth = await fetch('https://pay.pesapal.com/v3/api/Auth/RequestToken', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ consumer_key: process.env.PESAPAL_CONSUMER_KEY, consumer_secret: process.env.PESAPAL_CONSUMER_SECRET }) })
      const authData = await auth.json()
      if (authData.token) await fetch(`https://pay.pesapal.com/v3/api/Transactions/GetTransactionStatus?orderTrackingId=${encodeURIComponent(orderTrackingId)}`, { headers: { Authorization: `Bearer ${authData.token}` } })
    }
    return NextResponse.json({ orderNotificationType: 'IPNCHANGE', orderTrackingId: orderTrackingId || null })
  } catch {
    return NextResponse.json({ orderNotificationType: 'IPNCHANGE' })
  }
}
