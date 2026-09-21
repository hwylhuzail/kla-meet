'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Profile, compatibility } from '@/lib/profile'

// hash id -> 1..70 = 70 different real faces
function uniqueFace(id: string){
  let h = 0
  for(let i=0;i<id.length;i++) h = id.charCodeAt(i) + ((h<<5)-h)
  const n = Math.abs(h % 70) + 1
  return `https://i.pravatar.cc/400?img=${n}&u=${encodeURIComponent(id)}`
}

export default function SectionRow({ title, icon, profiles }: { title: string; icon: string; profiles: Profile[] }) {
  if (!profiles.length) return null
  return (
    <motion.section
      className="mt-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-3 flex items-end justify-between px-1">
        <h2 className="display text-[15px] font-black flex items-center">
          <span className="mr-2 text-[#d49e00]">{icon}</span>{title}
        </h2>
        <Link href="/explore" className="text-[11px] font-bold text-zinc-500">See all</Link>
      </div>

      <div className="flex snap-x gap-3 overflow-x-auto pb-3 scrollbar-none">
        {profiles.slice(0, 8).map(profile => {
          // title added to hash = Sharon in Best Matches ≠ Sharon in Near You
          const photo = uniqueFace(profile.id + title + profile.name)
          const score = compatibility(profile, {})

          return (
            <div key={`${title}-${profile.id}`} className="min-w-[148px] snap-start">
              <Link href={`/profile?id=${encodeURIComponent(profile.id)}`} className="block rounded-[20px] overflow-hidden bg-white border border-black/5 shadow-sm">
                <div className="h-[170px] relative bg-[#f3ead0]">
                  <img
                    src={photo}
                    alt={profile.name}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute top-2 left-2 rounded-full bg-black/70 text-white text-[10px] font-bold px-2 py-1">
                    {score}%
                  </span>
                  {profile.isOnline && <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-green-400 border-2 border-white" />}
                </div>
                <div className="p-2.5 bg-white">
                  <p className="font-bold text-[12px] truncate">{profile.name}{profile.age? `, ${profile.age}` : ''}</p>
                  <p className="text-[10px] text-zinc-500 truncate">{profile.city || profile.country || 'Worldwide'}</p>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </motion.section>
  )
}