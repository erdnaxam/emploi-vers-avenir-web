
import React from 'react';
import { CheckIcon, LockIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useNavigate } from 'react-router-dom';

export interface Step {
  id: number;
  title: string;
  description: string;
  path: string;
  status: 'completed' | 'current' | 'locked';
}

interface StepProgressProps {
  steps: Step[];
  currentStepId: number;
}

const StepProgress: React.FC<StepProgressProps> = ({ steps, currentStepId }) => {
  const navigate = useNavigate();

  const goToStep = (step: Step) => {
    if (step.status !== 'locked') {
      navigate(step.path);
    }
  };

  return (
    <div className="w-full px-4 py-6">
      <div className="flex flex-wrap justify-center items-center gap-2 mb-8">
        {steps.map((step, index) => {
          const isActive = step.status !== 'locked';
          
          // Line between steps (not for the last item)
          const showLine = index < steps.length - 1;

          return (
            <React.Fragment key={step.id}>
              <TooltipProvider delayDuration={300}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex flex-col items-center gap-2">
                      <button 
                        className={cn(
                          "w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all",
                          step.status === 'completed' && "bg-success text-white border-success",
                          step.status === 'current' && "bg-white text-primary border-primary",
                          step.status === 'locked' && "bg-gray-100 text-gray-400 border-gray-300"
                        )}
                        onClick={() => goToStep(step)}
                        disabled={step.status === 'locked'}
                      >
                        {step.status === 'completed' && <CheckIcon className="h-8 w-8" />}
                        {step.status === 'current' && <span className="text-lg font-medium">{step.id}</span>}
                        {step.status === 'locked' && <LockIcon className="h-6 w-6" />}
                      </button>
                      <span className="text-xs text-center max-w-24 line-clamp-2">
                        {step.title}
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{step.description}</p>
                    {step.status === 'locked' && <p className="text-xs text-muted-foreground mt-1">Terminez les étapes précédentes pour débloquer</p>}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {showLine && (
                <div className={cn(
                  "w-8 h-0.5 hidden md:block",
                  steps[index + 1]?.status === 'locked' ? "bg-gray-200" : "bg-success"
                )} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div className="flex justify-center mt-6">
        <Button 
          variant="outline" 
          className="border-2 rounded-md py-6 h-auto text-lg"
        >
          <span>Je veux être accompagné(e)</span>
        </Button>
      </div>
    </div>
  );
};

export default StepProgress;
