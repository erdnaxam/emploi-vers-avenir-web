
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <h1 className="text-3xl font-bold mb-4">
          Votre parcours vers l'emploi
        </h1>
        <p className="text-lg mb-8">
          Un accompagnement simple et personnalisé pour trouver un emploi.
        </p>
        
        <Button size="lg" className="px-6 py-5 text-lg rounded-md h-auto w-full md:w-auto" asChild>
          <Link to="/login">
            Commencer
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
