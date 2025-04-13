
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import StepContent from '@/components/steps/StepContent';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import VideoPlayer from '@/components/video/VideoPlayer';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { stepsData } from '@/data/stepsData';

// Filter resources to only include allowed types for StepContent
const filterResources = (resources: any[]) => {
  return resources.map(resource => ({
    ...resource,
    // Ensure type is one of the allowed values
    type: resource.type === 'tool' ? 'document' : resource.type
  }));
};

const StepPage = () => {
  const { stepId } = useParams<{ stepId: string }>();
  const navigate = useNavigate();
  const { user, updateUserProgress } = useAuth();
  const { toast } = useToast();
  const [showIntroVideo, setShowIntroVideo] = useState(false);
  
  // Check if this is step 1 and if user hasn't seen the intro video
  useEffect(() => {
    if (stepId === '1' && user && !localStorage.getItem('hasSeenIntroVideo')) {
      // Redirect to intro video page for first-time step 1 visitors
      navigate('/introduction');
    }
  }, [stepId, user, navigate]);

  // Mettre à jour la dernière page visitée
  useEffect(() => {
    if (user && stepId) {
      updateUserProgress(user.currentStep, `/etape/${stepId}`);
    }
  }, [stepId, user, updateUserProgress]);

  // Trouver l'étape correspondante
  const currentStep = stepsData.find(step => step.id === Number(stepId));

  // Rediriger si l'étape n'existe pas
  if (!currentStep) {
    navigate('/dashboard');
    return null;
  }

  // Fonction pour valider une étape et passer à la suivante
  const handleCompleteStep = () => {
    if (user) {
      // Mettre à jour la progression de l'utilisateur
      updateUserProgress(Math.max(user.currentStep, currentStep.id), currentStep.nextStepPath);
      
      // Marquer l'intro vidéo comme vue si on est à l'étape 1
      if (currentStep.id === 1) {
        localStorage.setItem('hasSeenIntroVideo', 'true');
      }
      
      // Rediriger vers l'étape suivante
      setTimeout(() => {
        navigate(currentStep.nextStepPath);
      }, 1500);
    }
  };

  const handleVideoClose = () => {
    setShowIntroVideo(false);
    localStorage.setItem('hasSeenIntroVideo', 'true');
  };

  return (
    <PageLayout>
      {currentStep.id === 1 && (
        <Dialog open={showIntroVideo} onOpenChange={setShowIntroVideo}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Bienvenue sur votre parcours vers l'emploi</DialogTitle>
            </DialogHeader>
            <VideoPlayer onSkip={handleVideoClose} showInModal={true} />
          </DialogContent>
        </Dialog>
      )}
      
      <StepContent 
        {...currentStep} 
        onComplete={handleCompleteStep} 
        resources={filterResources(currentStep.resources)} 
      />
    </PageLayout>
  );
};

export default StepPage;
