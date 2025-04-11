
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import StepProgress, { Step } from '@/components/steps/StepProgress';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, LifeBuoy, FileText } from 'lucide-react';
import DashboardSummary from '@/components/dashboard/DashboardSummary';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Données simulées pour la progression de l'utilisateur
  const steps: Step[] = [
    {
      id: 1,
      title: "Créer mon CV",
      description: "Créez un CV professionnel et adapté à votre recherche",
      path: "/etape/1",
      status: "completed"
    },
    {
      id: 2,
      title: "Me préparer à chercher un emploi",
      description: "Techniques et ressources pour une recherche efficace",
      path: "/etape/2",
      status: "current"
    },
    {
      id: 3,
      title: "Trouver et postuler à des offres",
      description: "Répondre aux offres avec des candidatures adaptées",
      path: "/etape/3",
      status: "locked"
    },
    {
      id: 4,
      title: "Me préparer à un entretien",
      description: "Se préparer pour réussir ses entretiens d'embauche",
      path: "/etape/4",
      status: "locked"
    },
    {
      id: 5,
      title: "Passer un entretien",
      description: "Techniques pour être à l'aise pendant l'entretien",
      path: "/etape/5",
      status: "locked"
    },
    {
      id: 6,
      title: "Recevoir une réponse",
      description: "Gérer les réponses, positives comme négatives",
      path: "/etape/6",
      status: "locked"
    },
    {
      id: 7,
      title: "Signer mon contrat",
      description: "Comprendre et négocier votre contrat de travail",
      path: "/etape/7",
      status: "locked"
    },
    {
      id: 8,
      title: "Être accompagné après l'embauche",
      description: "Réussir votre intégration et votre période d'essai",
      path: "/etape/8",
      status: "locked"
    },
  ];

  const completedSteps = steps.filter(step => step.status === "completed").length;
  const totalSteps = steps.length;
  const progress = (completedSteps / totalSteps) * 100;

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Mon parcours vers l'emploi</h1>
        
        {/* Notification de progression */}
        {steps.find(step => step.status === "completed") && (
          <div className="bg-success/10 text-success p-3 mb-6 text-center rounded-md">
            <span className="text-lg font-medium">📣 Bravo ! Vous avancez bien dans votre parcours.</span>
          </div>
        )}
        
        {/* Barre de progression */}
        <div className="mb-4 max-w-xl mx-auto">
          <div className="flex justify-between mb-1 text-sm">
            <span>Progression: {completedSteps}/{totalSteps} étapes</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Tableau de bord résumé */}
        <div className="mb-8 max-w-xl mx-auto">
          <DashboardSummary 
            username="Alex"
            completedSteps={completedSteps}
            totalSteps={totalSteps}
            lastActivity="Aujourd'hui à 14:30"
            achievements={[
              {
                id: "ach1",
                title: "Première étape terminée",
                description: "Vous avez créé votre CV avec succès",
                date: "10/04/2025"
              }
            ]}
          />
        </div>

        <div className="mb-8 bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-xl font-medium mb-3 text-center">Mon chemin vers l'emploi</h2>
          <StepProgress steps={steps} currentStepId={2} />
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
