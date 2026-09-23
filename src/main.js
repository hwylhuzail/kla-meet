import './style.css'
import { home } from './pages/home.js'
import { onboarding } from './pages/onboarding.js'
function render(){
 const p = location.pathname
 const step = new URLSearchParams(location.search).get('step') || '1'
 const app = document.getElementById('app')
 if(p.includes('signup')||p.includes('signin')||p.includes('login')){
   app.innerHTML = onboarding(parseInt(step))
 } else {
   app.innerHTML = home()
 }
}
render()
window.addEventListener('popstate',render)
document.addEventListener('click',(e)=>{
 const a=e.target.closest('a[href^="/"]')
 if(!a) return
 e.preventDefault()
 history.pushState(null,'',a.href)
 render()
})
