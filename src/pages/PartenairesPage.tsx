
import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, Clock, MapPin, Phone, Mail, Globe, Calendar as CalendarIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

// Types pour nos partenaires
interface Partner {
  id: string;
  name: string;
  category: 'insertion' | 'emploi' | 'formation' | 'accompagnement' | 'aide';
  description: string;
  services: string[];
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  schedule?: string;
  logoUrl?: string;
}

// Types pour les rendez-vous
interface Appointment {
  id: string;
  partnerId: string;
  partnerName: string;
  date: string;
  time: string;
  type: 'présentiel' | 'téléphonique' | 'visioconférence';
  notes?: string;
}

const categoryLabels = {
  'insertion': 'Insertion professionnelle',
  'emploi': 'Recherche d'emploi',
  'formation': 'Formation',
  'accompagnement': 'Accompagnement social',
  'aide': 'Aide aux démarches'
};

const PartenairesPage = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  // Données simulées pour les partenaires
  const [partners] = useState<Partner[]>([
    {
      id: '1',
      name: 'France Travail',
      category: 'emploi',
      description: 'L'organisme public pour l'emploi en France',
      services: ['Accompagnement personnalisé', 'Offres d'emploi', 'Ateliers de recherche'],
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
      description: 'Association d'aide humanitaire',
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
      services: ['Conseil en orientation', 'Aide à la recherche d'emploi', 'Accompagnement social'],
      address: '34 rue Nationale, 75013 Paris',
      phone: '01 44 97 28 85',
      website: 'https://www.mission-locale.fr',
      logoUrl: '/placeholder.svg'
    }
  ]);
  
  // Données simulées pour les rendez-vous
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      partnerId: '1',
      partnerName: 'France Travail',
      date: '2025-04-15',
      time: '14:30',
      type: 'présentiel',
      notes: 'Apporter CV et pièce d'identité'
    }
  ]);
  
  // État pour le formulaire de prise de rendez-vous
  const [newAppointment, setNewAppointment] = useState<Omit<Appointment, 'id' | 'partnerName'>>({
    partnerId: '',
    date: '',
    time: '',
    type: 'présentiel',
    notes: ''
  });
  
  // Filtrer les partenaires selon la recherche et la catégorie
  const filteredPartners = partners.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          partner.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || partner.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });
  
  // Gérer la prise de rendez-vous
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
  
  // Annuler un rendez-vous
  const handleCancelAppointment = (id: string) => {
    setAppointments(appointments.filter(app => app.id !== id));
    
    toast({
      title: "Rendez-vous annulé",
      description: "Votre rendez-vous a été annulé avec succès.",
    });
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
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-grow">
                <Input
                  placeholder="Rechercher un partenaire..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-full md:w-64">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrer par catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les catégories</SelectItem>
                    <SelectItem value="emploi">Recherche d'emploi</SelectItem>
                    <SelectItem value="formation">Formation</SelectItem>
                    <SelectItem value="insertion">Insertion professionnelle</SelectItem>
                    <SelectItem value="accompagnement">Accompagnement social</SelectItem>
                    <SelectItem value="aide">Aide aux démarches</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {filteredPartners.length === 0 ? (
              <div className="text-center p-10">
                <p className="text-muted-foreground">Aucun partenaire ne correspond à votre recherche.</p>
              </div>
            ) : (
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
                        onClick={() => {
                          setNewAppointment({...newAppointment, partnerId: partner.id});
                          document.getElementById('appointment-form')?.scrollIntoView({behavior: 'smooth'});
                        }}
                      >
                        Prendre rendez-vous
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
            
            <Card className="mt-10" id="appointment-form">
              <CardHeader>
                <CardTitle>Prendre rendez-vous</CardTitle>
                <CardDescription>
                  Remplissez ce formulaire pour demander un rendez-vous avec un partenaire
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAppointmentSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="partner">Partenaire</Label>
                    <Select 
                      value={newAppointment.partnerId} 
                      onValueChange={(value) => setNewAppointment({...newAppointment, partnerId: value})}
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
                        value={newAppointment.date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="time">Heure</Label>
                      <Input 
                        id="time" 
                        type="time" 
                        value={newAppointment.time}
                        onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="type">Type de rendez-vous</Label>
                    <Select 
                      value={newAppointment.type} 
                      onValueChange={(value: 'présentiel' | 'téléphonique' | 'visioconférence') => setNewAppointment({...newAppointment, type: value})}
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
                      value={newAppointment.notes}
                      onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Confirmer le rendez-vous
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appointments">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Mes rendez-vous prévus</h2>
              
              {appointments.length === 0 ? (
                <Card className="w-full p-10 text-center">
                  <CardContent>
                    <p className="text-muted-foreground text-lg mb-4">
                      Vous n'avez pas encore de rendez-vous prévus.
                    </p>
                    <Button onClick={() => document.getElementById('partners-tab')?.click()}>
                      Prendre un rendez-vous
                    </Button>
                  </CardContent>
                </Card>
              ) : (
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
                            onClick={() => handleCancelAppointment(appointment.id)}
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
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default PartenairesPage;
