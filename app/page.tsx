'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import BottomNav from '@/components/BottomNav'
import ProfileCard from '@/components/ProfileCard'
import SectionRow from '@/components/SectionRow'
import { supabase } from '@/lib/supabase'
import { normalizeProfile, Profile } from '@/lib/profile'

const fallbackProfiles: Profile[] = [
  { id: 'demo-sarah', name: 'Sarah', age: 27, city: 'Kampala', country: 'UG', bio: 'Loves travel, music and good conversations.', photos: ['https://images.unsplash.com/photo-1517841905240-472988babdf9?w=900&q=85'], interests: ['Travel', 'Music', 'Coffee'], languages: ['English'], intention: 'Serious relationship', isVerified: true, isOnline: true },
  { id: 'demo-aisha', name: 'Aisha', age: 24, city: 'Nairobi', country: 'KE', bio: 'Coffee lover, gym and real vibes.', photos: ['https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=900&q=85'], interests: ['Fitness', 'Coffee', 'Art'], languages: ['English'], intention: 'Dating', isVerified: true, isOnline: true },
  { id: 'demo-david', name: 'David', age: 28, city: 'London', country: 'GB', bio: 'Tech, travel and open to relocating.', photos: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=85'], interests: ['Tech', 'Travel', 'Food'], languages: ['English'], intention: 'Marriage', isVerified: true },
  { id: 'demo-vanessa', name: 'Vanessa', age: 24, city: 'Kampala', country: 'UG', bio: 'Entrepreneur. Real vibes, not games.', photos: ['https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&q=85'], interests: ['Business', 'Style', 'Travel'], languages: ['English'], intention: 'Serious relationship', isVerified: true, isOnline: true },
  { id: 'demo-james', name: 'James', age: 26, city: 'Toronto', country: 'CA', bio: 'Gym, music and good talks.', photos: ['https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&q=85'], interests: ['Music', 'Fitness'], languages: ['English'], intention: 'Friendship', isOnline: true },
  { id: 'demo-fatima', name: 'Fatima', age: 25, city: 'Dubai', country: 'AE', bio: 'Fashion designer and travel lover.', photos: ['https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=900&q=85'], interests: ['Fashion', 'Travel'], languages: ['English'], intention: 'Dating', isVerified: true, isOnline: true },
]

export default function Home() {
  const [profiles, setProfiles] = useState<Profile[]>(fallbackProfiles)
  const [index, setIndex] = useState(0)
  const [notice, setNotice] = useState('')
  const [showUpgrade, setShowUpgrade] = useState(false)

  useEffect(() => {
    let active = true
    supabase.from('profiles').select('*').limit(30).then(({ data }) => {
      if (active && data?.length) setProfiles(data.map(normalizeProfile).filter(profile => profile.photos.length))
    })
    return () => { active = false }
  }, [])

  const current = profiles[index % profiles.length]
  const handleAction = (type: string) => {
    setNotice(type === 'like' ? `Interest sent to ${current.name}` : `Passed on ${current.name}`)
    setIndex(value => value + 1)
    window.setTimeout(() => setNotice(''), 2600)
  }

  return <div className="app-shell">
    <header className="topbar">
      <Link href="/" className="brand">KLA<span className="brand-mark">•</span>MEET</Link>
      <div className="flex items-center gap-2">
        <Link href="/matches" className="icon-button" aria-label="Open messages">◌</Link>
        <Link href="/profile" className="icon-button" aria-label="Open profile">○</Link>
      </div>
    </header>

    <main className="content animate-page">
      <section className="mb-6 flex items-end justify-between">
        <div><p className="eyebrow">Good morning</p><h1 className="display mt-1 text-3xl font-bold">Meet someone worth meeting.</h1></div>
        <span className="rounded-full bg-[#fff3c7] px-3 py-2 text-xs font-bold text-[#765700]">{profiles.length} nearby</span>
      </section>

      <section id="discover" className="mb-3">
        <div className="mb-3 flex items-center justify-between"><p className="eyebrow">Your daily pick</p><span className="text-xs font-bold text-stone-400">{index + 1} / {profiles.length}</span></div>
        <ProfileCard profile={current} onAction={handleAction} />
      </section>
      <div className="action-row" aria-label="Profile actions"><button className="round-action" onClick={() => handleAction('pass')} aria-label="Pass">✕</button><button className="round-action primary" onClick={() => handleAction('like')} aria-label="Like">♥</button><Link href={`/profile?id=${encodeURIComponent(current.id)}`} className="round-action" aria-label="View profile">i</Link></div>

      {notice && <p className="soft-panel mb-2 border-[#f4d36b] bg-[#fff9e8] py-3 text-center text-sm font-bold">{notice}</p>}
      <SectionRow title="Recommended for you" icon="✦" profiles={profiles.slice(1)} />

      <section className="mt-8 rounded-[24px] bg-[#242424] p-5 text-white">
        <p className="eyebrow text-[#ffc629]">Go further</p><h2 className="display mt-2 text-2xl font-bold">Your world is bigger than your postcode.</h2><p className="mt-2 text-sm leading-5 text-white/65">Discover genuine people across countries, cultures and communities.</p>
        <Link href="/explore" className="mt-5 inline-block rounded-xl bg-[#ffc629] px-4 py-3 text-sm font-bold text-[#242424]">Explore worldwide</Link>
      </section>

      <section className="mt-8 flex items-center justify-between rounded-[22px] border border-[#f0dfad] bg-[#fff9e8] p-5"><div><p className="eyebrow text-[#8b6b00]">KLA MEET plus</p><h2 className="display mt-1 text-xl font-bold">More chances to connect.</h2><p className="mt-1 text-xs text-stone-500">Unlimited likes, travel mode and more.</p></div><button onClick={() => setShowUpgrade(true)} className="primary-button shrink-0">Upgrade</button></section>
    </main>
    <BottomNav />
    {showUpgrade && <div className="fixed inset-0 z-50 grid place-items-center bg-[#fff9c4]/80 p-5"><div className="soft-panel w-full max-w-sm"><p className="eyebrow">KLA MEET plus</p><h2 className="display mt-2 text-2xl font-bold">Make your next connection count.</h2><p className="mt-3 text-sm leading-5 text-stone-500">Unlimited likes, advanced filters, travel mode and profile boost.</p><button onClick={() => setShowUpgrade(false)} className="primary-button mt-5 w-full">Continue</button><button onClick={() => setShowUpgrade(false)} className="mt-3 w-full text-sm font-bold text-stone-400">Maybe later</button></div></div>}
  </div>
}
