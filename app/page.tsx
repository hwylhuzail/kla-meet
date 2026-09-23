import { createClient } from '@/lib/supabase/server'
import OnboardingFlow from './components/OnboardingFlow'
import Link from 'next/link'
export default async function Page() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data } = await supabase.from('profiles').select('*').eq('snooze_mode', false).eq('incognito_mode', false).limit(50)
  const profiles = data || []
  return (
    <main className="min-h-screen bg-[#fbf9ff]">
      {!user && <OnboardingFlow />}
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 p-4">
        {profiles.map((p: any) => (
          <Link key={p.id} href={`/profile/${p.id}`} className="rounded-[20px] border-[3px] border-black overflow-hidden bg-white shadow-[5px_5px_0px_#000]">
            <img src={p.main_photo || p.photos?.[0] || '/icon-512.png'} className="h-56 w-full object-cover" alt="" />
            <div className="p-3"><p className="font-black text-sm truncate">{p.full_name || p.name}, {p.age}</p><p className="text-xs text-stone-500">{p.city} {p.country_code}</p></div>
          </Link>
        ))}
      </div>
    </main>
  )
}
