'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function BottomNav(){
  const p = usePathname();
  const tabs=[
    {h:'/discover', l:'Discover', i:'⌂'},
    {h:'/matches', l:'Match', i:'♥'},
    {h:'/messages', l:'Msgs', i:'●'},
    {h:'/profile', l:'Profile', i:'○'},
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50">
      <div className="bg-black rounded-t-[22px] h-[74px] flex items-center justify-around px-2 shadow-[0_-10px_30px_rgba(0,0,0,0.3)] border-t border-white/10">
        {tabs.map(t=>{
          const active = p?.startsWith(t.h);
          return (
            <Link
              key={t.h}
              href={t.h}
              className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full transition-all text-[13px] font-bold tracking-wide
                ${active
                 ? 'bg-white text-black shadow-md'
                  : 'text-white/60 hover:text-white/90'}`}
            >
              <span className={`${active? 'text-black' : t.h === '/matches'? 'text-red-500' : 'text-white/60'} text-[14px]`}>
                {t.i}
              </span>
              <span>{t.l}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}