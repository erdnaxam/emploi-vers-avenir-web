
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { PlayCircle, ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="bg-white py-16 px-4">
      <div className="container mx-auto max-w-2xl text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Votre parcours vers l'emploi, étape par étape
        </h1>
        <p className="text-xl mb-8">
          Un accompagnement simple et adapté à vos besoins pour trouver un emploi
        </p>
        
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
