import { ArrowRight, MapPin, Award, Shield, Heart } from 'lucide-react';
import { useNavigate } from 'react-router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useScrollToTop } from '../components/ScrollToTop';
import { Footer } from '../components/Footer';
import { fullLogoDark } from '../components/logos';

export function Landing() {
  const navigate = useNavigate();
  useScrollToTop();

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1762625570087-6d98fca29531?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtZWRpY2FsJTIwY2xpbmljJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzczNzY5OTM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Medical clinic"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20 md:py-28">
          <div className="max-w-3xl">
            <img
              src={fullLogoDark}
              alt="Fertilite"
              className="h-10 sm:h-16 md:h-25 w-auto max-w-full mb-4 sm:mb-8"
            />
            
            <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5 mb-4 sm:mb-6">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="text-xs sm:text-sm">Hospital Cyntar, Tijuana</span>
            </div>
            
            <h1 className="text-[1.625rem] leading-snug sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-3 sm:mb-5">
              A More Confident Path to IVF
            </h1>
            
            <p className="text-[0.9375rem] sm:text-xl md:text-2xl text-teal-100 mb-5 sm:mb-8 leading-relaxed max-w-2xl">
              Premium IVF care in Tijuana with flexible treatment paths—designed to reduce pressure and increase peace of mind.
            </p>
            
            <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-10">
              {[
                { icon: Heart, text: 'Single-cycle and multi-cycle options' },
                { icon: Award, text: 'Board-certified, US-trained specialists' },
                { icon: Shield, text: '40-60% savings vs. US clinics' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 sm:gap-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-teal-400 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-teal-900" />
                  </div>
                  <p className="text-sm sm:text-lg text-teal-50">
                    {text}
                  </p>
                </div>
              ))}
            </div>
            
            <button
              onClick={() => navigate('/step-1')}
              className="group w-full sm:w-auto bg-white text-teal-900 px-5 py-3 sm:px-8 sm:py-3.5 rounded-xl font-semibold text-[0.9375rem] sm:text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] inline-flex items-center justify-center sm:justify-start gap-2"
            >
              Find Your Personalized IVF Path
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
            </button>
            
            <p className="text-xs sm:text-sm text-teal-200 mt-2.5 sm:mt-4 text-center sm:text-left">
              Takes 2 minutes • No account required
            </p>
          </div>
        </div>
      </div>

      {/* Trust Bar */}
      <div className="bg-gray-50 border-y border-gray-100 py-5 sm:py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 text-center">
            {[
              { value: '19+', label: 'Years Experience' },
              { value: '3,200+', label: 'Successful Cycles' },
              { value: '40-60%', label: 'Cost Savings' },
              { value: '5 min', label: 'From San Diego' },
            ].map(({ value, label }) => (
              <div key={label} className="py-1">
                <div className="text-xl sm:text-3xl font-semibold text-teal-900 mb-0.5">{value}</div>
                <div className="text-[0.6875rem] sm:text-sm text-gray-600">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why This Matters Section */}
      <div className="py-10 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 sm:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-4xl font-semibold text-gray-900 mb-2 sm:mb-4 leading-snug">
              IVF Shouldn't Feel Like a High-Stakes Bet
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Many patients worry one cycle won't be enough—but feel forced to commit without a backup plan. Fertilite offers a different approach.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
            <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-8 shadow-sm">
              <h3 className="text-base sm:text-xl font-semibold text-gray-900 mb-2.5 sm:mb-3">
                Traditional Approach
              </h3>
              <ul className="space-y-2 sm:space-y-3 text-gray-600">
                {[
                  'No clear path if first cycle fails',
                  'High pressure on each attempt',
                  'Surprise costs for additional cycles',
                  'Starting over feels daunting',
                ].map((text) => (
                  <li key={text} className="flex gap-2 sm:gap-3">
                    <span className="text-gray-400 flex-shrink-0">→</span>
                    <span className="text-sm sm:text-base">{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-teal-100/50 border-2 border-teal-200 rounded-2xl p-4 sm:p-8 shadow-sm">
              <h3 className="text-base sm:text-xl font-semibold text-teal-900 mb-2.5 sm:mb-3">
                Fertilite's Structured Path
              </h3>
              <ul className="space-y-2 sm:space-y-3 text-teal-900">
                {[
                  'Clear treatment plan with options',
                  'Less pressure on single attempts',
                  'Transparent multi-cycle pricing',
                  'Peace of mind built in',
                ].map((text) => (
                  <li key={text} className="flex gap-2 sm:gap-3">
                    <span className="text-teal-600 flex-shrink-0">✓</span>
                    <span className="text-sm sm:text-base">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center mt-6 sm:mt-12">
            <button
              onClick={() => navigate('/step-1')}
              className="group w-full sm:w-auto bg-teal-600 text-white px-5 py-3 sm:px-8 sm:py-3.5 rounded-xl font-semibold text-[0.9375rem] sm:text-lg shadow-lg hover:bg-teal-700 transition-all duration-300 hover:scale-[1.02] inline-flex items-center justify-center gap-2"
            >
              Discover Which Path Fits You
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
