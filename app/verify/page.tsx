export const dynamic = 'force-dynamic';



import Link from 'next/link'

export default function Verify() {
  return <main className="min-h-screen bg-[#fbf9ff] p-6"><div className="mx-auto max-w-lg pt-10"><Link href="/profile" className="text-sm font-bold text-violet-600">← Back to profile</Link><p className="eyebrow mt-12 text-violet-600">Trust and safety</p><h1 className="display mt-3 text-4xl font-bold">Get verified.</h1><p className="mt-4 text-sm leading-6 text-stone-500">Verification status is only shown after a real review. Upload your ID securely through the existing KYC flow.</p><section className="soft-panel mt-7"><p className="text-3xl">✓</p><h2 className="display mt-4 text-xl font-bold">Identity review</h2><p className="mt-2 text-sm leading-6 text-stone-500">Your documents are private and reviewed by KLA Meet administrators. Never upload someone else&apos;s document.</p><Link href="/kyc" className="primary-button mt-6 inline-block">Open secure verification</Link></section></div></main>
}
