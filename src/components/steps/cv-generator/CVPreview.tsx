
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { BriefcaseIcon, GraduationCap, MapPin, Mail, Phone, Calendar, Heart, Home } from 'lucide-react';

interface CVPreviewProps {
  data: {
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
      level: string;
    }>;
  };
}

const CVPreview: React.FC<CVPreviewProps> = ({ data }) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'professional':
        return <BriefcaseIcon className="h-4 w-4" />;
      case 'volunteer':
        return <Heart className="h-4 w-4" />;
      case 'personal':
        return <Home className="h-4 w-4" />;
      default:
        return <BriefcaseIcon className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-md">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-center mb-2">
          {data.personalInfo.firstName} {data.personalInfo.lastName}
        </h1>
        
        <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-600 mb-4">
          {data.personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          
          {data.personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          
          {(data.personalInfo.address || data.personalInfo.city || data.personalInfo.postalCode) && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>
                {[
                  data.personalInfo.address,
                  data.personalInfo.postalCode,
                  data.personalInfo.city
                ].filter(Boolean).join(', ')}
              </span>
            </div>
          )}
        </div>
        
        {data.personalInfo.objective && (
          <p className="text-center text-gray-700 italic">
            {data.personalInfo.objective}
          </p>
        )}
      </div>

      <Separator className="my-4" />

      {/* Expériences */}
      {data.experiences.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3 text-gray-800">Expériences</h2>
          
          <div className="space-y-4">
            {data.experiences.map((exp) => (
              <div key={exp.id} className="pl-2 border-l-2 border-primary">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(exp.type)}
                      <h3 className="font-bold">{exp.title}</h3>
                    </div>
                    <p className="text-gray-700">{exp.company}</p>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-gray-600 text-sm">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {formatDate(exp.startDate)} - {exp.current ? 'Aujourd\'hui' : formatDate(exp.endDate)}
                      </span>
                    </div>
                    {exp.location && (
                      <div className="flex items-center gap-1 text-gray-600 text-sm justify-end">
                        <MapPin className="h-3 w-3" />
                        <span>{exp.location}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {exp.description && (
                  <p className="text-sm text-gray-600 mt-1">{exp.description}</p>
                )}
                
                {exp.skills && exp.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {exp.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Formation */}
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3 text-gray-800">Formation</h2>
          
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="pl-2 border-l-2 border-primary">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      <h3 className="font-bold">{edu.degree}</h3>
                    </div>
                    <p className="text-gray-700">{edu.school}</p>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-gray-600 text-sm">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {formatDate(edu.startDate)} - {edu.current ? 'Aujourd\'hui' : formatDate(edu.endDate)}
                      </span>
                    </div>
                    {edu.location && (
                      <div className="flex items-center gap-1 text-gray-600 text-sm justify-end">
                        <MapPin className="h-3 w-3" />
                        <span>{edu.location}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {edu.description && (
                  <p className="text-sm text-gray-600 mt-1">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Compétences et Langues */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Compétences */}
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-3 text-gray-800">Compétences</h2>
            <div className="space-y-2">
              {data.skills.map((skill) => (
                <div key={skill.id} className="flex justify-between items-center">
                  <span>{skill.name}</span>
                  <div className="h-2 bg-gray-200 rounded-full w-24">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{
                        width: skill.level === 'débutant' ? '25%' :
                               skill.level === 'intermédiaire' ? '50%' :
                               skill.level === 'avancé' ? '75%' : '100%'
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Langues */}
        {data.languages.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-3 text-gray-800">Langues</h2>
            <div className="space-y-2">
              {data.languages.map((language) => (
                <div key={language.id} className="flex justify-between items-center">
                  <span>{language.name}</span>
                  <Badge variant="outline">
                    {language.level === 'langue maternelle' ? 'Natif' : language.level}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CVPreview;
