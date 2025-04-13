
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import VideoPlayer from '@/components/video/VideoPlayer';
import PageLayout from '@/components/layout/PageLayout';
import { ArrowRight } from 'lucide-react';

const IntroductionVideo = () => {
  const navigate = useNavigate();
  
  const handleSkip = () => {
    navigate('/etape/1');
  };
  
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">Bienvenue sur votre parcours vers l'emploi</h1>
          <p className="text-lg text-muted-foreground">
            Pour bien commencer, regardez cette courte vidéo qui explique le fonctionnement de la plateforme.
          </p>
        </div>
        
        <div className="mb-10">
          <VideoPlayer onSkip={handleSkip} />
        </div>
        
        <div className="flex justify-center">
          <Button 
            size="lg" 
            className="px-6 py-6 text-xl rounded-lg h-auto" 
            onClick={handleSkip}
          >
            <span>Commencer mon parcours</span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default IntroductionVideo;
