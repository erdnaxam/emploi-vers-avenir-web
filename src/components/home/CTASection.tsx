
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { PhoneCall, MessageSquare } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Besoin d'aide pour votre recherche d'emploi ?
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="w-full py-6 text-xl h-auto" asChild>
              <Link to="/login" className="flex items-center justify-center">
                Commencer mon parcours
              </Link>
            </Button>
            
            <Button size="lg" variant="outline" className="w-full py-6 text-xl h-auto bg-transparent text-white border-white hover:bg-white/10" asChild>
              <Link to="/aide" className="flex items-center justify-center gap-2">
                <PhoneCall className="h-5 w-5" />
                <span>Parler à un conseiller</span>
              </Link>
            </Button>
          </div>
          
          <div className="mt-8 text-white">
            <p className="text-lg">Ou envoyez-nous un message</p>
            <Button variant="link" className="text-white text-lg mt-2" asChild>
              <Link to="/aide" className="flex items-center justify-center gap-2">
                <MessageSquare className="h-5 w-5" />
                <span>Contacter un conseiller par message</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
