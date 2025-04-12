
import React from 'react';
import { CheckIcon, LockIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Step } from '@/components/steps/StepProgress';

interface StepItemProps {
  step: Step;
  index: number;
  totalSteps: number;
  onStepClick: (step: Step) => void;
}

const StepItem: React.FC<StepItemProps> = ({ step, index, totalSteps, onStepClick }) => {
  const isActive = step.status !== 'locked';
  const showLine = index < totalSteps - 1;

  return (
    <React.Fragment>
      <button 
        className={cn(
          "flex flex-col items-center gap-1 p-2 rounded-lg transition-all",
          step.status === 'completed' && "bg-success/10",
          step.status === 'current' && "bg-primary/10 ring-2 ring-primary",
          step.status === 'locked' && "bg-gray-100 opacity-70",
          "disabled:cursor-not-allowed"
        )}
        onClick={() => onStepClick(step)}
        disabled={step.status === 'locked'}
      >
        <div className={cn(
          "w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all",
          step.status === 'completed' && "bg-success text-white border-success",
          step.status === 'current' && "bg-white text-primary border-primary",
          step.status === 'locked' && "bg-gray-100 text-gray-400 border-gray-300"
        )}>
          {step.status === 'completed' && <CheckIcon className="h-7 w-7" />}
          {step.status === 'current' && <span className="text-xl font-bold">{step.id}</span>}
          {step.status === 'locked' && <LockIcon className="h-6 w-6" />}
        </div>
        <span className="text-sm font-medium text-center max-w-24">
          {step.title}
        </span>
      </button>
      
      {showLine && (
        <div className={cn(
          "w-8 h-1 hidden md:block",
          step.index + 1 < totalSteps && 
          step.status !== 'locked' && 
          steps[index + 1]?.status !== 'locked' ? "bg-success" : "bg-gray-200"
        )} />
      )}
    </React.Fragment>
  );
};

export default StepItem;
