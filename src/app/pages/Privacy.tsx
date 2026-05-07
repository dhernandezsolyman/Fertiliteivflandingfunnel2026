import { Shield } from 'lucide-react';
import { fullLogoLight } from '../components/logos';

export function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <a href="/" className="inline-block mb-6">
          <img src={fullLogoLight} alt="Fertilite" className="h-12 sm:h-16 w-auto" />
        </a>

        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-8 h-8 text-teal-600" />
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Privacy Policy</h1>
        </div>

        <p className="text-sm text-gray-500 mb-8">Last Updated: April 20, 2026</p>

        <div className="prose prose-gray max-w-none space-y-6">

          {/* DATA CONTROLLER */}
          <section className="bg-teal-50 border-l-4 border-teal-600 p-6 rounded-r-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3 mt-0">Data Controller</h2>
            <p className="text-gray-900 leading-relaxed mb-3">
              Fertilite Reproductive Medicine Clinic is operated by <strong>Servicios de Medicina Reproductiva de Tijuana, S.C. (SEMERT)</strong>, which is the entity responsible for the processing of your personal data.
            </p>
            <div className="text-gray-900 space-y-1">
              <p><strong>Address:</strong> Tijuana, Baja California, Mexico</p>
              <p><strong>Email:</strong> <a href="mailto:privacy@fertilitecenter.com" className="text-teal-600 underline">privacy@fertilitecenter.com</a></p>
              <p><strong>Phone:</strong> <a href="tel:+16195867830" className="text-teal-600 underline">+1 (619) 586-7830</a></p>
            </div>
          </section>

          {/* DATA WE COLLECT */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Data We Collect</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              When you use our consultation request form, we collect:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Name</strong></li>
              <li><strong>Email address</strong></li>
              <li><strong>Phone number</strong></li>
              <li><strong>Age range</strong></li>
              <li><strong>Fertility-related responses</strong> (journey stage, timeline, concerns)</li>
              <li><strong>Location</strong> (geographic region)</li>
              <li><strong>Technical data</strong> (IP address, browser type, device information, UTM parameters for advertising attribution)</li>
            </ul>
          </section>

          {/* PURPOSE OF DATA */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Purpose of Data Processing</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We use your information to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Contact you regarding your fertility consultation inquiry</li>
              <li>Provide personalized fertility treatment recommendations</li>
              <li>Improve our services and patient experience</li>
              <li>Measure advertising campaign effectiveness</li>
            </ul>
            <p className="text-gray-900 font-semibold mt-3">
              We do not sell your personal data.
            </p>
          </section>

          {/* DATA SHARING */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Data Sharing</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We may share your data with:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Internal medical staff</strong> for consultation purposes</li>
              <li><strong>Secure service providers</strong> including database hosting (Supabase), analytics (Google Analytics), and web hosting (Vercel)</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              All service providers process data under strict confidentiality and security standards. We do not share your data with third parties for marketing purposes.
            </p>
          </section>

          {/* COOKIES & TRACKING */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Cookies & Tracking Technologies</h2>
            <p className="text-gray-700 leading-relaxed">
              We use cookies and tracking technologies including <strong>Google Analytics</strong> and <strong>Google Ads</strong> to measure site performance, user behavior, and advertising conversions. You can manage cookie preferences through the consent banner that appears when you first visit our site.
            </p>
          </section>

          {/* DATA SECURITY */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Data Security</h2>
            <p className="text-gray-700 leading-relaxed">
              We use industry-standard safeguards including SSL/TLS encryption, secure database storage, Content Security Policy headers, and regular security audits to protect your personal data. However, no internet transmission or electronic storage system is completely secure. By submitting your information, you acknowledge this inherent risk.
            </p>
          </section>

          {/* ARCO RIGHTS - MEXICAN LAW */}
          <section className="bg-amber-50 border-l-4 border-amber-600 p-6 rounded-r-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3 mt-0">Your Rights Under Mexican Law (ARCO Rights)</h2>
            <p className="text-gray-900 leading-relaxed mb-3">
              Under the Mexican Federal Law on Protection of Personal Data Held by Private Parties (Ley Federal de Protección de Datos Personales en Posesión de los Particulares - LFPDPPP), you have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-900">
              <li><strong>Access (Acceso):</strong> Request a copy of your personal data</li>
              <li><strong>Rectify (Rectificación):</strong> Correct inaccurate or incomplete information</li>
              <li><strong>Cancel (Cancelación):</strong> Request deletion of your data (subject to legal retention requirements)</li>
              <li><strong>Oppose (Oposición):</strong> Object to the processing of your data for specific purposes</li>
            </ul>
            <p className="text-gray-900 leading-relaxed mt-4">
              These are known as <strong>ARCO rights</strong>. To exercise these rights, please contact us at:{' '}
              <a href="mailto:privacy@fertilitecenter.com" className="text-teal-600 underline font-semibold">
                privacy@fertilitecenter.com
              </a>
            </p>
            <p className="text-gray-700 text-sm mt-3 leading-relaxed">
              We will respond to your request within 20 business days as required by Mexican law. We may require verification of your identity before processing your request.
            </p>
          </section>

          {/* INTERNATIONAL TRANSFERS */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">International Data Transfers</h2>
            <p className="text-gray-700 leading-relaxed">
              By using this site, you consent to the transfer of your personal data to Mexico (where our clinic is located) and to service providers in the United States (where our database, analytics, and hosting providers operate). We ensure all international transfers comply with applicable data protection frameworks.
            </p>
          </section>

          {/* CONSENT */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Consent</h2>
            <p className="text-gray-700 leading-relaxed">
              By submitting your information through our consultation request form, you consent to the processing of your personal data by <strong>Servicios de Medicina Reproductiva de Tijuana, S.C. (SEMERT)</strong> as described in this Privacy Policy.
            </p>
          </section>

          {/* DATA RETENTION */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Data Retention</h2>
            <p className="text-gray-700 leading-relaxed">
              We retain your consultation request data for up to 2 years for follow-up purposes, unless you request earlier deletion or become a patient (in which case medical record retention laws apply).
            </p>
          </section>

          {/* CHILDREN'S PRIVACY */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Our services are intended for adults 18+ seeking fertility treatment. We do not knowingly collect information from minors under 18.
            </p>
          </section>

          {/* CHANGES TO POLICY */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Changes to This Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy to reflect legal requirements or service changes. Material changes will be posted on this page with an updated "Last Updated" date. Continued use of our services after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          {/* CONTACT */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Contact Us</h2>
            <div className="bg-teal-50 rounded-lg p-6 border border-teal-200">
              <p className="text-gray-900 font-semibold mb-3">Fertilite Reproductive Medicine Clinic</p>
              <p className="text-gray-700 mb-3">Operated by <strong>Servicios de Medicina Reproductiva de Tijuana, S.C. (SEMERT)</strong></p>
              <div className="text-gray-700 space-y-1.5">
                <p><strong>Privacy Inquiries:</strong> <a href="mailto:privacy@fertilitecenter.com" className="text-teal-600 underline">privacy@fertilitecenter.com</a></p>
                <p><strong>General Inquiries:</strong> <a href="mailto:patients@fertilitecenter.com" className="text-teal-600 underline">patients@fertilitecenter.com</a></p>
                <p><strong>Phone:</strong> <a href="tel:+16195867830" className="text-teal-600 underline">+1 (619) 586-7830</a></p>
                <p><strong>Location:</strong> Tijuana, Baja California, Mexico</p>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <a href="/" className="text-teal-600 hover:text-teal-700 font-medium">
            ← Back to Home
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-600 mb-2">
            © {new Date().getFullYear()} Fertilite Reproductive Medicine Clinic
          </p>
          <p className="text-xs text-gray-500 mb-3">
            Operated by Servicios de Medicina Reproductiva de Tijuana, S.C. (SEMERT)
          </p>
          <div className="flex justify-center gap-4 text-sm">
            <a href="/privacy" className="text-teal-600 hover:text-teal-700 underline">Privacy Policy</a>
            <span className="text-gray-400">|</span>
            <a href="mailto:patients@fertilitecenter.com" className="text-teal-600 hover:text-teal-700 underline">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
