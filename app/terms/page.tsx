export const dynamic = 'force-dynamic';



import Link from 'next/link'
import Footer from '@/components/Footer'

export default function Terms() {
  return (
    <>
      <main className="legal-page">
        <div className="legal-content">
          <Link href="/" className="brand">
            KLA<span className="brand-mark">•</span>MEET
          </Link>
          <p className="eyebrow mt-12">The agreement</p>
          <h1>Terms of Service</h1>
          <p className="muted">Last updated: September 17, 2026</p>

          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using KLA Meet, you agree to these Terms of Service. If you do not agree, please do not use the service. These terms apply globally to all users.
            </p>

            <h2>2. Eligibility</h2>
            <p>
              You must be at least 18 years old to use KLA Meet. By using the service, you represent that you are 18+ and have the legal capacity to enter into this agreement. You are responsible for providing accurate information and keeping your login credentials secure.
            </p>

            <h2>3. Community Guidelines - Respect and Safety</h2>
            <p>To keep our community safe, you agree not to:</p>
            <ul>
              <li>Impersonate any person or create fake profiles</li>
              <li>Harass, bully, threaten, or intimidate other members</li>
              <li>Request money, financial assistance, or commit fraud</li>
              <li>Share intimate or explicit content without consent</li>
              <li>Use the service for any unlawful, spam, or commercial activity</li>
              <li>Share personal contact information of others without consent</li>
            </ul>
            <p>We may warn, suspend, or permanently ban accounts that violate these guidelines or put the community at risk.</p>

            <h2>4. Your Content</h2>
            <p>
              You retain ownership of photos, text, and other content you upload. By uploading content, you grant KLA Meet a worldwide, non-exclusive, royalty-free license to host, store, display, and distribute your content to other members as necessary to operate and promote the service. You are solely responsible for content you share and confirm you have all necessary rights to share it.
            </p>

            <h2>5. Connections and Disclaimers</h2>
            <p>
              KLA Meet helps people discover and connect, but we do not guarantee you will find a match, nor do we control the conduct or truthfulness of our members. You are responsible for your interactions. Always meet in public places, tell a friend or family member where you are going, and protect your personal and financial information.
            </p>

            <h2>6. Subscriptions and Purchases</h2>
            <p>
              Some features may require a paid subscription or in-app purchase. Payments are processed through the app stores. Subscriptions renew automatically unless cancelled at least 24 hours before the end of the current period.
            </p>

            <h2>7. Termination</h2>
            <p>
              You may delete your account at any time through the app settings. We may suspend or terminate your access if you violate these Terms or for any reason to protect the safety of our community.
            </p>

            <h2>8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, KLA Meet is provided on an "as is" basis. We are not liable for any indirect, incidental, or consequential damages arising from your use of the service.
            </p>

            <h2>9. Changes to Terms</h2>
            <p>
              We may update these Terms as our service evolves. We will notify you of material changes within the app. Continued use after an update constitutes acceptance of the revised Terms.
            </p>

            <h2>10. Contact</h2>
            <p>
              For questions about these Terms, please contact us through the support section in the KLA Meet app or at support@kla-meet.com.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}