export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
export async function GET(req: Request) {
  const url = new URL(req.url)
  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL || 'https://kla-meet.vercel.app'}/premium?status=${url.searchParams.get('OrderTrackingId')}`)
}
