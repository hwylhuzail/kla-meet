import { NextResponse } from 'next/server'

const PESAPAL = 'https://pay.pesapal.com/v3/api'
const baseUrl = () => process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL || 'http://localhost:3000'

export async function POST(request: Request) {
  try {
    const { amount, plan, email, phone } = await request.json()
    if (!amount || !plan || !email || !phone) return NextResponse.json({ error: 'amount, plan, email and phone are required' }, { status: 400 })
    const auth = await fetch(`${PESAPAL}/Auth/RequestToken`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ consumer_key: process.env.PESAPAL_CONSUMER_KEY, consumer_secret: process.env.PESAPAL_CONSUMER_SECRET }) })
    const authData = await auth.json()
    if (!auth.ok || !authData.token) return NextResponse.json({ error: authData.message || 'PesaPal authentication failed' }, { status: 502 })
    const token = authData.token
    const ipn = await fetch(`${PESAPAL}/URLSetup/RegisterIPN`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ url: `${baseUrl()}/api/pesapal/ipn`, type: 'POST', ipn_notification_type: 'POST' }) })
    const ipnData = await ipn.json()
    if (!ipn.ok || !ipnData.ipn_id) return NextResponse.json({ error: ipnData.message || 'Could not register payment notification' }, { status: 502 })
    const order = await fetch(`${PESAPAL}/Transactions/SubmitOrderRequest`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ id: `KLA-${Date.now()}`, currency: 'UGX', amount: Number(amount), description: `KLA MEET ${plan}`, callback_url: `${baseUrl()}/premium/success`, notification_id: ipnData.ipn_id, billing_address: { email, phone, first_name: 'KLA', last_name: 'User', country_code: 'UG' } }) })
    const orderData = await order.json()
    if (!order.ok || !orderData.redirect_url) return NextResponse.json({ error: orderData.message || 'Could not create payment order' }, { status: 502 })
    return NextResponse.json({ redirect_url: orderData.redirect_url, tracking_id: orderData.order_tracking_id })
  } catch (error) {
    return NextResponse.json({ error: 'Payment service unavailable' }, { status: 500 })
  }
}
