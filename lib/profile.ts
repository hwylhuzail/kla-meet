import { createClient } from './supabase/client'

export async function getProfile(userId: string) {
  const supabase = createClient()
  const { data } = await supabase.from('profiles').select('*').eq('id', userId).single()
  return data
}

export async function getCurrentUser() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export function profileLocation(profile: any) {
  if (!profile) return 'Kampala'
  return profile.city || profile.location || 'Kampala, Uganda'
}

export function compatibility(currentUser: any, otherProfile: any) {
  if (!currentUser || !otherProfile) return 50
  let score = 50
  if (currentUser.interests && otherProfile.interests) {
    const common = currentUser.interests.filter((i: string) => otherProfile.interests.includes(i))
    score += common.length * 10
  }
  return Math.min(95, score)
}

export function calculateCompatibility(a: any, b: any) {
  return compatibility(a, b)
}
