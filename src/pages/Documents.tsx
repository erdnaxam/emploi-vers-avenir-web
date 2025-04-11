
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import DocumentsList from '@/components/documents/DocumentsList';
import { Button } from '@/components/ui/button';
import { FilePlus, FileText, Download, HelpCircle } from 'lucide-react';

const Documents = () => {
  // Documents simulés pour la démonstration
  const documents = [
    {
      id: "doc1",
      title: "Mon CV",
      type: "Curriculum Vitae",
      date: "12/04/2025",
      status: "completed" as const,
      url: "#"
    },
    {
      id: "doc2",
      title: "Lettre de motivation",
      type: "Lettre de motivation",
      date: "14/04/2025",
      status: "draft" as const,
      url: "#"
    },
    {
      id: "doc3",
      title: "Attestation de formation",
      type: "Document officiel",
      date: "10/04/2025",
      status: "completed" as const,
      url: "#"
    }
  ];

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Mes documents</h1>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-xl mx-auto">
          <Button 
            className="py-5 h-auto text-lg flex items-center justify-center gap-2" 
            onClick={() => window.alert("Fonctionnalité en développement")}
          >
            <FilePlus className="h-5 w-5" />
            <span>Créer un nouveau document</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="py-5 h-auto text-lg flex items-center justify-center gap-2 border-2" 
            onClick={() => window.alert("Fonctionnalité en développement")}
          >
            <HelpCircle className="h-5 w-5" />
            <span>Aide pour mes documents</span>
          </Button>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <div className="bg-muted p-4 rounded-lg mb-6 flex items-center gap-3">
            <FileText className="h-6 w-6 text-primary" />
            <p className="font-medium">Tous vos documents importants sont sauvegardés ici</p>
          </div>
          
          <DocumentsList documents={documents} />
          
          <div className="mt-8 flex justify-center">
            <Button 
              variant="outline" 
              className="py-5 h-auto text-lg flex items-center justify-center gap-2 border-2" 
              onClick={() => window.alert("Fonctionnalité en développement")}
            >
              <Download className="h-5 w-5" />
              <span>Télécharger tous mes documents</span>
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Documents;
