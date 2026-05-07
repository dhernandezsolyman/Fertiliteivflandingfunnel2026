import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ProgressBar } from '../components/ProgressBar';
import { StepContainer } from '../components/StepContainer';
import { AnswerChip } from '../components/AnswerChip';
import { useFunnel } from '../context/FunnelContext';
import { ArrowRight } from 'lucide-react';

export function Step1() {
  const navigate = useNavigate();
  const { data, updateData, saveStepToServer } = useFunnel();
  const [location, setLocation] = useState(data.location || '');

  const locations = [
    'Southern California',
    'Arizona',
    'Northern Mexico',
    'Other US',
    'Other'
  ];

  const handleContinue = () => {
    if (location) {
      updateData({ location });
      saveStepToServer(1, { location });
      navigate('/step-2');
    }
  };

  return (
    <>
      <ProgressBar currentStep={1} totalSteps={6} />
      <StepContainer
        title="Where are you located?"
        subtitle="We serve patients throughout the southwestern US and northern Mexico."
        centerContent
      >
        {locations.map((loc) => (
          <AnswerChip
            key={loc}
            label={loc}
            selected={location === loc}
            onClick={() => setLocation(loc)}
          />
        ))}

        <div className="pt-4 sm:pt-6">
          <button
            onClick={handleContinue}
            disabled={!location}
            className={`
              w-full py-3 sm:py-3.5 px-5 rounded-xl font-semibold text-[0.9375rem] sm:text-base transition-all duration-300 flex items-center justify-center gap-2
              ${location
                ? 'bg-teal-600 text-white hover:bg-teal-700 shadow-lg hover:shadow-xl'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            Continue
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        <div className="text-center pt-3">
          <p className="text-xs sm:text-sm text-gray-500">
            Your answers help us personalize your IVF path
          </p>
        </div>
      </StepContainer>
    </>
  );
}
