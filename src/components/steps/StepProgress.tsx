
import React from 'react';
import { CheckIcon, LockIcon, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

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
      <div className="progress-path overflow-x-auto md:overflow-visible">
        {steps.map((step, index) => {
          const isActive = step.status !== 'locked';
          
          // Line between steps (not for the last item)
          const showLine = index < steps.length - 1;
          const lineClasses = cn(
            "step-line w-full md:w-20",
            steps[index + 1]?.status === 'locked' ? '' : 'completed'
          );

          return (
            <React.Fragment key={step.id}>
              <TooltipProvider delayDuration={300}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex flex-col items-center relative z-10">
                      <button 
                        className={cn(
                          "step-badge",
                          step.status === 'completed' && "completed",
                          step.status === 'current' && "current",
                          step.status === 'locked' && "locked"
                        )}
                        onClick={() => goToStep(step)}
                        disabled={step.status === 'locked'}
                      >
                        {step.status === 'completed' && <CheckIcon className="h-6 w-6" />}
                        {step.status === 'current' && <span className="text-lg font-bold">{step.id}</span>}
                        {step.status === 'locked' && <LockIcon className="h-5 w-5" />}
                      </button>
                      <div className="mt-2 text-center">
                        <p className={cn(
                          "font-medium text-sm",
                          step.status === 'locked' ? "text-muted-foreground" : "text-foreground"
                        )}>
                          {step.title}
                        </p>
                        {step.status === 'current' && (
                          <Badge variant="secondary" className="mt-1 text-xs animate-pulse">
                            En cours
                          </Badge>
                        )}
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{step.description}</p>
                    {step.status === 'locked' && <p className="text-xs text-muted-foreground mt-1">Terminez les étapes précédentes pour débloquer</p>}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {showLine && (
                <div className={lineClasses} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div className="flex justify-center mt-8">
        <Button 
          variant="outline" 
          className="group flex items-center space-x-2 text-primary hover:text-white"
        >
          <span>Je veux être accompagné(e)</span>
          <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

export default StepProgress;
