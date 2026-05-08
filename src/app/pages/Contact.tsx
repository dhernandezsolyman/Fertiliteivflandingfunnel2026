import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ProgressBar } from '../components/ProgressBar';
import { useFunnel } from '../context/FunnelContext';
import { Footer } from '../components/Footer';
import { Lock, ArrowRight, Mail, Phone, MessageCircle, Loader2 } from 'lucide-react';
import { smallroundLight } from '../components/logos';

export function Contact() {
  const navigate = useNavigate();
  const { data, updateData, submitLead, isSubmitting } = useFunnel();
  const [firstName, setFirstName] = useState(data.firstName || '');
  const [email, setEmail] = useState(data.email || '');
  const [phone, setPhone] = useState(data.phone || '');
  const [contactMethod, setContactMethod] = useState(data.contactMethod || 'email');
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [touched, setTouched] = useState({ firstName: false, email: false, phone: false });

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/.test(phone.replace(/\s/g, ''));
  };

  const isValidForm = firstName.trim() && validateEmail(email) && validatePhone(phone) && privacyConsent;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidForm && !isSubmitting) {
      updateData({ firstName, email, phone, contactMethod });
      const score = await submitLead({ firstName, email, phone, contactMethod });

      // Track form submission with Google Analytics and Facebook Pixel
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'adw_formulario_contacto');
        console.log('[Tracking] Form submit event fired: adw_formulario_contacto');
      }
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Contact', { content_name: 'adw_formulario_contacto' });
        console.log('[Tracking] Facebook Pixel Contact event fired');
      }

      if (score) {
        console.log('[Contact] Lead submitted successfully, score:', score.total, 'urgency:', score.urgency);
      } else {
        console.warn('[Contact] Lead submission failed, navigating anyway');
      }

      // Delay navigation to allow tracking events to fire
      setTimeout(() => {
        navigate('/results');
      }, 300);
    }
  };

  const handleBlur = (field: 'firstName' | 'email' | 'phone') => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const contactMethods = [
    { value: 'email', label: 'Email', icon: Mail },
    { value: 'phone', label: 'Phone Call', icon: Phone },
    { value: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
  ];

  return (
    <>
      <ProgressBar currentStep={6} totalSteps={6} />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50/30 pt-20 sm:pt-24 pb-24 sm:pb-32 px-4">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-teal-100 rounded-full mb-3 sm:mb-4">
              <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-teal-600" />
            </div>
            <h1 className="text-[1.375rem] sm:text-2xl md:text-4xl font-semibold text-gray-900 mb-2 sm:mb-3 leading-snug">
              Unlock Your Personalized IVF Path
            </h1>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Enter your details to see customized treatment options and pricing.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-5 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold text-gray-900 mb-1.5 sm:mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  onBlur={() => handleBlur('firstName')}
                  className={`w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 transition-colors text-sm sm:text-base ${
                    touched.firstName && !firstName.trim()
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-gray-200 focus:border-teal-500'
                  } focus:outline-none`}
                  placeholder="Enter your first name"
                  required
                />
                {touched.firstName && !firstName.trim() && (
                  <p className="text-xs sm:text-sm text-red-600 mt-1">First name is required</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-1.5 sm:mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => handleBlur('email')}
                    className={`w-full pl-10 sm:pl-12 pr-3.5 py-2.5 sm:py-3 rounded-xl border-2 transition-colors text-sm sm:text-base ${
                      touched.email && !validateEmail(email)
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-gray-200 focus:border-teal-500'
                    } focus:outline-none`}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                {touched.email && !validateEmail(email) && (
                  <p className="text-xs sm:text-sm text-red-600 mt-1">Please enter a valid email</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-1.5 sm:mb-2">
                  Phone or WhatsApp
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onBlur={() => handleBlur('phone')}
                    className={`w-full pl-10 sm:pl-12 pr-3.5 py-2.5 sm:py-3 rounded-xl border-2 transition-colors text-sm sm:text-base ${
                      touched.phone && !validatePhone(phone)
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-gray-200 focus:border-teal-500'
                    } focus:outline-none`}
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>
                {touched.phone && !validatePhone(phone) && (
                  <p className="text-xs sm:text-sm text-red-600 mt-1">Please enter a valid phone number</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2 sm:mb-3">
                  Preferred Contact Method
                </label>
                <div className="space-y-1.5 sm:space-y-2">
                  {contactMethods.map(({ value, label, icon: Icon }) => (
                    <label key={value} className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-xl border-2 border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="contactMethod"
                        value={value}
                        checked={contactMethod === value}
                        onChange={(e) => setContactMethod(e.target.value)}
                        className="w-4 h-4 text-teal-600"
                      />
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                      <span className="text-sm sm:text-base text-gray-700">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-2.5 sm:gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={privacyConsent}
                    onChange={(e) => setPrivacyConsent(e.target.checked)}
                    className="w-4 h-4 mt-0.5 text-teal-600 border-gray-300 rounded focus:ring-teal-500 flex-shrink-0"
                    required
                  />
                  <span className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                    I agree to be contacted by Fertilite Reproductive Medicine Clinic and consent to the processing of my personal data by Servicios de Medicina Reproductiva de Tijuana, S.C. (SEMERT) in accordance with the{' '}
                    <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-teal-600 underline hover:text-teal-700">
                      Privacy Policy
                    </a>.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={!isValidForm || isSubmitting}
                className={`
                  w-full py-3 sm:py-3.5 px-5 rounded-xl font-semibold text-[0.9375rem] sm:text-base transition-all duration-300 flex items-center justify-center gap-2
                  ${isValidForm && !isSubmitting
                    ? 'bg-teal-600 text-white hover:bg-teal-700 shadow-lg hover:shadow-xl'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                    Preparing Your Results...
                  </>
                ) : (
                  <>
                    See My Personalized Path
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-5 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100">
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-500">
                <Lock className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                <p className="leading-relaxed">
                  Your information is encrypted and secure. We never sell or share your data with third parties for marketing.
                  See our{' '}
                  <a href="/privacy" className="text-teal-600 underline hover:text-teal-700">
                    Privacy Policy
                  </a>{' '}
                  for details on how we protect your information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}