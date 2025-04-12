
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileText, Briefcase, Users, LifeBuoy } from 'lucide-react';

const ActionButtons: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col md:flex-row justify-center gap-4 mt-8 max-w-xl mx-auto">
      <Button 
        variant="default" 
        className="text-lg py-6 h-auto w-full flex items-center justify-center gap-2"
        onClick={() => navigate('/documents')}
      >
        <FileText className="h-5 w-5" />
        Mes documents
      </Button>
      
      <Button 
        variant="secondary" 
        className="text-lg py-6 h-auto w-full flex items-center justify-center gap-2"
        onClick={() => navigate('/candidatures')}
      >
        <Briefcase className="h-5 w-5" />
        Mes candidatures
      </Button>
      
      <Button 
        variant="outline" 
        className="text-lg py-6 h-auto w-full flex items-center justify-center gap-2"
        onClick={() => navigate('/partenaires')}
      >
        <Users className="h-5 w-5" />
        Partenaires
      </Button>
      
      <Button 
        variant="secondary" 
        className="text-lg py-6 h-auto w-full flex items-center justify-center gap-2 bg-success text-white hover:bg-success/80"
        onClick={() => navigate('/aide')}
      >
        <LifeBuoy className="h-5 w-5" />
        J'ai besoin d'aide
      </Button>
    </div>
  );
};

export default ActionButtons;
