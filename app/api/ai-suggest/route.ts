import { NextResponse } from 'next/server'
export async function POST(req:Request){
  const {msg}=await req.json();
  // For now return 3 safe suggestions without OpenAI to keep it light - add OpenAI later
  return NextResponse.json({suggestions:["Hey! You seem fun 😊","What do you enjoy doing in Kla?","Your profile caught my eye ✨"]})
}