
import { Step } from '@/components/steps/StepProgress';

export const getSteps = (currentUserStep: number): Step[] => {
  const steps: Step[] = [
    {
      id: 1,
      title: "Créer mon CV",
      description: "Créez un CV professionnel et adapté à votre recherche",
      path: "/etape/1",
      status: currentUserStep >= 1 ? "completed" : "locked"
    },
    {
      id: 2,
      title: "Me préparer à chercher un emploi",
      description: "Techniques et ressources pour une recherche efficace",
      path: "/etape/2",
      status: currentUserStep >= 2 ? "completed" : currentUserStep >= 1 ? "current" : "locked"
    },
    {
      id: 3,
      title: "Trouver et postuler à des offres",
      description: "Répondre aux offres avec des candidatures adaptées",
      path: "/etape/3",
      status: currentUserStep >= 3 ? "completed" : currentUserStep >= 2 ? "current" : "locked"
    },
    {
      id: 4,
      title: "Me préparer à un entretien",
      description: "Se préparer pour réussir ses entretiens d'embauche",
      path: "/etape/4",
      status: currentUserStep >= 4 ? "completed" : currentUserStep >= 3 ? "current" : "locked"
    },
    {
      id: 5,
      title: "Passer un entretien",
      description: "Techniques pour être à l'aise pendant l'entretien",
      path: "/etape/5",
      status: currentUserStep >= 5 ? "completed" : currentUserStep >= 4 ? "current" : "locked"
    },
    {
      id: 6,
      title: "Recevoir une réponse",
      description: "Gérer les réponses, positives comme négatives",
      path: "/etape/6",
      status: currentUserStep >= 6 ? "completed" : currentUserStep >= 5 ? "current" : "locked"
    },
    {
      id: 7,
      title: "Signer mon contrat",
      description: "Comprendre et négocier votre contrat de travail",
      path: "/etape/7",
      status: currentUserStep >= 7 ? "completed" : currentUserStep >= 6 ? "current" : "locked"
    },
    {
      id: 8,
      title: "Être accompagné après l'embauche",
      description: "Réussir votre intégration et votre période d'essai",
      path: "/etape/8",
      status: currentUserStep >= 8 ? "completed" : currentUserStep >= 7 ? "current" : "locked"
    },
  ];
  
  return steps;
};
