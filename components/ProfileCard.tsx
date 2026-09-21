'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Profile, compatibility, countryFlag, profileLocation, uniqueFace } from '@/lib/profile'

export default function ProfileCard({ profile, onAction, compact = false }: { profile: Profile; onAction?: (type: string) => void; compact?: boolean }) {
  const score = compatibility(profile, {})
  const photo = uniqueFace(profile.id + (profile.email||profile.name))

  return (
    <motion.article className={`profile-card overflow-hidden rounded-[28px] relative bg-black ${compact? 'h-[300px]' : 'h-[520px]'}`} whileDrag={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }}>
      <Link href={`/profile?id=${encodeURIComponent(profile.id)}`} className="block h-full relative">
        <img src={photo} alt={profile.name} loading="lazy" decoding="async" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full bg-white/20 backdrop-blur px-2.5 py-1 text-[11px] font-bold border border-white/10">{score}% Match</span>
            {profile.isOnline && <span className="text-[11px] font-bold text-[#ffc629]">● Online</span>}
          </div>
          <h2 className="text-[20px] font-black leading-tight">{profile.name}{profile.age? `, ${profile.age}` : ''} {profile.isVerified && <span className="text-[#ffc629]">✓</span>}</h2>
          <p className="text-[12px] text-white/70">{countryFlag(profile.country)} {profileLocation(profile)}</p>
          <p className="mt-1 text-[11px] text-white/60 truncate">{profile.interests?.slice(0,2).join(' • ')}</p>
        </div>
      </Link>
      {onAction && <div className="absolute bottom-5 right-5 z-10 flex gap-2"><motion.button whileTap={{ scale: 0.9 }} onClick={e => { e.preventDefault(); onAction('pass') }} className="grid h-11 w-11 place-items-center rounded-full bg-white/90 text-sm text-zinc-700 shadow-xl">✕</motion.button><motion.button whileTap={{ scale: 0.9 }} onClick={e => { e.preventDefault(); onAction('like') }} className="grid h-11 w-11 place-items-center rounded-full bg-[#ffc629] text-[18px] text-[#242424] shadow-xl">♥</motion.button></div>}
    </motion.article>
  )
}