'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

export default function BottomNav(){
  const p=usePathname();
  // FIXED: Removed Explore, Fixed Messages href, 4 tabs only
  const tabs=[
    {h:'/discover',l:'Discover',i:'⌂'},
    {h:'/matches',l:'Matches',i:'♥'},
    {h:'/messages',l:'Messages',i:'◌'},
    {h:'/profile',l:'Profile',i:'○'}
  ];
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl border-t border-zinc-200 dark:border-zinc-800 grid grid-cols-4 h-[70px] z-50">
      {tabs.map(t=>
        <Link key={t.l} href={t.h} className={`flex flex-col items-center justify-center ${p?.startsWith(t.h)? 'text-black dark:text-white font-bold' : 'text-zinc-400'}`}>
          <motion.span
            animate={p?.startsWith(t.h)? { y: [0, -4, 0], scale:[1,1.2,1] } : { y: 0 }}
            transition={{ duration: 0.4 }}
            className={p?.startsWith(t.h)? 'text-[#FFC629]' : ''}
          >
            {t.i}
          </motion.span>
          <span className="text-[10px] mt-1">{t.l}</span>
        </Link>
      )}
    </nav>
  )
}