'use client';
import { Suspense, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import ProfileCard from '@/components/ProfileCard'
import SectionRow from '@/components/SectionRow'
import AnimatedWorldPeek from '@/components/AnimatedWorldPeek' // <-- ADD THIS
import { supabase } from '@/lib/supabase'
import { normalizeProfile, Profile, uniqueFace } from '@/lib/profile'
import { COUNTRIES, countryFlag } from '@/lib/countries'

const modes = [['worldwide', '🌍 Worldwide'], ['near-me', '📍 Near Me'], ['best-matches', '❤️ Best Matches'], ['online-now', '🟢 Online Now'], ['new-members', '🆕 New Members'], ['featured', '⭐ Featured']]

function DiscoverClient() {
  const searchParams = useSearchParams()
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [mode, setMode] = useState(searchParams.get('mode') || 'worldwide')
  const [country, setCountry] = useState(searchParams.get('country') || '')
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    let active = true;
    setLoading(true);
    supabase.from('profiles').select('*').limit(100).then(({ data, error }) => {
      if (!active) return;
      const mapped = (data || []).map(normalizeProfile)
      const deduped = mapped.map(p => ({...p, mainPhoto: uniqueFace(p.id), photos: [uniqueFace(p.id)] }))
      const shuffled = [...deduped].sort(()=>0.5-Math.random())
      setProfiles(shuffled)
      setLoading(false);
      if (error) setMessage('Discovery is temporarily unavailable.')
    });
    return () => { active = false }
  }, [])

  const filtered = useMemo(() => {
    let result = profiles.filter(profile =>!country || profile.country?.toLowerCase() === country.toLowerCase() || profile.city?.toLowerCase() === country.toLowerCase());
    if (mode === 'online-now') result = result.filter(profile => profile.isOnline);
    if (mode === 'new-members') result = [...result].sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
    if (mode === 'best-matches') result = [...result].sort((a, b) => (b.interests.length + Number(Boolean(b.bio))) - (a.interests.length + Number(Boolean(a.bio))));
    return result
  }, [profiles, mode, country])

  const best = filtered.slice(0, 8)
  const around = filtered.slice(8, 16)
  const near = filtered.slice(16, 24)
  const online = filtered.filter(p=>p.isOnline).slice(0, 8)
  const newMembers = [...filtered].reverse().slice(0, 8)

  const handleAction = async (profile: Profile, type: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return setMessage('Sign in to connect with people.');
    if (type === 'pass') {
      setCurrentIndex(i=> Math.min(i+1, filtered.length-1))
      return setMessage(`Passed on ${profile.name}`)
    }
    const { data: existingLike } = await supabase.from('likes').select('id').eq('from_id', user.id).eq('to_id', profile.id).maybeSingle();
    if (!existingLike) {
      const { error } = await supabase.from('likes').insert({ from_id: user.id, to_id: profile.id });
      if (error) return setMessage(error.message)
    }
    const { data: mutual } = await supabase.from('likes').select('id').eq('from_id', profile.id).eq('to_id', user.id).maybeSingle();
    if (mutual) {
      const [user1, user2] = [user.id, profile.id].sort();
      let { data: existingMatch } = await supabase.from('matches').select('id,user1,user2').eq('user1', user1).eq('user2', user2).maybeSingle();
      if (!existingMatch) existingMatch = (await supabase.from('matches').insert({ user1, user2 }).select('id,user1,user2').single()).data;
      if (existingMatch) {
        const { data: conversation } = await supabase.from('conversations').select('id').eq('match_id', existingMatch.id).maybeSingle();
        if (!conversation) await supabase.from('conversations').insert({ match_id: existingMatch.id, user1, user2 })
      }
      setMessage(`It's a match with ${profile.name}! 🎉`)
    } else setMessage(`Interest sent to ${profile.name}`)
    setCurrentIndex(i=> Math.min(i+1, filtered.length-1))
  }

  const current = filtered[currentIndex] || filtered[0]

  return (
    <div className="min-h-screen bg-[#fbf9ff]">
      <header className="sticky top-0 z-30 bg-[#fbf9ff]/80 backdrop-blur-xl border-b border-black/[0.06] px-5 py-3 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-black tracking-[2px] text-violet-600/70">GLOBAL DISCOVERY</p>
          <h1 className="text-[22px] font-black tracking-[-0.8px] leading-none mt-1">Discover</h1>
        </div>
        <div className="flex items-center gap-2">
          <a href="/premium" className="rounded-full bg-black px-4 py-2 text-[11px] font-black text-[#FFC629] shadow-sm">Premium</a>
        </div>
      </header>

      {/* THIS WAS MISSING */}
      <AnimatedWorldPeek />

      <main className="px-4">
        <section className="relative mt-4 rounded-[28px] bg-[#111] p-6 text-white shadow-xl overflow-hidden">
          <div className="absolute -right-20 -top-20 h-[220px] w-[220px] rounded-full bg-gradient-to-br from-[#7c3aed] to-[#fb7185] blur-[30px] opacity-60" />
          <div className="absolute -left-16 -bottom-16 h-[180px] w-[180px] rounded-full bg-[#FFC629]/30 blur-[30px]" />
          <div className="relative">
            <p className="text-[11px] font-black tracking-[2px] text-white/50">MEET SOMEONE. ANYWHERE.</p>
            <h2 className="mt-3 text-[28px] font-black leading-[26px] tracking-[-1px]">People who make<br/>the world feel smaller.</h2>
          </div>
        </section>

        <div className="mt-5 -mx-4 px-4 flex gap-2 overflow-x-auto scrollbar-none pb-1">
          {modes.map(([value, label]) => (
            <button key={value} onClick={() => { setMode(value); setCurrentIndex(0) }}
              className={`shrink-0 min-w-max rounded-full px-4 py-2.5 text-[12px] font-bold transition-all border ${mode === value? 'bg-black text-white border-black shadow-[0_4px_12px_rgba(0,0,0,0.2)]' : 'bg-white text-zinc-600 border-zinc-200'}`}>
              {label}
            </button>
          ))}
        </div>

        <div className="mt-3">
          <select value={country} onChange={e => setCountry(e.target.value)}
            className="w-full h-[44px] rounded-full bg-white border border-zinc-200 px-4 text-[13px] font-medium outline-none">
            <option value="">🌍 All countries</option>
            {COUNTRIES.map(([code, name]) => <option key={code} value={code}>{countryFlag(code)} {name}</option>)}
          </select>
        </div>

        {loading? (
          <div className="mt-6 rounded-[20px] bg-white border border-black/5 p-8 text-center">
            <p className="text-[13px] text-zinc-500">Finding people...</p>
          </div>
        ) : current? (
          <>
            <section className="mt-6">
              <div className="mb-3 flex items-end justify-between px-1">
                <div>
                  <p className="text-[10px] font-black tracking-[2px] text-violet-600">WORLDWIDE • {filtered.length} PEOPLE</p>
                  <h2 className="text-[18px] font-black mt-1">People you may like</h2>
                </div>
                <span className="text-[11px] font-bold bg-black text-white px-3 py-1 rounded-full">{currentIndex+1} / {filtered.length}</span>
              </div>
              <div className="mx-auto max-w-[420px] rounded-[26px] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.15)] border border-black/5">
                <ProfileCard profile={current} onAction={type => handleAction(current, type)} />
              </div>
            </section>

            <div className="mt-8">
              <SectionRow title="Best Matches" icon="❤️" profiles={best} />
              <SectionRow title="Around the World" icon="🌍" profiles={around} />
              <SectionRow title="Near You" icon="📍" profiles={near.length? near : filtered.slice(24,32)} />
              <SectionRow title="Online Now" icon="🟢" profiles={online.length? online : filtered.slice(0,8)} />
              <SectionRow title="New Members" icon="🆕" profiles={newMembers} />
            </div>
          </>
        ) : (
          <section className="mt-8 rounded-[24px] bg-white border p-8 text-center">
            <h2 className="text-[20px] font-black">You've explored this view</h2>
            <button onClick={() => { setMode('worldwide'); setCountry(''); setCurrentIndex(0) }} className="mt-4 rounded-full bg-black px-5 py-3 text-[12px] font-black text-white">Explore worldwide</button>
          </section>
        )}

        {message && <div className="fixed bottom-[90px] left-1/2 -translate-x-1/2 z-50 bg-black text-white px-4 py-2.5 rounded-full text-[12px] font-bold shadow-xl">{message}</div>}
      </main>
    </div>
  )
}

export default function Discover() {
  return <Suspense fallback={<div className="min-h-screen bg-[#fbf9ff]" />}><DiscoverClient /></Suspense>
}