import Link from 'next/link'
import { Profile } from '@/lib/profile'
import ProfileCard from './ProfileCard'

export default function SectionRow({ title, icon, profiles }: { title: string; icon: string; profiles: Profile[] }) {
  if (!profiles.length) return null
  return <section className="mt-8"><div className="mb-3 flex items-end justify-between"><h2 className="display text-xl font-bold"><span className="mr-2 text-[#d49e00]">{icon}</span>{title}</h2><Link href="/explore" className="text-xs font-bold text-[#a37a00]">See all</Link></div><div className="flex snap-x gap-4 overflow-x-auto pb-3">{profiles.slice(0, 8).map(profile => <div key={profile.id} className="min-w-[250px] snap-start"><ProfileCard profile={profile} compact /></div>)}</div></section>
}
