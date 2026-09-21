import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(req: NextRequest){
  try{
    const tracking = req.nextUrl.searchParams.get("OrderTrackingId") || req.nextUrl.searchParams.get("orderTrackingId") || req.nextUrl.searchParams.get("OrderTrackingID");
    const merchant = req.nextUrl.searchParams.get("OrderMerchantReference");
    const email = req.nextUrl.searchParams.get("email");
    
    const appUrl = (process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_BASE_URL || "https://kla-meet.vercel.app").replace(/\/$/,"");
    
    if(!tracking){
      return NextResponse.redirect(`${appUrl}/premium?status=failed&error=no_tracking_id`);
    }
    
    // Verify payment status
    const key = process.env.PESAPAL_CONSUMER_KEY || process.env.PESAPAL_KEY;
    const secret = process.env.PESAPAL_CONSUMER_SECRET || process.env.PESAPAL_SECRET;
    const base = "https://pay.pesapal.com/v3";
    
    try{
      const tokRes = await fetch(`${base}/api/Auth/RequestToken`, {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({consumer_key:key, consumer_secret:secret})
      });
      const tokData = await tokRes.json();
      
      if(tokData.token){
        const statusRes = await fetch(`${base}/api/Transactions/GetTransactionStatus?orderTrackingId=${tracking}`, {
          headers:{"Authorization":`Bearer ${tokData.token}`, "Accept":"application/json"}
        });
        const statusData = await statusRes.json();
        console.log("Callback verify:", statusData.payment_status_description);
        
        const isCompleted = statusData.payment_status_description === "Completed" || statusData.status_code === 1;
        
        if(isCompleted){
          try{
            const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
            await supabase.from('subscriptions').update({ 
              status: 'completed',
              completed_at: new Date().toISOString()
            }).eq('order_tracking_id', tracking);
          }catch{}
          return NextResponse.redirect(`${appUrl}/premium?status=success&tracking=${tracking}&email=${encodeURIComponent(email||"")}`);
        }else{
          // Still pending - Pesapal sometimes delays IPN
          return NextResponse.redirect(`${appUrl}/premium?status=pending&tracking=${tracking}&desc=${encodeURIComponent(statusData.payment_status_description||"Pending")}`);
        }
      }
    }catch(e){
      console.error("Callback verify failed", e);
    }
    
    // Fallback - redirect to success and let IPN handle it
    return NextResponse.redirect(`${appUrl}/premium?status=success&tracking=${tracking}`);
    
  }catch(e:any){
    const appUrl = (process.env.NEXT_PUBLIC_APP_URL || "https://kla-meet.vercel.app").replace(/\/$/,"");
    return NextResponse.redirect(`${appUrl}/premium?status=failed&error=${encodeURIComponent(e.message)}`);
  }
}
