
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import StepContent from '@/components/steps/StepContent';

const StepPage = () => {
  const { stepId } = useParams<{ stepId: string }>();
  const navigate = useNavigate();

  // Simuler des données d'étapes
  const stepsData = [
    {
      id: 1,
      title: "Créer mon CV",
      description: "Première étape : créer un CV professionnel qui met en valeur vos compétences.",
      objective: "Réaliser un CV clair, concis et adapté au secteur professionnel que vous visez. Un bon CV doit mettre en avant vos compétences pertinentes et votre parcours de façon chronologique et lisible.",
      nextStepPath: "/etape/2",
      resources: [
        {
          id: "r1",
          type: "document",
          title: "Modèle de CV",
          description: "Téléchargez et utilisez ce modèle pour créer votre CV.",
          url: "#"
        },
        {
          id: "r2",
          type: "video",
          title: "Comment rédiger un CV efficace",
          description: "Tutoriel vidéo de 10 minutes sur la création d'un CV.",
          url: "#"
        },
        {
          id: "r3",
          type: "text",
          title: "Guide des compétences à valoriser",
          description: "Liste des compétences les plus recherchées par secteur.",
          url: "#"
        },
        {
          id: "r4",
          type: "audio",
          title: "Conseils d'experts",
          description: "Témoignages audio de recruteurs sur ce qu'ils recherchent dans un CV.",
          url: "#"
        }
      ]
    },
    {
      id: 2,
      title: "Me préparer à chercher un emploi",
      description: "Deuxième étape : définir votre projet professionnel et organiser votre recherche.",
      objective: "Identifier vos objectifs professionnels, le secteur d'activité visé et mettre en place une organisation efficace pour votre recherche d'emploi. Cette étape est fondamentale pour orienter vos efforts dans la bonne direction.",
      nextStepPath: "/etape/3",
      resources: [
        {
          id: "r1",
          type: "document",
          title: "Tableau de suivi de recherche",
          description: "Outil pour organiser et suivre vos candidatures.",
          url: "#"
        },
        {
          id: "r2",
          type: "video",
          title: "Définir son projet professionnel",
          description: "Exercices pratiques pour clarifier vos objectifs.",
          url: "#"
        },
        {
          id: "r3",
          type: "text",
          title: "Les sites d'offres d'emploi par secteur",
          description: "Liste des meilleurs sites pour votre domaine.",
          url: "#"
        },
        {
          id: "r4",
          type: "audio",
          title: "Témoignages de réussite",
          description: "Parcours inspirants de personnes ayant retrouvé un emploi.",
          url: "#"
        }
      ]
    },
    // Autres étapes similaires...
  ];

  // Trouver l'étape correspondante
  const currentStep = stepsData.find(step => step.id === Number(stepId));

  // Rediriger si l'étape n'existe pas
  if (!currentStep) {
    navigate('/dashboard');
    return null;
  }

  return (
    <PageLayout>
      <StepContent {...currentStep} />
    </PageLayout>
  );
};

export default StepPage;
