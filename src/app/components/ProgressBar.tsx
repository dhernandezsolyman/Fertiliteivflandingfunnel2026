interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="h-1 bg-gray-100">
        <div
          className="h-full bg-teal-600 transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="max-w-2xl mx-auto px-4 py-2 sm:py-3 flex items-center justify-between">
        <div className="text-xs sm:text-sm text-gray-600">
          Step {currentStep} of {totalSteps}
        </div>
        <div className="text-xs text-gray-500 hidden sm:block">
          Your personalized IVF path
        </div>
      </div>
    </div>
  );
}
