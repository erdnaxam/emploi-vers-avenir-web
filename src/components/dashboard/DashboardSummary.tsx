
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, Star } from 'lucide-react';

interface DashboardSummaryProps {
  username: string;
  completedSteps: number;
  totalSteps: number;
  lastActivity: string;
  achievements: Array<{
    id: string;
    title: string;
    description: string;
    date: string;
  }>;
}

const DashboardSummary: React.FC<DashboardSummaryProps> = ({
  username,
  completedSteps,
  totalSteps,
  lastActivity,
  achievements
}) => {
  const progress = (completedSteps / totalSteps) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Progression globale</CardTitle>
          <CardDescription>Votre avancement dans le parcours</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Étapes validées: {completedSteps}/{totalSteps}</span>
                <span className="text-sm font-medium">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-2 h-4 w-4" />
              <span>Dernière activité: {lastActivity}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Vos réussites</CardTitle>
          <CardDescription>Badges et accomplissements</CardDescription>
        </CardHeader>
        <CardContent>
          {achievements.length > 0 ? (
            <ul className="space-y-3">
              {achievements.map((achievement) => (
                <li key={achievement.id} className="flex items-start">
                  <div className="mr-3 mt-0.5">
                    <Star className="h-5 w-5 text-warning" />
                  </div>
                  <div>
                    <p className="font-medium">{achievement.title}</p>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">Obtenu le {achievement.date}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <Badge variant="outline" className="mb-2">Nouveau</Badge>
              <p className="text-muted-foreground">
                Terminez votre première étape pour débloquer vos premiers badges !
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardSummary;
