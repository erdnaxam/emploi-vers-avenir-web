
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MoveRight, Play, FileText, Volume2 } from 'lucide-react';
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
    toast({
      title: "Étape validée !",
      description: "Vous avez terminé cette étape avec succès.",
      variant: "default",
    });
    
    // Simuler un délai avant la navigation
    setTimeout(() => {
      if (nextStepPath) {
        navigate(nextStepPath);
      }
    }, 1000);
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Play className="h-4 w-4" />;
      case 'document':
        return <FileText className="h-4 w-4" />;
      case 'audio':
        return <Volume2 className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="container px-4 py-6 max-w-2xl mx-auto">
      <div className="mb-6 text-center">
        <Badge variant="outline" className="text-primary border-primary px-3 py-1 mb-2">
          Étape {id}
        </Badge>
        <h1 className="text-xl md:text-2xl font-bold">{title}</h1>
        <p className="text-muted-foreground mt-2">{description}</p>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <h2 className="font-bold mb-2">Objectif</h2>
          <p>{objective}</p>
        </CardContent>
      </Card>

      <h2 className="text-lg font-bold mb-3">Ressources</h2>
      <div className="grid grid-cols-1 gap-3 mb-6">
        {resources.map((resource) => (
          <Button 
            key={resource.id} 
            variant="outline" 
            className="justify-start text-left h-auto p-4 flex items-center gap-3" 
            asChild
          >
            <a href={resource.url} target="_blank" rel="noopener noreferrer">
              <div className="rounded-full bg-primary/10 p-2 mr-1">
                {getResourceIcon(resource.type)}
              </div>
              <div>
                <div className="font-medium">{resource.title}</div>
                <div className="text-sm text-muted-foreground">{resource.description}</div>
              </div>
            </a>
          </Button>
        ))}
      </div>

      <div className="flex justify-center">
        <Button 
          onClick={completeStep} 
          className="py-5 h-auto text-lg rounded-md w-full"
        >
          <span>Valider et continuer</span>
          <MoveRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default StepContent;
