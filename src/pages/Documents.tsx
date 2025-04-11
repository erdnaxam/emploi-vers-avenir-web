
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import DocumentsList from '@/components/documents/DocumentsList';

const Documents = () => {
  // Documents simulés pour la démonstration
  const documents = [
    {
      id: "doc1",
      title: "CV - Profil Commercial",
      type: "Curriculum Vitae",
      date: "12/04/2025",
      status: "completed" as const,
      url: "#"
    },
    {
      id: "doc2",
      title: "Lettre de motivation - Société XYZ",
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
        <h1 className="text-2xl font-bold mb-4 text-center">Mes documents</h1>
        <DocumentsList documents={documents} />
      </div>
    </PageLayout>
  );
};

export default Documents;
