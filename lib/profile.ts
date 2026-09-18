export type Profile = any;

const CITY_TO_COUNTRY: Record<string, string> = {
  "paris": "FR",
  "london": "GB",
  "berlin": "DE",
  "new york": "US",
  "manhattan": "US",
  "brooklyn": "US",
  "los angeles": "US",
  "miami": "US",
  "chicago": "US",
  "dubai": "AE",
  "toronto": "CA",
  "nairobi": "KE",
  "kampala": "UG",
};

export const COUNTRIES: [string, string][] = [
  ["US", "United States"],
  ["GB", "United Kingdom"],
  ["FR", "France"],
  ["DE", "Germany"],
  ["AE", "United Arab Emirates"],
  ["CA", "Canada"],
  ["KE", "Kenya"],
  ["UG", "Uganda"],
  ["AU", "Australia"],
];

export function countryFlag(code?: string | null) {
  if (!code) return "🌍";
  let c = code.trim().toUpperCase();
  if (c.length > 2) {
    const f = COUNTRIES.find(([, n]) => n.toLowerCase() === c.toLowerCase());
    if (f) c = f[0];
    const cityKey = c.toLowerCase();
    if (CITY_TO_COUNTRY[cityKey]) c = CITY_TO_COUNTRY[cityKey];
  }
  if (c.length!== 2) {
    const maybe = CITY_TO_COUNTRY[c.toLowerCase()];
    if (maybe) c = maybe;
    else return "🌍";
  }
  try {
    return String.fromCodePoint(...[...c].map(ch => 127397 + ch.charCodeAt(0)));
  } catch { return "🌍"; }
}

export function countryName(value?: string | null) {
  if (!value) return "Worldwide";
  const v = value.trim();
  const found = COUNTRIES.find(([code, name]) =>
    code.toLowerCase() === v.toLowerCase() || name.toLowerCase() === v.toLowerCase()
  );
  return found? found[1] : v;
}

export function profileLocation(profile: any) {
  const city = (profile?.city || "").trim();
  const countryRaw = (profile?.country || "").trim();
  if (!city &&!countryRaw) return "Worldwide";
  if (!city) return countryName(countryRaw);
  const cityLower = city.toLowerCase();
  let countryCode = countryRaw;
  const correctCountry = CITY_TO_COUNTRY[cityLower];
  if (correctCountry) {
    if (!countryRaw) countryCode = correctCountry;
  }
  if (!countryCode) return city;
  return `${city}, ${countryName(countryCode)}`;
}

export function compatibility(profile: any, me: any) {
  let score = 70 + Math.floor(Math.random() * 15);
  return Math.min(96, score);
}

// FIX - this was missing, caused Vercel error
export function normalizeProfile(raw: any): Profile {
  if (!raw) return raw;
  return {
    id: raw.id,
    name: raw.full_name || raw.name || raw.display_name || 'User',
    full_name: raw.full_name || raw.name || 'User',
    age: raw.age || 22,
    photos: raw.photos || (raw.avatar_url? [raw.avatar_url] : []),
    mainPhoto: raw.mainPhoto || raw.avatar_url || raw.photos?.[0] || '',
    avatar_url: raw.avatar_url || raw.photos?.[0] || '',
    city: raw.city || 'Kampala',
    country: raw.country || 'UG',
    bio: raw.bio || '',
    interests: raw.interests || ['Travel','Music'],
    isOnline: true,
    is_online: true,
    isVerified: raw.is_verified || false,
    is_verified: raw.is_verified || false,
  }
}