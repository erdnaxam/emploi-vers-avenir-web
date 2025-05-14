
import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Partner, Appointment, AppointmentFormData } from '@/types/partners';
import PartnersList from '@/components/partners/PartnersList';
import AppointmentForm from '@/components/partners/AppointmentForm';
import AppointmentsList from '@/components/partners/AppointmentsList';
import PartnersSearch from '@/components/partners/PartnersSearch';

const PartenairesPage = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  const [partners] = useState<Partner[]>([
    {
      id: '1',
      name: 'France Travail',
      category: 'emploi',
      description: "L'organisme public pour l'emploi en France",
      services: ["Accompagnement personnalisé", "Offres d'emploi", "Ateliers de recherche"],
      address: '15 rue de Paris, 75001 Paris',
      phone: '3949',
      email: 'contact@francetravail.fr',
      website: 'https://www.francetravail.fr',
      logoUrl: '/placeholder.svg'
    },
    {
      id: '2',
      name: 'Croix-Rouge française',
      category: 'accompagnement',
      description: "Association d'aide humanitaire",
      services: ['Accompagnement social', 'Aide alimentaire', 'Insertion professionnelle'],
      address: '86 rue Didot, 75014 Paris',
      phone: '01 44 43 11 00',
      email: 'contact@croix-rouge.fr',
      website: 'https://www.croix-rouge.fr',
      logoUrl: '/placeholder.svg'
    },
    {
      id: '3',
      name: 'AFPA',
      category: 'formation',
      description: 'Centre de formation professionnelle pour adultes',
      services: ['Formation professionnelle', 'Certification', 'Reconversion'],
      address: '3 rue Franklin, 93100 Montreuil',
      phone: '3936',
      email: 'contact@afpa.fr',
      website: 'https://www.afpa.fr',
      logoUrl: '/placeholder.svg'
    },
    {
      id: '4',
      name: 'Mission Locale',
      category: 'insertion',
      description: 'Accompagnement des jeunes dans leur insertion professionnelle',
      services: ["Conseil en orientation", "Aide à la recherche d'emploi", 'Accompagnement social'],
      address: '34 rue Nationale, 75013 Paris',
      phone: '01 44 97 28 85',
      website: 'https://www.mission-locale.fr',
      logoUrl: '/placeholder.svg'
    }
  ]);
  
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      partnerId: '1',
      partnerName: 'France Travail',
      date: '2025-04-15',
      time: '14:30',
      type: 'présentiel',
      notes: 'Apporter CV et pièce d\'identité'
    }
  ]);
  
  const [newAppointment, setNewAppointment] = useState<AppointmentFormData>({
    partnerId: '',
    date: '',
    time: '',
    type: 'présentiel',
    notes: ''
  });
  
  const handleFormChange = (field: string, value: string) => {
    setNewAppointment({...newAppointment, [field]: value});
  };
  
  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newAppointment.partnerId || !newAppointment.date || !newAppointment.time) {
      toast({
        title: "Formulaire incomplet",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }
    
    const partner = partners.find(p => p.id === newAppointment.partnerId);
    
    if (!partner) {
      toast({
        title: "Erreur",
        description: "Partenaire introuvable.",
        variant: "destructive"
      });
      return;
    }
    
    const appointment: Appointment = {
      id: Date.now().toString(),
      partnerName: partner.name,
      ...newAppointment
    };
    
    setAppointments([...appointments, appointment]);
    
    setNewAppointment({
      partnerId: '',
      date: '',
      time: '',
      type: 'présentiel',
      notes: ''
    });
    
    toast({
      title: "Rendez-vous enregistré",
      description: `Votre rendez-vous avec ${partner.name} a été confirmé.`,
    });
  };
  
  const handleCancelAppointment = (id: string) => {
    setAppointments(appointments.filter(app => app.id !== id));
    
    toast({
      title: "Rendez-vous annulé",
      description: "Votre rendez-vous a été annulé avec succès.",
    });
  };
  
  const handleScheduleAppointment = (partnerId: string) => {
    setNewAppointment({...newAppointment, partnerId});
    document.getElementById('appointment-form')?.scrollIntoView({behavior: 'smooth'});
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Partenaires & Accompagnement</h1>
        
        <Tabs defaultValue="partners">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="partners">Trouver un partenaire</TabsTrigger>
            <TabsTrigger value="appointments">Mes rendez-vous</TabsTrigger>
          </TabsList>
          
          <TabsContent value="partners">
            <PartnersSearch 
              searchQuery={searchQuery}
              categoryFilter={categoryFilter}
              onSearchChange={setSearchQuery}
              onCategoryChange={setCategoryFilter}
            />
            
            <PartnersList 
              partners={partners}
              searchQuery={searchQuery}
              categoryFilter={categoryFilter}
              onScheduleAppointment={handleScheduleAppointment}
            />
            
            <AppointmentForm 
              partners={partners}
              formData={newAppointment}
              onFormChange={handleFormChange}
              onSubmit={handleAppointmentSubmit}
            />
          </TabsContent>
          
          <TabsContent value="appointments">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Mes rendez-vous prévus</h2>
              
              <AppointmentsList 
                appointments={appointments}
                onCancelAppointment={handleCancelAppointment}
                onNavigateToPartners={() => document.getElementById('partners-tab')?.click()}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default PartenairesPage;
