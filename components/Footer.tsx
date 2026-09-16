import Link from 'next/link'

export default function Footer() {
  return <footer className="site-footer">
    <div>
      <p className="brand">KLA<span className="brand-mark">•</span>MEET</p>
      <p className="mt-2 text-sm text-white/70">Make the first move in Kampala.</p>
    </div>
    <nav className="flex flex-wrap gap-4 text-sm font-bold" aria-label="Legal links">
      <Link href="/privacy">Privacy</Link>
      <Link href="/terms">Terms</Link>
      <Link href="/guidelines">Guidelines</Link>
      <Link href="/safety">Safety</Link>
    </nav>
    <p className="text-xs text-white/50">18+ community. Be kind, be real.</p>
  </footer>
}
