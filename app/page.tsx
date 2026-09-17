'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Footer from '@/components/Footer'
import BottomNav from '@/components/BottomNav'
import ProfileCard from '@/components/ProfileCard'
import SectionRow from '@/components/SectionRow'
import { supabase } from '@/lib/supabase'
import { normalizeProfile, Profile } from '@/lib/profile'

const fallbackProfiles: Profile[] = [
  { id: 'demo-sarah', name: 'Sarah', age: 27, city: 'London', country: 'UK', bio: 'Loves travel, music and good conversations.', photos: ['https://images.unsplash.com/photo-1517841905240-472988babdf9?w=900&q=85'], interests: ['Travel', 'Music', 'Coffee'], languages: ['English'], intention: 'Serious relationship', isVerified: true, isOnline: true },
  { id: 'demo-vanessa', name: 'Vanessa', age: 24, city: 'Dubai', country: 'AE', bio: 'Entrepreneur. Real vibes, not games.', photos: ['https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&q=85'], interests: ['Business', 'Style', 'Travel'], languages: ['English'], intention: 'Serious relationship', isVerified: true, isOnline: true },
]

function Landing() {
  return <div className="landing-shell">
    <nav className="landing-nav"><Link href="/" className="brand">KLA<span className="brand-mark">•</span>MEET</Link><div className="landing-nav-links"><a href="#app">The App</a><a href="#about">About</a><a href="/safety">Safety</a><a href="#shop">Shop</a></div><Link href="/auth" className="primary-button">Get Started</Link></nav>
      <AnimatedWorldPeek />
    <motion.section className="landing-hero" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration:.4 }}><div><p className="eyebrow">REAL CONNECTIONS · WORLDWIDE</p><h1>Make the first move anywhere.</h1><p>Meet thoughtful people nearby and around the world, with safety and authenticity built into every hello.</p><Link href="/auth" className="primary-button inline-block">Get started</Link></div><div className="phone-stage"><motion.div className="phone" animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity }}><img src={fallbackProfiles[0].photos[0]} alt="KLA Meet profile" /></motion.div><motion.div className="floating-profile one" animate={{ y: [0, -12, 0] }} transition={{ duration: 3.5, repeat: Infinity }}><img src={fallbackProfiles[1].photos[0]} alt="Vanessa" /><span>Vanessa, 24 · Dubai</span></motion.div><motion.div className="floating-profile two" animate={{ y: [0, 9, 0] }} transition={{ duration: 4.5, repeat: Infinity }}><img src={fallbackProfiles[0].photos[0]} alt="Sarah" /><span>Sarah, 27 · Verified</span></motion.div></div></motion.section>
    <section id="app" className="landing-section"><p className="eyebrow">A better way to meet</p><h2 className="display mt-2 text-4xl font-bold">Made for meaningful beginnings.</h2><div className="feature-grid mt-8"><motion.article className="feature-card" whileHover={{ y: -5 }}><span className="text-3xl text-[#ffc800]">✦</span><h3 className="mt-5 text-xl font-bold">Local and global</h3><p className="mt-2 text-sm text-stone-500">Start nearby, then discover genuine connections across borders.</p></motion.article><motion.article className="feature-card" whileHover={{ y: -5 }}><span className="text-3xl text-[#ffc800]">✓</span><h3 className="mt-5 text-xl font-bold">Safety first</h3><p className="mt-2 text-sm text-stone-500">Verification, reporting, and thoughtful community standards keep people real.</p></motion.article><motion.article className="feature-card" whileHover={{ y: -5 }}><span className="text-3xl text-[#ffc800]">♥</span><h3 className="mt-5 text-xl font-bold">Intentional dating</h3><p className="mt-2 text-sm text-stone-500">Show what you want and find people who are looking for the same thing.</p></motion.article></div></section>
    <section id="about" className="landing-section grid gap-10 md:grid-cols-2 md:items-center"><div><p className="eyebrow">Built for real life</p><h2 className="display mt-2 text-4xl font-bold">A good connection should feel close to home.</h2><p className="mt-4 leading-7 text-stone-500">From a first message to a first coffee nearby, KLA Meet gives you the tools to move at your own pace.</p></div><img className="h-[360px] w-full rounded-[24px] object-cover" src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&q=85" alt="Friends talking together" /></section>
    <section className="landing-section"><p className="eyebrow">The community says</p><div className="mt-5 flex gap-4 overflow-x-auto"><blockquote className="min-w-[280px] rounded-[24px] bg-[#f8f8f8] p-6 text-lg font-bold">“I found someone who actually wanted the same things I did.”<footer className="mt-4 text-sm font-normal text-stone-500">Amina, London</footer></blockquote><blockquote className="min-w-[280px] rounded-[24px] bg-[#f8f8f8] p-6 text-lg font-bold">“The verification makes starting a conversation feel easier.”<footer className="mt-4 text-sm font-normal text-stone-500">Daniel, Toronto</footer></blockquote></div></section>
    <LiveTicker />
      <HowItWorks />
      <TrustBar />
      <FinalCTA />
      <Footer />
  </div>
 
 
 
 
</div>
}

function DiscoverHome() {
  const [profiles, setProfiles] = useState(fallbackProfiles)
  const [index, setIndex] = useState(0)
  useEffect(() => { supabase.from('profiles').select('*').limit(30).then(({ data }) => { if (data?.length) setProfiles(data.map(normalizeProfile).filter(profile => profile.photos.length)) }) }, [])
  const current = profiles[index % profiles.length]
  return <div className="app-shell"><header className="topbar"><Link href="/" className="brand">KLA<span className="brand-mark">•</span>MEET</Link><Link href="/profile" className="icon-button" aria-label="Open profile">○</Link></header><main className="content animate-page"><section className="mb-6"><p className="eyebrow">Good morning</p><h1 className="display mt-1 text-3xl font-bold">Meet someone worth meeting.</h1></section><section className="mb-3"><div className="mb-3 flex items-center justify-between"><p className="eyebrow">Your daily pick</p><span className="text-xs font-bold text-stone-400">{index + 1} / {profiles.length}</span></div><ProfileCard profile={current} onAction={() => setIndex(value => value + 1)} /></section><div className="action-row"><motion.button whileTap={{ scale:.95 }} whileHover={{ scale: 1.02 }} className="round-action" onClick={() => setIndex(value => value + 1)} aria-label="Pass">✕</motion.button><motion.button whileTap={{ scale:.95 }} whileHover={{ scale: 1.02 }} className="round-action primary" onClick={() => setIndex(value => value + 1)} aria-label="Like">♥</motion.button></div><SectionRow title="Recommended for you" icon="✦" profiles={profiles.slice(1)} /></main><BottomNav /></div>
}

export default function Home() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)
  useEffect(() => { supabase.auth.getUser().then(({ data }) => setAuthenticated(Boolean(data.user))); const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => setAuthenticated(Boolean(session))); return () => listener.subscription.unsubscribe() }, [])
  if (authenticated === null) return <main className="min-h-screen bg-white" />
  return authenticated? <DiscoverHome /> : <Landing />
}