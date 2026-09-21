import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest){ console.log("IPN hit"); return NextResponse.json({status:"ok"}); }
export async function GET(req: NextRequest){ return NextResponse.json({status:"IPN ok"}); }
