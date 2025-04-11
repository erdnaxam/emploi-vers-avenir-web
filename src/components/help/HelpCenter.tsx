
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Users, Calendar, ArrowRight, SendHorizonal } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const HelpCenter = () => {
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim() === '') return;
    
    toast({
      title: "Message envoyé",
      description: "Nous vous répondrons dans les plus brefs délais.",
    });
    
    setMessage('');
  };

  const partners = [
    {
      id: '1',
      name: "Centre d'Accompagnement à l'Emploi",
      description: "Services d'accompagnement personnalisé pour tous les chercheurs d'emploi.",
      address: "15 rue du Travail, 75001 Paris",
      phone: "01 23 45 67 89",
      category: "Accompagnement",
    },
    {
      id: '2',
      name: "Mission Locale",
      description: "Accompagnement des jeunes de 16 à 25 ans dans leur recherche d'emploi et leur insertion sociale.",
      address: "25 avenue du Progrès, 75002 Paris",
      phone: "01 23 45 67 90",
      category: "Jeunes",
    },
    {
      id: '3',
      name: "Association Handicap et Emploi",
      description: "Accompagnement spécialisé pour les personnes en situation de handicap dans leur recherche d'emploi.",
      address: "5 boulevard de l'Inclusion, 75003 Paris",
      phone: "01 23 45 67 91",
      category: "Handicap",
    },
  ];

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Besoin d'aide ?</h1>
      
      <Tabs defaultValue="chat">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="chat">
            <MessageSquare className="h-4 w-4 mr-2" />
            Chat & Contact
          </TabsTrigger>
          <TabsTrigger value="partners">
            <Users className="h-4 w-4 mr-2" />
            Partenaires
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat">
          <Card>
            <CardHeader>
              <CardTitle>Contactez-nous</CardTitle>
              <CardDescription>
                Un conseiller vous répondra dans les 24h ouvrées
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={sendMessage}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Nom complet</label>
                    <Input id="name" placeholder="Votre nom" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input id="email" type="email" placeholder="votre@email.fr" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">Sujet</label>
                    <Input id="subject" placeholder="Sujet de votre message" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                    <Textarea 
                      id="message" 
                      placeholder="Décrivez votre question ou problème..." 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={5}
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button onClick={() => window.location.href = 'tel:0123456789'} variant="outline">
                Appelez-nous
              </Button>
              <Button onClick={sendMessage} className="space-x-2">
                <span>Envoyer</span>
                <SendHorizonal className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <div className="mt-8 bg-muted p-6 rounded-lg">
            <h3 className="font-bold mb-2">Horaires d'assistance</h3>
            <div className="flex items-start space-x-3">
              <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p><strong>Lundi au vendredi:</strong> 9h00 - 18h00</p>
                <p><strong>Téléphone:</strong> 01 23 45 67 89</p>
                <p className="text-sm text-muted-foreground mt-2">Nous nous efforçons de répondre à tous les messages dans un délai de 24 heures ouvrées.</p>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="partners">
          <div className="space-y-6">
            <div className="mb-6 bg-primary/5 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-2">Partenaires locaux</h2>
              <p className="text-muted-foreground mb-4">Retrouvez nos partenaires qui peuvent vous accompagner physiquement dans votre recherche d'emploi.</p>
              <Button variant="outline" className="group">
                <span>Trouver des partenaires près de chez moi</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {partners.map((partner) => (
                <Card key={partner.id}>
                  <CardHeader className="pb-3">
                    <Badge className="self-start mb-2">{partner.category}</Badge>
                    <CardTitle className="text-lg">{partner.name}</CardTitle>
                    <CardDescription>{partner.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <p>{partner.address}</p>
                    <p className="font-medium">{partner.phone}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">Prendre rendez-vous</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button>Voir tous les partenaires</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HelpCenter;
