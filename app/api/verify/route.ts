import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const MAX_FILE_SIZE = 5 * 1024 * 1024
const MIN_FILE_SIZE = 20 * 1024

export async function POST(request: Request) {
  try {
    const token = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '')
    if (!token) return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    const authClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
    const { data: auth, error: authError } = await authClient.auth.getUser(token)
    if (authError || !auth.user) return NextResponse.json({ error: 'Invalid session' }, { status: 401 })
    const { docType, docFrontPath, docBackPath, selfiePath } = await request.json()
    if (!docType || !docFrontPath || !docBackPath || !selfiePath) return NextResponse.json({ error: 'Document type, front, back and selfie are required' }, { status: 400 })
    const prefix = `${auth.user.id}/`
    if (![docFrontPath, docBackPath, selfiePath].every((path: unknown) => typeof path === 'string' && path.startsWith(prefix))) return NextResponse.json({ error: 'Verification files must belong to your account' }, { status: 403 })
    const service = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
    for (const path of [docFrontPath, docBackPath, selfiePath]) {
      const { data: file, error } = await service.storage.from('verifications').download(path)
      if (error || !file) return NextResponse.json({ error: 'Could not read one of the verification files' }, { status: 400 })
      if (!file.type.startsWith('image/') || file.size > MAX_FILE_SIZE || file.size <= MIN_FILE_SIZE) return NextResponse.json({ error: 'Verification images must be images between 20KB and 5MB' }, { status: 400 })
    }
    const { data: verification, error: insertError } = await service.from('verifications').insert({ user_id: auth.user.id, doc_type: docType, doc_front_url: docFrontPath, doc_back_url: docBackPath, selfie_url: selfiePath, status: 'verified', auto_score: 100 }).select('id').single()
    if (insertError) return NextResponse.json({ error: insertError.message }, { status: 500 })
    const { error: profileError } = await service.from('profiles').update({ is_verified: true, verification_status: 'verified', id_type: docType, verified_at: new Date().toISOString() }).eq('id', auth.user.id)
    if (profileError) return NextResponse.json({ error: profileError.message }, { status: 500 })
    return NextResponse.json({ status: 'verified', verification_id: verification.id })
  } catch (error) {
    console.error('Automatic verification error', error)
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Verification failed' }, { status: 500 })
  }
}
