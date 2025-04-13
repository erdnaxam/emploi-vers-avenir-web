
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';

interface LetterFormProps {
  initialData: {
    recipient: {
      company: string;
      contactName: string;
      contactTitle: string;
      address: string;
      city: string;
      postalCode: string;
    };
    sender: {
      firstName: string;
      lastName: string;
      address: string;
      city: string;
      postalCode: string;
      email: string;
      phone: string;
    };
    content: {
      position: string;
      jobReference: string;
      introduction: string;
      motivation: string;
      skills: string;
      conclusion: string;
    };
  };
  onUpdate: (data: Partial<typeof LetterFormProps['initialData']>) => void;
}

const LetterForm: React.FC<LetterFormProps> = ({ initialData, onUpdate }) => {
  const [currentSection, setCurrentSection] = React.useState('sender');

  const form = useForm();

  return (
    <Tabs value={currentSection} onValueChange={setCurrentSection} className="w-full">
      <TabsList className="grid grid-cols-3 mb-4">
        <TabsTrigger value="sender">Expéditeur</TabsTrigger>
        <TabsTrigger value="recipient">Destinataire</TabsTrigger>
        <TabsTrigger value="content">Contenu</TabsTrigger>
      </TabsList>
      
      <TabsContent value="sender">
        <Card className="border rounded-md shadow-sm">
          <CardHeader>
            <CardTitle>Vos informations</CardTitle>
            <CardDescription>Renseignez vos coordonnées pour l'en-tête de la lettre</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    name="firstName"
                    render={() => (
                      <FormItem>
                        <FormLabel>Prénom</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Prénom" 
                            value={initialData.sender.firstName}
                            onChange={(e) => onUpdate({
                              sender: {
                                ...initialData.sender,
                                firstName: e.target.value
                              }
                            })}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    name="lastName"
                    render={() => (
                      <FormItem>
                        <FormLabel>Nom</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Nom" 
                            value={initialData.sender.lastName}
                            onChange={(e) => onUpdate({
                              sender: {
                                ...initialData.sender,
                                lastName: e.target.value
                              }
                            })}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  name="address"
                  render={() => (
                    <FormItem>
                      <FormLabel>Adresse</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="123 rue de Paris" 
                          value={initialData.sender.address}
                          onChange={(e) => onUpdate({
                            sender: {
                              ...initialData.sender,
                              address: e.target.value
                            }
                          })}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    name="city"
                    render={() => (
                      <FormItem>
                        <FormLabel>Ville</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Ville" 
                            value={initialData.sender.city}
                            onChange={(e) => onUpdate({
                              sender: {
                                ...initialData.sender,
                                city: e.target.value
                              }
                            })}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    name="postalCode"
                    render={() => (
                      <FormItem>
                        <FormLabel>Code postal</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="75000" 
                            value={initialData.sender.postalCode}
                            onChange={(e) => onUpdate({
                              sender: {
                                ...initialData.sender,
                                postalCode: e.target.value
                              }
                            })}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    name="email"
                    render={() => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="email@exemple.com" 
                            value={initialData.sender.email}
                            onChange={(e) => onUpdate({
                              sender: {
                                ...initialData.sender,
                                email: e.target.value
                              }
                            })}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    name="phone"
                    render={() => (
                      <FormItem>
                        <FormLabel>Téléphone</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="06 12 34 56 78" 
                            value={initialData.sender.phone}
                            onChange={(e) => onUpdate({
                              sender: {
                                ...initialData.sender,
                                phone: e.target.value
                              }
                            })}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="recipient">
        <Card className="border rounded-md shadow-sm">
          <CardHeader>
            <CardTitle>Informations du destinataire</CardTitle>
            <CardDescription>Renseignez les coordonnées de l'entreprise ou du recruteur</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form className="space-y-4">
                <FormField
                  name="company"
                  render={() => (
                    <FormItem>
                      <FormLabel>Entreprise</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Nom de l'entreprise" 
                          value={initialData.recipient.company}
                          onChange={(e) => onUpdate({
                            recipient: {
                              ...initialData.recipient,
                              company: e.target.value
                            }
                          })}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    name="contactName"
                    render={() => (
                      <FormItem>
                        <FormLabel>Nom du contact (facultatif)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="M. Dupont" 
                            value={initialData.recipient.contactName}
                            onChange={(e) => onUpdate({
                              recipient: {
                                ...initialData.recipient,
                                contactName: e.target.value
                              }
                            })}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    name="contactTitle"
                    render={() => (
                      <FormItem>
                        <FormLabel>Fonction du contact (facultatif)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Responsable RH" 
                            value={initialData.recipient.contactTitle}
                            onChange={(e) => onUpdate({
                              recipient: {
                                ...initialData.recipient,
                                contactTitle: e.target.value
                              }
                            })}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  name="address"
                  render={() => (
                    <FormItem>
                      <FormLabel>Adresse</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="123 rue de Paris" 
                          value={initialData.recipient.address}
                          onChange={(e) => onUpdate({
                            recipient: {
                              ...initialData.recipient,
                              address: e.target.value
                            }
                          })}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    name="city"
                    render={() => (
                      <FormItem>
                        <FormLabel>Ville</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Ville" 
                            value={initialData.recipient.city}
                            onChange={(e) => onUpdate({
                              recipient: {
                                ...initialData.recipient,
                                city: e.target.value
                              }
                            })}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    name="postalCode"
                    render={() => (
                      <FormItem>
                        <FormLabel>Code postal</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="75000" 
                            value={initialData.recipient.postalCode}
                            onChange={(e) => onUpdate({
                              recipient: {
                                ...initialData.recipient,
                                postalCode: e.target.value
                              }
                            })}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="content">
        <Card className="border rounded-md shadow-sm">
          <CardHeader>
            <CardTitle>Contenu de la lettre</CardTitle>
            <CardDescription>Rédigez les différentes parties de votre lettre de motivation</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    name="position"
                    render={() => (
                      <FormItem>
                        <FormLabel>Poste visé</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Ex: Assistant administratif" 
                            value={initialData.content.position}
                            onChange={(e) => onUpdate({
                              content: {
                                ...initialData.content,
                                position: e.target.value
                              }
                            })}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    name="jobReference"
                    render={() => (
                      <FormItem>
                        <FormLabel>Référence de l'offre (facultatif)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Ex: REF-12345" 
                            value={initialData.content.jobReference}
                            onChange={(e) => onUpdate({
                              content: {
                                ...initialData.content,
                                jobReference: e.target.value
                              }
                            })}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  name="introduction"
                  render={() => (
                    <FormItem>
                      <FormLabel>Introduction</FormLabel>
                      <FormDescription>
                        Expliquez pourquoi vous postulez et comment vous avez connu l'offre
                      </FormDescription>
                      <FormControl>
                        <Textarea 
                          placeholder="Je vous écris pour postuler à l'offre..." 
                          className="min-h-[100px]" 
                          value={initialData.content.introduction}
                          onChange={(e) => onUpdate({
                            content: {
                              ...initialData.content,
                              introduction: e.target.value
                            }
                          })}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  name="motivation"
                  render={() => (
                    <FormItem>
                      <FormLabel>Motivation</FormLabel>
                      <FormDescription>
                        Expliquez pourquoi ce poste et cette entreprise vous intéressent
                      </FormDescription>
                      <FormControl>
                        <Textarea 
                          placeholder="Je suis particulièrement intéressé(e) par..." 
                          className="min-h-[100px]" 
                          value={initialData.content.motivation}
                          onChange={(e) => onUpdate({
                            content: {
                              ...initialData.content,
                              motivation: e.target.value
                            }
                          })}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  name="skills"
                  render={() => (
                    <FormItem>
                      <FormLabel>Compétences et expériences</FormLabel>
                      <FormDescription>
                        Mettez en avant vos compétences et expériences pertinentes pour le poste
                      </FormDescription>
                      <FormControl>
                        <Textarea 
                          placeholder="Au cours de mon expérience chez..." 
                          className="min-h-[100px]" 
                          value={initialData.content.skills}
                          onChange={(e) => onUpdate({
                            content: {
                              ...initialData.content,
                              skills: e.target.value
                            }
                          })}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  name="conclusion"
                  render={() => (
                    <FormItem>
                      <FormLabel>Conclusion</FormLabel>
                      <FormDescription>
                        Terminez en proposant un entretien et des formules de politesse
                      </FormDescription>
                      <FormControl>
                        <Textarea 
                          placeholder="Je reste à votre disposition pour un entretien..." 
                          className="min-h-[100px]" 
                          value={initialData.content.conclusion}
                          onChange={(e) => onUpdate({
                            content: {
                              ...initialData.content,
                              conclusion: e.target.value
                            }
                          })}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default LetterForm;
