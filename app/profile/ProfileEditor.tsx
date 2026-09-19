'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import BottomNav from '@/components/BottomNav'
import { supabase } from '@/lib/supabase'
import { COUNTRIES, countryFlag } from '@/lib/countries'

type FormState = { name: string; age: string; country: string; city: string; bio: string; intention: string; occupation: string; languages: string; interests: string }

function compressImage(file: File) {
  return new Promise<File>((resolve, reject) => {
    const image = new Image()
    const reader = new FileReader()
    reader.onload = () => { image.src = String(reader.result) }
    reader.onerror = () => reject(new Error('Could not read image'))
    image.onload = () => {
      const canvas = document.createElement('canvas')
      const scale = Math.min(1, 1080 / Math.max(image.width, image.height))
      canvas.width = Math.max(1, Math.round(image.width * scale))
      canvas.height = Math.max(1, Math.round(image.height * scale))
      const ctx = canvas.getContext('2d')
      if (!ctx) return reject(new Error('Could not prepare image'))
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
      canvas.toBlob(blob => blob? resolve(new File([blob], `photo-${Date.now()}.jpg`, { type: 'image/jpeg' })) : reject(new Error('Could not compress')), 'image/jpeg', 0.8)
    }
    image.onerror = () => reject(new Error('Could not load image'))
    reader.readAsDataURL(file)
  })
}

export default function ProfileEditor() {
  const router = useRouter()
  const galleryInput = useRef<HTMLInputElement>(null)
  const cameraInput = useRef<HTMLInputElement>(null)
  const [userId, setUserId] = useState('')
  const [form, setForm] = useState<FormState>({ name: '', age: '', country: '', city: '', bio: '', intention: '', occupation: '', languages: '', interests: '' })
  const [photos, setPhotos] = useState<string[]>([])
  const [mainPhoto, setMainPhoto] = useState('')
  const [verification, setVerification] = useState({ status: 'unverified', isVerified: false })
  const [status, setStatus] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return router.push('/auth')
      setUserId(data.user.id)
      const { data: profile } = await supabase.from('profiles').select('*').eq('id', data.user.id).maybeSingle()
      if (!profile) return
      setForm({ name: profile.full_name || profile.name || '', age: String(profile.age || ''), country: profile.country_code || '', city: profile.city || profile.location || '', bio: profile.bio || '', intention: profile.relationship_intention || '', occupation: profile.occupation || '', languages: (profile.languages || []).join(', '), interests: (profile.interests || []).join(', ') })
      setPhotos(Array.isArray(profile.photos)? profile.photos.slice(0, 6) : [])
      setMainPhoto(profile.main_photo || profile.photos?.[0] || '')
      setVerification({ status: profile.verification_status || 'unverified', isVerified: Boolean(profile.is_verified) })
    })
  }, [router])

  const update = (key: keyof FormState, value: string) => setForm(c => ({...c, [key]: value }))
  const completion = useMemo(() => Math.min(100, Math.round([form.name, form.age, form.country, form.city, form.bio, form.intention, photos.length? 'photos' : ''].filter(Boolean).length / 7 * 100)), [form, photos])

  const savePhotos = async (nextPhotos: string[], nextMainPhoto = mainPhoto || nextPhotos[0] || '') => {
    setPhotos(nextPhotos); setMainPhoto(nextMainPhoto)
    const { error } = await supabase.from('profiles').update({ photos: nextPhotos, main_photo: nextMainPhoto || null }).eq('id', userId)
    if (error) throw error
  }

  const uploadPhotos = async (files: FileList | null) => {
    if (!files?.length ||!userId) return
    setBusy(true); setStatus('Uploading photos...')
    try {
      const next = [...photos]
      for (const original of Array.from(files).slice(0, 6 - next.length)) {
        const file = await compressImage(original)
        if (file.size > 2 * 1024 * 1024) throw new Error('Each photo must be <2MB')
        const path = `${userId}/${Date.now()}-${file.name}`
        const { error } = await supabase.storage.from('photos').upload(path, file, { contentType: 'image/jpeg', upsert: false })
        if (error) throw error
        const { data } = supabase.storage.from('photos').getPublicUrl(path)
        next.push(data.publicUrl)
      }
      await savePhotos(next, mainPhoto || next[0])
      setStatus('Photos uploaded')
    } catch (error) {
      setStatus(error instanceof Error? error.message : 'Photo upload failed')
    } finally { setBusy(false) }
  }

  const deletePhoto = async (index: number) => {
    if(!confirm('Delete photo?')) return
    const next = photos.filter((_, i) => i!== index)
    await savePhotos(next, mainPhoto === photos[index]? next[0] || '' : mainPhoto)
    setStatus('Photo removed')
  }

  const save = async () => {
    setBusy(true); setStatus('Saving...')
    const { error } = await supabase.from('profiles').upsert({
      id: userId, full_name: form.name, name: form.name, age: Number(form.age), country_code: form.country, city: form.city, bio: form.bio, relationship_intention: form.intention, occupation: form.occupation,
      languages: form.languages.split(',').map(v => v.trim()).filter(Boolean),
      interests: form.interests.split(',').map(v => v.trim()).filter(Boolean),
      photos, main_photo: mainPhoto || photos[0] || null, last_seen_at: new Date().toISOString()
    })
    setStatus(error? error.message : 'Profile saved'); setBusy(false)
  }

  return (
    <div className="app-shell min-h-screen bg-zinc-50 dark:bg-black">
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-white/80 dark:bg-black/80 border-b flex items-center justify-between p-4">
        <div><p className="text-[10px] font-black tracking-widest text-[#a07800]">YOUR IDENTITY</p><h1 className="text-xl font-black dark:text-white">Edit profile</h1></div>
        <div className="h-10 w-10 rounded-full bg-[#FFC629] grid place-items-center font-black">✦</div>
      </header>

      <main className="content animate-page pb-[90px] max-w-md mx-auto p-3 space-y-4">
        <motion.section className="rounded-[20px] bg-white dark:bg-zinc-900 p-4 shadow-sm" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between"><div><p className="text-xs font-bold text-[#a07800]">PROFILE COMPLETE</p><p className="mt-1 text-sm text-stone-500">Complete to get better matches</p></div><strong className="text-2xl dark:text-white">{completion}%</strong></div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-stone-200 dark:bg-zinc-800"><motion.div className="h-full rounded-full bg-[#FFC629]" initial={{ width: 0 }} animate={{ width: `${completion}%` }} /></div>
        </motion.section>

        <section className="rounded-[20px] bg-white dark:bg-zinc-900 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div><p className="text-[11px] font-black tracking-widest text-zinc-400">PHOTOS • Tap + to add from gallery</p><p className="mt-1 text-xs text-stone-500">Main photo has yellow border</p></div>
            <span className="text-xs font-bold bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-full">{photos.length}/6</span>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {Array.from({ length: 6 }, (_, index) => photos[index]? (
              <motion.div key={photos[index]} layout className={`relative aspect-[3/4] overflow-hidden rounded-2xl ${mainPhoto === photos[index]? 'border-[3px] border-[#FFC629]' : 'border border-zinc-200 dark:border-zinc-800'}`}>
                <img src={photos[index]} alt="" className="h-full w-full object-cover" />
                <button type="button" onClick={() => void deletePhoto(index)} className="absolute right-1 top-1 h-6 w-6 rounded-full bg-black/70 text-white text-xs grid place-items-center">×</button>
                <button type="button" onClick={() => void savePhotos(photos, photos[index])} className={`absolute bottom-1 left-1 rounded-full px-2 py-1 text-[9px] font-black ${mainPhoto === photos[index]? 'bg-[#FFC629] text-black' : 'bg-white/90 text-black'}`}>{mainPhoto === photos[index]? 'MAIN' : 'SET MAIN'}</button>
              </motion.div>
            ) : (
              <button key={index} type="button" disabled={busy || photos.length >= 6} onClick={() => galleryInput.current?.click()} className="aspect-[3/4] rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 bg-[#fffdf5] dark:bg-zinc-900 flex flex-col items-center justify-center text-zinc-400">
                <span className="text-2xl">+</span><span className="text-[10px] font-bold">Add</span>
              </button>
            ))}
          </div>

          <input ref={galleryInput} className="hidden" type="file" accept="image/*" multiple onChange={e => { void uploadPhotos(e.target.files); e.currentTarget.value = '' }} />
          <input ref={cameraInput} className="hidden" type="file" accept="image/*" capture="user" onChange={e => { void uploadPhotos(e.target.files); e.currentTarget.value = '' }} />

          <div className="mt-4 grid grid-cols-2 gap-2">
            <motion.button whileTap={{scale:0.95}} type="button" disabled={busy || photos.length >= 6} onClick={() => galleryInput.current?.click()} className="py-3 rounded-full border font-bold text-sm dark:text-white">{busy? 'Uploading...' : 'From Gallery'}</motion.button>
            <motion.button whileTap={{scale:0.95}} type="button" onClick={() => cameraInput.current?.click()} className="py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-sm">Take Photo</motion.button>
          </div>
        </section>

        <section className="rounded-[20px] bg-white dark:bg-zinc-900 p-4 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div><p className="text-[11px] font-black tracking-widest text-zinc-400">VERIFICATION</p><h2 className="mt-1 font-bold dark:text-white">{verification.isVerified? '✓ Verified by ID' : verification.status === 'pending_auto_verified'? 'Checking...' : 'Get your blue tick'}</h2><p className="mt-1 text-sm text-stone-500">Verify ID automatically</p></div><span className="text-xl bg-[#1DA1F2] text-white w-7 h-7 rounded-full grid place-items-center text-sm">✓</span>
          </div>
          <Link href="/verification" className="mt-4 block w-full text-center bg-[#FFC629] text-black font-black py-3 rounded-full">Verify ID - Get Blue Tick</Link>
        </section>

        <section className="rounded-[20px] bg-white dark:bg-zinc-900 p-4 shadow-sm space-y-3">
          <div className="grid grid-cols-2 gap-3"><input className="w-full rounded-xl border p-3 text-sm dark:bg-zinc-800 dark:border-zinc-700 dark:text-white" value={form.name} onChange={e => update('name', e.target.value)} placeholder="Display name" /><input className="w-full rounded-xl border p-3 text-sm dark:bg-zinc-800" value={form.age} onChange={e => update('age', e.target.value)} placeholder="Age" type="number" /></div>
          <select className="w-full rounded-xl border p-3 text-sm dark:bg-zinc-800 dark:text-white" value={form.country} onChange={e => update('country', e.target.value)}><option value="">Choose country</option>{COUNTRIES.map(([code, name]) => <option key={code} value={code}>{countryFlag(code)} {name}</option>)}</select>
          <input className="w-full rounded-xl border p-3 text-sm dark:bg-zinc-800 dark:text-white" value={form.city} onChange={e => update('city', e.target.value)} placeholder="City" />
          <textarea className="w-full rounded-xl border p-3 text-sm min-h-24 dark:bg-zinc-800 dark:text-white" value={form.bio} onChange={e => update('bio', e.target.value)} placeholder="Tell something real about you" />
          <select className="w-full rounded-xl border p-3 text-sm dark:bg-zinc-800 dark:text-white" value={form.intention} onChange={e => update('intention', e.target.value)}><option value="">Relationship intention</option><option>Serious relationship</option><option>New friends</option><option>Travel connection</option><option>Marriage</option></select>
          <input className="w-full rounded-xl border p-3 text-sm dark:bg-zinc-800 dark:text-white" value={form.languages} onChange={e => update('languages', e.target.value)} placeholder="Languages, comma separated" />
          <input className="w-full rounded-xl border p-3 text-sm dark:bg-zinc-800 dark:text-white" value={form.interests} onChange={e => update('interests', e.target.value)} placeholder="Interests, comma separated" />
          <input className="w-full rounded-xl border p-3 text-sm dark:bg-zinc-800 dark:text-white" value={form.occupation} onChange={e => update('occupation', e.target.value)} placeholder="Occupation" />
          <motion.button whileTap={{scale:0.95}} disabled={busy} onClick={save} className="w-full bg-[#FFC629] text-black font-black py-4 rounded-full">Save profile</motion.button>
          {status && <p className="text-center text-xs text-stone-500">{status}</p>}
        </section>
      </main>
      <BottomNav />
    </div>
  )
}