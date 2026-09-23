import { createClient } from '@/lib/supabase/server'
import DiscoverClient from './discover/discover-client'
import OnboardingFlow from '@/app/components/OnboardingFlow'

export default async function Page() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  let profiles: any[] = []
  let isPremium = false

  if (user) {
    const { data: me } = await supabase.from('profiles').select('*').eq('id', user.id).single()
    isPremium = !!me?.is_premium
    let query = supabase.from('profiles').select('*').neq('id', user.id).eq('snooze_mode', false)
    if (!isPremium) {
      // INTERNATIONAL: show everyone, not just UG
      query = query.eq('incognito_mode', false)
    }
    const { data } = await query.limit(50)
    profiles = data || []
  } else {
    // Logged out - show 20 international profiles
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('snooze_mode', false)
      .eq('incognito_mode', false)
      .limit(20)
    profiles = data || []
  }

  return (
    <>
      {!user && <OnboardingFlow />}
      <DiscoverClient initialProfiles={profiles} isPremium={isPremium} />
    </>
  )
}