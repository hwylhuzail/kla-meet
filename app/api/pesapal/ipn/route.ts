import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: NextRequest){
  try{
    const body = await req.json().catch(()=>({}));
    console.log("IPN hit:", JSON.stringify(body).slice(0,500));
    
    const { OrderTrackingId, OrderMerchantReference, OrderNotificationType } = body;
    
    if(!OrderTrackingId) return NextResponse.json({status:"ok - no tracking id"});

    // Verify transaction status from Pesapal
    const key = process.env.PESAPAL_CONSUMER_KEY || process.env.PESAPAL_KEY;
    const secret = process.env.PESAPAL_CONSUMER_SECRET || process.env.PESAPAL_SECRET;
    const base = "https://pay.pesapal.com/v3";
    
    const tokRes = await fetch(`${base}/api/Auth/RequestToken`, {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({consumer_key:key, consumer_secret:secret})
    });
    const tokData = await tokRes.json();
    
    const statusRes = await fetch(`${base}/api/Transactions/GetTransactionStatus?orderTrackingId=${OrderTrackingId}`, {
      headers:{"Authorization":`Bearer ${tokData.token}`, "Accept":"application/json"}
    });
    const statusData = await statusRes.json();
    console.log("Pesapal status:", statusData.payment_status_description, statusData.status_code);
    
    if(statusData.payment_status_description === "Completed" || statusData.status_code === 1 || statusData.status === "COMPLETED"){
      try{
        const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
        await supabase.from('subscriptions').update({ 
          status: 'completed', 
          completed_at: new Date().toISOString(),
          pesapal_response: statusData
        }).eq('order_tracking_id', OrderTrackingId);
        
        // Also try merchant_reference
        if(OrderMerchantReference){
          await supabase.from('subscriptions').update({ 
            status: 'completed',
            completed_at: new Date().toISOString()
          }).eq('merchant_reference', OrderMerchantReference);
        }
        
        // Activate premium for user email
        const email = statusData.billing_address?.email_address || body.email;
        if(email){
          await supabase.from('profiles').update({ is_premium: true, premium_until: new Date(Date.now()+30*24*60*60*1000).toISOString() }).eq('email', email);
        }
      }catch(e){ console.error("DB update failed", e); }
    }
    
    return NextResponse.json({status:"ok", received: OrderTrackingId});
  }catch(e:any){
    console.error("IPN error", e);
    return NextResponse.json({status:"error", message: e.message}, {status:200});
  }
}

export async function GET(req: NextRequest){ 
  return NextResponse.json({status:"IPN ok - POST OrderTrackingId here", url: `${process.env.NEXT_PUBLIC_APP_URL}/api/pesapal/ipn`}); 
}
