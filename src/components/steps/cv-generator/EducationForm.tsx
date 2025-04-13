
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { PlusCircle, GraduationCap, Trash2 } from 'lucide-react';

const educationSchema = z.object({
  degree: z.string().min(1, { message: 'Le diplôme est requis' }),
  school: z.string().min(1, { message: 'L\'établissement est requis' }),
  location: z.string().optional(),
  startDate: z.string().min(1, { message: 'La date de début est requise' }),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  description: z.string().optional(),
});

export type Education = z.infer<typeof educationSchema> & { id: string };

interface EducationFormProps {
  education: Education[];
  onUpdate: (education: Education[]) => void;
}

const EducationForm: React.FC<EducationFormProps> = ({ education, onUpdate }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEducation, setEditingEducation] = useState<Education | null>(null);
  
  const form = useForm<z.infer<typeof educationSchema>>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      degree: '',
      school: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    },
  });

  const onSubmit = (data: z.infer<typeof educationSchema>) => {
    if (editingEducation) {
      // Modification d'une formation existante
      const updatedEducation = education.map(edu => 
        edu.id === editingEducation.id ? { ...data, id: edu.id } : edu
      );
      onUpdate(updatedEducation);
    } else {
      // Ajout d'une nouvelle formation
      const newEducation: Education = {
        ...data,
        id: uuidv4(),
      };
      onUpdate([...education, newEducation]);
    }
    
    resetForm();
    setIsDialogOpen(false);
  };

  const resetForm = () => {
    form.reset({
      degree: '',
      school: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    });
    setEditingEducation(null);
  };

  const handleDeleteEducation = (id: string) => {
    onUpdate(education.filter(edu => edu.id !== id));
  };

  const handleEditEducation = (edu: Education) => {
    setEditingEducation(edu);
    form.reset({
      degree: edu.degree,
      school: edu.school,
      location: edu.location || '',
      startDate: edu.startDate,
      endDate: edu.endDate || '',
      current: edu.current,
      description: edu.description || '',
    });
    setIsDialogOpen(true);
  };

  return (
    <>
      <Card className="border rounded-md shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Formation et diplômes</CardTitle>
            <CardDescription>Ajoutez vos formations, qu'elles soient diplômantes ou non</CardDescription>
          </div>
          <Button onClick={() => {
            resetForm();
            setIsDialogOpen(true);
          }} size="sm" className="gap-1">
            <PlusCircle className="h-4 w-4" />
            Ajouter
          </Button>
        </CardHeader>
        <CardContent>
          {education.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>Vous n'avez pas encore ajouté de formation</p>
              <Button 
                variant="outline" 
                onClick={() => setIsDialogOpen(true)} 
                className="mt-2"
              >
                Ajouter une formation
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {education.map((edu) => (
                <Card key={edu.id} className="border rounded-md hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-primary" />
                        <div>
                          <h3 className="font-semibold text-lg">{edu.degree}</h3>
                          <p className="text-muted-foreground">{edu.school}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      {edu.location && <p className="text-sm">{edu.location}</p>}
                      <p className="text-sm">
                        {edu.startDate} - {edu.current ? 'Aujourd\'hui' : edu.endDate}
                      </p>
                    </div>
                    
                    {edu.description && (
                      <p className="text-sm mb-3">{edu.description}</p>
                    )}
                    
                    <div className="flex justify-end gap-2 mt-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeleteEducation(edu.id)}
                        className="text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleEditEducation(edu)}
                      >
                        Modifier
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingEducation ? 'Modifier la formation' : 'Ajouter une formation'}</DialogTitle>
            <DialogDescription>
              Renseignez les détails de votre formation, même si elle est non diplômante
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="degree"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Diplôme / Formation*</FormLabel>
                      <FormControl>
                        <Input placeholder="BTS, Licence, Formation..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="school"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Établissement*</FormLabel>
                      <FormControl>
                        <Input placeholder="École, Université..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lieu</FormLabel>
                    <FormControl>
                      <Input placeholder="Paris, France" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date de début*</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="current"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="cursor-pointer">En cours actuellement</FormLabel>
                      </FormItem>
                    )}
                  />
                  
                  {!form.watch('current') && (
                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date de fin</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </div>
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Décrivez votre formation, les compétences acquises..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            
              <DialogFooter className="gap-2 sm:gap-0">
                <Button 
                  type="button" 
                  variant="ghost"
                  onClick={() => {
                    setIsDialogOpen(false);
                    resetForm();
                  }}
                >
                  Annuler
                </Button>
                <Button type="submit">
                  {editingEducation ? 'Enregistrer les modifications' : 'Ajouter cette formation'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EducationForm;
