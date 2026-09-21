import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest){
  const tracking = req.nextUrl.searchParams.get("OrderTrackingId");
  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/premium?status=success&tracking=${tracking}`);
}
