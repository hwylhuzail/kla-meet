import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { amount, phone } = await request.json()
    if (!amount || !phone) return NextResponse.json({ error: 'amount and phone are required' }, { status: 400 })
    const reference = crypto.randomUUID()
    const base = process.env.AIRTEL_BASE_URL || 'https://openapiuat.airtel.africa'
    const auth = await fetch(`${base}/auth/oauth2/token`, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded', Authorization: `Basic ${Buffer.from(`${process.env.AIRTEL_CLIENT_ID}:${process.env.AIRTEL_CLIENT_SECRET}`).toString('base64')}` }, body: 'grant_type=client_credentials' })
    const authData = await auth.json()
    if (!auth.ok || !authData.access_token) return NextResponse.json({ error: 'Airtel authentication failed' }, { status: 502 })
    const payerPhone = String(phone).replace(/^\+/, '').replace(/^0/, '256')
    const payment = await fetch(`${base}/merchant/v1/payments/`, { method: 'POST', headers: { Authorization: `Bearer ${authData.access_token}`, 'Content-Type': 'application/json', 'X-Country': process.env.AIRTEL_COUNTRY || 'UG', 'X-Currency': 'UGX' }, body: JSON.stringify({ reference: `KLA-${Date.now()}`, subscriber: { country: 'UG', currency: 'UGX', msisdn: payerPhone }, transaction: { amount: Number(amount), country: 'UG', currency: 'UGX', id: reference } }) })
    if (!payment.ok) return NextResponse.json({ error: 'Airtel payment request failed' }, { status: 502 })
    return NextResponse.json({ reference, message: 'Airtel payment request sent' })
  } catch { return NextResponse.json({ error: 'Airtel service unavailable' }, { status: 500 }) }
}
