
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Microphone, MicOff, Send, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';

interface CVAssistantProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDataUpdate: (data: any) => void;
}

type Step = {
  id: number;
  title: string;
  question: string;
  placeholder: string;
  field: string;
};

const CVAssistant: React.FC<CVAssistantProps> = ({ open, onOpenChange, onDataUpdate }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const steps: Step[] = [
    {
      id: 0,
      title: "Préparons votre CV ensemble",
      question: "Expliquez-moi votre parcours en quelques phrases. Parlez-moi de vos expériences professionnelles, vos compétences, vos formations, etc.",
      placeholder: "J'ai travaillé pendant 3 ans comme aide à domicile, j'ai un diplôme d'aide-soignant et je parle français et un peu anglais...",
      field: "general"
    },
    {
      id: 1,
      title: "Vos expériences",
      question: "Décrivez vos expériences professionnelles, y compris le bénévolat, les projets personnels ou l'aide à des proches. Précisez les dates, lieux et ce que vous avez fait.",
      placeholder: "J'ai été aide à domicile pour personnes âgées de 2018 à 2021 à Lyon, j'ai aussi aidé ma mère malade pendant 1 an...",
      field: "experiences"
    },
    {
      id: 2,
      title: "Votre formation",
      question: "Parlez-moi de vos études, diplômes, ou formations que vous avez suivies. N'oubliez pas les dates et établissements.",
      placeholder: "J'ai obtenu mon diplôme d'aide-soignant en 2017 à l'école X, j'ai aussi suivi une formation de premiers secours...",
      field: "education"
    },
    {
      id: 3,
      title: "Vos compétences",
      question: "Quelles sont vos principales compétences, techniques ou personnelles ? Mentionnez aussi les langues que vous parlez.",
      placeholder: "Je sais utiliser un ordinateur, je suis patient et à l'écoute, je parle français et un peu anglais...",
      field: "skills"
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
      // Générer des données de CV à partir des réponses
      const mockSkills = [
        { id: uuidv4(), name: "Accompagnement personnes âgées", level: "expert" },
        { id: uuidv4(), name: "Écoute active", level: "avancé" },
        { id: uuidv4(), name: "Premiers secours", level: "intermédiaire" },
      ];
      
      const mockLanguages = [
        { id: uuidv4(), name: "Français", level: "langue maternelle" },
        { id: uuidv4(), name: "Anglais", level: "A2" },
      ];
      
      const mockExperiences = [
        {
          id: uuidv4(),
          title: "Aide à domicile",
          company: "Association d'aide à la personne",
          location: "Lyon",
          startDate: "2018-01-01",
          endDate: "2021-12-31",
          current: false,
          description: "Accompagnement quotidien de personnes âgées à mobilité réduite. Aide aux tâches ménagères et aux soins de base.",
          skills: ["Empathie", "Patience", "Organisation"],
          type: "professional"
        },
        {
          id: uuidv4(),
          title: "Aidant familial",
          company: "Domicile personnel",
          location: "Lyon",
          startDate: "2022-01-01",
          endDate: "",
          current: true,
          description: "Accompagnement d'un parent malade. Gestion des rendez-vous médicaux et des traitements.",
          skills: ["Adaptation", "Résistance au stress"],
          type: "personal"
        }
      ];
      
      const mockEducation = [
        {
          id: uuidv4(),
          degree: "Diplôme d'État d'Aide-Soignant",
          school: "Institut de Formation en Soins Infirmiers",
          location: "Lyon",
          startDate: "2016-09-01",
          endDate: "2017-07-01",
          current: false,
          description: "Formation complète aux soins de base et à l'accompagnement des personnes dépendantes."
        }
      ];
      
      const generatedData = {
        personalInfo: {
          objective: "Aide-soignant(e) diplômé(e) avec 3 ans d'expérience cherchant à mettre en œuvre mes compétences en soins et accompagnement dans un établissement médico-social."
        },
        skills: mockSkills,
        languages: mockLanguages,
        experiences: mockExperiences,
        education: mockEducation,
      };
      
      onDataUpdate(generatedData);
      setIsProcessing(false);
      onOpenChange(false);
      
      toast({
        title: "CV généré avec succès !",
        description: "Les informations ont été ajoutées à votre CV. Vous pouvez maintenant les modifier si besoin.",
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
            Je vais vous aider à créer votre CV en posant quelques questions simples
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto">
          <Card className="border-primary/20 bg-primary/5 mb-4">
            <CardContent className="pt-6">
              <p className="font-medium">{steps[currentStep].question}</p>
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
                  <Microphone className="h-4 w-4" />
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
                Générer mon CV
                <Sparkles className="h-4 w-4" />
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CVAssistant;
