
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MoveRight, Play, FileText, Volume2, LifeBuoy, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export interface StepContentProps {
  id: number;
  title: string;
  description: string;
  objective: string;
  nextStepPath?: string;
  resources: Array<{
    id: string;
    type: 'video' | 'audio' | 'text' | 'document';
    title: string;
    description: string;
    url: string;
  }>;
}

const StepContent: React.FC<StepContentProps> = ({ 
  id, 
  title, 
  description, 
  objective, 
  nextStepPath,
  resources
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const completeStep = () => {
    // Afficher une célébration et un message de félicitations
    toast({
      title: "🎉 Bravo, étape validée !",
      description: "Vous avez terminé cette étape avec succès.",
      variant: "default",
    });
    
    // Simuler un délai avant la navigation
    setTimeout(() => {
      if (nextStepPath) {
        navigate(nextStepPath);
      }
    }, 1500);
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Play className="h-5 w-5" />;
      case 'document':
        return <FileText className="h-5 w-5" />;
      case 'audio':
        return <Volume2 className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <div className="container px-4 py-6 max-w-2xl mx-auto">
      <div className="mb-6 text-center">
        <Badge variant="outline" className="text-primary border-primary px-4 py-1 mb-3 text-base">
          Étape {id}
        </Badge>
        <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground mt-3 text-lg">{description}</p>
      </div>

      <Card className="mb-8 border-2">
        <CardContent className="pt-6">
          <h2 className="font-bold text-xl mb-3">Mon objectif</h2>
          <p className="text-lg">{objective}</p>
        </CardContent>
      </Card>

      <h2 className="text-xl font-bold mb-4">Ressources pour réussir</h2>
      <div className="grid grid-cols-1 gap-4 mb-8">
        {resources.map((resource) => (
          <Button 
            key={resource.id} 
            variant="outline" 
            className="justify-start text-left h-auto p-5 flex items-center gap-4 border-2" 
            asChild
          >
            <a href={resource.url} target="_blank" rel="noopener noreferrer">
              <div className="rounded-full bg-primary/10 p-3">
                {getResourceIcon(resource.type)}
              </div>
              <div>
                <div className="font-medium text-lg">{resource.title}</div>
                <div className="text-muted-foreground">{resource.description}</div>
              </div>
            </a>
          </Button>
        ))}
      </div>

      <div className="flex flex-col gap-4 mt-10">
        <Button 
          onClick={completeStep} 
          className="py-6 h-auto text-xl rounded-lg w-full font-medium"
        >
          <span>J'ai terminé cette étape</span>
          <MoveRight className="ml-2 h-5 w-5" />
        </Button>
        
        <Button 
          variant="outline" 
          className="py-6 h-auto text-lg rounded-lg w-full font-medium border-2 flex items-center justify-center gap-2"
          onClick={() => navigate('/aide')}
        >
          <LifeBuoy className="h-5 w-5" />
          <span>J'ai besoin d'aide</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="py-6 h-auto text-lg rounded-lg w-full font-medium border-2 flex items-center justify-center gap-2"
          onClick={() => window.alert("Fonctionnalité en développement")}
        >
          <Globe className="h-5 w-5" />
          <span>Prendre rendez-vous près de chez moi</span>
        </Button>
      </div>
    </div>
  );
};

export default StepContent;
