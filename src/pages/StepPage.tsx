
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import StepContent from '@/components/steps/StepContent';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import VideoPlayer from '@/components/video/VideoPlayer';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const StepPage = () => {
  const { stepId } = useParams<{ stepId: string }>();
  const navigate = useNavigate();
  const { user, updateUserProgress } = useAuth();
  const { toast } = useToast();
  const [showIntroVideo, setShowIntroVideo] = useState(false);
  
  // Check if this is step 1 and if user hasn't seen the intro video
  useEffect(() => {
    if (stepId === '1' && user && !localStorage.getItem('hasSeenIntroVideo')) {
      // Redirect to intro video page for first-time step 1 visitors
      navigate('/introduction');
    }
  }, [stepId, user, navigate]);

  // Vérifier si l'utilisateur peut accéder à cette étape
  useEffect(() => {
    if (user && stepId) {
      const stepNumber = parseInt(stepId);
      if (stepNumber > user.currentStep + 1) {
        toast({
          title: "Accès non autorisé",
          description: "Vous devez compléter les étapes précédentes avant d'accéder à celle-ci.",
          variant: "destructive"
        });
        navigate(`/etape/${user.currentStep}`);
      } else {
        // Mise à jour de la dernière page visitée
        updateUserProgress(user.currentStep, `/etape/${stepId}`);
      }
    }
  }, [stepId, user, navigate, updateUserProgress, toast]);

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
          type: "document" as const,
          title: "Modèle de CV",
          description: "Téléchargez et utilisez ce modèle pour créer votre CV.",
          url: "#"
        },
        {
          id: "r2",
          type: "video" as const,
          title: "Comment rédiger un CV efficace",
          description: "Tutoriel vidéo de 10 minutes sur la création d'un CV.",
          url: "#"
        },
        {
          id: "r3",
          type: "text" as const,
          title: "Guide des compétences à valoriser",
          description: "Liste des compétences les plus recherchées par secteur.",
          url: "#"
        },
        {
          id: "r4",
          type: "audio" as const,
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
          type: "document" as const,
          title: "Tableau de suivi de recherche",
          description: "Outil pour organiser et suivre vos candidatures.",
          url: "#"
        },
        {
          id: "r2",
          type: "video" as const,
          title: "Définir son projet professionnel",
          description: "Exercices pratiques pour clarifier vos objectifs.",
          url: "#"
        },
        {
          id: "r3",
          type: "text" as const,
          title: "Les sites d'offres d'emploi par secteur",
          description: "Liste des meilleurs sites pour votre domaine.",
          url: "#"
        },
        {
          id: "r4",
          type: "audio" as const,
          title: "Témoignages de réussite",
          description: "Parcours inspirants de personnes ayant retrouvé un emploi.",
          url: "#"
        }
      ]
    },
    {
      id: 3,
      title: "Trouver et postuler à des offres",
      description: "Troisième étape : rechercher des offres adaptées et envoyer des candidatures.",
      objective: "Apprendre à identifier les offres qui correspondent à votre profil, rédiger des lettres de motivation personnalisées et suivre vos candidatures.",
      nextStepPath: "/etape/4",
      resources: [
        {
          id: "r1",
          type: "document" as const,
          title: "Modèle de lettre de motivation",
          description: "Exemples et modèles adaptables à différents secteurs.",
          url: "#"
        },
        {
          id: "r2",
          type: "video" as const,
          title: "Comment personnaliser sa candidature",
          description: "Techniques pour adapter votre CV et lettre à chaque offre.",
          url: "#"
        },
        {
          id: "r3",
          type: "text" as const,
          title: "Guide de recherche d'offres",
          description: "Les mots-clés efficaces pour trouver les bonnes offres.",
          url: "#"
        }
      ]
    },
    {
      id: 4,
      title: "Me préparer à un entretien",
      description: "Quatrième étape : préparer votre entretien d'embauche.",
      objective: "Anticiper les questions courantes, préparer vos réponses et adopter la bonne posture pour l'entretien.",
      nextStepPath: "/etape/5",
      resources: [
        {
          id: "r1",
          type: "document" as const,
          title: "Liste des questions fréquentes",
          description: "Questions les plus posées en entretien avec des conseils de réponse.",
          url: "#"
        },
        {
          id: "r2",
          type: "video" as const,
          title: "Simulation d'entretien",
          description: "Vidéo de mise en situation pour s'entraîner.",
          url: "#"
        }
      ]
    },
    {
      id: 5,
      title: "Passer un entretien",
      description: "Cinquième étape : conseils pour le jour J de l'entretien.",
      objective: "Être à l'aise pendant l'entretien, savoir poser les bonnes questions et faire bonne impression.",
      nextStepPath: "/etape/6",
      resources: [
        {
          id: "r1",
          type: "document" as const,
          title: "Checklist avant l'entretien",
          description: "Vérifications à faire la veille et le jour de l'entretien.",
          url: "#"
        },
        {
          id: "r2",
          type: "audio" as const,
          title: "Exercices de respiration",
          description: "Techniques pour gérer le stress avant et pendant l'entretien.",
          url: "#"
        }
      ]
    },
    {
      id: 6,
      title: "Recevoir une réponse",
      description: "Sixième étape : gérer les suites de l'entretien, positives ou négatives.",
      objective: "Savoir relancer après un entretien, analyser un refus et rebondir, ou négocier une offre.",
      nextStepPath: "/etape/7",
      resources: [
        {
          id: "r1",
          type: "document" as const,
          title: "Modèle d'email de relance",
          description: "Exemples pour relancer après un entretien sans réponse.",
          url: "#"
        },
        {
          id: "r2",
          type: "text" as const,
          title: "Comment négocier son salaire",
          description: "Conseils pour aborder sereinement la négociation salariale.",
          url: "#"
        }
      ]
    },
    {
      id: 7,
      title: "Signer mon contrat",
      description: "Septième étape : comprendre et vérifier votre contrat de travail.",
      objective: "Connaître les éléments essentiels d'un contrat, savoir quels points vérifier avant signature.",
      nextStepPath: "/etape/8",
      resources: [
        {
          id: "r1",
          type: "document" as const,
          title: "Guide des types de contrats",
          description: "Différences entre CDI, CDD, intérim, et autres contrats.",
          url: "#"
        },
        {
          id: "r2",
          type: "video" as const,
          title: "Les points de vigilance",
          description: "Ce qu'il faut vérifier avant de signer un contrat.",
          url: "#"
        }
      ]
    },
    {
      id: 8,
      title: "Être accompagné après l'embauche",
      description: "Huitième étape : bien démarrer dans votre nouveau poste.",
      objective: "Réussir votre intégration, traverser la période d'essai et commencer votre nouveau poste avec confiance.",
      nextStepPath: "/dashboard",
      resources: [
        {
          id: "r1",
          type: "document" as const,
          title: "Guide du premier mois",
          description: "Les actions clés pour réussir votre intégration.",
          url: "#"
        },
        {
          id: "r2",
          type: "text" as const,
          title: "Droits et devoirs du salarié",
          description: "Informations essentielles sur vos droits en entreprise.",
          url: "#"
        }
      ]
    }
  ];

  // Trouver l'étape correspondante
  const currentStep = stepsData.find(step => step.id === Number(stepId));

  // Rediriger si l'étape n'existe pas
  if (!currentStep) {
    navigate('/dashboard');
    return null;
  }

  // Fonction pour valider une étape et passer à la suivante
  const handleCompleteStep = () => {
    if (user) {
      // Mettre à jour la progression de l'utilisateur
      updateUserProgress(Math.max(user.currentStep, currentStep.id), currentStep.nextStepPath);
      
      // Marquer l'intro vidéo comme vue si on est à l'étape 1
      if (currentStep.id === 1) {
        localStorage.setItem('hasSeenIntroVideo', 'true');
      }
      
      // Rediriger vers l'étape suivante
      setTimeout(() => {
        navigate(currentStep.nextStepPath);
      }, 1500);
    }
  };

  const handleVideoClose = () => {
    setShowIntroVideo(false);
    localStorage.setItem('hasSeenIntroVideo', 'true');
  };

  return (
    <PageLayout>
      {currentStep.id === 1 && (
        <Dialog open={showIntroVideo} onOpenChange={setShowIntroVideo}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Bienvenue sur votre parcours vers l'emploi</DialogTitle>
            </DialogHeader>
            <VideoPlayer onSkip={handleVideoClose} showInModal={true} />
          </DialogContent>
        </Dialog>
      )}
      
      <StepContent {...currentStep} onComplete={handleCompleteStep} />
    </PageLayout>
  );
};

export default StepPage;
