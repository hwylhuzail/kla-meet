export type Profile = any;

const CITY_TO_COUNTRY: Record<string, string> = {
  "paris": "FR", "london": "GB", "berlin": "DE",
  "new york": "US", "manhattan": "US", "brooklyn": "US",
  "los angeles": "US", "miami": "US", "chicago": "US",
  "dubai": "AE", "toronto": "CA", "nairobi": "KE", "kampala": "UG",
};

export const COUNTRIES: [string, string][] = [
  ["US", "United States"], ["GB", "United Kingdom"],
  ["FR", "France"], ["DE", "Germany"], ["AE", "United Arab Emirates"],
  ["CA", "Canada"], ["KE", "Kenya"], ["UG", "Uganda"], ["AU", "Australia"],
];

export function countryFlag(code?: string | null) {
  if (!code) return "🌍";
  let c = code.trim().toUpperCase();
  if (c.length > 2) {
    const f = COUNTRIES.find(([, n]) => n.toLowerCase() === c.toLowerCase());
    if (f) c = f[0];
  }
  if (c.length!==2){
    const maybe = CITY_TO_COUNTRY[c.toLowerCase()];
    if (maybe) c = maybe; else return "🌍";
  }
  try { return String.fromCodePoint(...[...c].map(ch => 127397 + ch.charCodeAt(0))); }
  catch { return "🌍"; }
}

export function countryName(value?: string | null){
  if(!value) return "Worldwide";
  const v = value.trim();
  const found = COUNTRIES.find(([code,name])=>code.toLowerCase()===v.toLowerCase()||name.toLowerCase()===v.toLowerCase());
  return found? found[1] : v;
}

export function profileLocation(profile: any){
  const city = (profile?.city || "").trim();
  const countryRaw = (profile?.country || "").trim();
  if(!city &&!countryRaw) return "Worldwide";
  if(!city) return countryName(countryRaw);
  let countryCode = countryRaw;
  const correct = CITY_TO_COUNTRY[city.toLowerCase()];
  if(correct &&!countryRaw) countryCode = correct;
  if(!countryCode) return city;
  return `${city}, ${countryName(countryCode)}`;
}

export function compatibility(){ return Math.min(96, 70 + Math.floor(Math.random()*15)); }

export function uniqueFace(id: string){
  let h=0; for(let i=0;i<id.length;i++) h = id.charCodeAt(i) + ((h<<5)-h);
  const n = Math.abs(h % 70) + 1;
  return `https://i.pravatar.cc/500?img=${n}&u=${encodeURIComponent(id)}`;
}

export function normalizeProfile(raw: any): Profile {
  if (!raw) return raw;
  const id = raw.id || Math.random().toString();
  const face = uniqueFace(id);
  return {
    id,
    name: raw.full_name || raw.name || raw.display_name || 'User',
    full_name: raw.full_name || raw.name || 'User',
    email: raw.email || '',
    age: raw.age || 19 + (Math.abs(id.charCodeAt(0)) % 11),
    photos: [face],
    mainPhoto: face,
    avatar_url: face,
    city: raw.city || 'Kampala',
    country: raw.country || 'UG',
    bio: raw.bio || 'Looking for real connections worldwide 🌍',
    interests: raw.interests && raw.interests.length? raw.interests : ['Travel','Music','Reading'],
    isOnline: true,
    isVerified: raw.is_verified || false,
    is_verified: raw.is_verified || false,
    createdAt: raw.created_at || new Date().toISOString(),
    created_at: raw.created_at || new Date().toISOString(),
  }
}