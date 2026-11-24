export type EstablishmentType = 'clinica' | 'farmacia';

export interface Establishment {
  id: string;
  name: string;
  type: EstablishmentType;
  address: string;
  city: string;
  phone: string;
  rating: number;
  reviewCount: number;
  distance: number;
  image: string;
  openNow: boolean;
  hours: string;
  services: string[];
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export const establishments: Establishment[] = [
  {
    id: '1',
    name: 'Clínica San Rafael',
    type: 'clinica',
    address: 'Av. Principal 123',
    city: 'Madrid',
    phone: '+34 91 123 4567',
    rating: 4.8,
    reviewCount: 234,
    distance: 0.5,
    image: 'https://images.unsplash.com/photo-1769698678497-c41f0ab47c3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtZWRpY2FsJTIwY2xpbmljJTIwZXh0ZXJpb3J8ZW58MXx8fHwxNzcyNzI4Mzk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    openNow: true,
    hours: 'Lun-Vie: 8:00-20:00, Sáb: 9:00-14:00',
    services: ['Medicina General', 'Pediatría', 'Traumatología', 'Urgencias'],
    description: 'Clínica moderna con equipamiento de última generación y profesionales altamente cualificados. Atención personalizada y rápida.',
    coordinates: { lat: 40.4168, lng: -3.7038 }
  },
  {
    id: '2',
    name: 'Farmacia Central',
    type: 'farmacia',
    address: 'Calle Mayor 45',
    city: 'Madrid',
    phone: '+34 91 234 5678',
    rating: 4.6,
    reviewCount: 189,
    distance: 0.3,
    image: 'https://images.unsplash.com/photo-1763634706732-d8e54d9852de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjeSUyMHN0b3JlZnJvbnQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzcyODI4Nzk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    openNow: true,
    hours: '24 horas',
    services: ['Venta de medicamentos', 'Ortopedia', 'Dermocosmética', 'Homeopatía'],
    description: 'Farmacia de guardia 24h. Amplio surtido de medicamentos y productos de parafarmacia. Asesoramiento profesional.',
    coordinates: { lat: 40.4150, lng: -3.7030 }
  },
  {
    id: '3',
    name: 'Centro Médico Salud Plus',
    type: 'clinica',
    address: 'Paseo de la Castellana 200',
    city: 'Madrid',
    phone: '+34 91 345 6789',
    rating: 4.9,
    reviewCount: 312,
    distance: 1.2,
    image: 'https://images.unsplash.com/photo-1769147555720-71fc71bfc216?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMGJ1aWxkaW5nJTIwaGVhbHRoY2FyZXxlbnwxfHx8fDE3NzI4Mjg3OTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    openNow: true,
    hours: 'Lun-Dom: 7:00-22:00',
    services: ['Cardiología', 'Neurología', 'Análisis clínicos', 'Radiología'],
    description: 'Centro médico especializado con más de 20 años de experiencia. Instalaciones modernas y tecnología avanzada.',
    coordinates: { lat: 40.4400, lng: -3.6889 }
  },
  {
    id: '4',
    name: 'Farmacia del Sol',
    type: 'farmacia',
    address: 'Calle Alcalá 78',
    city: 'Madrid',
    phone: '+34 91 456 7890',
    rating: 4.5,
    reviewCount: 156,
    distance: 0.8,
    image: 'https://images.unsplash.com/photo-1758573467057-955f803660a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjeSUyMGludGVyaW9yJTIwc2hlbHZlc3xlbnwxfHx8fDE3NzI4MDE3MzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    openNow: false,
    hours: 'Lun-Vie: 9:00-21:00, Sáb: 10:00-14:00',
    services: ['Medicamentos', 'Nutrición', 'Cosmética', 'Veterinaria'],
    description: 'Farmacia familiar con servicio personalizado. Especialistas en nutrición deportiva y productos naturales.',
    coordinates: { lat: 40.4200, lng: -3.6900 }
  },
  {
    id: '5',
    name: 'Clínica Dental Sonrisa',
    type: 'clinica',
    address: 'Calle Serrano 156',
    city: 'Madrid',
    phone: '+34 91 567 8901',
    rating: 4.7,
    reviewCount: 198,
    distance: 1.5,
    image: 'https://images.unsplash.com/photo-1704455306925-1401c3012117?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjBjbGluaWMlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzI3NzcyNTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    openNow: true,
    hours: 'Lun-Vie: 9:00-20:00',
    services: ['Odontología general', 'Ortodoncia', 'Implantes', 'Estética dental'],
    description: 'Clínica dental especializada en tratamientos estéticos y odontología avanzada. Primera visita gratuita.',
    coordinates: { lat: 40.4300, lng: -3.6850 }
  },
  {
    id: '6',
    name: 'Farmacia Nueva Salud',
    type: 'farmacia',
    address: 'Gran Vía 89',
    city: 'Madrid',
    phone: '+34 91 678 9012',
    rating: 4.4,
    reviewCount: 142,
    distance: 0.6,
    image: 'https://images.unsplash.com/photo-1763634706732-d8e54d9852de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjeSUyMHN0b3JlZnJvbnQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzcyODI4Nzk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    openNow: true,
    hours: 'Lun-Dom: 8:00-22:00',
    services: ['Farmacia', 'Análisis', 'Vacunación', 'Servicio a domicilio'],
    description: 'Farmacia moderna con servicio de entrega a domicilio. Punto de vacunación autorizado.',
    coordinates: { lat: 40.4195, lng: -3.7010 }
  },
  {
    id: '7',
    name: 'Hospital Universitario La Paz',
    type: 'clinica',
    address: 'Paseo de la Castellana 261',
    city: 'Madrid',
    phone: '+34 91 789 0123',
    rating: 4.6,
    reviewCount: 567,
    distance: 2.1,
    image: 'https://images.unsplash.com/photo-1769147555720-71fc71bfc216?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY2VudGVyJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzcyODI4Nzk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    openNow: true,
    hours: 'Urgencias 24h',
    services: ['Urgencias', 'Cirugía', 'UCI', 'Maternidad', 'Oncología'],
    description: 'Hospital de referencia con todas las especialidades médicas. Servicio de urgencias 24 horas.',
    coordinates: { lat: 40.4700, lng: -3.6800 }
  },
  {
    id: '8',
    name: 'Farmacia La Esperanza',
    type: 'farmacia',
    address: 'Calle Goya 34',
    city: 'Madrid',
    phone: '+34 91 890 1234',
    rating: 4.8,
    reviewCount: 203,
    distance: 0.9,
    image: 'https://images.unsplash.com/photo-1758573467057-955f803660a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjeSUyMGludGVyaW9yJTIwc2hlbHZlc3xlbnwxfHx8fDE3NzI4MDE3MzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    openNow: true,
    hours: '24 horas',
    services: ['Medicamentos receta', 'Parafarmacia', 'Dietética', 'Bebés'],
    description: 'Farmacia de guardia 24h. Especializada en productos infantiles y dietética.',
    coordinates: { lat: 40.4250, lng: -3.6750 }
  }
];
