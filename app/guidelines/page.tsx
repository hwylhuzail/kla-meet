import Link from 'next/link'
import Footer from '@/components/Footer'

const rules = [['♥', 'Be genuine', 'Use a recent photo and represent yourself honestly.'], ['✓', 'Be respectful', 'Talk to people with care. Harassment, hate and unwanted sexual content are not welcome.'], ['🛡', 'Stay safe', 'Never send money to someone you have not met. Report suspicious behavior and meet in public.'], ['⚑', 'Report problems', 'Use the in-app tools to report abuse, scams, impersonation or underage users.']]

export default function Guidelines() {
  return <><main className="legal-page"><div className="legal-content"><Link href="/" className="brand">KLA<span className="brand-mark">•</span>MEET</Link><p className="eyebrow mt-12">Our shared standard</p><h1>Community guidelines</h1><div className="grid gap-4">{rules.map(([icon, title, copy]) => <section key={title}><div className="text-3xl text-[#ffc800]">{icon}</div><h2 className="!mt-3 !text-[#202020]">{title}</h2><p>{copy}</p></section>)}</div><p className="mt-6 text-sm text-stone-500">Breaking these guidelines can lead to content removal, account restrictions or a permanent ban.</p></div></main><Footer /></>
}
