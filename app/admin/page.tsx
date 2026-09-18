'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

const ADMIN_EMAIL = 'huzayirukalungi4@gmail.com'

export default function Admin() {
  const [kycs, setKycs] = useState<any[]>([])
  const [state, setState] = useState('Checking access...')
  const [myEmail, setMyEmail] = useState('')

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data, error }) => {
      if(error) return setState('Auth error: '+error.message)
      if(!data.user){
        setState('NOT LOGGED IN - Go to /auth and login')
        return
      }
      setMyEmail(data.user.email || '')
      if(data.user.email?.toLowerCase()!== ADMIN_EMAIL){
        setState(`Restricted. You are logged as ${data.user.email}, but admin is ${ADMIN_EMAIL}. Logout and login as admin.`)
        return
      }
      // You ARE admin
      const { data: rows, error: qError } = await supabase
       .from('kyc_verifications')
       .select('*, profiles(full_name)')
       .eq('status','pending')

      if(qError){
        setState('DB error: '+qError.message+' - Check RLS policies in Supabase')
      } else {
        setKycs(rows || [])
        setState('')
      }
    })
  }, [])

  const approve = async (id: string, userId: string) => {
    const { error } = await supabase.from('kyc_verifications').update({ status: 'approved' }).eq('id', id)
    if(error) return setState(error.message)
    await supabase.from('profiles').update({ is_verified: true }).eq('id', userId)
    setKycs(c => c.filter(i => i.id!== id))
  }

  const logout = async () => {
    await supabase.auth.signOut()
    window.location.href='/auth'
  }

  return (
    <main className="min-h-screen bg-[#fbf9ff] p-4">
      <div className="mx-auto max-w-4xl">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-[11px] font-bold tracking-[2px] text-violet-600">Restricted console</p>
            <h1 className="text-2xl font-bold">KLA Meet Admin</h1>
            {myEmail && <p className="text-xs text-zinc-500 mt-1">Logged as: {myEmail}</p>}
          </div>
          <button onClick={logout} className="text-xs bg-black text-white px-3 py-2 rounded-full">Logout</button>
        </div>

        {state? (
          <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-stone-600">{state}</p>
            {state.includes('NOT LOGGED') && <Link href="/auth" className="mt-3 inline-block rounded-full bg-[#FFC629] px-4 py-2 text-xs font-bold text-black">Go to Login</Link>}
          </div>
        ) : (
          <>
            <div className="mt-6 grid gap-3 grid-cols-3">
              <div className="bg-white p-4 rounded-2xl shadow-sm"><p className="text-[10px] text-zinc-500">Queue</p><p className="text-2xl font-bold">{kycs.length}</p></div>
              <div className="bg-white p-4 rounded-2xl shadow-sm"><p className="text-[10px] text-zinc-500">Access</p><p className="text-sm font-bold text-emerald-600">Admin OK</p></div>
              <div className="bg-white p-4 rounded-2xl shadow-sm"><p className="text-[10px] text-zinc-500">Safety</p><p className="text-sm font-bold">Reviews</p></div>
            </div>
            <section className="mt-6">
              <h2 className="font-bold">Pending verification</h2>
              {kycs.length? kycs.map(item=>(
                <div key={item.id} className="mt-2 bg-white p-4 rounded-xl flex justify-between items-center shadow-sm">
                  <span className="text-sm font-bold">{item.profiles?.full_name || 'Member'}</span>
                  <button onClick={()=>approve(item.id,item.user_id)} className="bg-[#FFC629] px-4 py-2 rounded-full text-xs font-bold">Approve</button>
                </div>
              )) : <p className="mt-3 text-sm text-zinc-500">No pending requests</p>}
            </section>
          </>
        )}
      </div>
    </main>
  )
}