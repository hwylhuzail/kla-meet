'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
export default function BottomNav(){
  const p=usePathname();
  const tabs=[{h:'/discover',l:'Discover',i:'⌂'},{h:'/matches',l:'Matches',i:'♥'},{h:'/matches',l:'Messages',i:'◌'},{h:'/explore',l:'Explore',i:'🌍'},{h:'/profile',l:'Profile',i:'○'}];
  return <nav className="bottom-nav">{tabs.map(t=><Link key={t.l} href={t.h} className={`nav-item ${p?.startsWith(t.h) ? 'active' : ''}`}><motion.span animate={p?.startsWith(t.h) ? { y: [0, -5, 0] } : { y: 0 }} transition={{ duration: 0.45 }}>{t.i}</motion.span><span>{t.l}</span></Link>)}</nav>
}