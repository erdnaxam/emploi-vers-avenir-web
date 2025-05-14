
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';
import { Partner } from '@/types/partners';

interface PartnersListProps {
  partners: Partner[];
  searchQuery: string;
  categoryFilter: string;
  onScheduleAppointment: (partnerId: string) => void;
}

const categoryLabels = {
  'insertion': 'Insertion professionnelle',
  'emploi': "Recherche d'emploi",
  'formation': 'Formation',
  'accompagnement': 'Accompagnement social',
  'aide': 'Aide aux démarches'
};

const PartnersList: React.FC<PartnersListProps> = ({ 
  partners, 
  searchQuery, 
  categoryFilter, 
  onScheduleAppointment 
}) => {
  const filteredPartners = partners.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          partner.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || partner.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });
  
  if (filteredPartners.length === 0) {
    return (
      <div className="text-center p-10">
        <p className="text-muted-foreground">Aucun partenaire ne correspond à votre recherche.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {filteredPartners.map((partner) => (
        <Card key={partner.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">{partner.name}</CardTitle>
                <Badge className="mt-1">{categoryLabels[partner.category]}</Badge>
              </div>
              {partner.logoUrl && (
                <div className="w-12 h-12 rounded-md overflow-hidden">
                  <img src={partner.logoUrl} alt={`Logo ${partner.name}`} className="w-full h-full object-contain" />
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="pb-4">
            <p className="text-muted-foreground mb-3">{partner.description}</p>
            
            <div className="space-y-3 text-sm">
              {partner.address && (
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                  <span>{partner.address}</span>
                </div>
              )}
              
              {partner.phone && (
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{partner.phone}</span>
                </div>
              )}
              
              {partner.email && (
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{partner.email}</span>
                </div>
              )}
              
              {partner.website && (
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                  <a href={partner.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Site web
                  </a>
                </div>
              )}
            </div>
            
            <div className="mt-4">
              <p className="font-medium mb-2">Services proposés :</p>
              <ul className="list-disc pl-5 space-y-1">
                {partner.services.map((service, index) => (
                  <li key={index} className="text-sm">{service}</li>
                ))}
              </ul>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button 
              className="w-full"
              onClick={() => onScheduleAppointment(partner.id)}
            >
              Prendre rendez-vous
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default PartnersList;
