import About from './About';
import HowItWorks from './HowItWorks';
import Safety from './Safety';
import Pricing from './Pricing';
import Faqs from './Faqs';

export default function Landing({ onEnter, onCrypto, onPesapal, form, setForm, agreed, setAgreed, onSignin, onSignup }){
  return (
    <div className="min-h-screen bg-white text-black">
      {/* HEADER - ONE LINK */}
      <header className="bg-black text-white px-4 py-3 flex justify-between items-center sticky top-0 z-50">
        <h1 className="font-black text-[12px]">KLA-MEET • Uganda</h1>
        <div className="flex gap-2">
          <button onClick={()=>document.getElementById('signin-box')?.scrollIntoView({behavior:'smooth'})} className="bg-zinc-800 text-white px-4 py-2 rounded-full font-bold text-[11px]">Sign In</button>
          <button onClick={onEnter} className="bg-[#FFC300] text-black px-4 py-2 rounded-full font-bold text-[11px]">Enter App →</button>
        </div>
      </header>

      {/* HERO */}
      <div className="max-w-md mx-auto px-6 pt-8">
        <h2 className="text-[36px] font-black leading-[0.9]">Make New Friends<br/>Near You<br/>in Uganda.</h2>
        <p className="text-[11px] bg-black text-white px-3 py-2 rounded-full font-bold inline-block mt-3">Kampala • Entebbe • Jinja • Arua • Safe</p>
        <p className="text-[11px] text-zinc-600 mt-3 leading-relaxed">Real profiles, nearby friends, safe chat. 18+ only. No fake.</p>
      </div>

      {/* YOUR 5 CARDS - exact format you use */}
      <div className="max-w-md mx-auto mt-6 space-y-4">
        <About />
        <HowItWorks />
        <Safety />
        <div className="mx-6">
          <div className="overflow-x-auto pb-2">
            <Pricing onCrypto={onCrypto} onPesapal={onPesapal} />
          </div>
        </div>
        <div className="mx-6"><Faqs /></div>
      </div>

      {/* AUTH BOXES - inside same landing, same link */}
      <div className="max-w-md mx-auto p-6 space-y-4">
        <div id="signin-box" className="bg-zinc-900 text-white rounded-[24px] p-5">
          <h3 className="font-black text-sm">Welcome Back</h3>
          <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" className="mt-3 w-full bg-zinc-800 rounded-full px-4 py-3 text-[12px]" />
          <input value={form.password} onChange={e=>setForm({...form,password:e.target.value})} type="password" placeholder="Password" className="mt-2 w-full bg-zinc-800 rounded-full px-4 py-3 text-[12px]" />
          <button onClick={onSignin} className="mt-3 w-full bg-[#FFC300] text-black rounded-full py-3 font-black text-[12px]">Sign In & Enter App</button>
        </div>

        <div id="signup-box" className="bg-[#FFC300] rounded-[24px] p-5">
          <h3 className="font-black text-sm">Create Profile</h3>
          <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Full Name" className="mt-3 w-full bg-white rounded-full px-4 py-3 text-[12px]" />
          <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" className="mt-2 w-full bg-white rounded-full px-4 py-3 text-[12px]" />
          <input value={form.password} onChange={e=>setForm({...form,password:e.target.value})} type="password" placeholder="Password 8+ chars" className="mt-2 w-full bg-white rounded-full px-4 py-3 text-[12px]" />
          <div className="mt-3 bg-black rounded-xl p-3 flex gap-2">
            <input type="checkbox" checked={agreed} onChange={e=>setAgreed(e.target.checked)} className="w-5 h-5" />
            <p className="text-[10px] text-white">I confirm I am 18+ and agree to Privacy & Terms</p>
          </div>
          <button onClick={onSignup} disabled={!agreed} className={`mt-3 w-full rounded-full py-3 font-black text-[12px] ${agreed?'bg-black text-white':'bg-zinc-400'}`}>Create Account</button>
        </div>
      </div>

      <footer className="py-8 text-center text-[10px] text-zinc-500 border-t">
        <a href="/privacy" className="underline mx-2">Privacy</a> | <a href="/terms" className="underline mx-2">Terms</a> | <a href="/guidelines" className="underline mx-2">Guidelines</a>
        <p className="mt-2">© 2026 KLA-MEET • 0755606000 • kla.meet.ug@gmail.com</p>
      </footer>
    </div>
  )
}