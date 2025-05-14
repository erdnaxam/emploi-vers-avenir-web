
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Appointment } from '@/types/partners';

interface AppointmentsListProps {
  appointments: Appointment[];
  onCancelAppointment: (id: string) => void;
  onNavigateToPartners: () => void;
}

const AppointmentsList: React.FC<AppointmentsListProps> = ({
  appointments,
  onCancelAppointment,
  onNavigateToPartners
}) => {
  if (appointments.length === 0) {
    return (
      <Card className="w-full p-10 text-center">
        <CardContent>
          <p className="text-muted-foreground text-lg mb-4">
            Vous n'avez pas encore de rendez-vous prévus.
          </p>
          <Button onClick={onNavigateToPartners}>
            Prendre un rendez-vous
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="grid grid-cols-1 gap-4">
      {appointments.map((appointment) => (
        <Card key={appointment.id} className="w-full">
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-lg font-semibold">{appointment.partnerName}</h3>
                <div className="flex items-center text-muted-foreground mt-1">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>
                    {new Date(appointment.date).toLocaleDateString('fr-FR')} à {appointment.time}
                  </span>
                </div>
                <Badge className={cn(
                  "mt-2",
                  appointment.type === 'présentiel' ? "bg-blue-100 text-blue-800" : 
                  appointment.type === 'téléphonique' ? "bg-green-100 text-green-800" : 
                  "bg-purple-100 text-purple-800"
                )}>
                  {appointment.type}
                </Badge>
              </div>
              
              <Button 
                variant="destructive"
                onClick={() => onCancelAppointment(appointment.id)}
              >
                Annuler
              </Button>
            </div>
            
            {appointment.notes && (
              <div className="mt-4 p-3 bg-muted rounded-md">
                <p className="text-sm">{appointment.notes}</p>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AppointmentsList;
