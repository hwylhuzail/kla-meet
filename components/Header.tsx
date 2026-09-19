'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Header(){
  const [scrolled,setScrolled]=useState(false)
  useEffect(()=>{
    const onScroll=()=>setScrolled(window.scrollY>10)
    window.addEventListener('scroll',onScroll)
    return ()=>window.removeEventListener('scroll',onScroll)
  },[])
  return (
    <header className={`sticky top-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-black/80 border-b border-zinc-100 dark:border-zinc-900 transition-all ${scrolled?'shadow-md':''}`}>
      <div className="max-w-md mx-auto flex items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#FFC629] rounded-full flex items-center justify-center font-black text-black">K</div>
          <span className="font-black dark:text-white">kla-meet</span>
        </Link>
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
      </div>
    </header>
  )
}