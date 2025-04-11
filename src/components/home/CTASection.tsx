
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-12 bg-primary">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">
            Besoin d'aide pour votre recherche d'emploi ?
          </h2>
          <Button size="lg" variant="secondary" className="w-full md:w-auto" asChild>
            <Link to="/login">
              Démarrer maintenant
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
