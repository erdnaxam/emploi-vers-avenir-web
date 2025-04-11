
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Eye, Calendar } from 'lucide-react';

interface Document {
  id: string;
  title: string;
  type: string;
  date: string;
  status: 'completed' | 'draft' | 'pending';
  url: string;
}

interface DocumentsListProps {
  documents: Document[];
}

const DocumentsList: React.FC<DocumentsListProps> = ({ documents }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return "bg-success-light text-success-dark";
      case 'draft':
        return "bg-warning-light text-warning-dark";
      case 'pending':
        return "bg-info-light text-info-dark";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return "Validé";
      case 'draft':
        return "Brouillon";
      case 'pending':
        return "En attente";
      default:
        return status;
    }
  };

  if (documents.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Mes documents</CardTitle>
          <CardDescription>Tous vos documents générés ou validés</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-12">
          <div className="flex flex-col items-center justify-center space-y-3">
            <FileText className="h-12 w-12 text-muted-foreground/50" />
            <h3 className="font-semibold text-lg">Aucun document disponible</h3>
            <p className="text-muted-foreground max-w-md">
              Lorsque vous progresserez dans votre parcours, vos documents (CV, lettres, attestations...) seront disponibles ici.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Mes documents</CardTitle>
        <CardDescription>Tous vos documents générés ou validés</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((doc) => (
            <Card key={doc.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <Badge className={getStatusColor(doc.status)}>
                    {getStatusText(doc.status)}
                  </Badge>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    {doc.date}
                  </div>
                </div>
                <CardTitle className="text-base mt-2">{doc.title}</CardTitle>
                <CardDescription>{doc.type}</CardDescription>
              </CardHeader>
              <CardFooter className="pt-2 pb-4 flex justify-between">
                <Button variant="outline" size="sm" asChild>
                  <a href={doc.url} target="_blank" rel="noopener noreferrer">
                    <Eye className="h-4 w-4 mr-1" />
                    <span>Voir</span>
                  </a>
                </Button>
                <Button variant="secondary" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  <span>Télécharger</span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentsList;
