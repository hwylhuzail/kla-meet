"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Heart, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const profiles = [
  { name: "Maya", detail: "Curious mind · Loves long walks", image: "https://i.pravatar.cc/640?img=47" },
  { name: "Jordan", detail: "Designs things · Finds the good coffee", image: "https://i.pravatar.cc/640?img=12" },
  { name: "Ari", detail: "Weekend maker · Always up for a new story", image: "https://i.pravatar.cc/640?img=32" },
];

const steps = [
  { icon: Sparkles, number: "01", title: "Discover", text: "Meet people who share your pace, values, and curiosity." },
  { icon: MessageCircle, number: "02", title: "Say Hi", text: "Start with something real. A thoughtful hello goes a long way." },
  { icon: Heart, number: "03", title: "Connect", text: "Take it beyond the screen when the feeling is mutual." },
];

function PhonePreview() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % profiles.length), 3200);
    return () => window.clearInterval(timer);
  }, []);
  const profile = profiles[active];
  return <div className="relative mx-auto w-[min(76vw,330px)] rotate-2 sm:w-[310px]">
    <div className="absolute -inset-8 rounded-[4rem] bg-yellow-300/10 blur-3xl" />
    <div className="relative aspect-[9/18.5] rounded-[3rem] border-[9px] border-zinc-800 bg-zinc-900 p-1 shadow-2xl shadow-black/60">
      <div className="absolute left-1/2 top-2 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-zinc-900" />
      <div className="relative h-full overflow-hidden rounded-[2.35rem] bg-zinc-100">
        <AnimatePresence mode="wait"><motion.div key={profile.name} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.45 }} className="absolute inset-0">
          <img src={profile.image} alt={`${profile.name}'s profile`} className="h-[68%] w-full object-cover" />
          <div className="absolute inset-x-0 top-[48%] h-40 bg-gradient-to-b from-transparent to-zinc-100" />
          <div className="absolute inset-x-5 bottom-20"><div className="mb-1 flex items-center gap-2"><h3 className="text-2xl font-bold text-zinc-950">{profile.name}, 28</h3><span className="grid h-5 w-5 place-items-center rounded-full bg-sky-500 text-[11px] text-white">✓</span></div><p className="text-sm text-zinc-600">{profile.detail}</p></div>
        </motion.div></AnimatePresence>
        <div className="absolute inset-x-5 bottom-5 flex justify-between"><button aria-label="Pass" className="grid h-12 w-12 place-items-center rounded-full bg-white text-zinc-800 shadow-lg"><span className="text-2xl">×</span></button><button aria-label="Like" className="grid h-12 w-12 place-items-center rounded-full bg-yellow-400 text-zinc-950 shadow-lg"><Heart size={20} fill="currentColor" /></button></div>
      </div>
    </div>
  </div>;
}

export default function Page() {
  return <main className="min-h-screen overflow-hidden bg-zinc-950 text-white">
    <div className="pointer-events-none absolute left-1/2 top-[-20rem] h-[38rem] w-[52rem] -translate-x-1/2 rounded-full bg-purple-900/25 blur-[120px]" />
    <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10"><Link href="/" className="text-xl font-black tracking-[-0.08em]">KLA<span className="text-yellow-400">•</span>MEET</Link><nav className="flex items-center gap-3 text-sm font-semibold sm:gap-6"><Link href="/auth" className="px-2 py-3 text-zinc-300 transition hover:text-white">Sign In</Link><Link href="/auth" className="rounded-full bg-yellow-400 px-5 py-3 text-zinc-950 transition hover:bg-yellow-300">Get Started</Link></nav></header>
    <section className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 pb-20 pt-14 lg:grid-cols-[1fr_0.8fr] lg:px-10 lg:pb-32 lg:pt-24"><motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}><p className="mb-6 text-xs font-bold uppercase tracking-[0.25em] text-yellow-400">REAL CONNECTIONS <span className="text-zinc-600">•</span> WORLDWIDE</p><h1 className="max-w-3xl text-[clamp(3rem,7vw,5rem)] font-black leading-[0.98] tracking-[-0.06em]">Make the first move, anywhere.</h1><p className="mt-7 max-w-xl text-lg leading-8 text-zinc-400">Meet thoughtful people nearby and around the world, with safety and authenticity built into every hello.</p><div className="mt-9 flex flex-wrap items-center gap-5"><Link href="/auth" className="group inline-flex items-center gap-3 rounded-full bg-yellow-400 px-8 py-4 font-bold text-zinc-950 transition hover:bg-yellow-300">Get Started — It&apos;s Free <ArrowRight size={18} className="transition group-hover:translate-x-1" /></Link><span className="text-sm text-zinc-500">No pressure. Just possibility.</span></div><div className="mt-12 flex items-center gap-4"><div className="flex -space-x-3">{profiles.map((item) => <img key={item.name} src={item.image} alt="" className="h-10 w-10 rounded-full border-2 border-zinc-950 object-cover" />)}</div><div><div className="flex flex-wrap items-center gap-2 text-sm font-semibold"><span>Trusted by 10,000+ real people worldwide</span><span className="text-yellow-400">★★★★★</span></div><p className="mt-1 text-xs text-zinc-500">Rated 4.9/5 by people making real connections</p></div></div></motion.div><motion.div initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .15 }} className="relative"><PhonePreview /><div className="absolute -bottom-3 left-0 hidden rounded-2xl border border-white/10 bg-zinc-900/90 p-4 shadow-xl backdrop-blur sm:block"><div className="flex items-center gap-3"><ShieldCheck className="text-yellow-400" size={22} /><div><p className="text-xs font-bold">Built for better hellos</p><p className="mt-1 text-xs text-zinc-500">Authenticity comes first</p></div></div></div></motion.div></section>
    <section className="relative border-t border-white/10 bg-zinc-900/50 px-6 py-20 lg:px-10 lg:py-28"><div className="mx-auto max-w-7xl"><div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-yellow-400">HOW IT WORKS</p><h2 className="text-3xl font-bold tracking-tight sm:text-4xl">A better way to meet.</h2></div><p className="max-w-sm text-sm leading-6 text-zinc-500">Thoughtful by design, easy to use, and made for the kind of connection that lasts.</p></div><div className="grid gap-4 md:grid-cols-3">{steps.map(({ icon: Icon, number, title, text }) => <motion.article key={title} whileHover={{ y: -5 }} className="border border-white/10 bg-zinc-950 p-7"><div className="mb-12 flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-full bg-yellow-400 text-zinc-950"><Icon size={20} /></span><span className="text-sm font-bold text-zinc-600">{number}</span></div><h3 className="text-xl font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-zinc-500">{text}</p></motion.article>)}</div></div></section>
    <footer className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-10 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between lg:px-10"><p className="font-black tracking-[-0.06em] text-white">KLA<span className="text-yellow-400">•</span>MEET</p><div className="flex gap-5"><Link href="/safety" className="hover:text-white">Safety</Link><Link href="/privacy" className="hover:text-white">Privacy</Link><Link href="/terms" className="hover:text-white">Terms</Link></div><p>© {new Date().getFullYear()} KLA-MEET</p></footer>
  </main>;
}
