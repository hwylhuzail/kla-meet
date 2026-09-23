import { createClient } from '@/lib/supabase/server'
import OnboardingFlow from './components/OnboardingFlow'
import Link from 'next/link'

export default async function Page() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  let profiles: any[] = []

  // INTERNATIONAL - show all countries, not just UG
  if (user) {
    const { data } = await supabase
     .from('profiles')
     .select('*')
     .neq('id', user.id)
     .eq('snooze_mode', false)
     .eq('incognito_mode', false)
     .limit(50)
    profiles = data || []
  } else {
    const { data } = await supabase
     .from('profiles')
     .select('*')
     .eq('snooze_mode', false)
     .eq('incognito_mode', false)
     .limit(20)
    profiles = data || []
  }

  return (
    <main className="min-h-screen bg-[#fbf9ff]">
      {!user && <OnboardingFlow />}

      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 p-4">
        {profiles.map((p: any) => (
          <div key={p.id} className="rounded-[20px] border-[3px] border-black overflow-hidden bg-white shadow-[5px_5px_0px_#000]">
            <img src={p.main_photo || p.photos?.[0] || '/icon-512.png'} className="h-56 w-full object-cover" alt="" />
            <div className="p-3">
              <p className="font-black">{p.full_name || p.name}, {p.age}</p>
              <p className="text-xs text-stone-500">{p.city} • {p.country_code}</p>
            </div>
          </div>
        ))}
      </div>

      {!user && (
        <div className="text-center py-12">
          <Link href="/auth" className="inline-block bg-[#FFC629] text-black font-black border-[3px] border-black px-10 py-4 rounded-full shadow-[6px_6px_0px_#000] hover:translate-y-[-2px] transition">
            Join KLA-MEET — It's Free
          </Link>
          <p className="mt-3 text-xs text-stone-500">Worldwide connections, not just Kampala</p>
        </div>
      )}
    </main>
  )
}