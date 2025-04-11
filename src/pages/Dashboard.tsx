
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import StepProgress, { Step } from '@/components/steps/StepProgress';
import DashboardSummary from '@/components/dashboard/DashboardSummary';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
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
      title: "Chercher un emploi",
      description: "Techniques et ressources pour une recherche efficace",
      path: "/etape/2",
      status: "current"
    },
    {
      id: 3,
      title: "Postuler aux offres",
      description: "Répondre aux offres avec des candidatures adaptées",
      path: "/etape/3",
      status: "locked"
    },
    {
      id: 4,
      title: "Préparer l'entretien",
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
      title: "Après l'embauche",
      description: "Réussir votre intégration et votre période d'essai",
      path: "/etape/8",
      status: "locked"
    },
  ];

  // Données simulées pour la page de tableau de bord
  const userData = {
    username: "Jean Dupont",
    completedSteps: 1,
    totalSteps: 8,
    lastActivity: "Hier, 15:30",
    achievements: [
      {
        id: "a1",
        title: "Premier pas vers l'emploi",
        description: "Vous avez créé votre CV avec succès !",
        date: "12/04/2025"
      }
    ]
  };

  const goToCurrentStep = () => {
    const currentStep = steps.find(step => step.status === 'current');
    if (currentStep) {
      navigate(currentStep.path);
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Tableau de bord</h1>
            <p className="text-muted-foreground">Bienvenue, {userData.username}. Continuez votre parcours.</p>
          </div>
          <Button className="mt-4 md:mt-0" onClick={goToCurrentStep}>
            <span>Continuer mon parcours</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="mb-12 bg-white rounded-lg shadow-sm overflow-x-auto">
          <StepProgress steps={steps} currentStepId={2} />
        </div>

        <DashboardSummary {...userData} />
      </div>
    </PageLayout>
  );
};

export default Dashboard;
