export const dynamic = 'force-dynamic';



import Link from 'next/link'
import Footer from '@/components/Footer'

export default function Privacy() {
  return (
    <>
      <main className="legal-page">
        <div className="legal-content">
          <Link href="/" className="brand">
            KLA<span className="brand-mark">•</span>MEET
          </Link>
          <p className="eyebrow mt-12">Your privacy matters</p>
          <h1>Privacy Policy</h1>
          <p className="muted">Last updated: September 17, 2026</p>

          <section>
            <h2>Introduction</h2>
            <p>
              KLA Meet ("we", "us", "our") is a global dating platform. This Privacy Policy explains how we collect, use, store and protect your information when you use our app and website. We comply with international privacy laws including GDPR and CCPA.
            </p>

            <h2>Information We Collect</h2>
            <p><strong>Profile Information:</strong> Name, age, gender, photos, bio, interests, relationship intentions, and location you choose to share.</p>
            <p><strong>Activity Information:</strong> Likes, matches, messages, preferences, and interactions to provide matching services.</p>
            <p><strong>Verification Data:</strong> If you request verification, your selfie and verification status are stored securely in encrypted storage. This is used solely for safety review.</p>
            <p><strong>Technical Data:</strong> Device type, OS, IP address, app version, and crash logs to improve performance and prevent fraud.</p>

            <h2>How We Use Your Data</h2>
            <p>We use your information to operate and improve KLA Meet, provide personalized matching, ensure user safety, prevent fraud and abuse, respond to support requests, and communicate important updates. We do not sell your personal data to third parties.</p>

            <h2>Legal Basis</h2>
            <p>We process data based on your consent, to perform our contract with you, for our legitimate interests in keeping the platform safe and improving our service, and to comply with legal obligations.</p>

            <h2>Data Sharing</h2>
            <p>We share data only with service providers who help us operate the platform (such as Supabase for secure hosting and storage), when required by law, or to protect the safety of our users. All partners are bound by strict data protection obligations.</p>

            <h2>Data Retention & Security</h2>
            <p>We retain your data for as long as your account is active. You can delete your data anytime. We use industry-standard encryption, secure storage, and access controls to protect your information.</p>

            <h2>Your Rights</h2>
            <p>You have the right to access, update, correct, or delete your personal information, object to certain processing, withdraw consent, and request data portability. You can manage most of this directly in the app settings. For additional requests, contact our support team.</p>
            
            <h2>International Data Transfers</h2>
            <p>Your information may be processed and stored in different countries where we have operations or use cloud providers. We ensure appropriate safeguards are in place for international transfers.</p>

            <h2>Children's Privacy</h2>
            <p>KLA Meet is for users 18 years and older. We do not knowingly collect data from children.</p>

            <h2>Changes to this Policy</h2>
            <p>We may update this policy from time to time. We will notify you of significant changes within the app.</p>

            <h2>Contact Us</h2>
            <p>For privacy questions or to exercise your rights, please contact us through the support section in the KLA Meet app or at privacy@kla-meet.com.</p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}