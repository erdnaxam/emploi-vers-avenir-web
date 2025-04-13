
import React from 'react';

interface LetterPreviewProps {
  data: {
    recipient: {
      company: string;
      contactName: string;
      contactTitle: string;
      address: string;
      city: string;
      postalCode: string;
    };
    sender: {
      firstName: string;
      lastName: string;
      address: string;
      city: string;
      postalCode: string;
      email: string;
      phone: string;
    };
    content: {
      position: string;
      jobReference: string;
      introduction: string;
      motivation: string;
      skills: string;
      conclusion: string;
    };
  };
}

const formatDate = () => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date().toLocaleDateString('fr-FR', options);
};

const LetterPreview: React.FC<LetterPreviewProps> = ({ data }) => {
  return (
    <div className="bg-white p-6 shadow-inner border text-gray-800 min-h-[600px]">
      {/* Coordonnées de l'expéditeur */}
      <div className="text-right mb-6">
        {data.sender.firstName && data.sender.lastName && (
          <p className="font-semibold">{data.sender.firstName} {data.sender.lastName}</p>
        )}
        {data.sender.address && <p>{data.sender.address}</p>}
        {data.sender.postalCode && data.sender.city && (
          <p>{data.sender.postalCode} {data.sender.city}</p>
        )}
        {data.sender.email && <p>{data.sender.email}</p>}
        {data.sender.phone && <p>{data.sender.phone}</p>}
      </div>

      {/* Date */}
      <div className="text-right mb-6">
        <p>{formatDate()}</p>
      </div>

      {/* Coordonnées du destinataire */}
      <div className="mb-8">
        {data.recipient.company && <p className="font-semibold">{data.recipient.company}</p>}
        {data.recipient.contactName && (
          <p>{data.recipient.contactName}</p>
        )}
        {data.recipient.contactTitle && <p>{data.recipient.contactTitle}</p>}
        {data.recipient.address && <p>{data.recipient.address}</p>}
        {data.recipient.postalCode && data.recipient.city && (
          <p>{data.recipient.postalCode} {data.recipient.city}</p>
        )}
      </div>

      {/* Objet */}
      <div className="mb-6">
        <p className="font-semibold">
          Objet : Candidature 
          {data.content.position && ` au poste de ${data.content.position}`}
          {data.content.jobReference && ` - Référence : ${data.content.jobReference}`}
        </p>
      </div>

      {/* Formule de politesse */}
      <div className="mb-6">
        <p>{data.recipient.contactName ? `${data.recipient.contactName},` : 'Madame, Monsieur,'}</p>
      </div>

      {/* Corps de la lettre */}
      <div className="space-y-4 mb-8">
        {data.content.introduction && (
          <p style={{ textIndent: '2em' }}>{data.content.introduction}</p>
        )}
        
        {data.content.motivation && (
          <p style={{ textIndent: '2em' }}>{data.content.motivation}</p>
        )}
        
        {data.content.skills && (
          <p style={{ textIndent: '2em' }}>{data.content.skills}</p>
        )}
        
        {data.content.conclusion && (
          <p style={{ textIndent: '2em' }}>{data.content.conclusion}</p>
        )}
      </div>

      {/* Signature */}
      <div className="text-right mt-8">
        <p>Cordialement,</p>
        {data.sender.firstName && data.sender.lastName && (
          <p className="font-semibold mt-6">{data.sender.firstName} {data.sender.lastName}</p>
        )}
      </div>
    </div>
  );
};

export default LetterPreview;
