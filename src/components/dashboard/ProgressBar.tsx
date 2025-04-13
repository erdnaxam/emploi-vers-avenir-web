
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Star, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  completedSteps: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ completedSteps, totalSteps }) => {
  const progress = (completedSteps / totalSteps) * 100;
  
  // Motivational messages based on progress
  const getMotivationalMessage = () => {
    if (progress === 0) return "C'est le moment de commencer votre parcours !";
    if (progress < 25) return "Excellent début ! Continuez ainsi.";
    if (progress < 50) return "Vous avancez bien, ne lâchez rien !";
    if (progress < 75) return "Plus qu'à mi-chemin, vous êtes sur la bonne voie !";
    if (progress < 100) return "Presque terminé, tenez bon !";
    return "Félicitations ! Vous avez complété tout le parcours !";
  };
  
  return (
    <div className="mb-4 max-w-xl mx-auto">
      <div className="flex justify-between mb-1 text-sm">
        <div className="flex items-center">
          <span>Progression: {completedSteps}/{totalSteps} étapes</span>
          {completedSteps > 0 && (
            <div className="ml-2 flex">
              {Array.from({ length: Math.min(completedSteps, 3) }).map((_, i) => (
                <Star key={i} className={cn("h-4 w-4 text-yellow-400", i > 0 && "-ml-1")} />
              ))}
              {completedSteps >= 5 && <Trophy className="h-4 w-4 text-yellow-500 ml-1" />}
            </div>
          )}
        </div>
        <span className="font-semibold">{Math.round(progress)}%</span>
      </div>
      <Progress value={progress} className="h-4 rounded-full" />
      <p className="text-center text-sm mt-2 text-muted-foreground italic">
        {getMotivationalMessage()}
      </p>
    </div>
  );
};

export default ProgressBar;
