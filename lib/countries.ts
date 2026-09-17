export const COUNTRIES: [string, string][] = [
  ["US", "United States"],
  ["GB", "United Kingdom"],
  ["AE", "United Arab Emirates"],
  ["CA", "Canada"],
  ["UG", "Uganda"],
  ["KE", "Kenya"],
  ["DE", "Germany"],
  ["FR", "France"],
  ["AU", "Australia"],
];
export function countryFlag(code?: string | null) {
  if (!code) return "";
  let c = code.trim().toUpperCase();
  if (c.length > 2) {
    const f = COUNTRIES.find(([, n]) => n.toLowerCase() === c.toLowerCase());
    if (f) c = f[0]; else return "";
  }
  if (c.length!== 2) return "";
  return String.fromCodePoint(...[...c].map(ch => 127397 + ch.charCodeAt(0)));
}
export function countryName(value?: string | null) {
  if (!value) return "Worldwide";
  const v = value.trim();
  const found = COUNTRIES.find(([code, name]) => code.toLowerCase() === v.toLowerCase() || name.toLowerCase() === v.toLowerCase());
  return found? found[1] : v;
}
