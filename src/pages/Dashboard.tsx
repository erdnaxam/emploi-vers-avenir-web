
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import StepProgress, { Step } from '@/components/steps/StepProgress';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

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

  // Message de félicitation
  const congratsMessage = "Bravo ! Votre CV est prêt !";

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4 text-center">Espace utilisateur</h1>
        
        <div className="mb-12 bg-white rounded-lg shadow-sm pb-4">
          <StepProgress steps={steps} currentStepId={2} />
        </div>

        {steps.find(step => step.status === "completed") && (
          <div className="bg-success/10 text-success p-4 mb-6 text-center rounded-md">
            {congratsMessage}
          </div>
        )}

        <div className="flex flex-col gap-4 max-w-2xl mx-auto">
          {steps.map((step) => (
            <Button
              key={step.id}
              variant={step.status === "current" ? "default" : "outline"}
              disabled={step.status === "locked"}
              className="justify-start text-left h-auto py-6 rounded-md border-2"
              onClick={() => navigate(step.path)}
            >
              {step.title}
            </Button>
          ))}
        </div>

        <div className="flex justify-between max-w-2xl mx-auto mt-12">
          <Button 
            variant="outline" 
            size="lg"
            className="text-lg"
            onClick={() => navigate('/documents')}
          >
            Mes documents
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="text-lg"
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
