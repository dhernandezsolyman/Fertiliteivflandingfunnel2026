import { useFunnel } from '../context/FunnelContext';
import { Check, DollarSign, Shield, Award, Plane, Calendar, MessageCircle, Phone, Mail, Heart, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Footer } from '../components/Footer';
import { fullLogoDark, fullLogoLight } from '../components/logos';

export function Results() {
  const { data } = useFunnel();

  const getPersonalizedMessage = () => {
    if (data.concern === 'IVF may not work' || data.journey?.includes('failed')) {
      return "Fertilite offers structured multi-cycle paths that reduce pressure on any single attempt.";
    }
    if (data.concern === 'Cost') {
      return "Fertilite offers 40-60% savings vs. US clinics, with transparent multi-cycle pricing.";
    }
    if (data.pathOpenness?.includes('structured')) {
      return "Multi-cycle planning can provide peace of mind and a clearer path forward.";
    }
    return "Here's your personalized treatment path at Fertilite.";
  };

  const getCostEstimate = () => {
    const isYounger = data.age === 'Under 35' || data.age === '35 to 37';
    return {
      singleCycle: '$4,950+',
      multiCycle: isYounger ? '$8,790–$14,190' : '$8,790–$14,190',
      usSingleCycle: '$15,000–$25,000+'
    };
  };

  const costs = getCostEstimate();

  const handleWhatsApp = () => {
    // Track WhatsApp click
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'adw_telefono_whatsapp');
    }
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Contact', { content_name: 'adw_telefono_whatsapp' });
    }
    window.open('https://wa.me/16195867830', '_blank');
  };

  const handleCall = () => {
    // Track phone call click
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'adw_telefono_llamada');
    }
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Contact', { content_name: 'adw_telefono_llamada' });
    }
    // Delay navigation to allow tracking events to fire
    setTimeout(() => {
      window.location.href = 'tel:+16195867830';
    }, 300);
  };

  const handleEmail = () => {
    // Track email click
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'adw_correo_contacto');
    }
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Contact', { content_name: 'adw_correo_contacto' });
    }
    // Delay navigation to allow tracking events to fire
    setTimeout(() => {
      window.location.href = 'mailto:patients@fertilitecenter.com';
    }, 300);
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Results */}
      <div className="bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900 text-white py-10 sm:py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <img src={fullLogoDark} alt="Fertilite" className="h-10 sm:h-14 md:h-20 w-auto max-w-full mb-4 sm:mb-6" />
          
          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6">
            <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="text-xs sm:text-sm">Personalized for {data.firstName}</span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-semibold mb-3 sm:mb-4 leading-snug">
            Your Personalized IVF Path
          </h1>
          
          <p className="text-[0.9375rem] sm:text-lg md:text-xl text-teal-100 leading-relaxed">
            {getPersonalizedMessage()}
          </p>
        </div>
      </div>

      {/* Cost Comparison */}
      <div className="py-10 sm:py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-teal-100 rounded-full mb-3 sm:mb-4">
              <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600" />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-2 sm:mb-3 leading-snug">
              Transparent Pricing
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
              Save 40-60% vs. US clinics—same quality care
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Single Cycle */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-5 sm:p-8">
              <span className="inline-block bg-gray-100 text-gray-700 text-xs sm:text-sm font-semibold px-2.5 py-1 rounded-full mb-3">
                Pay As You Go
              </span>
              <h3 className="text-lg sm:text-2xl font-semibold text-gray-900 mb-1.5 sm:mb-2">
                Single IVF Cycle
              </h3>
              <div className="text-3xl sm:text-4xl font-bold text-teal-600 mb-2 sm:mb-3">
                {costs.singleCycle}
              </div>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                Complete cycle: monitoring, retrieval, fertilization & transfer
              </p>
              <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                {[
                  'Pre-treatment consultation & testing',
                  'Ovarian stimulation monitoring',
                  'Egg retrieval & fertilization',
                  'Embryo transfer & pregnancy test',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 sm:gap-3">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-teal-50 rounded-xl p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-teal-900">
                  <strong>US price:</strong> {costs.usSingleCycle} for the same treatment
                </p>
              </div>
            </div>

            {/* Multi-Cycle Path */}
            <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl shadow-xl border-2 border-teal-500 p-5 sm:p-8 text-white relative overflow-hidden">
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-2.5 py-1 text-[0.625rem] sm:text-xs font-semibold">
                  MOST PEACE OF MIND
                </div>
              </div>
              <h3 className="text-lg sm:text-2xl font-semibold mb-1.5 sm:mb-2 pr-24 sm:pr-0">
                Multi-Cycle Path
              </h3>
              <div className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-3">
                {costs.multiCycle}
              </div>
              <p className="text-sm sm:text-base text-teal-50 mb-4 sm:mb-6 leading-relaxed">
                Up to 4 cycles, one clear plan—less pressure, more confidence
              </p>
              <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                {[
                  'Everything in single cycle, up to 4×',
                  'One upfront price—no surprise costs',
                  'Priority scheduling & continuity of care',
                  'Significant per-cycle savings',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 sm:gap-3">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/20">
                <p className="text-xs sm:text-sm leading-relaxed">
                  <strong>Why this matters:</strong> {data.journey?.includes('failed') ? 'A clear path forward reduces emotional and financial stress.' : 'A structured plan removes pressure from any single attempt.'}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 sm:mt-8 bg-white rounded-xl shadow-md border border-gray-200 p-4 sm:p-6">
            <div className="flex items-start gap-3 sm:gap-4">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">
                  Not an upsell—a smarter path forward
                </h4>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  Multi-cycle planning reduces pressure on any single attempt. Many patients choose single cycles and succeed. Others prefer the structured approach. We'll help you decide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Stack */}
      <div className="py-10 sm:py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-center mb-6 sm:mb-8">
            <img src={fullLogoLight} alt="Fertilite" className="h-14 sm:h-20 md:h-28 w-auto max-w-full" />
          </div>
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-teal-100 rounded-full mb-3 sm:mb-4">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600" />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-2 sm:mb-3 leading-snug">
              Why Fertilite Is Different
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">
              Premium care, serious medicine, responsible costs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {[
              { icon: Award, title: 'Board-Certified Specialists', desc: 'Trained to US standards with decades of combined experience' },
              { icon: Shield, title: 'State-of-the-Art Lab', desc: 'Cutting-edge technology with strict quality protocols' },
              { icon: Heart, title: 'Personalized Care', desc: 'Direct physician access and English-speaking coordinators' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex sm:flex-col items-start sm:items-center gap-4 sm:gap-0 sm:text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-teal-100 rounded-2xl flex items-center justify-center flex-shrink-0 sm:mx-auto sm:mb-4">
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-[0.9375rem] sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
                    {title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-xl h-48 sm:h-64 md:h-80">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1762625570087-6d98fca29531?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtZWRpY2FsJTIwY2xpbmljJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzczNzY5OTM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Fertilite clinic"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Travel Simplicity */}
      <div className="py-10 sm:py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-teal-100 rounded-full mb-3 sm:mb-4">
              <Plane className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600" />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-2 sm:mb-3 leading-snug">
              Cross-Border Travel Made Simple
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
              {data.location === 'Southern California' 
                ? "Just 5 minutes from the border to our clinic"
                : 'Seamless cross-border IVF for patients across the US'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {[
              {
                icon: Calendar,
                title: 'Minimal Time Commitment',
                items: [
                  'Most appointments: 1–2 hours',
                  '3–4 visits over 2–3 weeks per cycle',
                  'Same-day return for most visits',
                ],
              },
              {
                icon: Shield,
                title: 'Full Support Included',
                items: [
                  'Border crossing guidance',
                  'Hotel recommendations near clinic',
                  'Fast Pass Access in Tijuana',
                ],
              },
            ].map(({ icon: Icon, title, items }) => (
              <div key={title} className="bg-white rounded-xl shadow-md border border-gray-200 p-4 sm:p-6">
                <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 flex-shrink-0" />
                  {title}
                </h3>
                <ul className="space-y-1.5 sm:space-y-2">
                  {items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm sm:text-base text-gray-700">
                      <span className="text-teal-600 flex-shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-5 sm:mt-8 bg-teal-50 rounded-xl p-4 sm:p-6 border border-teal-200">
            <p className="text-xs sm:text-sm text-teal-900 leading-relaxed">
              <strong>Real patient insight:</strong> "I was nervous about traveling to Tijuana, but the clinic made everything easy. The savings were incredible, and the care was better than my previous US clinic." — Sarah, 38, Arizona
            </p>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-10 sm:py-16 px-4 bg-gradient-to-br from-teal-900 to-teal-800 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl md:text-4xl font-semibold mb-3 sm:mb-4 leading-snug">
            Ready for the Next Step, {data.firstName}?
          </h2>
          <p className="text-sm sm:text-base md:text-xl text-teal-100 mb-6 sm:mb-8 leading-relaxed">
            Schedule a free consultation with our specialists
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8">
            <button
              onClick={handleWhatsApp}
              className="bg-white text-teal-900 px-5 py-3 sm:px-8 sm:py-3.5 rounded-xl font-semibold text-[0.9375rem] sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] inline-flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              Message on WhatsApp
            </button>
            <button
              onClick={handleCall}
              className="bg-teal-700 border-2 border-white text-white px-5 py-3 sm:px-8 sm:py-3.5 rounded-xl font-semibold text-[0.9375rem] sm:text-lg shadow-lg hover:bg-teal-600 transition-all duration-300 hover:scale-[1.02] inline-flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              Call Now
            </button>
          </div>

          <button
            onClick={handleEmail}
            className="text-teal-200 hover:text-white underline flex items-center gap-1.5 mx-auto transition-colors text-sm"
          >
            <Mail className="w-3.5 h-3.5" />
            Or send us an email
          </button>

          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-teal-700/50">
            <p className="text-xs sm:text-sm text-teal-200 leading-relaxed">
              Our coordinators will reach out within 24 hours via {data.contactMethod === 'whatsapp' ? 'WhatsApp' : data.contactMethod === 'phone' ? 'phone' : 'email'} to schedule your free consultation.
            </p>
          </div>
        </div>
      </div>

      <Footer />

      {/* Sticky Bottom CTA - Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 sm:p-4 shadow-2xl md:hidden z-40">
        <button
          onClick={handleWhatsApp}
          className="w-full bg-teal-600 text-white py-2.5 sm:py-3 px-5 rounded-xl font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg"
        >
          <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
          Start Your Free Consultation
        </button>
      </div>
    </div>
  );
}
