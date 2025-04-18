
import { Step } from '@/components/steps/StepProgress';

export const getSteps = (currentStepId: number): Step[] => {
  // Create an array of 8 steps with their respective properties
  const steps: Step[] = [
    {
      id: 1,
      title: "Évaluation & CV",
      description: "Évaluez vos compétences et créez un CV percutant",
      path: "/etape/1",
      status: currentStepId >= 1 ? (currentStepId > 1 ? 'completed' : 'current') : 'locked'
    },
    {
      id: 2,
      title: "Préparation",
      description: "Préparez votre recherche d'emploi et identifiez vos cibles",
      path: "/etape/2",
      status: currentStepId >= 2 ? (currentStepId > 2 ? 'completed' : 'current') : 'locked'
    },
    {
      id: 3,
      title: "Recherche d'offres",
      description: "Trouvez des offres qui correspondent à votre profil",
      path: "/etape/3",
      status: currentStepId >= 3 ? (currentStepId > 3 ? 'completed' : 'current') : 'locked'
    },
    {
      id: 4,
      title: "Préparation entretien",
      description: "Préparez-vous aux questions les plus fréquentes",
      path: "/etape/4",
      status: currentStepId >= 4 ? (currentStepId > 4 ? 'completed' : 'current') : 'locked'
    },
    {
      id: 5,
      title: "Entretien",
      description: "Faites bonne impression lors de vos entretiens",
      path: "/etape/5",
      status: currentStepId >= 5 ? (currentStepId > 5 ? 'completed' : 'current') : 'locked'
    },
    {
      id: 6,
      title: "Retour candidature",
      description: "Gérez les réponses et relances post-entretien",
      path: "/etape/6",
      status: currentStepId >= 6 ? (currentStepId > 6 ? 'completed' : 'current') : 'locked'
    },
    {
      id: 7,
      title: "Contrat",
      description: "Négociez et finalisez votre contrat de travail",
      path: "/etape/7",
      status: currentStepId >= 7 ? (currentStepId > 7 ? 'completed' : 'current') : 'locked'
    },
    {
      id: 8,
      title: "Suivi",
      description: "Intégrez-vous dans votre nouveau poste avec succès",
      path: "/etape/8",
      status: currentStepId >= 8 ? 'completed' : (currentStepId === 8 ? 'current' : 'locked')
    }
  ];

  return steps;
};
