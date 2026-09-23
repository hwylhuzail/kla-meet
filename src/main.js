import './style.css'
import { home } from './pages/home.js'
import { onboarding } from './pages/onboarding.js'
function router(){
 const p=location.pathname
 const sp=new URLSearchParams(location.search)
 const step=parseInt(sp.get('step')||'1')
 if(p.includes('/signup')||p.includes('/signin')){document.getElementById('app').innerHTML=onboarding(step); return}
 if(p.includes('/about')){document.getElementById('app').innerHTML='<div class="p-12 max-w-3xl mx-auto"><h1 class="text-3xl font-black">About KLA-MEET</h1><p class="mt-4">Made for Kampala.</p><a href="/" class="mt-4 inline-block font-bold underline">Home</a></div>';return}
 document.getElementById('app').innerHTML=home()
}
router()
window.addEventListener('popstate',router)
