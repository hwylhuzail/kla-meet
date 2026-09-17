export const COUNTRIES = [
  ['US', 'United States'],
  ['GB', 'United Kingdom'],
  ['AE', 'United Arab Emirates'],
  ['CA', 'Canada'],
  ['FR', 'France'],
  ['DE', 'Germany'],
  ['AU', 'Australia'],
  ['IT', 'Italy'],
  ['ES', 'Spain'],
  ['UG', 'Uganda'],
] as const;

export function countryFlag(value?: string | null) {
  if (!value) return '🌍';
  const code = value.length === 2? value.toUpperCase() : COUNTRIES.find(([, name]) => name.toLowerCase() === value.toLowerCase())?.[0];
  if (!code) return '🌍';
  return String.fromCodePoint(...code.split('').map((letter) => 127397 + letter.charCodeAt(0)));
}

export function countryName(value?: string | null) {
  if (!value) return 'Worldwide';
  return COUNTRIES.find(([code, name]) => code === value.toUpperCase() || name.toLowerCase() === value.toLowerCase())?.[1] || value;
}
