
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, PhoneCall } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trouvez votre emploi en 8 étapes
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Un parcours simple et guidé pour vous accompagner vers l'emploi
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              className="w-full sm:w-auto py-6 text-xl h-auto hover:scale-105 transition-transform"
              asChild
            >
              <Link to="/login" className="flex items-center justify-center gap-2">
                <span>Commencer maintenant</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full sm:w-auto py-6 text-xl h-auto bg-transparent text-white border-white hover:bg-white/10" 
              asChild
            >
              <Link to="/aide" className="flex items-center justify-center gap-2">
                <PhoneCall className="h-5 w-5" />
                <span>Parler à un conseiller</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
