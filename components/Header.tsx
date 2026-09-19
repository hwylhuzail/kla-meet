'use client'
import { useEffect, useState } from 'react'
export default function Header(){
  const [sc,setSc]=useState(false)
  const [dark,setDark]=useState(false)
  useEffect(()=>{
    const f=()=>setSc(window.scrollY>10)
    window.addEventListener('scroll',f)
    const isDark = document.documentElement.classList.contains('dark')
    setDark(isDark)
    return()=>window.removeEventListener('scroll',f)
  },[])
  const toggle=()=>{
    document.documentElement.classList.toggle('dark')
    setDark(!dark)
  }
  return (
    <header className={`sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-black/80 border-b border-zinc-100 dark:border-zinc-800 transition-all ${sc?'shadow-md':''}`}>
      <div className="flex items-center justify-between p-4 max-w-[520px] mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#FFC629] rounded-full grid place-items-center font-black text-black">K</div>
          <b className="dark:text-white">kla-meet</b>
        </div>
        <button onClick={toggle} className="w-8 h-8 rounded-full border grid place-items-center text-sm">{dark?'☀️':'🌙'}</button>
      </div>
    </header>
  )
}