
import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Briefcase, Calendar, Building, Edit2, Eye, Plus, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Types pour nos candidatures
type ApplicationStatus = 'CV envoyé' | 'CV retenu' | 'Entretien prévu' | 'Entretien passé' | 'Offre reçue' | 'Offre acceptée' | 'Refus';

interface Application {
  id: string;
  company: string;
  position: string;
  date: string;
  status: ApplicationStatus;
  notes: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
}

const statusColors: Record<ApplicationStatus, string> = {
  'CV envoyé': 'bg-blue-100 text-blue-800',
  'CV retenu': 'bg-indigo-100 text-indigo-800',
  'Entretien prévu': 'bg-purple-100 text-purple-800',
  'Entretien passé': 'bg-orange-100 text-orange-800',
  'Offre reçue': 'bg-yellow-100 text-yellow-800',
  'Offre acceptée': 'bg-green-100 text-green-800',
  'Refus': 'bg-red-100 text-red-800'
};

const CandidaturesPage = () => {
  const { toast } = useToast();
  
  // État pour stocker nos candidatures
  const [applications, setApplications] = useState<Application[]>([
    {
      id: '1',
      company: 'Entreprise ABC',
      position: 'Développeur Web Junior',
      date: '2025-04-05',
      status: 'CV envoyé',
      notes: 'Offre trouvée sur LinkedIn'
    },
    {
      id: '2',
      company: 'Société XYZ',
      position: 'Assistant administratif',
      date: '2025-04-01',
      status: 'Entretien prévu',
      notes: 'Entretien le 15/04/2025 à 14h',
      contactName: 'Marie Dupont',
      contactEmail: 'marie@xyz.fr'
    }
  ]);
  
  // État pour le formulaire d'ajout/modification
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');
  const [currentApplication, setCurrentApplication] = useState<Application>({
    id: '',
    company: '',
    position: '',
    date: new Date().toISOString().split('T')[0],
    status: 'CV envoyé',
    notes: ''
  });
  
  // Fonction pour ajouter une nouvelle candidature
  const handleAddApplication = () => {
    setDialogMode('add');
    setCurrentApplication({
      id: Date.now().toString(),
      company: '',
      position: '',
      date: new Date().toISOString().split('T')[0],
      status: 'CV envoyé',
      notes: ''
    });
    setIsDialogOpen(true);
  };
  
  // Fonction pour modifier une candidature existante
  const handleEditApplication = (application: Application) => {
    setDialogMode('edit');
    setCurrentApplication({...application});
    setIsDialogOpen(true);
  };
  
  // Fonction pour mettre à jour le statut d'une candidature
  const handleStatusChange = (id: string, status: ApplicationStatus) => {
    setApplications(applications.map(app => 
      app.id === id ? {...app, status} : app
    ));
    
    toast({
      title: "Statut mis à jour",
      description: "Le statut de votre candidature a été modifié.",
    });
  };
  
  // Fonction pour supprimer une candidature
  const handleDeleteApplication = (id: string) => {
    setApplications(applications.filter(app => app.id !== id));
    
    toast({
      title: "Candidature supprimée",
      description: "La candidature a été supprimée de votre liste.",
    });
  };
  
  // Fonction pour sauvegarder une candidature (ajout ou modification)
  const handleSaveApplication = () => {
    if (dialogMode === 'add') {
      setApplications([...applications, currentApplication]);
      toast({
        title: "Candidature ajoutée",
        description: "Votre nouvelle candidature a été ajoutée à la liste.",
      });
    } else {
      setApplications(applications.map(app => 
        app.id === currentApplication.id ? currentApplication : app
      ));
      toast({
        title: "Candidature modifiée",
        description: "Les informations de votre candidature ont été mises à jour.",
      });
    }
    
    setIsDialogOpen(false);
  };
  
  // Gestionnaire de changement pour les champs du formulaire
  const handleInputChange = (field: keyof Application, value: string) => {
    setCurrentApplication({
      ...currentApplication,
      [field]: value
    });
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Mes candidatures</h1>
          <Button onClick={handleAddApplication} className="flex items-center gap-2">
            <Plus size={18} />
            <span>Ajouter une candidature</span>
          </Button>
        </div>
        
        {applications.length === 0 ? (
          <Card className="w-full p-10 text-center">
            <CardContent>
              <p className="text-muted-foreground text-lg mb-4">
                Vous n'avez pas encore de candidatures enregistrées.
              </p>
              <Button onClick={handleAddApplication} className="mx-auto flex items-center gap-2">
                <Plus size={18} />
                <span>Ajouter ma première candidature</span>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {applications.map((application) => (
              <Card key={application.id} className="w-full overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="p-4 md:p-6 flex-grow">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-bold flex items-center gap-2">
                          <Briefcase className="h-5 w-5 text-muted-foreground" />
                          {application.position}
                        </h3>
                        <div className="flex items-center text-muted-foreground mt-1">
                          <Building className="h-4 w-4 mr-1" />
                          <span>{application.company}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={statusColors[application.status]}>
                          {application.status}
                        </Badge>
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{new Date(application.date).toLocaleDateString('fr-FR')}</span>
                        </div>
                      </div>
                    </div>
                    
                    {application.notes && (
                      <p className="text-sm text-muted-foreground mt-2">{application.notes}</p>
                    )}
                    
                    {(application.contactName || application.contactEmail || application.contactPhone) && (
                      <div className="mt-3 text-sm">
                        <p className="font-semibold">Contact:</p>
                        {application.contactName && <p>{application.contactName}</p>}
                        {application.contactEmail && <p>{application.contactEmail}</p>}
                        {application.contactPhone && <p>{application.contactPhone}</p>}
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 md:p-6 md:border-l flex flex-row md:flex-col gap-2 justify-end">
                    <Select 
                      defaultValue={application.status}
                      onValueChange={(value) => handleStatusChange(application.id, value as ApplicationStatus)}
                    >
                      <SelectTrigger className="w-full md:w-44">
                        <SelectValue placeholder="Statut" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CV envoyé">CV envoyé</SelectItem>
                        <SelectItem value="CV retenu">CV retenu</SelectItem>
                        <SelectItem value="Entretien prévu">Entretien prévu</SelectItem>
                        <SelectItem value="Entretien passé">Entretien passé</SelectItem>
                        <SelectItem value="Offre reçue">Offre reçue</SelectItem>
                        <SelectItem value="Offre acceptée">Offre acceptée</SelectItem>
                        <SelectItem value="Refus">Refus</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleEditApplication(application)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="icon"
                        onClick={() => handleDeleteApplication(application.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {dialogMode === 'add' ? 'Ajouter une candidature' : 'Modifier la candidature'}
              </DialogTitle>
              <DialogDescription>
                Renseignez les informations de votre candidature
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="company">Entreprise</Label>
                <Input 
                  id="company" 
                  value={currentApplication.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  placeholder="Nom de l'entreprise"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="position">Poste</Label>
                <Input 
                  id="position" 
                  value={currentApplication.position}
                  onChange={(e) => handleInputChange('position', e.target.value)}
                  placeholder="Intitulé du poste"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date">Date de candidature</Label>
                <Input 
                  id="date" 
                  type="date"
                  value={currentApplication.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Statut</Label>
                <Select 
                  value={currentApplication.status}
                  onValueChange={(value) => handleInputChange('status', value as ApplicationStatus)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CV envoyé">CV envoyé</SelectItem>
                    <SelectItem value="CV retenu">CV retenu</SelectItem>
                    <SelectItem value="Entretien prévu">Entretien prévu</SelectItem>
                    <SelectItem value="Entretien passé">Entretien passé</SelectItem>
                    <SelectItem value="Offre reçue">Offre reçue</SelectItem>
                    <SelectItem value="Offre acceptée">Offre acceptée</SelectItem>
                    <SelectItem value="Refus">Refus</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Input 
                  id="notes" 
                  value={currentApplication.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Informations complémentaires"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactName">Nom du contact (optionnel)</Label>
                <Input 
                  id="contactName" 
                  value={currentApplication.contactName || ''}
                  onChange={(e) => handleInputChange('contactName', e.target.value)}
                  placeholder="Nom de la personne à contacter"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Email du contact (optionnel)</Label>
                <Input 
                  id="contactEmail" 
                  type="email"
                  value={currentApplication.contactEmail || ''}
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  placeholder="Email de contact"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Téléphone du contact (optionnel)</Label>
                <Input 
                  id="contactPhone" 
                  value={currentApplication.contactPhone || ''}
                  onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                  placeholder="Numéro de téléphone"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleSaveApplication}>
                {dialogMode === 'add' ? 'Ajouter' : 'Enregistrer'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PageLayout>
  );
};

export default CandidaturesPage;
