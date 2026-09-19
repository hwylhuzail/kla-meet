import { NextRequest, NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })
    return NextResponse.json({ success: true, name: file.name, url: `/uploads/${file.name}` })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
