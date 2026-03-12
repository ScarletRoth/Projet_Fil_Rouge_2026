export interface Property {
  id: string
  title: string
  description: string
  type: 'apartment' | 'house' | 'studio' | 'land'
  price: number
  purpose: 'rent' | 'sale'
  rooms: number
  bathrooms: number
  surface: number // m²
  location: {
    city: string
    zipCode: string
    address: string
    lat: number
    lng: number
  }
  amenities: string[]
  images: string[]
  agencyId: string
  createdAt: string
  rating?: number
  reviews?: number
}

export interface Filter {
  purpose?: 'rent' | 'sale'
  type?: string[]
  priceMin?: number
  priceMax?: number
  roomsMin?: number
  roomsMax?: number
  surfaceMin?: number
  surfaceMax?: number
  city?: string
  amenities?: string[]
}
