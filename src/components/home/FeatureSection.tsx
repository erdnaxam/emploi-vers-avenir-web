
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Briefcase, Search, Headphones, MessagesSquare, CheckSquare, FileCheck, Users } from 'lucide-react';

const features = [
  {
    icon: <FileText className="h-12 w-12 text-primary" />,
    title: "1. Créer mon CV",
    description: "Un outil simple pour créer un CV professionnel, adapté à votre recherche"
  },
  {
    icon: <Briefcase className="h-12 w-12 text-primary" />,
    title: "2. Me préparer",
    description: "Techniques et ressources pour une recherche d'emploi efficace"
  },
  {
    icon: <Search className="h-12 w-12 text-primary" />,
    title: "3. Trouver et postuler",
    description: "Trouver des offres adaptées et envoyer des candidatures"
  },
  {
    icon: <Headphones className="h-12 w-12 text-primary" />,
    title: "4. Se préparer à l'entretien",
    description: "Conseils et exercices pour réussir vos entretiens"
  },
  {
    icon: <MessagesSquare className="h-12 w-12 text-primary" />,
    title: "5. Passer un entretien",
    description: "Conseils pratiques pour le jour de l'entretien"
  },
  {
    icon: <CheckSquare className="h-12 w-12 text-primary" />,
    title: "6. Recevoir une réponse",
    description: "Gérer les suites de l'entretien, positives ou négatives"
  },
  {
    icon: <FileCheck className="h-12 w-12 text-primary" />,
    title: "7. Signer mon contrat",
    description: "Comprendre et vérifier votre contrat de travail"
  },
  {
    icon: <Users className="h-12 w-12 text-primary" />,
    title: "8. Être accompagné",
    description: "Soutien pendant la période d'essai et l'intégration"
  }
];

const FeatureSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Notre parcours en 8 étapes</h2>
          <p className="text-xl">
            Un chemin clair et adapté pour vous aider à trouver un emploi
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 transition-all duration-300 hover:shadow-md">
              <CardContent className="pt-6 text-center">
                <div className="mb-6 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12 max-w-xl mx-auto">
          <div className="bg-primary/10 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">À chaque étape :</h3>
            <ul className="text-left space-y-3 text-lg">
              <li className="flex items-center gap-2">
                <div className="bg-primary/20 p-1 rounded-full">✅</div>
                <span>Des ressources adaptées à votre rythme</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="bg-primary/20 p-1 rounded-full">✅</div>
                <span>La possibilité de demander de l'aide</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="bg-primary/20 p-1 rounded-full">✅</div>
                <span>Des récompenses quand vous progressez</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="bg-primary/20 p-1 rounded-full">✅</div>
                <span>Un accompagnement humain si besoin</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
