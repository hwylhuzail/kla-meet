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
  "kampala": "UG",
  "nairobi": "KE",
};

export const COUNTRIES: [string, string][] = [
  ["US", "United States"],
  ["GB", "United Kingdom"],
  ["FR", "France"],
  ["DE", "Germany"],
  ["AE", "United Arab Emirates"],
  ["CA", "Canada"],
  ["UG", "Uganda"],
  ["KE", "Kenya"],
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
    // if it's actually a city name passed as country
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

  // SMART FIX: If city is known foreign city but country is Uganda/UG, fix it!
  const correctCountry = CITY_TO_COUNTRY[cityLower];
  if (correctCountry) {
    const isWrongUganda =!countryRaw || countryRaw.toLowerCase() === "uganda" || countryRaw.toLowerCase() === "ug";
    // If DB says Uganda but city is Paris/Berlin etc, override
    if (isWrongUganda || (correctCountry!== "UG" && correctCountry!== "KE")) {
      // Only override if country is UG/empty and city is foreign
      if (cityLower === "paris" || cityLower === "berlin" || cityLower === "london" || cityLower === "manhattan" || cityLower === "dubai" || cityLower === "new york") {
         if (countryRaw.toLowerCase() === "uganda" || countryRaw.toLowerCase() === "ug" ||!countryRaw) {
            countryCode = correctCountry;
         }
      }
    }
    if (!countryRaw) countryCode = correctCountry;
  }

  if (!countryCode) return city;
  return `${city}, ${countryName(countryCode)}`;
}

export function compatibility(profile: any, me: any) {
  let score = 70 + Math.floor(Math.random() * 15);
  return Math.min(96, score);
}
