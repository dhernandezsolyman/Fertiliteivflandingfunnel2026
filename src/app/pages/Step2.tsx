import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ProgressBar } from '../components/ProgressBar';
import { StepContainer } from '../components/StepContainer';
import { AnswerChip } from '../components/AnswerChip';
import { useFunnel } from '../context/FunnelContext';
import { ArrowRight } from 'lucide-react';

export function Step2() {
  const navigate = useNavigate();
  const { data, updateData, saveStepToServer } = useFunnel();
  const [age, setAge] = useState(data.age || '');

  const ageRanges = [
    'Under 35',
    '35 to 37',
    '38 to 40',
    '41 to 42',
    '43 plus'
  ];

  const handleContinue = () => {
    if (age) {
      updateData({ age });
      saveStepToServer(2, { age });
      navigate('/step-3');
    }
  };

  return (
    <>
      <ProgressBar currentStep={2} totalSteps={6} />
      <StepContainer
        title="What is your age?"
        subtitle="Age helps us recommend the most effective treatment approach for you."
        centerContent
      >
        {ageRanges.map((ageRange) => (
          <AnswerChip
            key={ageRange}
            label={ageRange}
            selected={age === ageRange}
            onClick={() => setAge(ageRange)}
          />
        ))}

        <div className="pt-4 sm:pt-6">
          <button
            onClick={handleContinue}
            disabled={!age}
            className={`
              w-full py-3 sm:py-3.5 px-5 rounded-xl font-semibold text-[0.9375rem] sm:text-base transition-all duration-300 flex items-center justify-center gap-2
              ${age
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
