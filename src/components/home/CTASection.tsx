
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">
            Prêt à commencer votre parcours vers l'emploi ?
          </h2>
          <p className="text-primary-foreground/90 text-lg mb-8">
            Inscrivez-vous gratuitement et accédez à toutes nos ressources pour vous accompagner dans votre recherche d'emploi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/login" className="group">
                <span>Commencer maintenant</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10" asChild>
              <Link to="/contact">Besoin d'aide ?</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
