import { createClient } from '@/lib/supabase/server'
import DiscoverClient from './discover/discover-client'

export default async function Page() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  let profiles = []
  if (user) {
    const { data: me } = await supabase.from('profiles').select('*').eq('id', user.id).single()
    let query = supabase.from('profiles').select('*').neq('id', user.id).eq('snooze_mode', false).eq('incognito_mode', false)
    if (!me?.is_premium) {
      query = query.ilike('current_location', '%UG%')
    }
    const { data } = await query.limit(50)
    profiles = data || []
  } else {
    const { data } = await supabase.from('profiles').select('*').limit(20)
    profiles = data || []
  }
  return <DiscoverClient initialProfiles={profiles} />
}
