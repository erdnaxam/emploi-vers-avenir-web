'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

// Définir les étapes du parcours selon vos routes existantes
const ETAPES = [
  '/parcours/information',
  '/parcours/objectifs',
  '/parcours/preparation',
  '/parcours/financement',
  '/parcours/pao'
];

type ParcoursContextType = {
  etapeActuelle: number;
  allerEtapeSuivante: () => void;
  allerEtapePrecedente: () => void;
  peutAvancer: boolean;
  setPeutAvancer: (peut: boolean) => void;
};

const ParcoursContext = createContext<ParcoursContextType | undefined>(undefined);

export function ParcoursProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  
  // Déterminer l'étape actuelle en fonction du chemin
  const etapeActuelle = ETAPES.findIndex(etape => pathname.includes(etape));
  
  // État pour contrôler si l'utilisateur peut avancer (pour validation de formulaire)
  const [peutAvancer, setPeutAvancer] = useState(true);

  // Fonction pour naviguer vers l'étape suivante
  const allerEtapeSuivante = () => {
    if (etapeActuelle < ETAPES.length - 1 && peutAvancer) {
      router.push(ETAPES[etapeActuelle + 1]);
    }
  };

  // Fonction pour naviguer vers l'étape précédente
  const allerEtapePrecedente = () => {
    if (etapeActuelle > 0) {
      router.push(ETAPES[etapeActuelle - 1]);
    }
  };

  return (
    <ParcoursContext.Provider value={{
      etapeActuelle: etapeActuelle !== -1 ? etapeActuelle : 0,
      allerEtapeSuivante,
      allerEtapePrecedente,
      peutAvancer,
      setPeutAvancer
    }}>
      {children}
    </ParcoursContext.Provider>
  );
}

// Hook personnalisé pour utiliser le contexte
export function useParcours() {
  const context = useContext(ParcoursContext);
  if (context === undefined) {
    throw new Error('useParcours doit être utilisé à l\'intérieur d\'un ParcoursProvider');
  }
  return context;
}
