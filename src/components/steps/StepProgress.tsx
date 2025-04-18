
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { CheckIcon, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();

  const goToStep = (step: Step) => {
    if (step.status === 'locked') {
      toast({
        title: "Étape non disponible",
        description: "Vous devez d'abord terminer les étapes précédentes.",
        variant: "warning",
      });
      return;
    }
    updateUserProgress(currentStepId, step.path);
    navigate(step.path);
  };

  // Simplified titles for mobile view
  const shortTitles = {
    1: "CV",
    2: "Préparation",
    3: "Recherche",
    4: "Entretien",
    5: "Entretien",
    6: "Retour",
    7: "Contrat",
    8: "Suivi"
  };

  return (
    <div className="w-full px-4 py-6">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Votre parcours vers l'emploi</h1>
        <p className="text-lg text-muted-foreground">Suivez les étapes pour atteindre votre objectif</p>
      </div>
      
      <div className="relative w-full mb-12">
        {/* Background line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2" />
        
        {/* Steps */}
        <div className="relative flex justify-between items-center">
          {steps.map((step) => {
            const isActive = step.status === 'completed' || step.status === 'current';
            const isCompleted = step.status === 'completed';
            
            return (
              <div key={step.id} className="flex flex-col items-center">
                <button 
                  onClick={() => goToStep(step)}
                  className={cn(
                    "relative z-10 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-lg font-bold border-2 transition-all",
                    isCompleted ? "bg-green-600 border-green-600 text-white" :
                    step.status === 'current' ? "bg-primary border-primary text-white" :
                    "bg-gray-100 border-gray-300 text-gray-500",
                    "hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
                    step.status === 'locked' && "cursor-not-allowed opacity-60"
                  )}
                  disabled={step.status === 'locked'}
                >
                  {isCompleted ? <CheckIcon className="h-6 w-6" /> : step.id}
                </button>
                <span className="mt-2 text-sm font-medium text-center hidden md:block">
                  {step.title}
                </span>
                <span className="mt-2 text-sm font-medium text-center md:hidden">
                  {shortTitles[step.id]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <Button 
          variant="outline" 
          size="lg"
          className="border rounded-lg py-5 h-auto text-lg"
          onClick={() => {
            toast({
              title: "Besoin d'aide ?",
              description: "Notre assistant virtuel est là pour vous aider, cliquez sur l'icône en bas à droite.",
            });
          }}
        >
          <MessageCircle className="h-5 w-5 mr-2" />
          <span>Aide disponible à chaque étape</span>
        </Button>
      </div>
    </div>
  );
};

export default StepProgress;
