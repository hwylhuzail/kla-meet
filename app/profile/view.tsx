'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { normalizeProfile, profileLocation, countryFlag, compatibility, Profile } from '@/lib/profile'

function VerifiedBadge(){
  return (
    <span className="group relative inline-flex">
      <span className="bg-[#1DA1F2] text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px]">✓</span>
      <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100">Verified</span>
    </span>
  )
}

export default function ProfileView() {
  const params = useSearchParams()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [status, setStatus] = useState('Loading profile...')

  useEffect(() => {
    const id = params.get('id')
    if (!id) return setStatus('Profile not found')
    supabase.from('profiles').select('*').eq('id', id).maybeSingle().then(({ data, error }) => {
      if (error ||!data) setStatus('Profile not found')
      else { setProfile(normalizeProfile(data)); setStatus('') }
    })
  }, [params])

  if (!profile) return (
    <div className="min-h-screen bg-[#fbf9ff] dark:bg-black">
      <main className="pt-20 text-center">
        <div className="animate-pulse space-y-3 p-4">
          <div className="h-[390px] bg-zinc-200 dark:bg-zinc-800 rounded-[28px]" />
          <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4 mx-auto" />
        </div>
        <p className="text-stone-500 mt-4">{status}</p>
      </main>
    </div>
  )

  return (
    <div className="bg-[#fbf9ff] dark:bg-black min-h-screen">
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-black/80 border-b border-zinc-100 dark:border-zinc-900 flex items-center justify-between p-4">
        <button className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 grid place-items-center" onClick={() => history.back()}>←</button>
        <p className="font-bold dark:text-white">Profile</p>
        <button className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 grid place-items-center">⋯</button>
      </header>

      <main className="p-3">
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="overflow-hidden rounded-[28px] bg-white dark:bg-zinc-900 shadow-xl">
          {/* MAIN PHOTO with yellow border */}
          <div className="relative">
            <div className="h-[420px] bg-gradient-to-br from-[#FFC629]/20 to-violet-200">
              {profile.photos?.[0]? (
                <img src={profile.photos[0]} alt={profile.name} className="h-full w-full object-cover" />
              ) : (
                <div className="grid h-full place-items-center text-7xl font-bold text-violet-300">{profile.name.slice(0, 1)}</div>
              )}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
              <h1 className="text-white text-3xl font-black flex items-center gap-2">
                {profile.name}{profile.age? `, ${profile.age}` : ''} {profile.isVerified && <VerifiedBadge />}
              </h1>
              <p className="text-white/80 text-sm">{countryFlag(profile.country)} {profileLocation(profile)}</p>
            </div>
          </div>

          {/* GALLERY 6 PHOTOS GRID */}
          {profile.photos?.length > 1 && (
            <div className="p-3">
              <p className="text-[11px] font-bold tracking-widest text-zinc-400 mb-2">GALLERY • {profile.photos.length}/6</p>
              <div className="grid grid-cols-3 gap-2">
                {profile.photos.slice(1,6).map((url,i)=>(
                  <div key={i} className="h-[110px] rounded-xl overflow-hidden border border-zinc-100 dark:border-zinc-800">
                    <img src={url} alt="" className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="p-5">
            <div className="flex items-start justify-between">
              <div className="flex flex-wrap gap-2 text-xs">
                {profile.isOnline && <span className="rounded-full bg-emerald-50 dark:bg-emerald-950 px-3 py-2 text-emerald-700">● Online</span>}
                {profile.isVerified && <span className="rounded-full bg-sky-50 dark:bg-sky-950 px-3 py-2 text-sky-700">✓ Verified</span>}
                {profile.intention && <span className="rounded-full bg-[#FFC629]/20 px-3 py-2 text-[#a07800] font-bold">♥ {profile.intention}</span>}
              </div>
              <div className="rounded-2xl bg-[#FFC629] px-3 py-2 text-center">
                <strong className="block text-xl text-black">{compatibility(profile, {})}%</strong>
                <span className="text-[10px] font-black text-black">MATCH</span>
              </div>
            </div>

            {profile.bio? <p className="mt-6 leading-6 text-stone-600 dark:text-zinc-300">{profile.bio}</p> : <p className="mt-6 text-sm text-zinc-400 italic">No bio yet</p>}

            <div className="mt-6">
              <p className="text-[11px] font-bold tracking-widest text-zinc-400">INTERESTS</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {profile.interests?.length? profile.interests.map(item => <span className="rounded-full bg-violet-50 dark:bg-violet-950 px-3 py-2 text-xs font-medium text-violet-700 dark:text-violet-300" key={item}>{item}</span>) : <span className="text-sm text-stone-500">No interests yet</span>}
              </div>
            </div>

            <motion.button whileTap={{scale:0.95}} onClick={async () => {
              const { data: user } = await supabase.auth.getUser()
              if (user.user) await supabase.from('likes').insert({ from_id: user.user.id, to_id: profile.id })
              setStatus('Like sent')
            }} className="w-full mt-7 bg-[#FFC629] text-black font-black py-4 rounded-full shadow-lg">
              ♥ Like {profile.name}
            </motion.button>
            {status === 'Like sent' && <p className="mt-3 text-center text-xs text-emerald-600">Your interest was sent.</p>}
          </div>
        </motion.div>
      </main>
    </div>
  )
}