
import React, { useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import StepProgress from '@/components/steps/StepProgress';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { getSteps } from '@/components/dashboard/StepsConfig';
import DashboardSummary from '@/components/dashboard/DashboardSummary';
import WelcomeMessage from '@/components/dashboard/WelcomeMessage';
import ProgressBar from '@/components/dashboard/ProgressBar';
import StepsList from '@/components/dashboard/StepsList';
import ActionButtons from '@/components/dashboard/ActionButtons';

const Dashboard = () => {
  const { user, updateUserProgress } = useAuth();
  const { toast } = useToast();
  
  const steps = getSteps(user?.currentStep || 0);

  useEffect(() => {
    if (user) {
      updateUserProgress(user.currentStep, '/dashboard');
    }
  }, [user, updateUserProgress]);

  const completedSteps = steps.filter(step => step.status === "completed").length;
  const totalSteps = steps.length;
  
  const currentStep = steps.find(step => step.status === "current");
  
  useEffect(() => {
    if (user) {
      toast({
        title: `Bienvenue ${user.name || ''} !`,
        description: "Voici votre tableau de bord pour suivre votre progression.",
        variant: "default"
      });
    }
  }, [user, toast]);

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Mon parcours vers l'emploi</h1>
        
        <WelcomeMessage 
          currentStep={currentStep} 
          completedSteps={completedSteps} 
        />
        
        <ProgressBar 
          completedSteps={completedSteps} 
          totalSteps={totalSteps} 
        />

        <div className="mb-8 max-w-xl mx-auto">
          <DashboardSummary 
            username={user?.name || "Utilisateur"}
            completedSteps={completedSteps}
            totalSteps={totalSteps}
            lastActivity="Aujourd'hui"
            achievements={[
              ...(completedSteps >= 1 ? [{
                id: "ach1",
                title: "Première étape terminée",
                description: "Vous avez créé votre CV avec succès",
                date: new Date().toLocaleDateString('fr-FR')
              }] : []),
              ...(completedSteps >= 3 ? [{
                id: "ach2",
                title: "Candidature envoyée",
                description: "Vous avez postulé à votre première offre",
                date: new Date().toLocaleDateString('fr-FR')
              }] : []),
            ]}
          />
        </div>

        <div className="mb-8 bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-xl font-medium mb-3 text-center">Mon chemin vers l'emploi</h2>
          <StepProgress steps={steps} currentStepId={user?.currentStep || 1} />
        </div>

        <StepsList steps={steps} />

        <ActionButtons />
      </div>
    </PageLayout>
  );
};

export default Dashboard;
