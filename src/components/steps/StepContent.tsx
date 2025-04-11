
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MoveRight, Play, FileText, Volume2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface StepContentProps {
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
    <div className="container px-4 py-8 max-w-4xl mx-auto animate-slide-in">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Badge variant="outline" className="text-primary border-primary px-3 py-1">
            Étape {id}
          </Badge>
          <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
        </div>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <Card className="mb-8">
        <CardHeader className="bg-primary/5 border-b">
          <CardTitle className="text-xl">Objectif de cette étape</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p>{objective}</p>
        </CardContent>
      </Card>

      <h2 className="text-xl font-bold mb-4">Ressources disponibles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {resources.map((resource) => (
          <Card key={resource.id} className="transition-all duration-300 hover:shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="mb-2">
                  {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                </Badge>
              </div>
              <CardTitle className="text-lg">{resource.title}</CardTitle>
              <CardDescription>{resource.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <a href={resource.url} target="_blank" rel="noopener noreferrer" className="group">
                  <span className="flex items-center">
                    {getResourceIcon(resource.type)}
                    <span className="ml-2">Consulter</span>
                  </span>
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-muted p-6 rounded-lg">
        <div>
          <h3 className="font-bold mb-1">Prêt à valider cette étape ?</h3>
          <p className="text-sm text-muted-foreground">Vous pourrez toujours y revenir plus tard si nécessaire.</p>
        </div>
        <Button onClick={completeStep} className="group">
          <span>Valider et continuer</span>
          <MoveRight className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

export default StepContent;
