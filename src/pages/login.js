import { supabase } from '../lib/supabase.js'

export let loginMode = 'password'
export let onboardRef = {email:''}

export function renderLoginPage(appEl, footerHTML, onboard, callbacks){
  onboardRef = onboard
  document.getElementById('app').innerHTML=`
<div class="min-h-screen flex flex-col bg-white">
<div class="p-6 flex justify-between border-b"><a href="/" onclick="window.route(event,'/')" class="font-black text-xl">KLA•MEET</a><a href="/" onclick="window.route(event,'/')" class="text-xs underline">← Home</a></div>
<div class="flex-1 flex items-center justify-center p-6">
<div class="w-full max-w-[360px] border-2 border-black rounded-[30px] p-8 bg-white">
<h2 class="font-black text-2xl">Log in — /login</h2>
<p class="text-[11px] text-zinc-500 mt-1">Real Supabase activation code/link • ${window.location.host}/login/</p>

<div class="flex gap-2 mt-5">
<button onclick="window.setLoginMode('password')" id="tab-pass" class="flex-1 py-2.5 rounded-full text-xs font-black bg-black text-white">Password</button>
<button onclick="window.setLoginMode('code')" id="tab-code" class="flex-1 py-2.5 rounded-full text-xs font-bold bg-zinc-100">Activation Code</button>
</div>

<div id="login-form" class="mt-6"></div>
<div class="mt-6 text-center text-[11px]"><a href="/premium" onclick="window.route(event,'/premium')" class="underline font-bold">Premium $3.99 →</a></div>
</div>
</div>
${footerHTML}
</div>`
  window.setLoginMode(onboard.loginMode)
}

export function setLoginModeUI(mode, onboard){
  onboard.loginMode = mode
  const passBtn=document.getElementById('tab-pass')
  const codeBtn=document.getElementById('tab-code')
  if(passBtn) passBtn.className = mode==='password'? 'flex-1 py-2.5 rounded-full text-xs font-black bg-black text-white' : 'flex-1 py-2.5 rounded-full text-xs font-bold bg-zinc-100'
  if(codeBtn) codeBtn.className = mode==='code'? 'flex-1 py-2.5 rounded-full text-xs font-black bg-black text-white' : 'flex-1 py-2.5 rounded-full text-xs font-bold bg-zinc-100'
  const el=document.getElementById('login-form')
  if(!el) return
  if(mode==='password'){
    el.innerHTML=`<input id="email" placeholder="Email" class="w-full border-2 border-black rounded-xl px-4 py-3 text-sm"><input id="pass" type="password" placeholder="Password" class="w-full mt-3 border rounded-xl px-4 py-3 text-sm"><button onclick="window.doLogin()" class="mt-4 w-full bg-yellow-400 py-3.5 rounded-full font-black">Log in</button><button onclick="window.sendMagicLink()" class="mt-3 w-full bg-zinc-100 py-3 rounded-full text-xs font-bold">Send activation code/link →</button>`
  } else {
    el.innerHTML=`<input id="email" placeholder="Email" value="${onboard.email||''}" class="w-full border-2 border-black rounded-xl px-4 py-3 text-sm"><p class="text-[11px] mt-2 text-zinc-500">6-digit code sent via Supabase (real email)</p><button onclick="window.sendMagicLink()" class="mt-3 w-full bg-yellow-400 py-3.5 rounded-full font-black">Send Activation Code →</button><div class="mt-5 border-t pt-5"><input id="otp" placeholder="Enter code" class="w-full border-2 border-black rounded-xl px-4 py-3 text-center tracking-[6px]"><button onclick="window.verifyOtpLogin()" class="mt-3 w-full bg-black text-white py-3.5 rounded-full font-bold">Verify & Login</button></div>`
  }
}