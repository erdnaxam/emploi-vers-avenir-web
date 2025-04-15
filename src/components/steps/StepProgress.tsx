
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { CheckIcon } from 'lucide-react';

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

  // Mapping of step IDs to shorter titles for the progress bar
  const shortTitles = {
    1: "Évaluation & CV",
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
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-3">Votre parcours vers l'emploi</h1>
        <p className="text-xl">8 étapes simples pour vous préparer, trouver et garder votre emploi.</p>
      </div>
      
      <div className="relative w-full mb-12">
        {/* Horizontal line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2" />
        
        {/* Steps */}
        <div className="relative flex justify-between items-center">
          {steps.map((step) => {
            const isActive = step.status === 'completed' || step.status === 'current';
            
            return (
              <div key={step.id} className="flex flex-col items-center">
                <button 
                  onClick={() => goToStep(step)}
                  className={cn(
                    "relative z-10 w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold border-2 transition-all",
                    step.id <= 2 ? "bg-blue-700 border-blue-700 text-white" : "bg-gray-300 border-gray-300 text-gray-700",
                    "hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  )}
                  disabled={step.status === 'locked'}
                >
                  {step.status === 'completed' ? <CheckIcon className="h-7 w-7" /> : step.id}
                </button>
                <span className="mt-2 text-sm font-medium text-center">
                  {shortTitles[step.id] || step.title}
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
          onClick={() => navigate('/aide')}
        >
          <span>Besoin d'accompagnement ?</span>
        </Button>
      </div>
    </div>
  );
};

export default StepProgress;
