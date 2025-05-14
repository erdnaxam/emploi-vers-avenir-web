
export interface Partner {
  id: string;
  name: string;
  category: 'insertion' | 'emploi' | 'formation' | 'accompagnement' | 'aide';
  description: string;
  services: string[];
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  schedule?: string;
  logoUrl?: string;
}

export interface Appointment {
  id: string;
  partnerId: string;
  partnerName: string;
  date: string;
  time: string;
  type: 'présentiel' | 'téléphonique' | 'visioconférence';
  notes?: string;
}

export interface AppointmentFormData {
  partnerId: string;
  date: string;
  time: string;
  type: 'présentiel' | 'téléphonique' | 'visioconférence';
  notes?: string;
}
