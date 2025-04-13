import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, MicOff, Send, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LetterAssistantProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDataUpdate: (data: any) => void;
  jobDetails: {
    description: string;
    requirements: string;
    url: string;
  };
}

type Step = {
  id: number;
  title: string;
  question: string;
  placeholder: string;
  field: string;
};

const LetterAssistant: React.FC<LetterAssistantProps> = ({ open, onOpenChange, onDataUpdate, jobDetails }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const steps: Step[] = [
    {
      id: 0,
      title: "Créons votre lettre de motivation",
      question: "Parlez-moi un peu de vous et du poste auquel vous postulez. Qu'est-ce qui vous motive pour ce poste ?",
      placeholder: "Je postule pour un poste d'aide-soignant(e) car j'ai toujours aimé prendre soin des personnes âgées ou en situation de dépendance...",
      field: "general"
    },
    {
      id: 1,
      title: "Votre expérience",
      question: "Quelles expériences ou compétences avez-vous qui correspondent aux exigences de ce poste ?",
      placeholder: "J'ai 3 ans d'expérience en tant qu'aide à domicile, je suis à l'écoute des besoins des personnes et je sais m'adapter...",
      field: "experience"
    },
    {
      id: 2,
      title: "Vos motivations",
      question: "Pourquoi êtes-vous intéressé(e) par cette entreprise spécifiquement ? Qu'est-ce qui vous attire ?",
      placeholder: "Je connais la réputation de votre établissement pour la qualité des soins et l'ambiance bienveillante...",
      field: "motivation"
    },
    {
      id: 3,
      title: "Votre disponibilité",
      question: "Quand êtes-vous disponible pour commencer et pour un éventuel entretien ?",
      placeholder: "Je suis disponible pour commencer dès maintenant et je peux me rendre à un entretien à votre convenance...",
      field: "disponibility"
    }
  ];

  const handleNext = () => {
    if (currentAnswer.trim()) {
      setAnswers({
        ...answers,
        [steps[currentStep].field]: currentAnswer
      });
      setCurrentAnswer('');
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(current => current + 1);
    } else {
      processAnswers();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(current => current - 1);
      setCurrentAnswer(answers[steps[currentStep - 1].field] || '');
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const startRecording = () => {
    // Simulation - Dans une vraie implémentation, utilisez l'API Web Speech
    setIsRecording(true);
    toast({
      title: "Microphone activé",
      description: "Parlez clairement, je vous écoute...",
    });
    
    // Simuler l'enregistrement après 3 secondes
    setTimeout(() => {
      stopRecording();
    }, 3000);
  };

  const stopRecording = () => {
    // Simulation
    setIsRecording(false);
    setCurrentAnswer(prev => prev + " J'ai ajouté cette partie en parlant au micro.");
    toast({
      title: "Enregistrement terminé",
      description: "Votre réponse a été ajoutée",
    });
  };

  const processAnswers = () => {
    setIsProcessing(true);
    
    // Simulation de traitement IA - En réalité, envoyez les données à une API
    setTimeout(() => {
      // Extraire des infos de l'offre d'emploi (simulé)
      const companyName = "EHPAD Les Jardins Fleuris";
      const positionTitle = "Aide-soignant(e)";
      
      // Générer le contenu de la lettre
      const generatedData = {
        recipient: {
          company: companyName,
          contactName: "Mme Dubois",
          contactTitle: "Responsable des Ressources Humaines",
        },
        content: {
          position: positionTitle,
          introduction: 
            "Je me permets de vous adresser ma candidature pour le poste d'aide-soignant(e) au sein de votre établissement EHPAD Les Jardins Fleuris. Ayant récemment pris connaissance de cette opportunité, je suis vivement intéressé(e) par la possibilité de mettre mes compétences et mon dévouement au service de vos résidents.",
          motivation: 
            "Votre établissement jouit d'une excellente réputation pour la qualité des soins prodigués et l'environnement bienveillant que vous offrez à vos résidents. Ces valeurs correspondent parfaitement à ma vision du métier d'aide-soignant(e), où l'humain et la dignité sont au cœur de chaque action. Je souhaite contribuer à cette mission en rejoignant votre équipe dynamique et professionnelle.",
          skills: 
            "Fort(e) de trois années d'expérience en tant qu'aide à domicile, j'ai développé des compétences essentielles en matière de soins de base, d'accompagnement quotidien et de soutien émotionnel auprès des personnes dépendantes. Je suis particulièrement attentif(ve) au confort et au bien-être des personnes dont je m'occupe, tout en respectant leur autonomie et leur dignité. Mon diplôme d'aide-soignant(e) obtenu en 2017 m'a permis d'acquérir une solide formation théorique que j'ai pu mettre en pratique au quotidien. Je suis également formé(e) aux gestes de premiers secours et sais faire preuve d'une grande réactivité face aux situations d'urgence.",
          conclusion: 
            "Je serais ravi(e) de pouvoir vous rencontrer lors d'un entretien pour échanger davantage sur ma candidature et sur la façon dont je pourrais contribuer à la qualité des soins de votre établissement. Je suis disponible immédiatement et peux me présenter à votre convenance. En vous remerciant de l'attention que vous porterez à ma candidature, je vous prie d'agréer, Madame, l'expression de mes salutations distinguées."
        },
      };
      
      onDataUpdate(generatedData);
      setIsProcessing(false);
      onOpenChange(false);
      
      toast({
        title: "Lettre générée avec succès !",
        description: "Le contenu a été ajouté à votre lettre. Vous pouvez maintenant le modifier si besoin.",
      });
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            {steps[currentStep].title}
          </DialogTitle>
          <DialogDescription>
            Je vais vous aider à créer une lettre de motivation personnalisée en posant quelques questions simples
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto">
          <Card className="border-primary/20 bg-primary/5 mb-4">
            <CardContent className="pt-6">
              <p className="font-medium">{steps[currentStep].question}</p>
              
              {currentStep === 0 && jobDetails.description && (
                <div className="mt-4 p-3 bg-white/50 rounded-md border text-sm">
                  <p className="font-medium mb-1">Détails de l'offre d'emploi:</p>
                  <div className="text-gray-700">{jobDetails.description}</div>
                  
                  {jobDetails.requirements && (
                    <>
                      <p className="font-medium mt-2 mb-1">Compétences requises:</p>
                      <div className="text-gray-700">{jobDetails.requirements}</div>
                    </>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
          
          <Textarea
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            placeholder={steps[currentStep].placeholder}
            className="min-h-[150px] resize-none mb-4"
          />
          
          <div className="flex items-center justify-center gap-2 mb-4">
            <Button
              type="button"
              variant={isRecording ? "destructive" : "outline"}
              className="flex items-center gap-2"
              onClick={toggleRecording}
            >
              {isRecording ? (
                <>
                  <MicOff className="h-4 w-4" />
                  Arrêter l'enregistrement
                </>
              ) : (
                <>
                  <Mic className="h-4 w-4" />
                  Parler au micro
                </>
              )}
            </Button>
            
            <Button
              type="button"
              className="flex items-center gap-2"
              onClick={handleNext}
              disabled={currentAnswer.trim() === ''}
            >
              <Send className="h-4 w-4" />
              Envoyer
            </Button>
          </div>
        </div>
        
        <DialogFooter className="flex justify-between items-center">
          <Button
            type="button"
            variant="ghost"
            onClick={handlePrevious}
            disabled={currentStep === 0 || isProcessing}
            className="flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Précédent
          </Button>
          
          <Button
            type="button"
            onClick={handleNext}
            disabled={isProcessing}
            className="flex items-center gap-1"
          >
            {currentStep < steps.length - 1 ? (
              <>
                Suivant
                <ArrowRight className="h-4 w-4" />
              </>
            ) : isProcessing ? (
              "Génération en cours..."
            ) : (
              <>
                Générer ma lettre
                <Sparkles className="h-4 w-4" />
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LetterAssistant;
