'use client'

import Link from 'next/link'

const photos = [
  'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=85',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=85',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=85',
]

export default function Welcome() {
  return (
    <main className="min-h-screen bg-[#111111] text-white md:flex md:justify-center">
      <div className="relative min-h-screen w-full max-w-[480px] overflow-hidden bg-[#111111] shadow-2xl">
        <section className="relative h-[60vh] min-h-[530px] overflow-hidden bg-[#FFC800] px-6 pt-7">
          <div className="absolute -right-28 -top-24 h-[360px] w-[360px] rounded-full bg-[#FFD740]/40" />
          <div className="relative z-10">
            <p className="text-[26px] font-bold leading-none tracking-[-1.5px]">KLA</p>
            <p className="mt-6 text-[14px] font-medium">Meet someone worth meeting.</p>
            <div className="mt-14">
              <p className="text-[13px] font-medium tracking-[2px] text-black/45">MADE FOR KAMPALA</p>
              <h1 className="mt-3 max-w-[330px] text-[42px] font-bold leading-[38px] tracking-[-2px]">Good people. Better dates.</h1>
              <p className="mt-4 max-w-[280px] text-[13px] leading-[18px] text-white/90">Make space for a connection that feels easy, genuine, and close to home.</p>
            </div>
            <div className="mt-6 flex h-[160px] items-start justify-center gap-2.5">
              <img className="mt-6 h-[140px] w-[90px] rotate-[-4deg] rounded-[18px] border border-white/20 object-cover shadow-xl" src={photos[0]} alt="KLA Meet member" />
              <img className="-mt-2 h-[160px] w-[100px] rotate-[1deg] rounded-[18px] border border-white/20 object-cover shadow-xl" src={photos[1]} alt="KLA Meet member" />
              <img className="mt-8 h-[130px] w-[90px] rotate-[5deg] rounded-[18px] border border-white/20 object-cover shadow-xl" src={photos[2]} alt="KLA Meet member" />
            </div>
          </div>
        </section>
        <section className="min-h-[40vh] bg-[#111111] px-6 pb-5 pt-8">
          <p className="text-[12px] tracking-[2px] text-white/40">WELCOME IN</p>
          <h2 className="mt-3 text-[32px] font-bold leading-[34px] tracking-[-1.2px]">Your next hello starts here.</h2>
          <div className="mt-5 space-y-3">
            <input className="w-full rounded-full border border-white/20 bg-[#1E1E1E] px-5 py-3.5 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#FFC800]" placeholder="Email or phone number" aria-label="Email or phone number" />
            <Link className="block w-full rounded-full bg-white py-3.5 text-center text-sm font-bold text-[#111111] transition-transform hover:scale-[1.02] active:scale-[.98]" href="/app">Continue</Link>
            <Link className="block w-full rounded-full bg-[#FFC800] py-3.5 text-center text-sm font-bold text-[#111111] transition-transform hover:scale-[1.02] active:scale-[.98]" href="/premium">PREMIUM</Link>
          </div>
          <nav className="mt-7 flex items-center justify-between text-white/55" aria-label="Quick navigation">
            <button className="text-2xl" aria-label="Back">←</button>
            <button className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-[#67D8FF] to-[#336BFF] text-xl text-white shadow-lg" aria-label="AI assistant">✦</button>
            <button className="text-2xl" aria-label="Dice">⚄</button>
            <button className="text-2xl" aria-label="Home">⌂</button>
          </nav>
          <div className="mt-3 flex justify-center gap-1.5"><span className="h-1 w-5 rounded-full bg-[#FFC800]" /><span className="h-1 w-1 rounded-full bg-white/30" /><span className="h-1 w-1 rounded-full bg-white/30" /></div>
        </section>
      </div>
    </main>
  )
}
