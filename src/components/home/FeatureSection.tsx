
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileCheck, Clock, Users, Award, Compass, BookOpen, MessagesSquare, Shield } from 'lucide-react';

const features = [
  {
    icon: <Compass className="h-10 w-10 text-primary" />,
    title: "Parcours guidé",
    description: "Un chemin clair et structuré en 8 étapes pour vous accompagner de la création de votre CV jusqu'à l'emploi."
  },
  {
    icon: <Clock className="h-10 w-10 text-primary" />,
    title: "À votre rythme",
    description: "Progressez selon vos disponibilités, chaque étape validée est sauvegardée."
  },
  {
    icon: <FileCheck className="h-10 w-10 text-primary" />,
    title: "Documents professionnels",
    description: "Créez et stockez vos CV, lettres de motivation et autres documents importants."
  },
  {
    icon: <Award className="h-10 w-10 text-primary" />,
    title: "Valorisation des succès",
    description: "Chaque avancée est reconnue et célébrée pour maintenir votre motivation."
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: "Réseau de partenaires",
    description: "Accédez à notre réseau de partenaires locaux pour un accompagnement personnalisé."
  },
  {
    icon: <BookOpen className="h-10 w-10 text-primary" />,
    title: "Ressources accessibles",
    description: "Contenus adaptés en format texte, audio et visuel pour s'adapter à tous les besoins."
  },
  {
    icon: <MessagesSquare className="h-10 w-10 text-primary" />,
    title: "Assistance dédiée",
    description: "Un accompagnement humain disponible à chaque étape de votre parcours."
  },
  {
    icon: <Shield className="h-10 w-10 text-primary" />,
    title: "Confidentialité assurée",
    description: "Vos données personnelles sont protégées et sécurisées tout au long de votre parcours."
  }
];

const FeatureSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Notre méthode d'accompagnement</h2>
          <p className="text-lg text-muted-foreground">
            Nous vous proposons un parcours complet et bienveillant pour vous aider à retrouver confiance et réussir votre recherche d'emploi.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border transition-all duration-300 hover:shadow-md">
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
