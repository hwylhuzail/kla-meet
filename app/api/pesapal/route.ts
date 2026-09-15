import { NextResponse } from "next/server"
export async function POST(req:Request){
  const body = await req.json()
  // TODO: Add your PESAPAL_KEY in Vercel Env Vars
  // For now return demo url - replace with real PesaPal SubmitOrderRequest
  if(!process.env.PESAPAL_KEY) return NextResponse.json({error:"Add PESAPAL_KEY in Vercel",url:null})
  return NextResponse.json({url:"https://pay.pesapal.com"})
}
