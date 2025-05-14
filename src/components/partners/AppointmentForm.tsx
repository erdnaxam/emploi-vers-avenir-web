
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Partner, AppointmentFormData } from '@/types/partners';

interface AppointmentFormProps {
  partners: Partner[];
  formData: AppointmentFormData;
  onFormChange: (field: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  partners,
  formData,
  onFormChange,
  onSubmit
}) => {
  return (
    <Card className="mt-10" id="appointment-form">
      <CardHeader>
        <CardTitle>Prendre rendez-vous</CardTitle>
        <CardDescription>
          Remplissez ce formulaire pour demander un rendez-vous avec un partenaire
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="partner">Partenaire</Label>
            <Select 
              value={formData.partnerId} 
              onValueChange={(value) => onFormChange('partnerId', value)}
            >
              <SelectTrigger id="partner">
                <SelectValue placeholder="Choisir un partenaire" />
              </SelectTrigger>
              <SelectContent>
                {partners.map((partner) => (
                  <SelectItem key={partner.id} value={partner.id}>
                    {partner.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input 
                id="date" 
                type="date" 
                value={formData.date}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => onFormChange('date', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="time">Heure</Label>
              <Input 
                id="time" 
                type="time" 
                value={formData.time}
                onChange={(e) => onFormChange('time', e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="type">Type de rendez-vous</Label>
            <Select 
              value={formData.type} 
              onValueChange={(value: 'présentiel' | 'téléphonique' | 'visioconférence') => 
                onFormChange('type', value)
              }
            >
              <SelectTrigger id="type">
                <SelectValue placeholder="Choisir un type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="présentiel">Présentiel</SelectItem>
                <SelectItem value="téléphonique">Téléphonique</SelectItem>
                <SelectItem value="visioconférence">Visioconférence</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optionnel)</Label>
            <Input 
              id="notes" 
              placeholder="Précisions sur votre demande..."
              value={formData.notes}
              onChange={(e) => onFormChange('notes', e.target.value)}
            />
          </div>
          
          <Button type="submit" className="w-full">
            Confirmer le rendez-vous
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AppointmentForm;
