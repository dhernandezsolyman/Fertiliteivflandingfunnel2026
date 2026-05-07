import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ProgressBar } from '../components/ProgressBar';
import { StepContainer } from '../components/StepContainer';
import { AnswerChip } from '../components/AnswerChip';
import { useFunnel } from '../context/FunnelContext';
import { ArrowRight } from 'lucide-react';

export function Step5() {
  const navigate = useNavigate();
  const { data, updateData, saveStepToServer } = useFunnel();
  const [concern, setConcern] = useState(data.concern || '');
  const [currentClinic, setCurrentClinic] = useState(data.currentClinic || '');
  const [pathOpenness, setPathOpenness] = useState(data.pathOpenness || '');

  const concerns = [
    'IVF may not work',
    'Cost',
    'Choosing the right clinic',
    'Travel logistics',
    'My age or ovarian reserve',
    'Previous failed cycles',
    'Male factor or embryo quality',
    'Not sure yet'
  ];

  const clinicStatuses = [
    'No',
    'Yes—testing only',
    'Yes—currently in treatment',
    'Yes—but considering switching',
    'Completed treatment elsewhere'
  ];

  const pathOptions = [
    'A single IVF cycle',
    'A structured plan for peace of mind',
    'I want to compare both',
    'Not sure yet'
  ];

  const handleContinue = () => {
    if (concern && currentClinic && pathOpenness) {
      updateData({ concern, currentClinic, pathOpenness });
      saveStepToServer(5, { concern, currentClinic, pathOpenness });
      navigate('/contact');
    }
  };

  const canContinue = concern && currentClinic && pathOpenness;

  return (
    <>
      <ProgressBar currentStep={5} totalSteps={6} />
      <StepContainer
        title="Personalize your path"
        subtitle="Your answers help us provide the most relevant recommendations."
      >
        <div className="mb-5 sm:mb-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2.5 sm:mb-3">
            Biggest concern about IVF?
          </h3>
          <div className="space-y-2.5 sm:space-y-3">
            {concerns.map((option) => (
              <AnswerChip
                key={option}
                label={option}
                selected={concern === option}
                onClick={() => setConcern(option)}
              />
            ))}
          </div>
        </div>

        <div className="mb-5 sm:mb-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2.5 sm:mb-3">
            Do you have a fertility clinic?
          </h3>
          <div className="space-y-2.5 sm:space-y-3">
            {clinicStatuses.map((option) => (
              <AnswerChip
                key={option}
                label={option}
                selected={currentClinic === option}
                onClick={() => setCurrentClinic(option)}
              />
            ))}
          </div>
        </div>

        <div className="mb-5 sm:mb-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2.5 sm:mb-3">
            Which approach interests you?
          </h3>
          <div className="space-y-2.5 sm:space-y-3">
            {pathOptions.map((option) => (
              <AnswerChip
                key={option}
                label={option}
                selected={pathOpenness === option}
                onClick={() => setPathOpenness(option)}
              />
            ))}
          </div>
        </div>

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
