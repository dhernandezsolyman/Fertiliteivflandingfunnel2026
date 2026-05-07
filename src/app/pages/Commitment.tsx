import { useNavigate } from 'react-router';
import { useFunnel } from '../context/FunnelContext';
import { Sparkles, ArrowRight } from 'lucide-react';
import { smallroundLight } from '../components/logos';

export function Commitment() {
  const navigate = useNavigate();
  const { data } = useFunnel();

  const getMessage = () => {
    if (data.journey?.includes('failed')) {
      return {
        title: "You deserve a clinic that understands your journey",
        body: "After failed cycles, many patients find peace in having a structured plan. Fertilite offers both single-cycle and multi-cycle paths."
      };
    }
    
    if (data.journey === 'Just starting') {
      return {
        title: "Starting IVF can feel overwhelming",
        body: "Fertilite lets you compare single and structured multi-cycle options—so you can move forward with confidence."
      };
    }

    return {
      title: "You may be a fit for a personalized IVF path",
      body: "Fertilite offers flexible options that reduce pressure and increase peace of mind. Let's find what works for you."
    };
  };

  const message = getMessage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-50/30 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-teal-100 rounded-full mb-5 sm:mb-6">
          <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-teal-600" />
        </div>

        <h1 className="text-[1.375rem] sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-3 sm:mb-4 leading-snug">
          {message.title}
        </h1>

        <p className="text-[0.9375rem] sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-xl mx-auto leading-relaxed">
          {message.body}
        </p>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 sm:p-8 mb-6 sm:mb-8 text-left">
          <h3 className="text-[0.9375rem] sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 text-center">
            What You'll Discover Next
          </h3>
          <ul className="space-y-2.5 sm:space-y-3 text-gray-700">
            {[
              'Your personalized treatment path options',
              'Transparent single & multi-cycle pricing',
              'How Fertilite reduces cost without compromising care',
              'Cross-border travel support details',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 sm:gap-3">
                <span className="text-teal-600 font-semibold flex-shrink-0">✓</span>
                <span className="text-sm sm:text-base">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={() => navigate('/step-4')}
          className="w-full sm:w-auto bg-teal-600 text-white px-5 py-3 sm:px-8 sm:py-3.5 rounded-xl font-semibold text-[0.9375rem] sm:text-lg shadow-lg hover:bg-teal-700 transition-all duration-300 hover:scale-[1.02] inline-flex items-center justify-center gap-2 sm:gap-3"
        >
          Continue to Your Personalized Path
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
        </button>

        <p className="text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4">
          Just a few more questions • Takes 1 minute
        </p>
      </div>
    </div>
  );
}