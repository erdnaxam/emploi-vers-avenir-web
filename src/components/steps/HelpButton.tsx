
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { HelpingHand } from 'lucide-react';

interface HelpButtonProps {
  className?: string;
  onClick?: () => void;
}

const HelpButton: React.FC<HelpButtonProps> = ({ className, onClick }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate('/aide');
    }
  };
  
  return (
    <Button 
      variant="outline" 
      size="lg"
      className={cn("border rounded-lg py-5 h-auto text-lg flex items-center gap-2", className)}
      onClick={handleClick}
    >
      <HelpingHand className="h-5 w-5" />
      <span>Besoin d'accompagnement ?</span>
    </Button>
  );
};

export default HelpButton;
