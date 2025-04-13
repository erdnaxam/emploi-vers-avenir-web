
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Separator } from '@/components/ui/separator';
import { FileDown, FileText, Mic, Save, SendHorizontal, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import LetterForm from './LetterForm';
import LetterPreview from './LetterPreview';
import LetterAssistant from './LetterAssistant';

interface MotivationLetterGeneratorProps {}

const MotivationLetterGenerator: React.FC<MotivationLetterGeneratorProps> = () => {
  const [currentTab, setCurrentTab] = useState('form');
  const [showAssistant, setShowAssistant] = useState(false);
  const { toast } = useToast();
  
  const [letterData, setLetterData] = useState({
    recipient: {
      company: '',
      contactName: '',
      contactTitle: '',
      address: '',
      city: '',
      postalCode: '',
    },
    sender: {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      postalCode: '',
      email: '',
      phone: '',
    },
    content: {
      position: '',
      jobReference: '',
      introduction: '',
      motivation: '',
      skills: '',
      conclusion: '',
    },
    jobDetails: {
      description: '',
      requirements: '',
      url: '',
    }
  });

  const updateLetterData = (data: Partial<typeof letterData>) => {
    setLetterData(prev => ({
      ...prev,
      ...data
    }));
  };

  const handleSaveLetter = () => {
    localStorage.setItem('letterData', JSON.stringify(letterData));
    toast({
      title: "Lettre enregistrée",
      description: "Votre lettre de motivation a été sauvegardée avec succès",
    });
  };

  const handleExportPDF = () => {
    // Logic for PDF export
    toast({
      title: "Export PDF",
      description: "Votre lettre a été exportée en PDF",
    });
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Créez votre lettre de motivation</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2">
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full mb-6">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="form">Rédaction</TabsTrigger>
              <TabsTrigger value="job">Offre d'emploi</TabsTrigger>
            </TabsList>
            
            <TabsContent value="form">
              <LetterForm 
                initialData={letterData} 
                onUpdate={updateLetterData}
              />
            </TabsContent>
            
            <TabsContent value="job">
              <Card className="border rounded-md shadow-sm">
                <CardHeader>
                  <CardTitle>Détails de l'offre d'emploi</CardTitle>
                  <CardDescription>
                    Collez ici les informations de l'offre pour personnaliser votre lettre
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...useForm()}>
                    <form className="space-y-4">
                      <FormField
                        name="position"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Poste recherché</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Ex: Assistant administratif" 
                                value={letterData.content.position}
                                onChange={(e) => updateLetterData({
                                  content: {
                                    ...letterData.content,
                                    position: e.target.value
                                  }
                                })}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        name="reference"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Référence de l'offre (optionnel)</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Ex: REF-12345" 
                                value={letterData.content.jobReference}
                                onChange={(e) => updateLetterData({
                                  content: {
                                    ...letterData.content,
                                    jobReference: e.target.value
                                  }
                                })}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        name="url"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>URL de l'offre (optionnel)</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="https://..." 
                                value={letterData.jobDetails.url}
                                onChange={(e) => updateLetterData({
                                  jobDetails: {
                                    ...letterData.jobDetails,
                                    url: e.target.value
                                  }
                                })}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description du poste</FormLabel>
                            <FormDescription>
                              Copiez-collez la description de l'offre d'emploi
                            </FormDescription>
                            <FormControl>
                              <Textarea 
                                placeholder="Description du poste..." 
                                className="min-h-[100px]" 
                                value={letterData.jobDetails.description}
                                onChange={(e) => updateLetterData({
                                  jobDetails: {
                                    ...letterData.jobDetails,
                                    description: e.target.value
                                  }
                                })}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        name="requirements"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Compétences requises</FormLabel>
                            <FormDescription>
                              Listez les compétences demandées dans l'offre
                            </FormDescription>
                            <FormControl>
                              <Textarea 
                                placeholder="Compétences requises..." 
                                className="min-h-[100px]" 
                                value={letterData.jobDetails.requirements}
                                onChange={(e) => updateLetterData({
                                  jobDetails: {
                                    ...letterData.jobDetails,
                                    requirements: e.target.value
                                  }
                                })}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex justify-end gap-2">
                        <Button 
                          type="button"
                          className="flex items-center gap-2"
                          onClick={() => setShowAssistant(true)}
                        >
                          <Sparkles className="h-4 w-4" />
                          Générer ma lettre avec l'IA
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex gap-4 justify-between mt-6">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => setShowAssistant(true)}
            >
              <Mic className="h-4 w-4" />
              Utiliser l'assistant
            </Button>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={handleSaveLetter}
              >
                <Save className="h-4 w-4" />
                Enregistrer
              </Button>
              
              <Button
                variant="default"
                className="flex items-center gap-2"
                onClick={handleExportPDF}
              >
                <FileDown className="h-4 w-4" />
                Exporter en PDF
              </Button>
            </div>
          </div>
        </div>
        
        <div className="w-full lg:w-1/2">
          <Card className="border rounded-md shadow-sm h-full overflow-auto">
            <CardHeader>
              <CardTitle>Aperçu de votre lettre</CardTitle>
              <CardDescription>Voici comment votre lettre apparaîtra à l'impression</CardDescription>
            </CardHeader>
            <CardContent>
              <LetterPreview data={letterData} />
            </CardContent>
          </Card>
        </div>
      </div>

      {showAssistant && (
        <LetterAssistant 
          open={showAssistant} 
          onOpenChange={setShowAssistant} 
          onDataUpdate={(data) => setLetterData(current => ({ ...current, ...data }))}
          jobDetails={letterData.jobDetails}
        />
      )}
    </div>
  );
};

export default MotivationLetterGenerator;
