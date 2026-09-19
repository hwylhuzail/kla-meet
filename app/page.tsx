'use client';

export const dynamic = 'force-dynamic';




import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Heart, MessageCircle, Sparkles, Compass, Globe, Users, Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const profiles = [
  { name: "Maya", detail: "Curious mind · Loves long walks", image: "https://i.pravatar.cc/640?img=47" },
  { name: "Jordan", detail: "Designs things · Finds the good coffee", image: "https://i.pravatar.cc/640?img=12" },
  { name: "Ari", detail: "Weekend maker · Always up for a new story", image: "https://i.pravatar.cc/640?img=32" },
];

const steps = [
  { icon: Sparkles, number: "01", title: "Discover", text: "Meet people who share your pace and values." },
  { icon: MessageCircle, number: "02", title: "Say Hi", text: "Start with something real. A thoughtful hello goes far." },
  { icon: Heart, number: "03", title: "Connect", text: "Take it beyond the screen when the feeling is mutual." },
];

const exploreFeatures = [
  { icon: Globe, title: "Worldwide", desc: "Browse people from Kampala to Tokyo. Filter by country." },
  { icon: Search, title: "Smart Filters", desc: "Find by interests, language, and what you're looking for." },
  { icon: Users, title: "Live Now", desc: "See who's online now in Discover and start chatting." },
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
      <div className="absolute -inset-6 rounded-[3rem] bg-yellow-300/10 blur-2xl" />
      <div className="relative h-[380px] rounded-[24px] border-[8px] border-zinc-800 bg-zinc-900 p-1 shadow-xl">
        <div className="relative h-full overflow-hidden rounded-[16px] bg-zinc-100">
          <AnimatePresence mode="wait">
            <motion.div key={p.name} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.45 }} className="absolute inset-0">
              <img src={p.image} alt={p.name} className="h-[62%] w-full object-cover" />
              <div className="absolute inset-x-0 top-[45%] h-24 bg-gradient-to-b from-transparent to-zinc-100" />
              <div className="absolute inset-x-4 bottom-[72px]">
                <h3 className="text-xl font-bold text-zinc-950">{p.name}, 28</h3>
                <p className="text-xs text-zinc-600">{p.detail}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <main style={{ backgroundColor: 'black', color: 'white' }} className="min-h-screen overflow-hidden">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Link href="/" className="text-xl font-black tracking-[-0.08em]">KLA<span className="text-[#FFC629]">•</span>MEET</Link>
        <nav className="flex items-center gap-2 text-sm font-semibold">
          <a href="#explore" onClick={(e) => { e.preventDefault(); document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' }); }} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-zinc-200 hover:bg-white/10"><Compass size={16}/> Explore</a>
          <Link href="/auth" className="rounded-full bg-[#FFC629] px-5 py-3 text-zinc-950 hover:bg-yellow-300">Get Started</Link>
        </nav>
      </header>

      <section style={{ backgroundColor: 'yellow', color: 'black' }} className="mx-auto grid max-w-7xl items-center gap-10 px-6 pb-20 pt-10 lg:grid-cols-[1fr_0.8fr] lg:px-10 lg:pt-20">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.25em] text-[#FFC629]">REAL CONNECTIONS • WORLDWIDE</p>
          <h1 className="max-w-3xl text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-[0.98] tracking-[-0.06em]">Make the first move, anywhere.</h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-zinc-400">Meet thoughtful people nearby and around the world, with safety built in.</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/auth" className="group inline-flex items-center gap-3 rounded-full bg-[#FFC629] px-7 py-3.5 font-bold text-zinc-950 hover:bg-yellow-300">Get Started <ArrowRight size={18} className="group-hover:translate-x-1 transition"/></Link>
            <a href="#explore" onClick={(e) => { e.preventDefault(); document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' }); }} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-7 py-3.5 font-bold backdrop-blur hover:bg-white/10"><Compass size={18}/> Explore</a>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale:.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration:.8, delay:.15 }}><PhonePreview/></motion.div>
      </section>

      {/* EXPLORE INFO ONLY ON WELCOME PAGE */}
      <section id="explore" style={{ backgroundColor: 'black', color: 'white' }} className="border-t border-white/10 px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#FFC629]"><Compass size={14}/> EXPLORE</p>
              <h2 className="text-4xl font-black tracking-tight leading-[0.95]">Explore worldwide,<br/><span className="text-[#FFC629]">without leaving home.</span></h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-zinc-400">The Explore experience lives here on the welcome page. Discover people across countries and cities, then jump into Discover feed.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {exploreFeatures.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-white text-black"><Icon size={18}/></div>
                <h3 className="mt-6 text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-zinc-400">{desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/discover" className="inline-flex items-center gap-2 rounded-full bg-[#FFC629] px-7 py-3.5 font-bold text-zinc-950 hover:bg-yellow-300"><Compass size={18}/> Open Discover</Link>
            <Link href="/auth" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-bold hover:bg-white/10">Create Profile</Link>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-zinc-900/50 px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-7xl grid gap-4 md:grid-cols-3">
          {steps.map(({ icon: Icon, number, title, text }) => (
            <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"><div className="mb-8 flex items-center justify-between"><div className="grid h-11 w-11 place-items-center rounded-full bg-[#FFC629] text-black"><Icon size={18}/></div><span className="text-xs font-bold text-zinc-600">{number}</span></div><h3 className="text-xl font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-zinc-400">{text}</p></div>
          ))}
        </div>
      </section>

      <section style={{ backgroundColor: 'white', color: 'black' }} className="border-t-8 border-black px-6 py-16 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_1.4fr] md:items-center">
          <div><p className="text-sm font-black uppercase tracking-[0.2em]" style={{ color: 'crimson' }}>SAFETY FIRST</p><h2 className="mt-3 text-4xl font-black">Connection feels better when it feels safe.</h2></div>
          <p className="max-w-2xl text-base leading-7">We build KLA-MEET around thoughtful conversations, clear boundaries, and tools that help you stay in control. Take your time, trust your instincts, and report anything that does not feel right.</p>
        </div>
      </section>

      <footer style={{ backgroundColor: 'black', color: 'white' }} className="flex flex-col gap-5 px-6 py-10 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <p className="text-xl font-black tracking-[-0.08em]">KLA<span style={{ color: '#FFC629' }}>•</span>MEET</p>
        <nav className="flex flex-wrap gap-5 text-sm font-bold" aria-label="Footer"><a href="#explore">Explore</a><Link href="/safety">Safety</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></nav>
      </footer>
    </main>
  );
}
