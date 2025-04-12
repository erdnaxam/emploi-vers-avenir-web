import React, { useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import StepProgress, { Step } from '@/components/steps/StepProgress';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, LifeBuoy, FileText, Briefcase, Users } from 'lucide-react';
import DashboardSummary from '@/components/dashboard/DashboardSummary';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, updateUserProgress } = useAuth();
  const { toast } = useToast();
  
  const steps: Step[] = [
    {
      id: 1,
      title: "Créer mon CV",
      description: "Créez un CV professionnel et adapté à votre recherche",
      path: "/etape/1",
      status: user && user.currentStep >= 1 ? "completed" : "locked"
    },
    {
      id: 2,
      title: "Me préparer à chercher un emploi",
      description: "Techniques et ressources pour une recherche efficace",
      path: "/etape/2",
      status: user && user.currentStep >= 2 ? "completed" : user && user.currentStep >= 1 ? "current" : "locked"
    },
    {
      id: 3,
      title: "Trouver et postuler à des offres",
      description: "Répondre aux offres avec des candidatures adaptées",
      path: "/etape/3",
      status: user && user.currentStep >= 3 ? "completed" : user && user.currentStep >= 2 ? "current" : "locked"
    },
    {
      id: 4,
      title: "Me préparer à un entretien",
      description: "Se préparer pour réussir ses entretiens d'embauche",
      path: "/etape/4",
      status: user && user.currentStep >= 4 ? "completed" : user && user.currentStep >= 3 ? "current" : "locked"
    },
    {
      id: 5,
      title: "Passer un entretien",
      description: "Techniques pour être à l'aise pendant l'entretien",
      path: "/etape/5",
      status: user && user.currentStep >= 5 ? "completed" : user && user.currentStep >= 4 ? "current" : "locked"
    },
    {
      id: 6,
      title: "Recevoir une réponse",
      description: "Gérer les réponses, positives comme négatives",
      path: "/etape/6",
      status: user && user.currentStep >= 6 ? "completed" : user && user.currentStep >= 5 ? "current" : "locked"
    },
    {
      id: 7,
      title: "Signer mon contrat",
      description: "Comprendre et négocier votre contrat de travail",
      path: "/etape/7",
      status: user && user.currentStep >= 7 ? "completed" : user && user.currentStep >= 6 ? "current" : "locked"
    },
    {
      id: 8,
      title: "Être accompagné après l'embauche",
      description: "Réussir votre intégration et votre période d'essai",
      path: "/etape/8",
      status: user && user.currentStep >= 8 ? "completed" : user && user.currentStep >= 7 ? "current" : "locked"
    },
  ];

  useEffect(() => {
    if (user) {
      updateUserProgress(user.currentStep, '/dashboard');
    }
  }, [user, updateUserProgress]);

  const completedSteps = steps.filter(step => step.status === "completed").length;
  const totalSteps = steps.length;
  const progress = (completedSteps / totalSteps) * 100;

  const currentStep = steps.find(step => step.status === "current");
  
  useEffect(() => {
    if (user) {
      toast({
        title: `Bienvenue ${user.name} !`,
        description: "Voici votre tableau de bord pour suivre votre progression.",
        variant: "default"
      });
    }
  }, [user, toast]);

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Mon parcours vers l'emploi</h1>
        
        {currentStep && (
          <div className="bg-primary/10 text-primary p-4 mb-6 text-center rounded-lg">
            <span className="text-lg font-medium">
              {completedSteps === 0 
                ? "👋 Bienvenue ! Commencez votre parcours avec la première étape." 
                : `📣 Vous êtes à l'étape ${currentStep.id} : ${currentStep.title}`}
            </span>
          </div>
        )}
        
        <div className="mb-4 max-w-xl mx-auto">
          <div className="flex justify-between mb-1 text-sm">
            <span>Progression: {completedSteps}/{totalSteps} étapes</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        <div className="mb-8 max-w-xl mx-auto">
          <DashboardSummary 
            username={user?.name || "Utilisateur"}
            completedSteps={completedSteps}
            totalSteps={totalSteps}
            lastActivity="Aujourd'hui"
            achievements={[
              ...(completedSteps >= 1 ? [{
                id: "ach1",
                title: "Première étape terminée",
                description: "Vous avez créé votre CV avec succès",
                date: new Date().toLocaleDateString('fr-FR')
              }] : []),
              ...(completedSteps >= 3 ? [{
                id: "ach2",
                title: "Candidature envoyée",
                description: "Vous avez postulé à votre première offre",
                date: new Date().toLocaleDateString('fr-FR')
              }] : []),
            ]}
          />
        </div>

        <div className="mb-8 bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-xl font-medium mb-3 text-center">Mon chemin vers l'emploi</h2>
          <StepProgress steps={steps} currentStepId={user?.currentStep || 1} />
        </div>

        <div className="flex flex-col gap-3 max-w-xl mx-auto mb-8">
          {steps.map((step) => (
            <button
              key={step.id}
              className={cn(
                "flex items-center p-5 text-left h-auto rounded-lg border-2 w-full",
                step.status === "current" ? "bg-primary text-white border-primary" : "bg-white border-gray-200",
                step.status === "completed" ? "bg-success/10 border-success" : "",
                step.status === "locked" ? "opacity-60 cursor-not-allowed" : "cursor-pointer hover:shadow-md transition-all"
              )}
              onClick={() => step.status !== "locked" && navigate(step.path)}
              disabled={step.status === "locked"}
            >
              <div className={cn(
                "rounded-full w-10 h-10 flex items-center justify-center mr-3 text-lg font-bold",
                step.status === "current" ? "bg-white text-primary" : "",
                step.status === "completed" ? "bg-success text-white" : "",
                step.status === "locked" ? "bg-gray-200 text-gray-500" : ""
              )}>
                {step.id}
              </div>
              <div>
                <div className="font-medium text-lg">{step.title}</div>
                <div className={cn(
                  "text-sm",
                  step.status === "current" ? "text-white/80" : "text-gray-500"
                )}>{step.description}</div>
              </div>
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-4 mt-8 max-w-xl mx-auto">
          <Button 
            variant="default" 
            className="text-lg py-6 h-auto w-full flex items-center justify-center gap-2"
            onClick={() => navigate('/documents')}
          >
            <FileText className="h-5 w-5" />
            Mes documents
          </Button>
          
          <Button 
            variant="secondary" 
            className="text-lg py-6 h-auto w-full flex items-center justify-center gap-2"
            onClick={() => navigate('/candidatures')}
          >
            <Briefcase className="h-5 w-5" />
            Mes candidatures
          </Button>
          
          <Button 
            variant="outline" 
            className="text-lg py-6 h-auto w-full flex items-center justify-center gap-2"
            onClick={() => navigate('/partenaires')}
          >
            <Users className="h-5 w-5" />
            Partenaires
          </Button>
          
          <Button 
            variant="secondary" 
            className="text-lg py-6 h-auto w-full flex items-center justify-center gap-2 bg-success text-white hover:bg-success/80"
            onClick={() => navigate('/aide')}
          >
            <LifeBuoy className="h-5 w-5" />
            J'ai besoin d'aide
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
