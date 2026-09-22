'use client';
import Link from 'next/link'
import HowItWorks from '@/components/HowItWorks'
import AnimatedWorldPeek from '@/components/AnimatedWorldPeek'

const photos = [
  'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=85',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=85',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=85',
]
export default function Home() {
  return (
    <main style={{ backgroundColor: 'black' }} className="min-h-screen md:flex md:justify-center">
      <div className="relative min-h-screen w-full max-w-[480px] overflow-hidden bg-[#111111] shadow-2xl flex flex-col">
        <section style={{ backgroundColor: '#FFC629', color: 'black' }} className="relative px-6 pt-7 pb-8">
          <div className="relative z-10">
            <p className="text-[26px] font-bold leading-none tracking-[-1.5px]">KLA</p>
            <p className="mt-6 text-[14px] font-medium">Meet someone worth meeting.</p>
            <div className="mt-12">
              <p className="text-[11px] font-bold tracking-[2px] text-black/45">MADE FOR REAL CONNECTIONS</p>
              <h1 className="mt-3 max-w-[330px] text-[42px] font-bold leading-[38px] tracking-[-2px]">Good people. Better dates.</h1>
              <p className="mt-4 max-w-[280px] text-[13px] leading-[18px] text-white/90">Make space for a connection that feels easy, genuine, and close to home.</p>
            </div>
            {/* SMALLER FIXED PHOTOS */}
            <div className="mt-8 flex h-[110px] items-end justify-center gap-3">
              <img className="h-[86px] w-[64px] rotate-[-4deg] rounded-[14px] border border-white/20 object-cover shadow-xl" src={photos[0]} alt="" />
              <img className="h-[102px] w-[74px] rotate-[1deg] rounded-[14px] border border-white/20 object-cover shadow-xl" src={photos[1]} alt="" />
              <img className="h-[82px] w-[62px] rotate-[5deg] rounded-[14px] border border-white/20 object-cover shadow-xl" src={photos[2]} alt="" />
            </div>
          </div>
        </section>

        {/* YOU WERE MISSING THESE - NOW VISIBLE */}
        <div className="bg-white">
          <AnimatedWorldPeek />
          <HowItWorks />
        </div>

        <section style={{ backgroundColor: 'black', color: 'white' }} className="px-6 pb-5 pt-8 flex-1 flex flex-col">
          <p className="text-[11px] tracking-[2px] text-white/40">WELCOME IN</p>
          <h2 className="mt-3 text-[32px] font-bold leading-[34px] tracking-[-1.2px]">Your next hello starts here.</h2>
          <div className="mt-5 space-y-3">
            <Link className="block w-full rounded-full bg-white py-3.5 text-center text-sm font-bold text-[#111111] btn-premium" href="/auth">Continue</Link>
            <Link className="block w-full rounded-full bg-[#FFC800] py-3.5 text-center text-sm font-bold text-[#111111] btn-premium" href="/premium">PREMIUM</Link>
          </div>
          <div style={{marginTop:24, background:"#FFD60A", marginLeft:-24, marginRight:-24, padding:"14px 24px", color:"#000"}}>
            <div style={{display:"flex", justifyContent:"center", gap:16, fontSize:12, fontWeight:800}}>
              <Link href="/safety" style={{color:"#000"}}>SAFETY</Link><span>•</span>
              <Link href="/guidelines" style={{color:"#000"}}>GUIDELINES</Link><span>•</span>
              <Link href="/terms" style={{color:"#000"}}>TERMS</Link>
            </div>
            <p style={{marginTop:6, textAlign:"center", fontSize:10, opacity:0.6}}>KLA-MEET © 2026</p>
          </div>
          {/* ONLY NAV - will not repeat on other pages */}
          <div style={{marginTop:16, background:"#1E1E1E", borderRadius:32, padding:"8px", display:"flex", gap:6}}>
            <Link href="/discover" style={{flex:1, background:"#fff", borderRadius:24, padding:"10px", textAlign:"center", color:"#000", textDecoration:"none", fontSize:11, fontWeight:800}}>⌂ Discover</Link>
            <Link href="/matches" style={{flex:1, background:"transparent", borderRadius:24, padding:"10px", textAlign:"center", color:"#fff", textDecoration:"none", fontSize:11}}>♥ Match</Link>
            <Link href="/messages" style={{flex:1, background:"transparent", borderRadius:24, padding:"10px", textAlign:"center", color:"#fff", textDecoration:"none", fontSize:11}}>◍ Msgs</Link>
            <Link href="/profile" style={{flex:1, background:"transparent", borderRadius:24, padding:"10px", textAlign:"center", color:"#fff", textDecoration:"none", fontSize:11}}>○ Profile</Link>
          </div>
        </section>
      </div>
    </main>
  )
}