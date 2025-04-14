
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { HelpingHand } from 'lucide-react';

interface HelpButtonProps {
  className?: string;
  text?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  to?: string;
}

const HelpButton: React.FC<HelpButtonProps> = ({ 
  className, 
  text = "Besoin d'accompagnement ?",
  icon = <HelpingHand className="h-5 w-5" />,
  onClick,
  to = '/aide'
}) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (to) {
      navigate(to);
    }
  };
  
  return (
    <Button 
      variant="outline" 
      size="lg"
      className={cn("border rounded-lg py-5 h-auto text-lg flex items-center gap-2", className)}
      onClick={handleClick}
    >
      {icon}
      <span>{text}</span>
    </Button>
  );
};

export default HelpButton;
