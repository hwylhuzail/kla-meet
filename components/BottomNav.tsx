'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

export default function BottomNav(){
  const p=usePathname();
  const tabs=[
    {h:'/discover',l:'Discover',i:'⌂'},
    {h:'/matches',l:'Matches',i:'♥'},
    {h:'/messages',l:'Messages',i:'◌'},
    {h:'/profile',l:'Profile',i:'○'}
  ];
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border-t border-zinc-200 dark:border-zinc-800 grid grid-cols-4 h-[72px] z-50 pb-[env(safe-area-inset-bottom)]">
      {tabs.map(t=>{
        const active = p?.startsWith(t.h)
        return (
        <Link key={t.l} href={t.h} className={`flex flex-col items-center justify-center ${active? 'text-black dark:text-white font-bold' : 'text-zinc-400'}`}>
          <motion.span
            animate={active? { y: [0, -4, 0], scale:[1,1.15,1] } : { y: 0 }}
            transition={{ duration: 0.4 }}
            className={active? 'text-[#FFC629] text-[18px]' : 'text-[18px]'}
          >
            {t.i}
          </motion.span>
          <span className="text-[10px] mt-1 tracking-wide">{t.l}</span>
        </Link>
      )})}
    </nav>
  )
}