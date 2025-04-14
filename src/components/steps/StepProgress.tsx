
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { CheckIcon, LockIcon } from 'lucide-react';

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
  const { updateUserProgress } = useAuth();

  const goToStep = (step: Step) => {
    if (step.status !== 'locked') {
      // Mettre à jour le chemin visité pour la persistance
      updateUserProgress(currentStepId, step.path);
      navigate(step.path);
    }
  };

  return (
    <div className="w-full px-4 py-6">
      <div className="flex flex-wrap justify-center items-center gap-2 mb-8">
        {steps.map((step, index) => {
          const isActive = step.status !== 'locked';
          const showLine = index < steps.length - 1;

          return (
            <React.Fragment key={step.id}>
              <button 
                className={cn(
                  "flex flex-col items-center gap-1 p-2 rounded-lg transition-all",
                  step.status === 'completed' && "bg-success/10",
                  step.status === 'current' && "bg-primary/10 ring-2 ring-primary",
                  step.status === 'locked' && "bg-gray-100 opacity-70",
                  "disabled:cursor-not-allowed"
                )}
                onClick={() => goToStep(step)}
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
          size="lg"
          className="border rounded-lg py-5 h-auto text-lg"
          onClick={() => navigate('/aide')}
        >
          <span>Besoin d'accompagnement ?</span>
        </Button>
      </div>
    </div>
  );
};

export default StepProgress;
