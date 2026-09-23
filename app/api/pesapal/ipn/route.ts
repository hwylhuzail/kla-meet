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
  try {
    const trackingId = req.nextUrl.searchParams.get('OrderTrackingId')
    const merchantRef = req.nextUrl.searchParams.get('OrderMerchantReference')
    const token = await getToken()

    const statusRes = await fetch(`${PESAPAL_BASE}/api/Transactions/GetTransactionStatus?orderTrackingId=${trackingId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    const statusData = await statusRes.json()
    console.log('IPN STATUS:', statusData)

    if (statusData.payment_status_description === 'Completed' || statusData.status_code === 1) {
      // GET ORDER TO FIND EMAIL
      const { data: order } = await supabase.from('pesapal_orders').select('*').eq('id', merchantRef).single()
      if (order) {
        await supabase.from('pesapal_orders').update({ status: 'completed' }).eq('id', merchantRef)
        // ACTIVATE PREMIUM FOR 30 DAYS
        await supabase.from('profiles').update({
          is_premium: true,
          premium_plan: order.plan,
          premium_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        }).eq('email', order.email)
        console.log('PREMIUM ACTIVATED for', order.email)
      }
    }
    return NextResponse.json({ status: 'ok' })
  } catch (e) {
    console.error('IPN ERROR', e)
    return NextResponse.json({ status: 'error' })
  }
}
export async function POST(req: NextRequest){ return GET(req) }
