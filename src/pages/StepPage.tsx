
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import StepContent from '@/components/steps/StepContent';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import VideoPlayer from '@/components/video/VideoPlayer';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Mic, Globe, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { stepsData } from '@/data/stepsData';
import ProgressBar from '@/components/dashboard/ProgressBar';

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
  const [showHelpOptions, setShowHelpOptions] = useState(false);
  
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
  const steps = stepsData.length;
  const currentStepNum = Number(stepId) || 0;

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
      
      // Afficher un message de félicitations avec le nom de l'utilisateur
      toast({
        title: `🎉 Bravo ${user.name || ''} !`,
        description: `Vous avez terminé l'étape "${currentStep.title}" avec succès.`,
        variant: "default",
      });
      
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

  const handleHelpOptionClick = (optionType: string) => {
    setShowHelpOptions(false);
    
    switch (optionType) {
      case 'appointment':
        navigate('/partenaires');
        break;
      case 'call':
        // Simuler un appel (dans une vraie application, cela déclencherait une fonctionnalité d'appel)
        toast({
          title: "Appel au conseiller",
          description: "Votre demande d'appel a été enregistrée. Un conseiller vous contactera prochainement.",
        });
        break;
      case 'chat':
        navigate('/aide');
        break;
      default:
        navigate('/aide');
    }
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
      
      <Dialog open={showHelpOptions} onOpenChange={setShowHelpOptions}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Comment souhaitez-vous être accompagné(e) ?</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center h-32 p-4 space-y-2"
              onClick={() => handleHelpOptionClick('appointment')}
            >
              <Calendar className="h-8 w-8 text-primary" />
              <div className="text-center">
                <p className="font-medium">Rendez-vous en personne</p>
                <p className="text-xs text-muted-foreground">Rencontrez un conseiller près de chez vous</p>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center h-32 p-4 space-y-2"
              onClick={() => handleHelpOptionClick('call')}
            >
              <Mic className="h-8 w-8 text-primary" />
              <div className="text-center">
                <p className="font-medium">Appel téléphonique</p>
                <p className="text-xs text-muted-foreground">Parlez directement à un conseiller</p>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center h-32 p-4 space-y-2"
              onClick={() => handleHelpOptionClick('video')}
            >
              <Users className="h-8 w-8 text-primary" />
              <div className="text-center">
                <p className="font-medium">Visioconférence</p>
                <p className="text-xs text-muted-foreground">Discutez par vidéo avec un expert</p>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center h-32 p-4 space-y-2"
              onClick={() => handleHelpOptionClick('chat')}
            >
              <Globe className="h-8 w-8 text-primary" />
              <div className="text-center">
                <p className="font-medium">Centre d'aide</p>
                <p className="text-xs text-muted-foreground">Consultez nos ressources d'aide</p>
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <ProgressBar 
          completedSteps={currentStepNum-1} 
          totalSteps={steps} 
        />
        
        <StepContent 
          {...currentStep} 
          onComplete={handleCompleteStep} 
          resources={filterResources(currentStep.resources)} 
          onHelp={() => setShowHelpOptions(true)}
        />
      </div>
    </PageLayout>
  );
};

export default StepPage;
