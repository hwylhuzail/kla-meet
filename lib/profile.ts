import { countryFlag, countryName } from './countries'

export type Profile = {
  id: string
  name: string
  age?: number | null
  city?: string | null
  country?: string | null
  bio?: string | null
  photos: string[]
  mainPhoto?: string | null
  interests: string[]
  languages: string[]
  intention?: string | null
  occupation?: string | null
  education?: string | null
  isVerified?: boolean
  isOnline?: boolean
  createdAt?: string | null
}

function list(value: unknown) {
  return Array.isArray(value) ? value.filter(item => typeof item === 'string') : []
}

export function normalizeProfile(raw: any): Profile {
  const country = raw.country_code || raw.country || raw.location_country || null
  return {
    id: String(raw.id),
    name: raw.full_name || raw.name || 'KLA member',
    age: raw.age || null,
    city: raw.city || raw.location || null,
    country,
    bio: raw.bio || null,
    photos: list(raw.photos).concat(raw.avatar_url ? [raw.avatar_url] : []).filter(Boolean),
    mainPhoto: raw.main_photo || null,
    interests: list(raw.interests),
    languages: list(raw.languages),
    intention: raw.relationship_intention || raw.looking_for || null,
    occupation: raw.occupation || null,
    education: raw.education || null,
    isVerified: Boolean(raw.is_verified || raw.photo_verified || raw.identity_verified),
    isOnline: Boolean(raw.is_online || (raw.last_seen_at && Date.now() - new Date(raw.last_seen_at).getTime() < 15 * 60 * 1000)),
    createdAt: raw.created_at || null,
  }
}

export function profileLocation(profile: Profile) {
  return [profile.city, countryName(profile.country)].filter(Boolean).join(', ') || 'Worldwide'
}

export function compatibility(profile: Profile, query: { intention?: string; interests?: string[]; country?: string }) {
  const signals = [Boolean(profile.bio), Boolean(profile.age), Boolean(profile.country), Boolean(profile.intention), profile.interests.length > 0, profile.languages.length > 0]
  let score = 50 + signals.filter(Boolean).length * 6
  if (query.country && profile.country?.toLowerCase() === query.country.toLowerCase()) score += 8
  if (query.intention && profile.intention?.toLowerCase().includes(query.intention.toLowerCase())) score += 12
  if (query.interests?.some(item => profile.interests.some(interest => interest.toLowerCase() === item.toLowerCase()))) score += 8
  return Math.min(98, score)
}

export { countryFlag, countryName }
