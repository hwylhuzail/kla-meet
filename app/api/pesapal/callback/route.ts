import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const PESAPAL_API = 'https://pay.pesapal.com/v3/api'
const CALLBACK_PATH = '/profile?payment=success'

async function checkPayment(orderTrackingId: string) {
  if (!process.env.PESAPAL_KEY || !process.env.PESAPAL_SECRET) throw new Error('PesaPal is not configured')
  const auth = await fetch(`${PESAPAL_API}/Auth/RequestToken`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ consumer_key: process.env.PESAPAL_KEY, consumer_secret: process.env.PESAPAL_SECRET }) })
  const authData = await auth.json().catch(() => ({}))
  if (!auth.ok || !authData.token) throw new Error(authData.message || 'PesaPal authentication failed')
  const response = await fetch(`${PESAPAL_API}/Transactions/GetTransactionStatus?orderTrackingId=${encodeURIComponent(orderTrackingId)}`, { headers: { Authorization: `Bearer ${authData.token}` } })
  const status = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(status.message || 'Could not check payment status')
  return status
}

async function processPayment(orderTrackingId: string) {
  const status = await checkPayment(orderTrackingId)
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
  const completed = String(status.payment_status_description || status.payment_status || status.status || '').toUpperCase() === 'COMPLETED'
  await supabase.from('subscriptions').update({ status: completed ? 'active' : String(status.payment_status_description || status.payment_status || status.status || 'pending').toLowerCase() }).eq('order_tracking_id', orderTrackingId)
  if (!completed) return false
  const { data: subscription } = await supabase.from('subscriptions').select('email').eq('order_tracking_id', orderTrackingId).maybeSingle()
  if (subscription?.email) await supabase.from('profiles').update({ is_premium: true, premium_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() }).eq('email', subscription.email)
  return true
}

function trackingId(request: Request) {
  const url = new URL(request.url)
  return url.searchParams.get('OrderTrackingId') || url.searchParams.get('orderTrackingId') || url.searchParams.get('order_tracking_id')
}

export async function GET(request: Request) {
  const orderTrackingId = trackingId(request)
  if (!orderTrackingId) return NextResponse.redirect(new URL('/profile?payment=error', request.url))
  try {
    await processPayment(orderTrackingId)
    return NextResponse.redirect(new URL(CALLBACK_PATH, request.url))
  } catch (error) {
    console.error('PesaPal callback error', error)
    return NextResponse.redirect(new URL('/profile?payment=error', request.url))
  }
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const orderTrackingId = body.OrderTrackingId || body.orderTrackingId || body.order_tracking_id || trackingId(request)
  if (orderTrackingId) {
    try { await processPayment(orderTrackingId) } catch (error) { console.error('PesaPal IPN error', error) }
  }
  return NextResponse.json({ orderNotificationType: 'IPNCHANGE', orderTrackingId: orderTrackingId || null })
}
