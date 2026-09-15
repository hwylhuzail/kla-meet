'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
export default function BottomNav(){
  const p=usePathname();
  const tabs=[{h:'/discover',l:'Discover',i:'⌂'},{h:'/matches',l:'Matches',i:'♥'},{h:'/chat/1',l:'Chats',i:'◌'},{h:'/kyc',l:'Profile',i:'○'}];
  return <nav className="bottom-nav">{tabs.map(t=><Link key={t.h} href={t.h} className={`nav-item ${p?.startsWith(t.h) ? 'active' : ''}`}><span>{t.i}</span><span>{t.l}</span></Link>)}</nav>
}