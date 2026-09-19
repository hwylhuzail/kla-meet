'use client';

export const dynamic = 'force-dynamic';




import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

const ADMIN_EMAIL = 'huzayirukalungi4@gmail.com'

export default function AdminControl() {
  const [tab, setTab] = useState<'kyc'|'users'|'posts'>('users')
  const [kycs, setKycs] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [state, setState] = useState('Checking...')
  const [myEmail, setMyEmail] = useState('')

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if(!data.user) return setState('NOT LOGGED IN')
      setMyEmail(data.user.email||'')
      if(data.user.email?.toLowerCase()!== ADMIN_EMAIL){
        return setState(`Logged as ${data.user.email} - need ${ADMIN_EMAIL}`)
      }
      setState('')
      loadAll()
    })
  }, [])

  const loadAll = async () => {
    const { data: kyc } = await supabase.from('kyc_verifications').select('*, profiles(full_name)').eq('status','pending')
    setKycs(kyc||[])
    const { data: prof } = await supabase.from('profiles').select('*').order('created_at',{ascending:false}).limit(50)
    setUsers(prof||[])
  }

  const approveKyc = async (id:string, userId:string) => {
    await supabase.from('kyc_verifications').update({ status: 'approved' }).eq('id', id)
    await supabase.from('profiles').update({ is_verified: true }).eq('id', userId)
    setKycs(c=>c.filter(x=>x.id!==id))
  }

  const banUser = async (id:string) => {
    if(!confirm('Ban this user?')) return
    const { error } = await supabase.from('profiles').update({ is_banned: true }).eq('id', id)
    if(error) alert(error.message)
    else loadAll()
  }

  const deleteUser = async (id:string) => {
    if(!confirm('DELETE user permanently?')) return
    const { error } = await supabase.from('profiles').delete().eq('id', id)
    if(error) alert(error.message)
    else setUsers(u=>u.filter(x=>x.id!==id))
  }

  if(state) return <main className="min-h-screen bg-zinc-50 p-6"><div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl"><p>{state}</p><p className="text-xs mt-2">Logged: {myEmail}</p><Link href="/auth" className="mt-4 inline-block bg-black text-white px-4 py-2 rounded-full text-sm">Login</Link></div></main>

  return (
    <main className="min-h-screen bg-[#f8f7ff] p-3">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm">
          <div>
            <h1 className="font-black text-lg">KLA MEET • ADMIN</h1>
            <p className="text-[11px] text-zinc-500">{myEmail} • {users.length} users • {kycs.length} pending KYC</p>
          </div>
          <Link href="/discover" className="text-xs bg-[#FFC629] px-4 py-2 rounded-full font-bold">Go to App</Link>
        </div>

        <div className="mt-4 flex gap-2">
          <button onClick={()=>setTab('users')} className={`px-4 py-2 rounded-full text-sm font-bold ${tab==='users'?'bg-black text-white':'bg-white'}`}>Users ({users.length})</button>
          <button onClick={()=>setTab('kyc')} className={`px-4 py-2 rounded-full text-sm font-bold ${tab==='kyc'?'bg-black text-white':'bg-white'}`}>KYC ({kycs.length})</button>
        </div>

        {tab==='kyc' && (
          <div className="mt-4 grid gap-2">
            {kycs.map(k=>(
              <div key={k.id} className="bg-white p-4 rounded-xl flex justify-between items-center">
                <div><p className="font-bold text-sm">{k.profiles?.full_name || k.user_id.slice(0,8)}</p><p className="text-[11px] text-zinc-500">{k.id}</p></div>
                <button onClick={()=>approveKyc(k.id,k.user_id)} className="bg-emerald-500 text-white px-4 py-2 rounded-full text-xs font-bold">Approve</button>
              </div>
            ))}
            {!kycs.length && <p className="text-sm text-zinc-500 bg-white p-4 rounded-xl">No pending KYC</p>}
          </div>
        )}

        {tab==='users' && (
          <div className="mt-4 grid gap-2">
            {users.map(u=>(
              <div key={u.id} className="bg-white p-3 rounded-xl flex gap-3 items-center">
                <img src={u.avatar_url || `https://i.pravatar.cc/100?u=${u.id}`} className="w-12 h-12 rounded-full object-cover" alt="" />
                <div className="flex-1">
                  <p className="font-bold text-sm">{u.full_name || 'No name'} {u.is_verified && '✓'} {u.is_banned && '(BANNED)'}</p>
                  <p className="text-[11px] text-zinc-500">{u.id.slice(0,8)} • {u.created_at?.slice(0,10)}</p>
                </div>
                <div className="flex gap-1">
                  <button onClick={()=>banUser(u.id)} className="bg-zinc-900 text-white px-3 py-2 rounded-full text-[11px]">Ban</button>
                  <button onClick={()=>deleteUser(u.id)} className="bg-red-500 text-white px-3 py-2 rounded-full text-[11px]">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
