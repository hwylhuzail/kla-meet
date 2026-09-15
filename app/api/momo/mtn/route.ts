import { NextResponse } from 'next/server'

const uuid = () => crypto.randomUUID()

export async function POST(request: Request) {
  try {
    const { amount, phone } = await request.json()
    if (!amount || !phone) return NextResponse.json({ error: 'amount and phone are required' }, { status: 400 })
    const reference = uuid()
    const tokenResponse = await fetch(`${process.env.MTN_BASE_URL || 'https://sandbox.momodeveloper.mtn.com'}/collection/token/`, { method: 'POST', headers: { Authorization: `Basic ${Buffer.from(`${process.env.MTN_COLLECTION_USER_ID}:${process.env.MTN_COLLECTION_API_KEY}`).toString('base64')}`, 'Ocp-Apim-Subscription-Key': process.env.MTN_SUBSCRIPTION_KEY || '' } })
    const tokenData = await tokenResponse.json()
    if (!tokenResponse.ok || !tokenData.access_token) return NextResponse.json({ error: 'MTN authentication failed' }, { status: 502 })
    const payerPhone = String(phone).replace(/^\+/, '').replace(/^0/, '256')
    const payment = await fetch(`${process.env.MTN_BASE_URL || 'https://sandbox.momodeveloper.mtn.com'}/collection/v1_0/requesttopay`, { method: 'POST', headers: { Authorization: `Bearer ${tokenData.access_token}`, 'X-Reference-Id': reference, 'X-Target-Environment': process.env.MTN_TARGET_ENVIRONMENT || 'sandbox', 'Ocp-Apim-Subscription-Key': process.env.MTN_SUBSCRIPTION_KEY || '', 'Content-Type': 'application/json' }, body: JSON.stringify({ amount: String(amount), currency: 'UGX', externalId: `KLA-${Date.now()}`, payer: { partyIdType: 'MSISDN', partyId: payerPhone }, payerMessage: 'KLA MEET Premium', payeeNote: 'KLA MEET Premium' }) })
    if (!payment.ok) return NextResponse.json({ error: 'MTN payment request failed' }, { status: 502 })
    return NextResponse.json({ reference, message: 'MTN payment request sent' })
  } catch { return NextResponse.json({ error: 'MTN service unavailable' }, { status: 500 }) }
}
