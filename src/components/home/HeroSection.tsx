
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="bg-white py-20 md:py-32">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
          Mon parcours vers l'emploi
        </h1>
        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          Un accompagnement étape par étape pour faciliter l'accès à l'emploi.
        </p>
        
        <Button size="lg" className="px-8 py-6 text-lg rounded-md h-auto" asChild>
          <Link to="/login">
            Commencer mon parcours
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
