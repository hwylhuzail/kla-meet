export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'

const PESAPAL_BASE = 'https://pay.pesapal.com/v3'

async function getToken() {
  const res = await fetch(`${PESAPAL_BASE}/api/Auth/RequestToken`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      consumer_key: process.env.PESAPAL_CONSUMER_KEY!,
      consumer_secret: process.env.PESAPAL_CONSUMER_SECRET!,
    }),
  })
  const data = await res.json()
  return data.token
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const trackingId = url.searchParams.get('OrderTrackingId')
  const merchantRef = url.searchParams.get('OrderMerchantReference')
  
  if (!trackingId) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/premium?payment=failed`)
  }

  try {
    const token = await getToken()
    const statusRes = await fetch(`${PESAPAL_BASE}/api/Transactions/GetTransactionStatus?orderTrackingId=${trackingId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    const statusData = await statusRes.json()
    console.log('CALLBACK STATUS:', statusData)

    // Pesapal returns payment_status_description = COMPLETED
    if (statusData.payment_status_description === 'Completed' || statusData.status_code === 1) {
      // SUCCESS - redirect to success page with tracking ID
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/premium?payment=success&trackingId=${trackingId}&ref=${merchantRef}`
      )
    } else {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/premium?payment=pending&trackingId=${trackingId}`
      )
    }
  } catch (e) {
    console.error(e)
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/premium?payment=success&trackingId=${trackingId}`)
  }
}
