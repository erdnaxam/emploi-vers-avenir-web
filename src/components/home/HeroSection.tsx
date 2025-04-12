
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { PlayCircle, ArrowRight, FileText, Briefcase, Search, Headphones, MessagesSquare, CheckSquare, FileCheck, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const steps = [
  {
    id: 1,
    icon: <FileText className="h-8 w-8" />,
    title: "Créer mon CV",
    description: "Créez un CV professionnel et adapté à votre recherche"
  },
  {
    id: 2,
    icon: <Briefcase className="h-8 w-8" />,
    title: "Me préparer",
    description: "Définir votre projet et vous organiser"
  },
  {
    id: 3,
    icon: <Search className="h-8 w-8" />,
    title: "Postuler",
    description: "Trouver des offres et candidater"
  },
  {
    id: 4,
    icon: <Headphones className="h-8 w-8" />,
    title: "Préparer l'entretien",
    description: "S'entraîner pour être à l'aise"
  },
  {
    id: 5,
    icon: <MessagesSquare className="h-8 w-8" />,
    title: "Passer l'entretien",
    description: "Réussir le jour J"
  },
  {
    id: 6,
    icon: <CheckSquare className="h-8 w-8" />,
    title: "Réponse",
    description: "Gérer l'après-entretien"
  },
  {
    id: 7,
    icon: <FileCheck className="h-8 w-8" />,
    title: "Contrat",
    description: "Comprendre avant de signer"
  },
  {
    id: 8,
    icon: <Users className="h-8 w-8" />,
    title: "Suivi",
    description: "Être accompagné après l'embauche"
  },
];

const HeroSection = () => {
  return (
    <div className="bg-white py-16 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Votre parcours vers l'emploi, étape par étape
        </h1>
        <p className="text-xl mb-8">
          Un accompagnement simple et adapté à vos besoins pour trouver un emploi
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {steps.map(step => (
            <Card 
              key={step.id}
              className={cn(
                "p-4 flex flex-col items-center text-center hover:shadow-md transition-all cursor-pointer",
                "border-2 group"
              )}
              onClick={() => window.location.href = '/login'}
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                <div className="text-primary">{step.icon}</div>
              </div>
              <span className="font-bold text-lg block mb-1">{step.id}. {step.title}</span>
              <span className="text-sm text-muted-foreground">{step.description}</span>
            </Card>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="px-6 py-6 text-xl rounded-lg h-auto w-full sm:w-auto" asChild>
            <Link to="/login" className="flex items-center justify-center">
              <span>Commencer maintenant</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          
          <Button size="lg" variant="outline" className="px-6 py-6 text-xl rounded-lg h-auto w-full sm:w-auto border-2" asChild>
            <Link to="#" className="flex items-center justify-center">
              <PlayCircle className="mr-2 h-5 w-5" />
              <span>Voir comment ça marche</span>
            </Link>
          </Button>
        </div>

        <div className="mt-8 p-4 bg-muted rounded-lg text-center max-w-lg mx-auto">
          <p className="text-lg font-medium">🔊 Besoin d'aide ? Appelez le 0800 123 456 (gratuit)</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
