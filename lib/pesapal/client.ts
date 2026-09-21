const getBase = () => {
  const env = (process.env.PESAPAL_ENV || "live").trim().toLowerCase();
  return env === "live" ? "https://pay.pesapal.com/v3" : "https://cybqa.pesapal.com/pesapalv3";
};

export async function getPesapalToken(){
  const key = process.env.PESAPAL_CONSUMER_KEY?.trim();
  const secret = process.env.PESAPAL_CONSUMER_SECRET?.trim();
  
  if(!key || !secret || key.length < 10){
    throw new Error(`Missing PESAPAL keys on Vercel. Found KEY=${!!key} (${key?.length||0} chars) SECRET=${!!secret}. Add them in Vercel > Settings > Env Vars > Production then click REDEPLOY.`);
  }
  
  const base = getBase();
  console.log(`Pesapal: Requesting token from ${base}`);
  
  const res = await fetch(`${base}/api/Auth/RequestToken`, {
    method: "POST",
    headers: {"Content-Type":"application/json","Accept":"application/json"},
    body: JSON.stringify({consumer_key:key, consumer_secret:secret})
  });
  
  const text = await res.text();
  let data:any; try{ data = JSON.parse(text); }catch{ data = {raw:text} }
  
  if(!res.ok || !data.token){
    throw new Error(`Pesapal token failed [${res.status}]: ${text.slice(0,300)} - Check if keys are LIVE keys and account is approved for LIVE.`);
  }
  return data.token as string;
}

export async function registerIPN(token:string){
  const base = getBase();
  const appUrl = (process.env.NEXT_PUBLIC_APP_URL || "https://kla-meet.vercel.app").trim().replace(/\/$/,"");
  const ipnUrl = `${appUrl}/api/pesapal/ipn`;
  
  console.log(`Pesapal: Registering IPN ${ipnUrl}`);
  
  // Try to get existing IPNs first
  try{
    const listRes = await fetch(`${base}/api/URLSetup/GetIpnList`, {
      headers: {"Accept":"application/json","Authorization":`Bearer ${token}`}
    });
    const listText = await listRes.text();
    const listData = JSON.parse(listText);
    if(Array.isArray(listData)){
      const existing = listData.find((x:any)=> x.url === ipnUrl || x.url?.includes("/api/pesapal/ipn"));
      if(existing?.ipn_id) {
        console.log("Using existing IPN:", existing.ipn_id);
        return existing.ipn_id;
      }
    }
  }catch{}

  const res = await fetch(`${base}/api/URLSetup/RegisterIPN`, {
    method:"POST",
    headers:{"Content-Type":"application/json","Accept":"application/json","Authorization":`Bearer ${token}`},
    body: JSON.stringify({url: ipnUrl, ipn_notification_type:"POST"})
  });
  
  const text = await res.text();
  let data:any; try{ data = JSON.parse(text); }catch{ data = {raw:text} }
  
  if(!res.ok || (!data.ipn_id && !data.ipnId)){
    console.error("IPN register failed:", text);
    // Pesapal allows order without valid IPN for now, but we need something
    throw new Error(`IPN register failed [${res.status}]: ${text.slice(0,300)}. Create IPN manually in Pesapal dashboard: ${ipnUrl}`);
  }
  return (data.ipn_id || data.ipnId) as string;
}

export async function createOrder(token:string, ipnId:string, email:string, amount:number, currency="USD"){
  const base = getBase();
  const appUrl = (process.env.NEXT_PUBLIC_APP_URL || "https://kla-meet.vercel.app").trim().replace(/\/$/,"");
  
  const payload = {
    id: `KLA-${Date.now()}-${Math.random().toString(36).slice(2,6)}`,
    currency: currency.trim().toUpperCase(),
    amount: Number(Number(amount).toFixed(2)),
    description: "KLA-MEET Pro 30 days premium",
    callback_url: `${appUrl}/api/pesapal/callback`,
    notification_id: ipnId,
    billing_address: {
      email_address: email.trim(),
      first_name: "KLA",
      last_name: "User",
      phone_number: "",
      country_code: "",
      line_1: "Kampala",
      city: "Kampala"
    }
  };
  
  console.log("Pesapal: Creating order", payload.id, payload.amount, payload.currency);
  
  const res = await fetch(`${base}/api/Transactions/SubmitOrderRequest`, {
    method:"POST",
    headers:{"Content-Type":"application/json","Accept":"application/json","Authorization":`Bearer ${token}`},
    body: JSON.stringify(payload)
  });
  
  const text = await res.text();
  let data:any; try{ data = JSON.parse(text); }catch{ data = {raw:text} }
  
  if(!res.ok || !data.order_tracking_id){
    throw new Error(`Order failed [${res.status}]: ${text.slice(0,500)}`);
  }
  return data;
}
