'use client';

export const dynamic = 'force-dynamic';





import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { COUNTRIES, countryFlag } from '@/lib/countries'

export default function Onboarding() {
  const router = useRouter(); const [form, setForm] = useState({ name: '', age: '', gender: '', country: '', city: '', intention: '', bio: '' }); const [status, setStatus] = useState('')
  const update = (key: string, value: string) => setForm(current => ({ ...current, [key]: value }))
  const save = async () => { if (!form.name || Number(form.age) < 18 || !form.country) return setStatus('Add your name, country and confirm you are 18 or older.'); setStatus('Saving...'); const { data: { user } } = await supabase.auth.getUser(); if (!user) return router.push('/auth'); const { error } = await supabase.from('profiles').upsert({ id: user.id, email: user.email, full_name: form.name, name: form.name, age: Number(form.age), gender: form.gender, country_code: form.country, city: form.city, relationship_intention: form.intention, bio: form.bio, last_seen_at: new Date().toISOString() }); if (error) setStatus(error.message); else router.push('/discover') }
  return <main className="min-h-screen bg-gradient-to-br from-[#fbf9ff] to-[#fff1f5] p-6"><div className="mx-auto max-w-lg pt-8"><p className="eyebrow text-violet-600">Build your profile</p><h1 className="display mt-2 text-4xl font-bold">Let the right people find you.</h1><p className="mt-3 text-sm text-stone-500">Your profile helps us find meaningful connections, wherever they are.</p><section className="soft-panel mt-7 space-y-3"><div className="grid grid-cols-2 gap-3"><input className="field" value={form.name} onChange={e => update('name', e.target.value)} placeholder="Name" /><input className="field" value={form.age} onChange={e => update('age', e.target.value)} type="number" min="18" placeholder="Age (18+)" /></div><select className="field" value={form.gender} onChange={e => update('gender', e.target.value)}><option value="">Gender</option><option>Woman</option><option>Man</option><option>Non-binary</option></select><select className="field" value={form.country} onChange={e => update('country', e.target.value)}><option value="">Country</option>{COUNTRIES.map(([code, name]) => <option key={code} value={code}>{countryFlag(code)} {name}</option>)}</select><input className="field" value={form.city} onChange={e => update('city', e.target.value)} placeholder="City" /><select className="field" value={form.intention} onChange={e => update('intention', e.target.value)}><option value="">What are you looking for?</option><option>Serious relationship</option><option>New friends</option><option>Travel connection</option><option>Marriage</option></select><textarea className="field min-h-28" value={form.bio} onChange={e => update('bio', e.target.value)} placeholder="A short introduction" /><button onClick={save} className="primary-button w-full">Continue</button>{status && <p className="text-center text-xs text-stone-500">{status}</p>}</section></div></main>
}
