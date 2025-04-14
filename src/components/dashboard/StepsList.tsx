
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Step } from '@/components/steps/StepProgress';
import { useAuth } from '@/contexts/AuthContext';
import { CheckCircle, LockIcon, Award, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

interface StepsListProps {
  steps: Step[];
}

const StepsList: React.FC<StepsListProps> = ({ steps }) => {
  const navigate = useNavigate();
  const { updateUserProgress } = useAuth();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const handleStepClick = (step: Step) => {
    if (step.status !== "locked") {
      navigate(step.path);
      if (user) {
        updateUserProgress(user.currentStep, step.path);
      }
    } else {
      toast({
        title: "Étape verrouillée",
        description: "Terminez les étapes précédentes pour débloquer celle-ci.",
        variant: "default"
      });
    }
  };
  
  const getCongratulationMessage = (stepId: number) => {
    const messages = [
      "Bravo ! Votre CV est prêt !",
      "Vous êtes maintenant prêt à chercher un emploi !",
      "Vous maîtrisez la recherche d'offres !",
      "Vous êtes fin prêt pour vos entretiens !",
      "Vous êtes un pro des entretiens maintenant !",
      "Vous savez gérer les réponses comme un pro !",
      "Vous êtes prêt à signer votre contrat !",
      "Félicitations pour votre parcours complet !"
    ];
    return messages[stepId - 1] || "Bravo pour cette étape !";
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
      {steps.map((step) => (
        <div 
          key={step.id} 
          className="relative h-full"
        >
          {step.status === "completed" && (
            <div className="absolute -right-2 -top-2 z-10">
              <Badge className="bg-success hover:bg-success text-white">
                <Award className="h-3 w-3 mr-1" />
                Complété
              </Badge>
            </div>
          )}
          <button
            className={cn(
              "flex flex-col justify-between h-full p-5 text-left rounded-lg border-2 w-full transition-all",
              "space-y-3", // Vertical spacing between elements
              step.status === "current" ? "bg-primary text-white border-primary animate-pulse-slow" : "bg-white border-gray-200",
              step.status === "completed" ? "bg-success/10 border-success" : "",
              step.status === "locked" ? "opacity-60 cursor-not-allowed" : "cursor-pointer hover:shadow-md hover:scale-[1.01] transition-all"
            )}
            onClick={() => handleStepClick(step)}
            disabled={step.status === "locked"}
          >
            <div className="flex items-center space-x-3">
              <div className={cn(
                "rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold",
                step.status === "current" ? "bg-white text-primary" : "",
                step.status === "completed" ? "bg-success text-white" : "",
                step.status === "locked" ? "bg-gray-200 text-gray-500" : ""
              )}>
                {step.status === "completed" ? <CheckCircle className="h-6 w-6" /> : step.status === "locked" ? <LockIcon className="h-5 w-5" /> : step.id}
              </div>
              <div className="flex-1">
                <div className="font-medium text-lg">{step.title}</div>
              </div>
            </div>
            
            <div>
              <div className={cn(
                "text-sm mb-2",
                step.status === "current" ? "text-white/80" : "text-gray-500"
              )}>
                {step.description}
              </div>
              
              {step.status === "completed" && (
                <div className="text-sm text-success font-medium">
                  {getCongratulationMessage(step.id)}
                </div>
              )}
            </div>
            
            {step.status !== "locked" && (
              <div className="flex justify-end">
                <Button 
                  variant={step.status === "current" ? "secondary" : "ghost"} 
                  size="sm" 
                  className={cn(
                    "ml-2",
                    step.status === "current" ? "bg-white text-primary hover:bg-white/90" : ""
                  )}
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </button>
        </div>
      ))}
    </div>
  );
};

export default StepsList;

