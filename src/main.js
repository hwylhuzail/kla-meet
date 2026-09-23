import './style.css'
import { home } from './pages/home.js'
import { onboarding } from './pages/onboarding.js'
import { discover } from './pages/discover.js'
import { premium } from './pages/premium.js'
import { authPage } from './pages/auth.js'
import { supabase } from './lib/supabase.js'
function render(){
 const p=location.pathname
 const step=new URLSearchParams(location.search).get('step')||'1'
 const app=document.getElementById('app')
 if(p.includes('signup')) app.innerHTML=onboarding(step)
 else if(p.includes('login')) app.innerHTML=authPage('login')
 else if(p.includes('discover')||p.includes('near')) app.innerHTML=discover()
 else if(p.includes('premium')) app.innerHTML=premium()
 else if(p.includes('chat')) app.innerHTML=`<div class="p-10 text-center"><h1 class="font-black">Chat is Premium</h1><a href="/premium/" class="mt-4 inline-block bg-[#FFC700] border-2 border-black px-6 py-2 rounded-full font-black text-[12px]">Go Premium 20K</a></div>`
 else if(p.includes('about')||p.includes('safety')) app.innerHTML=`<div class="p-8 max-w-[600px] mx-auto"><a href="/" class="font-black">← KLA-MEET</a><h1 class="mt-4 font-black text-[24px]">${p.replace(/\//g,'')}</h1><p class="mt-2 text-[13px] text-zinc-600">International community.</p></div>`
 else app.innerHTML=home()
 const authBtn=document.getElementById('authBtn')
 if(authBtn) authBtn.onclick=async()=>{
  const e=document.getElementById('email').value
  const pw=document.getElementById('pass').value
  const m=document.getElementById('authMsg')
  if(!supabase){ m.innerText='Add Supabase env in Vercel'; return }
  try{
   if(p.includes('signup')){ const {error}=await supabase.auth.signUp({email:e,password:pw}); if(error) throw error; m.innerText='Created! Check email'; setTimeout(()=>location.href='/signup/?step=1',1000)}
   else { const {error}=await supabase.auth.signInWithPassword({email:e,password:pw}); if(error) throw error; location.href='/discover/'}
  }catch(err){ m.innerText=err.message }
 }
 const payBtn=document.getElementById('payBtn')
 if(payBtn) payBtn.onclick=()=>{ localStorage.setItem('kla_premium','standard'); alert('PesaPal demo: 20K unlocked'); location.href='/discover/' }
}
render()
window.addEventListener('popstate',render)
document.addEventListener('click',e=>{ const a=e.target.closest('a[href^="/"]'); if(!a) return; e.preventDefault(); history.pushState(null,'',a.href); render() })
