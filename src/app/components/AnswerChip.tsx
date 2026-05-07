import { Check } from 'lucide-react';

interface AnswerChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export function AnswerChip({ label, selected, onClick }: AnswerChipProps) {
  return (
    <button
      onClick={onClick}
      className={`
        relative px-4 py-3 sm:px-6 sm:py-4 rounded-xl border-2 transition-all duration-200 text-left w-full
        ${selected 
          ? 'border-teal-600 bg-teal-50 shadow-md transform scale-[0.99]' 
          : 'border-gray-200 bg-white hover:border-teal-300 hover:bg-teal-50/50 hover:shadow-sm'
        }
      `}
    >
      <span className={`block text-sm sm:text-base pr-7 ${selected ? 'text-teal-900 font-medium' : 'text-gray-700'}`}>
        {label}
      </span>
      {selected && (
        <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-teal-600 flex items-center justify-center animate-in fade-in zoom-in duration-200">
          <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
        </div>
      )}
    </button>
  );
}
