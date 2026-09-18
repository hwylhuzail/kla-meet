'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Profile, compatibility, countryFlag, profileLocation } from '@/lib/profile'

function smallImage(url?: string) {
  if (!url) return ''
  if (url.includes('supabase')) return `${url}?width=400&quality=60`
  return url
}

export default function ProfileCard({ profile, onAction, compact = false }: { profile: Profile; onAction?: (type: string) => void; compact?: boolean }) {
  const score = compatibility(profile, {})
  const rawPhoto = profile.mainPhoto || profile.photos?.[0]
  const photo = rawPhoto? smallImage(rawPhoto) : ''
  return (
    <motion.article className={`profile-card overflow-hidden rounded-[28px] ${compact? 'h-[300px] min-h-0' : 'h-[520px]'}`} whileDrag={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }}>
      <Link href={`/profile?id=${encodeURIComponent(profile.id)}`} className="block h-full relative bg-[#f3ead0]">
        <div className="h-full w-full">{photo? <img src={photo} alt={profile.name} loading="lazy" decoding="async" className="h-full w-full object-cover" onError={(e)=>{ (e.target as HTMLImageElement).src = `https://i.pravatar.cc/400?u=${profile.id}` }} /> : <div className="grid h-full place-items-center text-6xl font-bold text-[#c49b16]">{profile.name.slice(0, 1).toUpperCase()}</div>}</div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="mb-2 flex items-center gap-2"><span className="rounded-full bg-white/20 backdrop-blur px-2.5 py-1 text-[11px] font-bold border border-white/10">{score}% Match</span>{profile.isOnline && <span className="text-[11px] font-bold text-[#ffc629]">● Online</span>}</div>
          <h2 className="text-[20px] font-black leading-tight">{profile.name}{profile.age? `, ${profile.age}` : ''} {profile.isVerified && <span className="text-[#ffc629]">✓</span>}</h2>
          <p className="text-[12px] text-white/70">{countryFlag(profile.country)} {profileLocation(profile)}</p>
          {profile.bio &&!compact && <p className="line-clamp-1 mt-1 text-[12px] text-white/60">{profile.bio}</p>}
          <div className="mt-2 flex gap-1.5">{profile.interests?.slice(0, 3).map((interest: string) => <span className="rounded-full bg-white/15 backdrop-blur px-2.5 py-1 text-[10px] font-bold border border-white/10" key={interest}>{interest}</span>)}</div>
        </div>
      </Link>
      {onAction && <div className="absolute bottom-5 right-5 z-10 flex gap-2"><motion.button whileTap={{ scale: 0.9 }} onClick={e => { e.preventDefault(); onAction('pass') }} className="grid h-11 w-11 place-items-center rounded-full bg-white/90 backdrop-blur text-sm text-zinc-700 shadow-xl border border-white">✕</motion.button><motion.button whileTap={{ scale: 0.9 }} onClick={e => { e.preventDefault(); onAction('like') }} className="grid h-11 w-11 place-items-center rounded-full bg-[#ffc629] text-[18px] text-[#242424] shadow-xl">♥</motion.button></div>}
    </motion.article>
  )
}