'use client';
import Link from 'next/link'

const photos = [
  'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=85',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=85',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=85',
]

export default function Home() {
  return (
    <main className="min-h-screen bg-black md:flex md:justify-center">
      <div className="relative w-full max-w-[480px] bg-[#111111] flex flex-col">

        {/* TOP YELLOW */}
        <section className="bg-[#FFC629] px-6 pt-6 pb-8">
          <p className="text-[24px] font-black tracking-[-1.5px] text-black">KLA</p>
          <p className="mt-4 text-[13px] font-medium text-black/80">Meet someone worth meeting.</p>

          <div className="mt-10">
            <p className="text-[11px] font-bold tracking-[2px] text-black/40">MADE FOR REAL CONNECTIONS</p>
            <h1 className="mt-2 max-w-[300px] text-[38px] font-black leading-[34px] tracking-[-2px] text-black">Good people. Better dates.</h1>
            <p className="mt-3 max-w-[260px] text-[12.5px] leading-[17px] text-black/70">Make space for a connection that feels easy, genuine, and close to home.</p>
          </div>

          {/* SMALL FIXED PHOTOS - NO FLOAT, NO WEIRD PASS */}
          <div className="mt-8 flex items-end justify-center gap-3">
            <img src={photos[0]} alt="" className="h-[92px] w-[68px] rounded-[14px] object-cover border border-white/20 shadow-lg rotate-[-3deg]" />
            <img src={photos[1]} alt="" className="h-[108px] w-[76px] rounded-[14px] object-cover border border-white/20 shadow-xl rotate-[1deg] -mb-1" />
            <img src={photos[2]} alt="" className="h-[86px] w-[66px] rounded-[14px] object-cover border border-white/20 shadow-lg rotate-[3deg]" />
          </div>
        </section>

        {/* BOTTOM BLACK */}
        <section className="bg-black px-6 pt-8 pb-6 flex-1 flex flex-col">
          <p className="text-[10px] tracking-[2px] text-white/40">WELCOME IN</p>
          <h2 className="mt-3 text-[28px] font-bold leading-[30px] tracking-[-1px] text-white">Your next hello starts here.</h2>

          <div className="mt-6 space-y-3">
            <Link href="/auth" className="block w-full rounded-full bg-white py-3.5 text-center text-[14px] font-bold text-black btn-premium">
              Continue
            </Link>
            <Link href="/premium" className="block w-full rounded-full bg-[#FFC800] py-3.5 text-center text-[14px] font-bold text-black btn-premium">
              PREMIUM
            </Link>
          </div>

          <div className="mt-auto -mx-6 mt-8 bg-[#FFD60A] px-6 py-3">
            <div className="flex justify-center gap-4 text-[11px] font-black text-black">
              <Link href="/safety">SAFETY</Link><span>•</span>
              <Link href="/guidelines">GUIDELINES</Link><span>•</span>
              <Link href="/terms">TERMS</Link>
            </div>
            <p className="mt-1 text-center text-[9px] opacity-60 text-black">KLA-MEET © 2026</p>
          </div>
        </section>

      </div>
    </main>
  )
}