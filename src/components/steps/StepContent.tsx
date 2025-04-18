import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MoveRight, Play, FileText, Volume2, LifeBuoy, Globe, Mic, Calendar, HelpingHand, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export interface StepContentProps {
  id: number;
  title: string;
  description: string;
  objective: string;
  nextStepPath?: string;
  onComplete?: () => void;
  onHelp?: () => void;
  resources: Array<{
    id: string;
    type: 'video' | 'audio' | 'text' | 'document' | 'tool';
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
  resources,
  onComplete,
  onHelp
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const completeStep = () => {
    toast({
      title: "🎉 Étape validée !",
      description: "Vous pouvez passer à l'étape suivante.",
    });
    
    if (onComplete) {
      onComplete();
    }
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
      <div className="mb-6">
        <Badge variant="outline" className="text-primary border-primary mb-3">
          Étape {id}
        </Badge>
        <h1 className="text-2xl md:text-3xl font-bold mb-3">{title}</h1>
        <p className="text-muted-foreground text-lg">{description}</p>
      </div>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="text-xl font-bold mb-3">Objectif</h2>
          <p className="text-lg">{objective}</p>
        </CardContent>
      </Card>

      <div className="space-y-4 mb-8">
        {resources.map((resource) => (
          <Button 
            key={resource.id} 
            variant="outline" 
            className="w-full justify-start text-left h-auto p-4 hover:border-primary transition-colors" 
            asChild
          >
            <a href={resource.url} target="_blank" rel="noopener noreferrer">
              <span className="mr-3">{getResourceIcon(resource.type)}</span>
              <div>
                <div className="font-medium">{resource.title}</div>
                <div className="text-sm text-muted-foreground">{resource.description}</div>
              </div>
            </a>
          </Button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <Button 
          onClick={completeStep}
          size="lg"
          className="w-full py-6 text-lg font-medium"
        >
          Valider et passer à l'étape suivante
          <MoveRight className="ml-2 h-5 w-5" />
        </Button>
        
        <Button 
          variant="outline"
          size="lg"
          onClick={onHelp}
          className="w-full"
        >
          <MessageCircle className="mr-2 h-5 w-5" />
          Besoin d'aide ?
        </Button>
      </div>
    </div>
  );
};

export default StepContent;
