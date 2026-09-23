// lib/crypto.ts - Binance Pay only
import crypto from 'crypto';

export async function createBinancePayOrder(amountUSD: number, orderId: string) {
  const nonce = Math.random().toString(36).substring(2, 15);
  const timestamp = Date.now().toString();
  const body = JSON.stringify({
    merchantTradeNo: orderId,
    orderAmount: amountUSD.toString(),
    currency: 'USDT',
    goods: {
      goodsType: '02',
      goodsCategory: 'Z000',
      referenceGoodsId: orderId,
      goodsName: 'KLA-MEET Premium',
      goodsDetail: `Premium for ${orderId}`,
    },
    returnUrl: `${process.env.NEXT_PUBLIC_URL}/premium?status=success`,
    cancelUrl: `${process.env.NEXT_PUBLIC_URL}/premium?status=cancel`,
  });

  const payload = `${timestamp}\n${nonce}\n${body}\n`;
  const signature = crypto.createHmac('sha512', process.env.BINANCE_PAY_SECRET_KEY!)
    .update(payload).digest('hex').toUpperCase();

  const res = await fetch('https://bpay.binanceapi.com/binancepay/openapi/v2/order', {
    method: 'POST',
    headers: {
      'BinancePay-Timestamp': timestamp,
      'BinancePay-Nonce': nonce,
      'BinancePay-Certificate-SN': process.env.BINANCE_PAY_API_KEY!,
      'BinancePay-Signature': signature,
      'Content-Type': 'application/json',
    },
    body,
  });

  const data = await res.json();
  console.log('Binance Pay:', data);
  if (data.status !== 'SUCCESS') throw new Error(data.errorMessage || JSON.stringify(data));
  
  return data.data.checkoutUrl; // Binance Pay link
}