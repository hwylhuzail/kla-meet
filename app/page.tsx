"use client";

import Link from "next/link";
import { ArrowRight, Heart, MessageCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const profiles = [
  { name: "Amara", alt: "Black woman with natural hair smiling", image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=600&q=85" },
  { name: "Jay", alt: "Black man wearing glasses outdoors", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=85" },
  { name: "Nour", alt: "Woman smiling in a warm portrait", image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=600&q=85" },
  { name: "Sofia", alt: "White woman with a bright smile", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=85" },
  { name: "Mila & Kai", alt: "Black couple laughing together", image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?auto=format&fit=crop&w=600&q=85" },
  { name: "The Sunday crew", alt: "Diverse group of friends smiling together", image: "https://images.unsplash.com/photo-1522556189639-b150ed9c4330?auto=format&fit=crop&w=600&q=85" },
];

const steps = [
  { icon: Sparkles, number: "01", title: "Discover", text: "Meet people who share your pace, values, and curiosity." },
  { icon: MessageCircle, number: "02", title: "Say Hi", text: "Start with something real. A thoughtful hello goes a long way." },
  { icon: Heart, number: "03", title: "Connect", text: "Take it beyond the screen when the feeling is mutual." },
];

function ProfileCards() {
  return <div className="mx-auto mt-10 grid max-w-[600px] grid-cols-3 justify-items-center gap-4">
    {profiles.map((profile, index) => <motion.div key={profile.name} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08, duration: 0.5 }} whileHover={{ y: -8 }} className="h-[200px] w-full overflow-hidden rounded-[20px] border-4 border-white bg-white shadow-[0_20px_40px_rgba(0,0,0,0.1)] md:h-[260px]">
      <img src={profile.image} alt={profile.alt} className="h-full w-full object-cover object-top" />
    </motion.div>)}
  </div>;
}

export default function Page() {
  return <main className="bg-gradient-to-b from-yellow-100/60 to-white text-zinc-900">
    <div className="mx-auto max-w-6xl px-6">
      <header className="flex items-center justify-between py-6"><Link href="/" className="text-xl font-black tracking-[-0.08em]">KLA<span className="text-[#FFC629]">•</span>MEET</Link><nav className="flex items-center gap-3 text-sm font-semibold sm:gap-6"><Link href="/auth" className="rounded-full border border-zinc-200 bg-white px-4 py-3 text-black transition hover:bg-zinc-50">Sign In</Link><Link href="/auth" className="rounded-full bg-[#FFC629] px-5 py-3 font-bold text-black transition hover:bg-yellow-400">Get Started</Link></nav></header>
      <section className="flex flex-col items-center justify-center py-16 text-center lg:py-24"><motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="flex w-full flex-col items-center"><p className="mb-6 text-xs font-bold uppercase tracking-[0.25em] text-zinc-900"><span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#FFC629]" />REAL CONNECTIONS <span className="text-zinc-400">•</span> WORLDWIDE</p><h1 className="mx-auto max-w-3xl text-center text-[clamp(3rem,7vw,5rem)] font-black leading-[0.98] tracking-[-0.06em] text-zinc-900">Make the first move, anywhere.</h1><p className="mx-auto mt-7 max-w-2xl text-center text-lg leading-8 text-zinc-600">Meet thoughtful people nearby and around the world, with safety and authenticity built into every hello.</p><Link href="/auth" className="group mx-auto mt-9 inline-flex items-center gap-3 rounded-full bg-[#FFC629] px-8 py-4 font-bold text-black transition hover:bg-yellow-400">Get Started — It&apos;s Free <ArrowRight size={18} className="transition group-hover:translate-x-1" /></Link><span className="mt-4 text-sm text-zinc-500">No pressure. Just possibility.</span><ProfileCards /><div className="mt-12 flex flex-col items-center justify-center gap-4 text-center"><div className="flex gap-2">{profiles.slice(0, 4).map((item) => <img key={item.name} src={item.image} alt={item.alt} className="h-10 w-10 rounded-full border-2 border-white object-cover" />)}</div><div><div className="flex flex-wrap items-center justify-center gap-2 text-sm font-semibold"><span>Trusted by 10,000+ real people worldwide</span><span className="text-[#FFC629]">★★★★★</span></div><p className="mt-1 text-xs text-zinc-500">Rated 4.9/5 by people making real connections</p></div></div></motion.div></section>
      <section className="border-t border-[#eee8d8] bg-[#faf8f3] px-6 py-20 text-center lg:py-28"><div className="mx-auto max-w-5xl"><div className="mb-12 flex flex-col items-center justify-center gap-5"><div><p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-zinc-600">HOW IT WORKS</p><h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">A better way to meet.</h2></div><p className="mx-auto max-w-sm text-sm leading-6 text-zinc-500">Thoughtful by design, easy to use, and made for the kind of connection that lasts.</p></div><div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">{steps.map(({ number, title, text }) => <motion.article key={title} whileHover={{ y: -5 }} className="rounded-2xl border border-zinc-100 bg-white p-6 text-center shadow-sm"><div className="mb-8 grid h-11 w-11 place-items-center rounded-full bg-[#FFC629] text-sm font-black text-black">{number}</div><h3 className="text-xl font-bold text-black">{title}</h3><p className="mt-3 text-sm leading-6 text-zinc-500">{text}</p></motion.article>)}</div></div></section>
      <footer className="flex flex-col items-center justify-center gap-5 bg-white px-6 py-10 text-center text-sm text-zinc-500"><p className="font-black tracking-[-0.06em] text-zinc-900">KLA<span className="text-[#FFC629]">•</span>MEET</p><div className="flex gap-5"><Link href="/safety" className="hover:text-zinc-900">Safety</Link><Link href="/privacy" className="hover:text-zinc-900">Privacy</Link><Link href="/terms" className="hover:text-zinc-900">Terms</Link></div><p>© {new Date().getFullYear()} KLA-MEET</p></footer>
    </div>
  </main>;
}
