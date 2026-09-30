import About from './About';
import HowItWorks from './HowItWorks';
import Safety from './Safety';
import Pricing from './Pricing';
import Faqs from './Faqs';

export default function Landing({ onEnter }){
  return (
    <div className="min-h-screen bg-white pb-10">
      {/* TOP BAR */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b px-6 py-3 flex justify-between items-center">
        <h1 className="font-black text-[14px]">KLA-MEET • UG</h1>
        <button onClick={onEnter} className="bg-black text-white px-4 py-2 rounded-full font-black text-[11px]">Enter App →</button>
      </div>

      {/* HERO */}
      <div className="px-6 pt-8 text-center">
        <h2 className="font-black text-[28px] leading-[1.1]">Make Real Friends<br/>in <span className="text-[#FFC300] bg-black px-2 rounded-full">Kampala</span></h2>
        <p className="text-[11px] text-zinc-600 mt-3 max-w-[320px] mx-auto leading-relaxed">
          Uganda's safe 18+ friendship community. Verified profiles, nearby friends, private chat. No fake, no adult content.
        </p>
        <button onClick={onEnter} className="mt-5 w-full max-w-[300px] bg-[#FFC300] text-black py-4 rounded-full font-black text-[13px]">Open App - Free</button>
        <p className="text-[9px] mt-2 text-zinc-400">18+ Only • 0755606000 • kla.meet.ug@gmail.com</p>
      </div>

      {/* YOUR 5 CARDS - in order, same style as your screenshot */}
      <div className="mt-8 space-y-5">
        <About />
        <HowItWorks />
        <Safety />

        {/* Pricing - needs horizontal scroll like your format */}
        <div className="mx-6">
          <h3 className="font-black text-sm mb-3">💳 Premium</h3>
          <div className="overflow-x-auto">
            <Pricing />
          </div>
          <p className="text-[9px] mt-2 text-zinc-500">Unlock chat via Crypto $2.99 or Pesapal UGX. Contact support after payment.</p>
        </div>

        <div className="mx-6">
          <Faqs />
        </div>
      </div>

      {/* FOOTER - all same domain */}
      <div className="mt-10 border-t mx-6 pt-6 text-center">
        <div className="flex justify-center gap-3 flex-wrap text-[10px] font-bold">
          <a href="/privacy" className="underline">Privacy</a>
          <a href="/terms" className="underline">Terms</a>
          <a href="/guidelines" className="underline">Guidelines</a>
          <a href="mailto:kla.meet.ug@gmail.com" className="underline">Support</a>
        </div>
        <p className="text-[9px] text-zinc-400 mt-3">© 2026 KLA-MEET Uganda. One link: kla-meet.vercel.app - Landing + App together.</p>
        <button onClick={onEnter} className="mt-5 bg-black text-white px-6 py-3 rounded-full font-black text-[11px] w-full">Enter App Now</button>
      </div>
    </div>
  )
}