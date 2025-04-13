
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ChevronRight, Save, FileDown, Mic, Info, PlusCircle, Trash2 } from 'lucide-react';
import PersonalInfoForm from './PersonalInfoForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import SkillsForm from './SkillsForm';
import CVPreview from './CVPreview';
import CVAssistant from './CVAssistant';
import { useToast } from '@/hooks/use-toast';

interface CVData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    objective: string;
  };
  experiences: Array<{
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
    skills: string[];
    type: 'professional' | 'volunteer' | 'personal' | 'other';
  }>;
  education: Array<{
    id: string;
    degree: string;
    school: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  skills: Array<{
    id: string;
    name: string;
    level: 'débutant' | 'intermédiaire' | 'avancé' | 'expert';
  }>;
  languages: Array<{
    id: string;
    name: string;
    level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'langue maternelle';
  }>;
}

const CVGenerator: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('info');
  const [showAssistant, setShowAssistant] = useState(false);
  const { toast } = useToast();
  const [cvData, setCvData] = useState<CVData>({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      objective: '',
    },
    experiences: [],
    education: [],
    skills: [],
    languages: [],
  });

  const updatePersonalInfo = (data: typeof cvData.personalInfo) => {
    setCvData(prev => ({
      ...prev,
      personalInfo: data
    }));
  };

  const updateExperiences = (experiences: typeof cvData.experiences) => {
    setCvData(prev => ({
      ...prev,
      experiences
    }));
  };

  const updateEducation = (education: typeof cvData.education) => {
    setCvData(prev => ({
      ...prev,
      education
    }));
  };

  const updateSkills = (skills: typeof cvData.skills) => {
    setCvData(prev => ({
      ...prev,
      skills
    }));
  };

  const updateLanguages = (languages: typeof cvData.languages) => {
    setCvData(prev => ({
      ...prev,
      languages
    }));
  };

  const handleSaveCV = () => {
    localStorage.setItem('cvData', JSON.stringify(cvData));
    toast({
      title: "CV enregistré",
      description: "Votre CV a été sauvegardé avec succès",
    });
  };

  const handleExportPDF = () => {
    // Logic for PDF export
    toast({
      title: "Export PDF",
      description: "Votre CV a été exporté en PDF",
    });
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Créez votre CV professionnel</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2">
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full mb-6">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="info">Informations</TabsTrigger>
              <TabsTrigger value="experience">Expériences</TabsTrigger>
              <TabsTrigger value="education">Formation</TabsTrigger>
              <TabsTrigger value="skills">Compétences</TabsTrigger>
            </TabsList>
            
            <TabsContent value="info">
              <PersonalInfoForm 
                initialData={cvData.personalInfo} 
                onSave={updatePersonalInfo}
              />
            </TabsContent>
            
            <TabsContent value="experience">
              <ExperienceForm 
                experiences={cvData.experiences} 
                onUpdate={updateExperiences}
              />
            </TabsContent>
            
            <TabsContent value="education">
              <EducationForm 
                education={cvData.education} 
                onUpdate={updateEducation}
              />
            </TabsContent>
            
            <TabsContent value="skills">
              <SkillsForm 
                skills={cvData.skills}
                languages={cvData.languages}
                onUpdateSkills={updateSkills}
                onUpdateLanguages={updateLanguages}
              />
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
                onClick={handleSaveCV}
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
          <Card className="border rounded-md shadow-sm">
            <CardHeader>
              <CardTitle>Aperçu de votre CV</CardTitle>
              <CardDescription>Voici comment votre CV apparaîtra à l'impression</CardDescription>
            </CardHeader>
            <CardContent>
              <CVPreview data={cvData} />
            </CardContent>
          </Card>
        </div>
      </div>

      {showAssistant && (
        <CVAssistant 
          open={showAssistant} 
          onOpenChange={setShowAssistant} 
          onDataUpdate={(data) => setCvData(current => ({ ...current, ...data }))}
        />
      )}
    </div>
  );
};

export default CVGenerator;
