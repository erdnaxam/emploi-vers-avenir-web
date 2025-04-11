
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-secondary mt-auto py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Emploi<span className="text-accent">Avenir</span></h3>
            <p className="text-sm text-muted-foreground">
              Accompagnement vers l'emploi pour tous, avec une attention particulière aux personnes en situation de vulnérabilité.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens utiles</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-foreground hover:text-primary transition-colors">À propos</Link></li>
              <li><Link to="/partenaires" className="text-foreground hover:text-primary transition-colors">Partenaires</Link></li>
              <li><Link to="/aide" className="text-foreground hover:text-primary transition-colors">Besoin d'aide</Link></li>
              <li><Link to="/accessibility" className="text-foreground hover:text-primary transition-colors">Accessibilité</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>contact@emploiavenir.fr</li>
              <li>01 23 45 67 89</li>
              <li>Du lundi au vendredi, 9h-18h</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">© 2025 EmploiAvenir. Tous droits réservés.</p>
            <div className="mt-4 md:mt-0 space-x-4 text-sm">
              <Link to="/mentions-legales" className="text-foreground hover:text-primary transition-colors">Mentions légales</Link>
              <Link to="/confidentialite" className="text-foreground hover:text-primary transition-colors">Confidentialité</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
