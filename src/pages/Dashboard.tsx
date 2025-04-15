
import React, { useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import StepProgress from '@/components/steps/StepProgress';
import { useAuth } from '@/contexts/AuthContext';
import { getSteps } from '@/components/dashboard/StepsConfig';
import DashboardSummary from '@/components/dashboard/DashboardSummary';
import ProgressBar from '@/components/dashboard/ProgressBar';
import StepsList from '@/components/dashboard/StepsList';
import ActionButtons from '@/components/dashboard/ActionButtons';

const Dashboard = () => {
  const { user, updateUserProgress } = useAuth();
  
  const steps = getSteps(user?.currentStep || 0);

  useEffect(() => {
    if (user) {
      updateUserProgress(user.currentStep, '/dashboard');
    }
  }, [user, updateUserProgress]);

  const completedSteps = steps.filter(step => step.status === "completed").length;
  const totalSteps = steps.length;
  
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-6">
        <StepProgress steps={steps} currentStepId={user?.currentStep || 1} />
        
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

        <div className="mb-8">
          <h2 className="text-xl font-medium mb-3 text-center">Détail des étapes</h2>
          <StepsList steps={steps} />
        </div>

        <ActionButtons />
      </div>
    </PageLayout>
  );
};

export default Dashboard;
