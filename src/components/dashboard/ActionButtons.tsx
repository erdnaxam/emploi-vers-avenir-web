
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { FileText, Briefcase, ChevronRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const ActionButtons: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const handleStartJourney = () => {
    if (user) {
      // Navigate to the current active step or the first step if none is active
      const nextStepPath = `/etape/${user.currentStep || 1}`;
      navigate(nextStepPath);
      
      toast({
        title: "Parcours vers l'emploi",
        description: "Bienvenue dans votre parcours personnalisé vers l'emploi !"
      });
    } else {
      navigate('/login');
      
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour accéder à votre parcours."
      });
    }
  };
  
  return (
    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
      <Button 
        onClick={handleStartJourney}
        size="lg" 
        className="flex items-center gap-2"
      >
        <ChevronRight className="h-5 w-5" />
        <span>Mon parcours</span>
      </Button>
      
      <Button 
        onClick={() => navigate('/cv-generator')}
        variant="outline" 
        size="lg" 
        className="flex items-center gap-2"
      >
        <FileText className="h-5 w-5" />
        <span>Créer mon CV</span>
      </Button>
      
      <Button 
        onClick={() => navigate('/candidatures')}
        variant="outline" 
        size="lg" 
        className="flex items-center gap-2"
      >
        <Briefcase className="h-5 w-5" />
        <span>Mes candidatures</span>
      </Button>
    </div>
  );
};

export default ActionButtons;
