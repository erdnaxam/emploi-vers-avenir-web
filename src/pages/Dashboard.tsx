
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import StepProgress, { Step } from '@/components/steps/StepProgress';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

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

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Mon parcours</h1>
        
        {steps.find(step => step.status === "completed") && (
          <div className="bg-success/10 text-success p-3 mb-6 text-center rounded-md">
            Bravo ! Vous avancez bien dans votre parcours.
          </div>
        )}
        
        <div className="mb-8 bg-white rounded-lg shadow-sm">
          <StepProgress steps={steps} currentStepId={2} />
        </div>

        <div className="flex flex-col gap-3 max-w-xl mx-auto">
          {steps.map((step) => (
            <button
              key={step.id}
              className={cn(
                "flex items-center p-4 text-left h-auto rounded-md border-2 w-full",
                step.status === "current" ? "bg-primary text-white" : "bg-white",
                step.status === "locked" ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              )}
              onClick={() => step.status !== "locked" && navigate(step.path)}
              disabled={step.status === "locked"}
            >
              <div className="rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold bg-white text-primary">
                {step.id}
              </div>
              {step.title}
            </button>
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <Button 
            variant="outline" 
            className="text-lg py-4 h-auto w-[45%]"
            onClick={() => navigate('/documents')}
          >
            Mes documents
          </Button>
          
          <Button 
            variant="outline" 
            className="text-lg py-4 h-auto w-[45%]"
            onClick={() => navigate('/aide')}
          >
            Besoin d'aide
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
