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

// UNIQUE FACE - hash id to 1..70 = different face forever
export function uniqueFace(id: string){
  let h=0; for(let i=0;i<id.length;i++) h = id.charCodeAt(i) + ((h<<5)-h);
  const n = Math.abs(h % 70) + 1;
  // mix of pravatar + randomuser for more variety
  const sources = [
    `https://i.pravatar.cc/400?img=${n}&u=${id}`,
    `https://randomuser.me/api/portraits/${n%2===0?'women':'men'}/${n%2===0? n%90 : n%90}.jpg`
  ];
  return sources[0];
}

export function normalizeProfile(raw: any): Profile {
  if (!raw) return raw;
  const id = raw.id || Math.random().toString();
  const unique = uniqueFace(id + (raw.email||''));
  // if raw photo is empty or all profiles share same url, replace with unique
  let photos = raw.photos || [];
  if(!photos.length && raw.avatar_url) photos = [raw.avatar_url];
  if(!photos.length) photos = [unique];
  // if photo looks like same seed for everyone, still force unique per id
  const first = photos[0] || '';
  const isGeneric = first.includes('placeholder') || first.length < 10;
  if(isGeneric) photos = [unique];

  return {
    id,
    name: raw.full_name || raw.name || raw.display_name || 'User',
    full_name: raw.full_name || raw.name || 'User',
    age: raw.age || 18 + (Math.abs(id.charCodeAt(0)) % 12),
    photos: photos.map((p:string)=> p.includes('pravatar')? uniqueFace(id + p) : p),
    mainPhoto: unique,
    avatar_url: unique,
    city: raw.city || ['Kampala','Nairobi','Paris','Los Angeles','Dubai','London'][Math.abs(id.charCodeAt(1))%6],
    country: raw.country || ['UG','KE','FR','US','AE','GB'][Math.abs(id.charCodeAt(1))%6],
    bio: raw.bio || '',
    interests: raw.interests || ['Reading','Travel','Music'],
    isOnline: typeof raw.isOnline==='boolean'? raw.isOnline : Math.random()>0.4,
    isVerified: raw.is_verified || false,
    is_verified: raw.is_verified || false,
    createdAt: raw.created_at || raw.createdAt || new Date().toISOString(),
  }
}