import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ProgressBar } from '../components/ProgressBar';
import { StepContainer } from '../components/StepContainer';
import { AnswerChip } from '../components/AnswerChip';
import { useFunnel } from '../context/FunnelContext';
import { ArrowRight } from 'lucide-react';

export function Step3() {
  const navigate = useNavigate();
  const { data, updateData, saveStepToServer } = useFunnel();
  const [journey, setJourney] = useState(data.journey || '');

  const journeyStages = [
    'Just starting',
    'Choosing between clinics',
    'Had 1 failed IVF cycle',
    'Had 2 or more failed IVF cycles',
    'Looking for advanced options'
  ];

  const handleContinue = () => {
    if (journey) {
      updateData({ journey });
      saveStepToServer(3, { journey });
      navigate('/commitment');
    }
  };

  return (
    <>
      <ProgressBar currentStep={3} totalSteps={6} />
      <StepContainer
        title="Where are you in your IVF journey?"
        subtitle="This helps us understand your experience and what matters most to you."
        centerContent
      >
        {journeyStages.map((stage) => (
          <AnswerChip
            key={stage}
            label={stage}
            selected={journey === stage}
            onClick={() => setJourney(stage)}
          />
        ))}

        <div className="pt-4 sm:pt-6">
          <button
            onClick={handleContinue}
            disabled={!journey}
            className={`
              w-full py-3 sm:py-3.5 px-5 rounded-xl font-semibold text-[0.9375rem] sm:text-base transition-all duration-300 flex items-center justify-center gap-2
              ${journey
                ? 'bg-teal-600 text-white hover:bg-teal-700 shadow-lg hover:shadow-xl'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            Continue
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </StepContainer>
    </>
  );
}
