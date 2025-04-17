
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { HelpingHand, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface HelpButtonProps {
  className?: string;
  text?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  to?: string;
  showChatbot?: boolean;
}

const HelpButton: React.FC<HelpButtonProps> = ({ 
  className, 
  text = "Besoin d'accompagnement ?",
  icon = <HelpingHand className="h-5 w-5" />,
  onClick,
  to = '/aide',
  showChatbot = false
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleClick = () => {
    if (showChatbot) {
      // Afficher un toast pour indiquer que l'assistant est disponible
      toast({
        title: "Assistant virtuel disponible",
        description: "Vous pouvez poser vos questions à notre coach emploi en bas à droite de l'écran.",
        variant: "default",
      });
      if (onClick) onClick();
    } else if (onClick) {
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
      {showChatbot ? <MessageCircle className="h-5 w-5" /> : icon}
      <span>{text}</span>
    </Button>
  );
};

export default HelpButton;
