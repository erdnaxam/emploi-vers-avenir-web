
import { Step } from '@/components/steps/StepProgress';

export const getSteps = (currentUserStep: number): Step[] => {
  const stepsData = [
    {
      id: 1,
      title: "Créer mon CV",
      description: "Créez un CV professionnel et adapté à votre recherche",
      path: "/etape/1"
    },
    {
      id: 2,
      title: "Me préparer à chercher un emploi",
      description: "Techniques et ressources pour une recherche efficace",
      path: "/etape/2"
    },
    {
      id: 3,
      title: "Trouver et postuler à des offres",
      description: "Répondre aux offres avec des candidatures adaptées",
      path: "/etape/3"
    },
    {
      id: 4,
      title: "Me préparer à un entretien",
      description: "Se préparer pour réussir ses entretiens d'embauche",
      path: "/etape/4"
    },
    {
      id: 5,
      title: "Passer un entretien",
      description: "Techniques pour être à l'aise pendant l'entretien",
      path: "/etape/5"
    },
    {
      id: 6,
      title: "Recevoir une réponse",
      description: "Gérer les réponses, positives comme négatives",
      path: "/etape/6"
    },
    {
      id: 7,
      title: "Signer mon contrat",
      description: "Comprendre et négocier votre contrat de travail",
      path: "/etape/7"
    },
    {
      id: 8,
      title: "Être accompagné après l'embauche",
      description: "Réussir votre intégration et votre période d'essai",
      path: "/etape/8"
    },
  ];
  
  // Ajouter le statut à chaque étape
  return stepsData.map(step => ({
    ...step,
    status: step.id < currentUserStep 
      ? "completed" 
      : step.id === currentUserStep 
        ? "current" 
        : "current" // Toutes les étapes sont débloquées
  }));
};
