
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  completedSteps: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ completedSteps, totalSteps }) => {
  const progress = (completedSteps / totalSteps) * 100;
  
  return (
    <div className="mb-4 max-w-xl mx-auto">
      <div className="flex justify-between mb-1 text-sm">
        <span>Progression: {completedSteps}/{totalSteps} étapes</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <Progress value={progress} className="h-3" />
    </div>
  );
};

export default ProgressBar;
