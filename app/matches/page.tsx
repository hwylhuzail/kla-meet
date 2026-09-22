'use client';
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { normalizeProfile, profileLocation, countryFlag, Profile } from '@/lib/profile'

export default function Matches() {
  const [matches, setMatches] = useState<{ id: string; profile: Profile }[]>([]);
  const [status, setStatus] = useState('Loading your matches...')
  useEffect(() => {
    (async () => {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) return setStatus('Sign in to see your matches.');
      const { data: rows, error } = await supabase.from('matches').select('id,user1,user2').or(`user1.eq.${auth.user.id},user2.eq.${auth.user.id}`).order('id', { ascending: false });
      if (error) return setStatus(error.message);
      const otherIds = (rows || []).map(row => row.user1 === auth.user.id? row.user2 : row.user1);
      if (!otherIds.length) return setStatus('');
      const { data: profiles } = await supabase.from('profiles').select('*').in('id', otherIds);
      const hydrated = await Promise.all((rows || []).map(async row => {
        const otherId = row.user1 === auth.user.id? row.user2 : row.user1;
        const profile = (profiles || []).find(item => item.id === otherId);
        if (!profile) return null;
        let { data: conversation } = await supabase.from('conversations').select('id').eq('match_id', row.id).maybeSingle();
        if (!conversation) conversation = (await supabase.from('conversations').insert({ match_id: row.id, user1: row.user1, user2: row.user2 }).select('id').single()).data;
        return conversation? { id: conversation.id, profile: normalizeProfile(profile) } : null
      }));
      setMatches(hydrated.filter(Boolean) as { id: string; profile: Profile }[]);
      setStatus('')
    })()
  }, [])
  return (
    <div className="min-h-screen bg-[#fbf9ff]">
      <header className="topbar sticky top-0 z-30 bg-[#fbf9ff]/80 backdrop-blur-xl border-b border-black/5 px-5 py-3 flex justify-between">
        <div><p className="text-[10px] font-black tracking-[2px] text-violet-600/70">YOUR PEOPLE</p><h1 className="text-[22px] font-black tracking-[-0.8px] mt-1">Matches</h1></div>
        <Link href="/explore" className="h-9 w-9 grid place-items-center rounded-full bg-white border border-black/10 shadow-sm">🌍</Link>
      </header>
      <main className="px-4">
        {status && <p className="py-10 text-center text-sm text-stone-500">{status}</p>}
        {!status &&!matches.length && <div className="mt-5 rounded-[24px] bg-gradient-to-br from-violet-50 to-rose-50 border border-violet-100 p-8 text-center shadow-sm"><div className="text-5xl">🌍</div><h2 className="mt-4 text-[20px] font-black tracking-[-0.5px]">Your next match could be anywhere</h2><p className="mt-2 text-[13px] leading-5 text-stone-500">Explore worldwide discovery and meet people beyond your usual circle.</p><Link href="/discover" className="mt-5 inline-block rounded-full bg-black px-6 py-3 text-[12px] font-black text-white shadow-md">Discover worldwide</Link></div>}
        {matches.length > 0 && <><div className="mb-4 mt-6 flex items-center justify-between"><p className="text-[10px] font-black tracking-[2px] text-violet-600">YOUR MATCHES</p><span className="text-[11px] font-bold text-zinc-400 bg-zinc-100 px-2.5 py-1 rounded-full">{matches.length} connections</span></div>{matches.map(match => <Link href={`/chat/${match.id}`} key={match.id} className="mb-3 flex items-center gap-3 rounded-[20px] bg-white border border-black/5 p-3 shadow-sm hover:shadow-md transition-all no-underline"><div className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-violet-200 to-rose-200 font-bold text-violet-700">{match.profile.photos[0]? <img src={match.profile.photos[0]} alt={match.profile.name} className="h-full w-full object-cover" /> : match.profile.name.slice(0, 1)}</div><div className="min-w-0 flex-1"><p className="font-bold text-[14px]">{match.profile.name}</p><p className="truncate text-[11px] text-zinc-500">{countryFlag(match.profile.country)} {profileLocation(match.profile)}</p></div><span className="h-8 w-8 grid place-items-center rounded-full bg-black text-white text-[12px]">→</span></Link>)}</>}
      </main>
    </div>
  )
}