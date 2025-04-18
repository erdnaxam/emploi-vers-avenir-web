
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
import { Helmet } from 'react-helmet-async';

// Simplify resource processing
const processResources = (resources: any[]) => {
  return resources.map(resource => ({
    ...resource,
    type: resource.type === 'tool' ? 'document' : resource.type
  }));
};

// Help options dialog component
const HelpOptionsDialog = ({ open, setOpen, onOptionSelect }) => (
  <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Comment souhaitez-vous être accompagné(e) ?</DialogTitle>
      </DialogHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
        <Button 
          variant="outline" 
          className="flex flex-col items-center justify-center h-32 p-4 space-y-2"
          onClick={() => onOptionSelect('appointment')}
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
          onClick={() => onOptionSelect('call')}
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
          onClick={() => onOptionSelect('video')}
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
          onClick={() => onOptionSelect('chat')}
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
);

// Intro video dialog component
const IntroVideoDialog = ({ open, setOpen, onSkip }) => (
  <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent className="max-w-3xl">
      <DialogHeader>
        <DialogTitle>Bienvenue sur votre parcours vers l'emploi</DialogTitle>
      </DialogHeader>
      <VideoPlayer onSkip={onSkip} showInModal={true} />
    </DialogContent>
  </Dialog>
);

const StepPage = () => {
  const { stepId } = useParams<{ stepId: string }>();
  const navigate = useNavigate();
  const { user, updateUserProgress } = useAuth();
  const { toast } = useToast();
  const [showIntroVideo, setShowIntroVideo] = useState(false);
  const [showHelpOptions, setShowHelpOptions] = useState(false);
  const [canProceed, setCanProceed] = useState(false);
  
  const numericStepId = parseInt(stepId || '1');
  
  // Check if this is the first access to step 1 and redirect to intro if needed
  useEffect(() => {
    if (stepId === '1' && user && !localStorage.getItem('hasSeenIntroVideo')) {
      navigate('/introduction');
    }
  }, [stepId, user, navigate]);

  // Validate access to this step
  useEffect(() => {
    if (user && numericStepId > 1 && user.currentStep < numericStepId - 1) {
      toast({
        title: "Étape non disponible",
        description: "Vous devez d'abord terminer les étapes précédentes."
      });
      navigate(`/etape/${user.currentStep}`);
    }
  }, [user, numericStepId, navigate, toast]);

  // Update last visited page
  useEffect(() => {
    if (user && stepId) {
      updateUserProgress(user.currentStep, `/etape/${stepId}`);
    }
  }, [stepId, user, updateUserProgress]);

  // Find the current step
  const currentStep = stepsData.find(step => step.id === Number(stepId));
  
  // Redirect if step doesn't exist
  if (!currentStep) {
    navigate('/dashboard');
    return null;
  }

  // Handle step completion
  const handleCompleteStep = () => {
    if (user) {
      // Update user progress, making sure to mark the current step as completed
      // This ensures step 8 gets properly marked as completed when finished
      const newCurrentStep = Math.max(user.currentStep, currentStep.id);
      updateUserProgress(newCurrentStep, currentStep.nextStepPath);
      
      if (currentStep.id === 1) {
        localStorage.setItem('hasSeenIntroVideo', 'true');
      }
      
      // Show appropriate success message
      if (currentStep.id === 8) {
        toast({
          title: `🎉 Félicitations ${user.name || ''} !`,
          description: `Vous avez terminé tout le parcours vers l'emploi. Bravo pour votre engagement !`
        });
      } else {
        toast({
          title: `🎉 Bravo ${user.name || ''} !`,
          description: `Vous avez terminé l'étape "${currentStep.title}" avec succès.`
        });
      }
      
      setCanProceed(true);
      // Slight delay before navigation to show the success message
      setTimeout(() => navigate(currentStep.nextStepPath), 1500);
    }
  };

  // Handle help option selection
  const handleHelpOptionClick = (optionType: string) => {
    setShowHelpOptions(false);
    
    const actions = {
      appointment: () => navigate('/partenaires'),
      call: () => toast({
        title: "Appel au conseiller",
        description: "Votre demande d'appel a été enregistrée. Un conseiller vous contactera prochainement."
      }),
      chat: () => navigate('/aide'),
      video: () => navigate('/aide')
    };
    
    (actions[optionType] || actions.chat)();
  };

  return (
    <PageLayout>
      <Helmet>
        <title>{`Étape ${stepId}: ${currentStep.title} | EmploiAvenir`}</title>
        <meta name="description" content={`${currentStep.description} - Parcours vers l'emploi EmploiAvenir`} />
        <meta name="keywords" content={`emploi, recherche emploi, ${currentStep.title.toLowerCase()}, étape ${stepId}`} />
      </Helmet>
      
      {/* Intro video dialog */}
      <IntroVideoDialog 
        open={showIntroVideo} 
        setOpen={setShowIntroVideo} 
        onSkip={() => {
          setShowIntroVideo(false);
          localStorage.setItem('hasSeenIntroVideo', 'true');
        }} 
      />
      
      {/* Help options dialog */}
      <HelpOptionsDialog 
        open={showHelpOptions} 
        setOpen={setShowHelpOptions}
        onOptionSelect={handleHelpOptionClick}
      />
      
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <ProgressBar 
          completedSteps={user ? Math.min(user.currentStep, 8) : numericStepId-1} 
          totalSteps={stepsData.length} 
        />
        
        <StepContent 
          {...currentStep}
          onComplete={handleCompleteStep} 
          resources={processResources(currentStep.resources)} 
          onHelp={() => setShowHelpOptions(true)}
        />
      </div>
    </PageLayout>
  );
};

export default StepPage;
