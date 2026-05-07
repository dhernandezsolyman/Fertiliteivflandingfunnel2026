import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ProgressBar } from '../components/ProgressBar';
import { StepContainer } from '../components/StepContainer';
import { AnswerChip } from '../components/AnswerChip';
import { useFunnel } from '../context/FunnelContext';
import { ArrowRight } from 'lucide-react';

export function Step4() {
  const navigate = useNavigate();
  const { data, updateData, saveStepToServer } = useFunnel();
  const [timeline, setTimeline] = useState(data.timeline || '');
  const [travel, setTravel] = useState(data.travel || '');

  const timelines = [
    'As soon as possible',
    'Within 1 to 3 months',
    'Within 3 to 6 months',
    'Just researching'
  ];

  const travelOptions = [
    'Yes, definitely',
    'Yes, if the plan feels right',
    'Maybe—I need more information',
    'No'
  ];

  const handleContinue = () => {
    if (timeline && travel) {
      updateData({ timeline, travel });
      saveStepToServer(4, { timeline, travel });
      navigate('/step-5');
    }
  };

  const canContinue = timeline && travel;
  const isLowIntent = timeline === 'Just researching' || travel === 'No';

  return (
    <>
      <ProgressBar currentStep={4} totalSteps={6} />
      <StepContainer
        title="Help us understand your timeline"
        subtitle="These answers help us create a treatment plan that matches your needs."
      >
        <div className="mb-5 sm:mb-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2.5 sm:mb-3">
            When are you hoping to start?
          </h3>
          <div className="space-y-2.5 sm:space-y-3">
            {timelines.map((option) => (
              <AnswerChip
                key={option}
                label={option}
                selected={timeline === option}
                onClick={() => setTimeline(option)}
              />
            ))}
          </div>
        </div>

        <div className="mb-5 sm:mb-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2.5 sm:mb-3">
            Open to traveling to Tijuana?
          </h3>
          <div className="space-y-2.5 sm:space-y-3">
            {travelOptions.map((option) => (
              <AnswerChip
                key={option}
                label={option}
                selected={travel === option}
                onClick={() => setTravel(option)}
              />
            ))}
          </div>
        </div>

        {isLowIntent && canContinue && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 sm:p-4 mb-3">
            <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
              We're happy to share information, but Fertilite specializes in patients ready to begin within 6 months who are open to traveling to Tijuana.
            </p>
          </div>
        )}

        <div className="pt-2">
          <button
            onClick={handleContinue}
            disabled={!canContinue}
            className={`
              w-full py-3 sm:py-3.5 px-5 rounded-xl font-semibold text-[0.9375rem] sm:text-base transition-all duration-300 flex items-center justify-center gap-2
              ${canContinue
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
