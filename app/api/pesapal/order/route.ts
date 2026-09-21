import { NextRequest, NextResponse } from "next/server";
export const dynamic = 'force-dynamic';
import { getPesapalToken, registerIPN, createOrder } from "@/lib/pesapal/client";
export async function POST(req: NextRequest){
  try{
    const body = await req.json().catch(()=>({}));
    const {email, amount, currency} = body;
    if(!email) return NextResponse.json({error:"Email required"}, {status:400});
    const token = await getPesapalToken();
    let ipnId = process.env.PESAPAL_IPN_ID as string;
    if(!ipnId){ try{ ipnId = await registerIPN(token); }catch{ ipnId = "temp" } }
    const result = await createOrder(token, ipnId, email, amount||13.51, currency||"USD");
    return NextResponse.json({success:true, ...result});
  }catch(e:any){
    return NextResponse.json({error: e.message}, {status:500});
  }
}
