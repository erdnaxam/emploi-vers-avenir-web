
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Step } from '@/components/steps/StepProgress';
import { useAuth } from '@/contexts/AuthContext';

interface StepsListProps {
  steps: Step[];
}

const StepsList: React.FC<StepsListProps> = ({ steps }) => {
  const navigate = useNavigate();
  const { updateUserProgress } = useAuth();
  const { user } = useAuth();
  
  const handleStepClick = (step: Step) => {
    if (step.status !== "locked") {
      navigate(step.path);
      if (user) {
        updateUserProgress(user.currentStep, step.path);
      }
    }
  };
  
  return (
    <div className="flex flex-col gap-3 max-w-xl mx-auto mb-8">
      {steps.map((step) => (
        <button
          key={step.id}
          className={cn(
            "flex items-center p-5 text-left h-auto rounded-lg border-2 w-full",
            step.status === "current" ? "bg-primary text-white border-primary" : "bg-white border-gray-200",
            step.status === "completed" ? "bg-success/10 border-success" : "",
            step.status === "locked" ? "opacity-60 cursor-not-allowed" : "cursor-pointer hover:shadow-md transition-all"
          )}
          onClick={() => handleStepClick(step)}
          disabled={step.status === "locked"}
        >
          <div className={cn(
            "rounded-full w-10 h-10 flex items-center justify-center mr-3 text-lg font-bold",
            step.status === "current" ? "bg-white text-primary" : "",
            step.status === "completed" ? "bg-success text-white" : "",
            step.status === "locked" ? "bg-gray-200 text-gray-500" : ""
          )}>
            {step.id}
          </div>
          <div>
            <div className="font-medium text-lg">{step.title}</div>
            <div className={cn(
              "text-sm",
              step.status === "current" ? "text-white/80" : "text-gray-500"
            )}>{step.description}</div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default StepsList;
