"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Heart, MessageCircle, ShieldCheck, Sparkles, Compass, Globe, Users, Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const profiles = [
  { name: "Maya", detail: "Curious mind · Loves long walks", image: "https://i.pravatar.cc/640?img=47" },
  { name: "Jordan", detail: "Designs things · Finds the good coffee", image: "https://i.pravatar.cc/640?img=12" },
];

const exploreFeatures = [
  { icon: Globe, title: "Worldwide Discovery", desc: "Browse people from Kampala to Tokyo. Filter by country or city." },
  { icon: Search, title: "Smart Filters", desc: "Find by interests, language, and what you're looking for." },
  { icon: Users, title: "Live & Active", desc: "See who's online now and start a real conversation instantly." },
];

function PhonePreview() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive(c => (c+1)%profiles.length), 3200);
    return () => clearInterval(t);
  }, []);
  const p = profiles[active];
  return (
    <div className="relative mx-auto w-[280px]">
      <div className="relative h-[380px] rounded-[24px] border-[8px] border-zinc-800 bg-zinc-900 p-1">
        <div className="relative h-full overflow-hidden rounded-[16px] bg-zinc-100">
          <AnimatePresence mode="wait">
            <motion.div key={p.name} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="absolute inset-0">
              <img src={p.image} alt={p.name} className="h-[62%] w-full object-cover" />
              <div className="absolute inset-x-4 bottom-[72px]"><h3 className="text-xl font-bold text-zinc-950">{p.name}, 28</h3><p className="text-xs text-zinc-600">{p.detail}</p></div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link href="/" className="text-xl font-black">KLA<span className="text-[#FFC629]">•</span>MEET</Link>
        <nav className="flex items-center gap-3">
          <a href="#explore" className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm"> <Compass size={16}/> Explore </a>
          <Link href="/auth" className="rounded-full bg-[#FFC629] px-5 py-3 text-sm font-bold text-black">Get Started</Link>
        </nav>
      </header>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-2">
        <div>
          <h1 className="text-5xl font-black leading-[0.95]">Make the first move, anywhere.</h1>
          <p className="mt-6 text-zinc-400">Meet thoughtful people nearby and around the world.</p>
          <div className="mt-8 flex gap-3">
            <Link href="/auth" className="inline-flex items-center gap-2 rounded-full bg-[#FFC629] px-7 py-3.5 font-bold text-black">Get Started <ArrowRight size={18}/></Link>
            <a href="#explore" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-bold">Explore</a>
          </div>
        </div>
        <PhonePreview />
      </section>

      {/* EXPLORE INFO NOW ONLY ON WELCOME PAGE */}
      <section id="explore" className="border-t border-white/10 bg-[#111] px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold tracking-[0.25em] text-[#FFC629] flex items-center gap-2"><Compass size={14}/> EXPLORE</p>
          <h2 className="mt-3 text-4xl font-black">Explore worldwide,<br/><span className="text-[#FFC629]">without leaving home.</span></h2>
          <p className="mt-4 max-w-sm text-sm text-zinc-400">This is the Explore feature - now only on welcome page. No separate /explore page needed.</p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {exploreFeatures.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-white text-black"><Icon size={18}/></div>
                <h3 className="mt-6 font-bold">{title}</h3><p className="mt-2 text-sm text-zinc-400">{desc}</p>
              </div>
            ))}
          </div>
          <Link href="/auth" className="mt-8 inline-flex rounded-full bg-[#FFC629] px-7 py-3.5 font-bold text-black">Start Exploring Now</Link>
        </div>
      </section>
    </main>
  );
}