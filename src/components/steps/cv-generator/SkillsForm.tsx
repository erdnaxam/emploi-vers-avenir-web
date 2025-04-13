
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { v4 as uuidv4 } from 'uuid';
import { PlusCircle, Languages, Sparkles, Trash2 } from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  level: 'débutant' | 'intermédiaire' | 'avancé' | 'expert';
}

interface Language {
  id: string;
  name: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'langue maternelle';
}

interface SkillsFormProps {
  skills: Skill[];
  languages: Language[];
  onUpdateSkills: (skills: Skill[]) => void;
  onUpdateLanguages: (languages: Language[]) => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({
  skills,
  languages,
  onUpdateSkills,
  onUpdateLanguages
}) => {
  const [newSkill, setNewSkill] = useState('');
  const [skillLevel, setSkillLevel] = useState<Skill['level']>('intermédiaire');
  
  const [newLanguage, setNewLanguage] = useState('');
  const [languageLevel, setLanguageLevel] = useState<Language['level']>('B1');

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      const skillExists = skills.some(s => s.name.toLowerCase() === newSkill.trim().toLowerCase());
      
      if (!skillExists) {
        const newSkillItem: Skill = {
          id: uuidv4(),
          name: newSkill.trim(),
          level: skillLevel,
        };
        
        onUpdateSkills([...skills, newSkillItem]);
        setNewSkill('');
      }
    }
  };

  const handleDeleteSkill = (id: string) => {
    onUpdateSkills(skills.filter(s => s.id !== id));
  };

  const handleAddLanguage = () => {
    if (newLanguage.trim()) {
      const languageExists = languages.some(l => l.name.toLowerCase() === newLanguage.trim().toLowerCase());
      
      if (!languageExists) {
        const newLanguageItem: Language = {
          id: uuidv4(),
          name: newLanguage.trim(),
          level: languageLevel,
        };
        
        onUpdateLanguages([...languages, newLanguageItem]);
        setNewLanguage('');
      }
    }
  };

  const handleDeleteLanguage = (id: string) => {
    onUpdateLanguages(languages.filter(l => l.id !== id));
  };

  const getSkillLevelLabel = (level: string) => {
    switch (level) {
      case 'débutant':
        return 'Débutant';
      case 'intermédiaire':
        return 'Intermédiaire';
      case 'avancé':
        return 'Avancé';
      case 'expert':
        return 'Expert';
      default:
        return level;
    }
  };

  const getLanguageLevelLabel = (level: string) => {
    switch (level) {
      case 'A1':
        return 'A1 (débutant)';
      case 'A2':
        return 'A2 (élémentaire)';
      case 'B1':
        return 'B1 (intermédiaire)';
      case 'B2':
        return 'B2 (indépendant)';
      case 'C1':
        return 'C1 (avancé)';
      case 'C2':
        return 'C2 (maîtrise)';
      case 'langue maternelle':
        return 'Langue maternelle';
      default:
        return level;
    }
  };

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case 'débutant':
        return 'bg-blue-100 text-blue-800';
      case 'intermédiaire':
        return 'bg-green-100 text-green-800';
      case 'avancé':
        return 'bg-purple-100 text-purple-800';
      case 'expert':
        return 'bg-orange-100 text-orange-800';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border rounded-md shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Compétences
          </CardTitle>
          <CardDescription>
            Ajoutez vos compétences techniques, organisationnelles, personnelles, etc.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Nouvelle compétence"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddSkill();
                }
              }}
              className="flex-1"
            />
            <Select
              value={skillLevel}
              onValueChange={(value) => setSkillLevel(value as Skill['level'])}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Niveau" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="débutant">Débutant</SelectItem>
                <SelectItem value="intermédiaire">Intermédiaire</SelectItem>
                <SelectItem value="avancé">Avancé</SelectItem>
                <SelectItem value="expert">Expert</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleAddSkill} className="gap-1">
              <PlusCircle className="h-4 w-4" />
              Ajouter
            </Button>
          </div>

          {skills.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              <p>Aucune compétence ajoutée</p>
            </div>
          ) : (
            <div className="space-y-2">
              {skills.map((skill) => (
                <div key={skill.id} className="flex justify-between items-center p-2 rounded-md border">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{skill.name}</span>
                    <Badge className={getSkillLevelColor(skill.level)}>
                      {getSkillLevelLabel(skill.level)}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteSkill(skill.id)}
                    className="text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border rounded-md shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Languages className="h-5 w-5 text-primary" />
            Langues
          </CardTitle>
          <CardDescription>
            Ajoutez les langues que vous maîtrisez et votre niveau
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Nouvelle langue"
              value={newLanguage}
              onChange={(e) => setNewLanguage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddLanguage();
                }
              }}
              className="flex-1"
            />
            <Select
              value={languageLevel}
              onValueChange={(value) => setLanguageLevel(value as Language['level'])}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Niveau" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A1">A1 (débutant)</SelectItem>
                <SelectItem value="A2">A2 (élémentaire)</SelectItem>
                <SelectItem value="B1">B1 (intermédiaire)</SelectItem>
                <SelectItem value="B2">B2 (indépendant)</SelectItem>
                <SelectItem value="C1">C1 (avancé)</SelectItem>
                <SelectItem value="C2">C2 (maîtrise)</SelectItem>
                <SelectItem value="langue maternelle">Langue maternelle</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleAddLanguage} className="gap-1">
              <PlusCircle className="h-4 w-4" />
              Ajouter
            </Button>
          </div>

          {languages.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              <p>Aucune langue ajoutée</p>
            </div>
          ) : (
            <div className="space-y-2">
              {languages.map((language) => (
                <div key={language.id} className="flex justify-between items-center p-2 rounded-md border">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{language.name}</span>
                    <Badge variant="outline">
                      {getLanguageLevelLabel(language.level)}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteLanguage(language.id)}
                    className="text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillsForm;
