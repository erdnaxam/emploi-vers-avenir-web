
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Star, Trophy, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  completedSteps: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ completedSteps, totalSteps }) => {
  // Calculate the progress percentage
  const progress = completedSteps >= totalSteps ? 100 : (completedSteps / totalSteps) * 100;
  
  // Motivational messages based on progress
  const getMotivationalMessage = () => {
    if (progress === 0) return "C'est le moment de commencer votre parcours !";
    if (progress < 25) return "Excellent début ! Continuez ainsi.";
    if (progress < 50) return "Vous avancez bien, ne lâchez rien !";
    if (progress < 75) return "Plus qu'à mi-chemin, vous êtes sur la bonne voie !";
    if (progress < 100) return "Presque terminé, tenez bon !";
    return "🎉 Félicitations ! Vous avez complété tout le parcours vers l'emploi !";
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
              {completedSteps >= totalSteps && <Trophy className="h-4 w-4 text-yellow-500 ml-1" />}
            </div>
          )}
        </div>
        <span className="font-semibold">{Math.round(progress)}%</span>
      </div>
      <Progress 
        value={progress} 
        className={cn(
          "h-4 rounded-full transition-all duration-500",
          progress >= 100 && "bg-success/30"
        )}
      />
      <p className={cn(
        "text-center text-sm mt-2 italic",
        progress === 100 ? "text-success font-semibold animate-pulse" : "text-muted-foreground"
      )}>
        {getMotivationalMessage()}
      </p>
      
      {progress >= 100 && (
        <div className="flex justify-center mt-3 animate-fade-in">
          <div className="bg-success/10 text-success px-4 py-2 rounded-full flex items-center">
            <Trophy className="h-5 w-5 mr-2" />
            <span className="font-medium">Parcours complété avec succès !</span>
            <Sparkles className="h-5 w-5 ml-2" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
