'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const ADMIN_EMAIL = 'huzayirukalungi4@gmail.com'
export default function Admin() {
  const [kycs, setKycs] = useState<any[]>([]); const [state, setState] = useState('Checking access...')
  useEffect(() => { supabase.auth.getUser().then(async ({ data }) => { if (!data.user || data.user.email?.toLowerCase() !== ADMIN_EMAIL) return setState('This area is restricted to platform administrators.'); const { data: rows, error } = await supabase.from('kyc_verifications').select('*, profiles(full_name)').eq('status', 'pending'); if (error) setState(error.message); else { setKycs(rows || []); setState('') } }) }, [])
  const approve = async (id: string, userId: string) => { const verification = await supabase.from('kyc_verifications').update({ status: 'approved' }).eq('id', id); if (verification.error) return setState(verification.error.message); await supabase.from('profiles').update({ is_verified: true }).eq('id', userId); setKycs(current => current.filter(item => item.id !== id)) }
  return <main className="min-h-screen bg-[#fbf9ff] p-6"><div className="mx-auto max-w-4xl"><p className="eyebrow text-violet-600">Restricted console</p><h1 className="display mt-2 text-4xl font-bold">KLA Meet Admin</h1>{state && <p className="mt-6 rounded-2xl bg-white p-5 text-sm text-stone-500 shadow-sm">{state}</p>}{!state && <><div className="mt-8 grid gap-4 md:grid-cols-3"><div className="soft-panel"><p className="eyebrow">Verification queue</p><p className="display mt-2 text-3xl font-bold">{kycs.length}</p></div><div className="soft-panel"><p className="eyebrow">Access</p><p className="mt-2 font-bold text-emerald-600">Administrator</p></div><div className="soft-panel"><p className="eyebrow">Safety</p><p className="mt-2 font-bold">Review reports</p></div></div><section className="mt-8"><h2 className="display text-2xl font-bold">Pending verification</h2>{kycs.length ? kycs.map(item => <div className="soft-panel mt-3 flex items-center justify-between" key={item.id}><span className="font-bold">{item.profiles?.full_name || 'Member'}</span><button onClick={() => approve(item.id, item.user_id)} className="primary-button px-4 py-2">Approve</button></div>) : <p className="mt-4 text-sm text-stone-500">No pending verification requests.</p>}</section></>}</div></main>
}
