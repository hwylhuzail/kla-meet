export const COUNTRIES = [
  ['UG', 'Uganda'], ['KE', 'Kenya'], ['NG', 'Nigeria'], ['GH', 'Ghana'], ['ZA', 'South Africa'], ['TZ', 'Tanzania'], ['RW', 'Rwanda'],
  ['GB', 'United Kingdom'], ['US', 'United States'], ['CA', 'Canada'], ['FR', 'France'], ['DE', 'Germany'], ['IT', 'Italy'], ['ES', 'Spain'],
  ['AE', 'United Arab Emirates'], ['SA', 'Saudi Arabia'], ['IN', 'India'], ['PK', 'Pakistan'], ['PH', 'Philippines'], ['JP', 'Japan'], ['KR', 'South Korea'],
  ['BR', 'Brazil'], ['MX', 'Mexico'], ['AU', 'Australia'], ['NL', 'Netherlands'], ['TR', 'Turkey'], ['PT', 'Portugal'], ['SE', 'Sweden'], ['NO', 'Norway'],
  ['DK', 'Denmark'], ['CH', 'Switzerland'], ['BE', 'Belgium'], ['AT', 'Austria'], ['IE', 'Ireland'], ['NZ', 'New Zealand'], ['SG', 'Singapore'],
  ['MY', 'Malaysia'], ['ID', 'Indonesia'], ['TH', 'Thailand'], ['EG', 'Egypt'], ['MA', 'Morocco'], ['ET', 'Ethiopia'], ['ZM', 'Zambia'], ['ZW', 'Zimbabwe'],
] as const

export function countryFlag(value?: string | null) {
  if (!value) return '🌍'
  const code = value.length === 2 ? value.toUpperCase() : COUNTRIES.find(([, name]) => name.toLowerCase() === value.toLowerCase())?.[0]
  if (!code) return '🌍'
  return String.fromCodePoint(...code.split('').map(letter => 127397 + letter.charCodeAt(0)))
}

export function countryName(value?: string | null) {
  if (!value) return 'Worldwide'
  return COUNTRIES.find(([code, name]) => code === value.toUpperCase() || name.toLowerCase() === value.toLowerCase())?.[1] || value
}
