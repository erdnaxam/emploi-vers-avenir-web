
import React from 'react';
import { Step } from '@/components/steps/StepProgress';

interface WelcomeMessageProps {
  currentStep: Step | undefined;
  completedSteps: number;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ currentStep, completedSteps }) => {
  if (!currentStep) return null;
  
  return (
    <div className="bg-primary/10 text-primary p-4 mb-6 text-center rounded-lg">
      <span className="text-lg font-medium">
        {completedSteps === 0 
          ? "👋 Bienvenue ! Commencez votre parcours avec la première étape." 
          : `📣 Vous êtes à l'étape ${currentStep.id} : ${currentStep.title}`}
      </span>
    </div>
  );
};

export default WelcomeMessage;
