import { createClient } from '@/lib/supabase/server'
import DiscoverClient from './discover/discover-client'

export default async function Page() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  let profiles = []
  if (user) {
    const { data: me } = await supabase.from('profiles').select('*').eq('id', user.id).single()
    let query = supabase.from('profiles').select('*').neq('id', user.id).eq('snooze_mode', false)
    // Incognito: don't show incognito users unless they liked you
    if (!me?.is_premium) {
      query = query.eq('incognito_mode', false)
    }
    const { data } = await query.limit(50)
    profiles = data || []
  }
  return <DiscoverClient initialProfiles={profiles} />
}
