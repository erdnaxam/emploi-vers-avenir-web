
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface HelpButtonProps {
  className?: string;
}

const HelpButton: React.FC<HelpButtonProps> = ({ className }) => {
  const navigate = useNavigate();
  
  return (
    <Button 
      variant="outline" 
      size="lg"
      className={cn("border rounded-lg py-5 h-auto text-lg", className)}
      onClick={() => navigate('/aide')}
    >
      <span>Besoin d'accompagnement ?</span>
    </Button>
  );
};

export default HelpButton;
