'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
export default function BottomNav(){
  const p=usePathname();
  const tabs=[{h:'/discover',l:'Discover'},{h:'/matches',l:'Matches'},{h:'/chat',l:'Chat'},{h:'/kyc',l:'KYC'}];
  return <div className="fixed bottom-0 w-full bg-white border-t flex justify-around p-3">{tabs.map(t=><Link key={t.h} href={t.h} className={p===t.h?'font-bold text-pink-600':''}>{t.l}</Link>)}</div>
}