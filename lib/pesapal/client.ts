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
