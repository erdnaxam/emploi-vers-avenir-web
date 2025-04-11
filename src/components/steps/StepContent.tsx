
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    <div className="container px-4 py-8 max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <Badge variant="outline" className="text-primary border-primary px-3 py-1 mb-2">
          Étape {id}
        </Badge>
        <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground mt-2">{description}</p>
      </div>

      <Card className="mb-8">
        <CardHeader className="bg-primary/5">
          <CardTitle className="text-xl">Objectif de cette étape</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p>{objective}</p>
        </CardContent>
      </Card>

      <h2 className="text-xl font-bold mb-4 text-center">Ressources disponibles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {resources.map((resource) => (
          <Card key={resource.id} className="transition-all duration-300 hover:shadow-md">
            <CardHeader className="pb-3">
              <Badge variant="outline" className="w-fit mb-2">
                {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
              </Badge>
              <CardTitle className="text-lg">{resource.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{resource.description}</p>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" asChild>
                <a href={resource.url} target="_blank" rel="noopener noreferrer" className="group">
                  <span className="flex items-center">
                    {getResourceIcon(resource.type)}
                    <span className="ml-2">Consulter</span>
                  </span>
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <Button 
          onClick={completeStep} 
          className="py-6 h-auto text-lg rounded-md"
        >
          <span>Valider et continuer</span>
          <MoveRight className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

export default StepContent;
