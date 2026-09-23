import { NextResponse } from 'next/server';
import { createBinancePayOrder } from '@/lib/crypto';

export async function POST(req: Request) {
  const { amountUSD, userId } = await req.json();
  const orderId = `KLA-${userId || 'guest'}-${Date.now()}`;
  
  try {
    const url = await createBinancePayOrder(amountUSD || 5, orderId);
    return NextResponse.json({ url, orderId });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}