import { ReactNode } from 'react';
import { smallroundLight } from './logos';

interface StepContainerProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  centerContent?: boolean;
}

export function StepContainer({ children, title, subtitle, centerContent = false }: StepContainerProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50/30 pt-20 sm:pt-24 pb-24 sm:pb-32 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-center mb-4 sm:mb-6">
          <img src={smallroundLight} alt="Fertilite" className="h-9 w-9 sm:h-10 sm:w-10" />
        </div>
        <div className={centerContent ? 'text-center mb-6 sm:mb-8' : 'mb-6 sm:mb-8'}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-2 sm:mb-3 leading-snug">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[0.9375rem] sm:text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
        <div className="space-y-3 sm:space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
}
