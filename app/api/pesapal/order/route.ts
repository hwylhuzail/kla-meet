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
