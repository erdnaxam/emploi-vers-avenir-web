
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { PlusCircle, Briefcase, Heart, Home, FileQuestion, Trash2 } from 'lucide-react';

const experienceSchema = z.object({
  title: z.string().min(1, { message: 'Le titre du poste est requis' }),
  company: z.string().min(1, { message: 'Le nom de l\'entreprise est requis' }),
  location: z.string().optional(),
  startDate: z.string().min(1, { message: 'La date de début est requise' }),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  description: z.string().optional(),
  skills: z.array(z.string()).default([]),
  type: z.enum(['professional', 'volunteer', 'personal', 'other']).default('professional'),
});

export type Experience = z.infer<typeof experienceSchema> & { id: string };

interface ExperienceFormProps {
  experiences: Experience[];
  onUpdate: (experiences: Experience[]) => void;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ experiences, onUpdate }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentSkill, setCurrentSkill] = useState('');
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  
  const form = useForm<z.infer<typeof experienceSchema>>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      skills: [],
      type: 'professional',
    },
  });

  const onSubmit = (data: z.infer<typeof experienceSchema>) => {
    if (editingExperience) {
      // Modification d'une expérience existante
      const updatedExperiences = experiences.map(exp => 
        exp.id === editingExperience.id ? { ...data, id: exp.id } : exp
      );
      onUpdate(updatedExperiences);
    } else {
      // Ajout d'une nouvelle expérience
      const newExperience: Experience = {
        ...data,
        id: uuidv4(),
      };
      onUpdate([...experiences, newExperience]);
    }
    
    resetForm();
    setIsDialogOpen(false);
  };

  const resetForm = () => {
    form.reset({
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      skills: [],
      type: 'professional',
    });
    setEditingExperience(null);
  };

  const handleDeleteExperience = (id: string) => {
    onUpdate(experiences.filter(exp => exp.id !== id));
  };

  const handleEditExperience = (experience: Experience) => {
    setEditingExperience(experience);
    form.reset({
      title: experience.title,
      company: experience.company,
      location: experience.location || '',
      startDate: experience.startDate,
      endDate: experience.endDate || '',
      current: experience.current,
      description: experience.description || '',
      skills: experience.skills,
      type: experience.type,
    });
    setIsDialogOpen(true);
  };

  const addSkill = () => {
    if (currentSkill.trim()) {
      const currentSkills = form.getValues('skills') || [];
      if (!currentSkills.includes(currentSkill.trim())) {
        form.setValue('skills', [...currentSkills, currentSkill.trim()]);
        setCurrentSkill('');
      }
    }
  };

  const removeSkill = (skill: string) => {
    const currentSkills = form.getValues('skills') || [];
    form.setValue('skills', currentSkills.filter(s => s !== skill));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'professional':
        return <Briefcase className="h-4 w-4" />;
      case 'volunteer':
        return <Heart className="h-4 w-4" />;
      case 'personal':
        return <Home className="h-4 w-4" />;
      default:
        return <FileQuestion className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'professional':
        return 'Professionnel';
      case 'volunteer':
        return 'Bénévolat';
      case 'personal':
        return 'Personnel';
      default:
        return 'Autre';
    }
  };

  return (
    <>
      <Card className="border rounded-md shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Expériences professionnelles et autres</CardTitle>
            <CardDescription>Ajoutez toutes vos expériences, même non professionnelles</CardDescription>
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
          {experiences.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>Vous n'avez pas encore ajouté d'expérience</p>
              <Button 
                variant="outline" 
                onClick={() => setIsDialogOpen(true)} 
                className="mt-2"
              >
                Ajouter une expérience
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {experiences.map((experience) => (
                <Card key={experience.id} className="border rounded-md hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{experience.title}</h3>
                        <p className="text-muted-foreground">{experience.company}</p>
                      </div>
                      <Badge variant="outline" className="flex items-center gap-1">
                        {getTypeIcon(experience.type)}
                        {getTypeLabel(experience.type)}
                      </Badge>
                    </div>
                    
                    <div className="mb-3">
                      {experience.location && <p className="text-sm">{experience.location}</p>}
                      <p className="text-sm">
                        {experience.startDate} - {experience.current ? 'Aujourd\'hui' : experience.endDate}
                      </p>
                    </div>
                    
                    {experience.description && (
                      <p className="text-sm mb-3">{experience.description}</p>
                    )}
                    
                    {experience.skills && experience.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {experience.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex justify-end gap-2 mt-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeleteExperience(experience.id)}
                        className="text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleEditExperience(experience)}
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
            <DialogTitle>{editingExperience ? 'Modifier l\'expérience' : 'Ajouter une expérience'}</DialogTitle>
            <DialogDescription>
              Incluez toutes vos expériences, même non professionnelles (bénévolat, projets personnels...)
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type d'expérience</FormLabel>
                    <FormControl>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Type d'expérience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professional">Professionnelle</SelectItem>
                          <SelectItem value="volunteer">Bénévolat</SelectItem>
                          <SelectItem value="personal">Personnelle / Familiale</SelectItem>
                          <SelectItem value="other">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>
                      Valorisez tous types d'expériences, même non rémunérées.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Titre / Poste*</FormLabel>
                      <FormControl>
                        <Input placeholder="Développeur web, Aide à domicile..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organisation / Contexte*</FormLabel>
                      <FormControl>
                        <Input placeholder="Entreprise, Association..." {...field} />
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
                        placeholder="Décrivez vos responsabilités et réalisations..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="skills"
                render={() => (
                  <FormItem>
                    <FormLabel>Compétences acquises</FormLabel>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {form.watch('skills')?.map((skill) => (
                        <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                          {skill}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 ml-1"
                            onClick={() => removeSkill(skill)}
                          >
                            ✕
                          </Button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        value={currentSkill}
                        onChange={(e) => setCurrentSkill(e.target.value)}
                        placeholder="Ajouter une compétence"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addSkill();
                          }
                        }}
                      />
                      <Button type="button" onClick={addSkill}>Ajouter</Button>
                    </div>
                    <FormDescription>
                      Ajoutez les compétences acquises durant cette expérience
                    </FormDescription>
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
                  {editingExperience ? 'Enregistrer les modifications' : 'Ajouter cette expérience'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ExperienceForm;
