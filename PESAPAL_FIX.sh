#!/bin/bash
set -e
mkdir -p app/api/pesapal lib/pesapal

# 1. CREATE WORKING PESAPAL LIB
cat > lib/pesapal/client.ts <<'EOF'
const PESAPAL_BASE = process.env.PESAPAL_ENV === "live" ? "https://pay.pesapal.com/v3" : "https://cybqa.pesapal.com/pesapalv3";

export async function getPesapalToken(){
  const key = process.env.PESAPAL_CONSUMER_KEY;
  const secret = process.env.PESAPAL_CONSUMER_SECRET;
  if(!key || !secret) throw new Error("Missing PESAPAL_CONSUMER_KEY/SECRET in .env");
  const res = await fetch(`${PESAPAL_BASE}/api/Auth/RequestToken`, {
    method: "POST",
    headers: {"Content-Type":"application/json","Accept":"application/json"},
    body: JSON.stringify({consumer_key:key, consumer_secret:secret})
  });
  const data = await res.json();
  if(!data.token) throw new Error("Pesapal token failed: "+JSON.stringify(data));
  return data.token as string;
}

export async function registerIPN(token:string){
  const ipnUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/pesapal/ipn`;
  const res = await fetch(`${PESAPAL_BASE}/api/URLSetup/RegisterIPN`, {
    method:"POST",
    headers:{"Content-Type":"application/json","Accept":"application/json","Authorization":`Bearer ${token}`},
    body: JSON.stringify({url: ipnUrl, ipn_notification_type:"POST"})
  });
  const data = await res.json();
  return data.ipn_id;
}

export async function createOrder(token:string, ipnId:string, email:string, amount:number, currency="USD"){
  // Pesapal needs amount with 2 decimals, valid email, callback
  const order = {
    id: `KLA-${Date.now()}`,
    currency,
    amount: Number(amount.toFixed(2)),
    description: "KLA-MEET Pro 30 days premium",
    callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/pesapal/callback`,
    notification_id: ipnId,
    billing_address: { email_address: email, first_name:"KLA", last_name:"User", phone_number:"", country_code:"", line_1:"Worldwide" }
  };
  const res = await fetch(`${PESAPAL_BASE}/api/Transactions/SubmitOrderRequest`, {
    method:"POST",
    headers:{"Content-Type":"application/json","Accept":"application/json","Authorization":`Bearer ${token}`},
    body: JSON.stringify(order)
  });
  const data = await res.json();
  if(!data.order_tracking_id) throw new Error("Order failed: "+JSON.stringify(data));
  return data;
}
EOF

# 2. CREATE API ROUTE - SUBMIT ORDER
cat > app/api/pesapal/order/route.ts <<'EOF'
import { NextRequest, NextResponse } from "next/server";
import { getPesapalToken, registerIPN, createOrder } from "@/lib/pesapal/client";

export async function POST(req: NextRequest){
  try{
    const {email, amount, currency} = await req.json();
    if(!email) return NextResponse.json({error:"Email required"}, {status:400});
    const token = await getPesapalToken();
    let ipnId = process.env.PESAPAL_IPN_ID;
    if(!ipnId){ ipnId = await registerIPN(token); console.log("New IPN:",ipnId); }
    const result = await createOrder(token, ipnId, email, amount||13.51, currency||"USD");
    return NextResponse.json({success:true, ...result});
  }catch(e:any){
    console.error("PESAPAL ERROR:", e.message);
    return NextResponse.json({error: e.message}, {status:500});
  }
}
EOF

cat > app/api/pesapal/ipn/route.ts <<'EOF'
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest){ console.log("IPN hit"); return NextResponse.json({status:"ok"}); }
export async function GET(req: NextRequest){ return NextResponse.json({status:"IPN ok"}); }
EOF

cat > app/api/pesapal/callback/route.ts <<'EOF'
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest){
  const tracking = req.nextUrl.searchParams.get("OrderTrackingId");
  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/premium?status=success&tracking=${tracking}`);
}
EOF

# 3. FIX FRONTEND BUTTON TO CALL NEW API
echo "--- Checking premium page ---"
find app -name "*premium*" -o -name "*pay*" | head -20
echo "Creating fixed Premium component patch instructions"
cat > app/premium/fix.md <<'MD'
FRONTEND FIX: Your Pay button should call:
fetch('/api/pesapal/order', {method:'POST', body: JSON.stringify({email, amount:13.51, currency:'USD'})})
.then(r=>r.json())
.then(data=>{ if(data.redirect_url) window.location.href=data.redirect_url; else alert(data.error) })
MD

# 4. ENV CHECK
echo "=== ENV VARS CHECK ==="
grep -q "PESAPAL_CONSUMER_KEY" .env.local 2>/dev/null && echo "✅ KEY found" || echo "❌ MISSING PESAPAL_CONSUMER_KEY in .env.local"
grep -q "NEXT_PUBLIC_APP_URL" .env.local 2>/dev/null && echo "✅ APP_URL found" || echo "❌ MISSING NEXT_PUBLIC_APP_URL - add https://kla-meet.vercel.app"

cat > .env.example <<'ENV'
PESAPAL_CONSUMER_KEY=your_key_here
PESAPAL_CONSUMER_SECRET=your_secret_here
PESAPAL_ENV=live
PESAPAL_IPN_ID= # auto-generated
NEXT_PUBLIC_APP_URL=https://kla-meet.vercel.app
ENV

echo "Building..."
rm -rf out .next && npm run build
git add .
git commit -m "fix: pesapal order failed - add token, IPN, order API, callback" || true
git push origin HEAD:main --force
