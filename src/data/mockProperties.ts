import { Property } from '../types/Property'

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Bel appartement 2 pièces',
    description: 'Spacieux appartement au cœur de la ville avec vue sur le parc',
    type: 'apartment',
    price: 850,
    purpose: 'rent',
    rooms: 2,
    bathrooms: 1,
    surface: 65,
    location: {
      city: 'Paris',
      zipCode: '75002',
      address: '123 Rue de Rivoli',
      lat: 48.8629,
      lng: 2.3357
    },
    amenities: ['balcon', 'ascenseur', 'chauffage', 'parking'],
    images: ['https://via.placeholder.com/300x200?text=Apt+1'],
    agencyId: 'agency-1',
    createdAt: '2024-01-15',
    rating: 4.5,
    reviews: 12
  },
  {
    id: '2',
    title: 'Maison moderne 4 pièces',
    description: 'Maison neuve avec jardin et garage',
    type: 'house',
    price: 450000,
    purpose: 'sale',
    rooms: 4,
    bathrooms: 2,
    surface: 180,
    location: {
      city: 'Versailles',
      zipCode: '78000',
      address: '456 Avenue du Roi',
      lat: 48.8048,
      lng: 2.1302
    },
    amenities: ['jardin', 'garage', 'piscine', 'terrasse'],
    images: ['https://via.placeholder.com/300x200?text=Maison+1'],
    agencyId: 'agency-1',
    createdAt: '2024-01-10',
    rating: 5,
    reviews: 24
  },
  {
    id: '3',
    title: 'Studio Paris 11',
    description: 'Cosy studio parfait pour étudiant',
    type: 'studio',
    price: 600,
    purpose: 'rent',
    rooms: 1,
    bathrooms: 1,
    surface: 28,
    location: {
      city: 'Paris',
      zipCode: '75011',
      address: '789 Boulevard Beaumarchais',
      lat: 48.8693,
      lng: 2.3718
    },
    amenities: ['wifi', 'meublé', 'cuisine équipée'],
    images: ['https://via.placeholder.com/300x200?text=Studio+1'],
    agencyId: 'agency-2',
    createdAt: '2024-01-12',
    rating: 4,
    reviews: 8
  },
  {
    id: '4',
    title: 'Luxury Penthouse',
    description: 'Penthouse luxe à Neuilly avec terrasse panoramique',
    type: 'apartment',
    price: 3500,
    purpose: 'rent',
    rooms: 3,
    bathrooms: 2,
    surface: 140,
    location: {
      city: 'Neuilly-sur-Seine',
      zipCode: '92200',
      address: '321 Avenue Charles de Gaulle',
      lat: 48.8816,
      lng: 2.2658
    },
    amenities: ['ascenseur', 'concierge', 'terrasse', 'climatisation', 'parking privé'],
    images: ['https://via.placeholder.com/300x200?text=Penthouse+1'],
    agencyId: 'agency-1',
    createdAt: '2024-01-08',
    rating: 4.8,
    reviews: 35
  },
  {
    id: '5',
    title: 'Petit terrain constructible',
    description: 'Beau terrain de 500m² en zone constructible',
    type: 'land',
    price: 95000,
    purpose: 'sale',
    rooms: 0,
    bathrooms: 0,
    surface: 500,
    location: {
      city: 'Meulan-en-Yvelines',
      zipCode: '78250',
      address: '654 Route de Seine',
      lat: 48.9803,
      lng: 1.8703
    },
    amenities: ['zone constructible', 'accès route'],
    images: ['https://via.placeholder.com/300x200?text=Terrain+1'],
    agencyId: 'agency-3',
    createdAt: '2024-01-05',
    rating: 4.2,
    reviews: 5
  }
]
