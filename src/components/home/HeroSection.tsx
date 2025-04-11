
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 md:pr-12">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              Votre parcours vers l'emploi, étape par étape
            </h1>
            <p className="text-xl text-muted-foreground">
              Un accompagnement personnalisé et accessible pour vous guider de la création de votre CV jusqu'à la signature de votre contrat.
            </p>
            
            <div className="pt-2 space-y-3">
              {['Suivi étape par étape', 'Documents professionnels', 'Assistance personnalisée'].map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" asChild>
                <Link to="/login" className="group">
                  <span>Commencer mon parcours</span>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/about">En savoir plus</Link>
              </Button>
            </div>
          </div>
          
          <div className="rounded-xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?q=80&w=2070&auto=format&fit=crop" 
              alt="Accompagnement vers l'emploi" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
