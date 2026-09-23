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

// ---- MISSING EXPORTS THAT CAUSED BUILD ERROR ----
export function profileLocation(profile: any) {
  if (!profile) return 'Kampala'
  return profile.city || profile.location || profile.district || 'Kampala, Uganda'
}

export function compatibility(currentUser: any, otherProfile: any) {
  if (!currentUser || !otherProfile) return 50
  let score = 50
  // Simple scoring - add more logic later
  if (currentUser.interests && otherProfile.interests) {
    const common = currentUser.interests.filter((i: string) => otherProfile.interests.includes(i))
    score += common.length * 10
  }
  if (currentUser.city && otherProfile.city && currentUser.city === otherProfile.city) {
    score += 20
  }
  return Math.min(95, score)
}

export function calculateCompatibility(a: any, b: any) {
  return compatibility(a, b)
}

export function getLocation(profile: any) {
  return profileLocation(profile)
}