export const COUNTRIES = [
  ['US', 'United States'], ['GB', 'United Kingdom'], ['AE', 'United Arab Emirates'], ['CA', 'Canada'], ['FR', 'France'], ['DE', 'Germany'], ['AU', 'Australia'], ['BR', 'Brazil'],
  ['IT', 'Italy'], ['ES', 'Spain'], ['NL', 'Netherlands'], ['TR', 'Turkey'], ['PT', 'Portugal'], ['SE', 'Sweden'], ['NO', 'Norway'],
  ['DK', 'Denmark'], ['CH', 'Switzerland'], ['BE', 'Belgium'], ['AT', 'Austria'], ['IE', 'Ireland'], ['NZ', 'New Zealand'], ['SG', 'Singapore'],
  ['MY', 'Malaysia'], ['ID', 'Indonesia'], ['TH', 'Thailand'], ['JP', 'Japan'], ['KR', 'South Korea'], ['IN', 'India'], ['PK', 'Pakistan'],
  ['PH', 'Philippines'], ['SA', 'Saudi Arabia'], ['MX', 'Mexico'], ['EG', 'Egypt'], ['MA', 'Morocco'], ['ZA', 'South Africa'], ['NG', 'Nigeria'], ['KE', 'Kenya'], ['GH', 'Ghana'], ['ET', 'Ethiopia'], ['ZM', 'Zambia'], ['ZW', 'Zimbabwe'], ['TZ', 'Tanzania'], ['RW', 'Rwanda'],
  ['UG', 'Uganda'],
] as const

export function countryFlag(value?: string | null) {
  if (!value) return '🌍'
  const code = value.length === 2? value.toUpperCase() : COUNTRIES.find(([, name]) => name.toLowerCase() === value.toLowerCase())?.[0]
  if (!code) return '🌍'
  return String.fromCodePoint(...code.split('').map(letter => 127397 + letter.charCodeAt(0)))
}

export function countryName(value?: string | null) {
  if (!value) return 'Worldwide'
  return COUNTRIES.find(([code, name]) => code === value.toUpperCase() || name.toLowerCase() === value.toLowerCase())?.[1] || value
}