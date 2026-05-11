import { useEffect, useMemo, useState } from 'react'
import { Filter, Property } from '../types/Property'
import { banFeatureToProperty } from '../services/banToProperty'
import { searchBanAddress } from '../services/banApi'

const DEFAULT_PROPERTIES: Property[] = [
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
  },
  {
    id: '6',
    title: 'Loft contemporain',
    description: 'Loft design avec grandes fenêtres et un espace de vie ouvert',
    type: 'apartment',
    price: 420000,
    purpose: 'sale',
    rooms: 3,
    bathrooms: 2,
    surface: 120,
    location: {
      city: 'Boulogne-Billancourt',
      zipCode: '92100',
      address: '88 Quai de Seine',
      lat: 48.8338,
      lng: 2.2399
    },
    amenities: ['terrasse', 'parking', 'cave', 'lumineux'],
    images: ['https://via.placeholder.com/300x200?text=Loft+1'],
    agencyId: 'agency-2',
    createdAt: '2024-02-18',
    rating: 4.7,
    reviews: 18
  },
  {
    id: '7',
    title: 'Villa familiale',
    description: 'Villa spacieuse avec piscine et jardin clos',
    type: 'house',
    price: 850000,
    purpose: 'sale',
    rooms: 5,
    bathrooms: 3,
    surface: 260,
    location: {
      city: 'Saint-Germain-en-Laye',
      zipCode: '78100',
      address: '12 Rue des Tilleuls',
      lat: 48.8973,
      lng: 2.0948
    },
    amenities: ['piscine', 'jardin', 'garage', 'alarme'],
    images: ['https://via.placeholder.com/300x200?text=Villa+1'],
    agencyId: 'agency-1',
    createdAt: '2024-03-01',
    rating: 4.9,
    reviews: 27
  },
  {
    id: '8',
    title: 'Charmant T2',
    description: 'Appartement rénové proche des transports et commerces',
    type: 'apartment',
    price: 1250,
    purpose: 'rent',
    rooms: 2,
    bathrooms: 1,
    surface: 55,
    location: {
      city: 'Lyon',
      zipCode: '69003',
      address: '15 Rue de la République',
      lat: 45.7600,
      lng: 4.8357
    },
    amenities: ['wifi', 'balcon', 'meublé'],
    images: ['https://via.placeholder.com/300x200?text=T2+Lyon'],
    agencyId: 'agency-4',
    createdAt: '2024-02-12',
    rating: 4.3,
    reviews: 14
  },
  {
    id: '9',
    title: 'Éco-terrain',
    description: 'Terrain idéal pour construction écologique',
    type: 'land',
    price: 120000,
    purpose: 'sale',
    rooms: 0,
    bathrooms: 0,
    surface: 650,
    location: {
      city: 'Chartres',
      zipCode: '28000',
      address: '120 Chemin de la Forêt',
      lat: 48.4465,
      lng: 1.4887
    },
    amenities: ['zone verte', 'accès eau', 'sol plat'],
    images: ['https://via.placeholder.com/300x200?text=Terrain+2'],
    agencyId: 'agency-3',
    createdAt: '2024-03-05',
    rating: 4.4,
    reviews: 9
  }
]

export function useBanProperties(
  filters: Filter,
  purpose: 'rent' | 'sale',
  initialProperties: Property[] = DEFAULT_PROPERTIES
) {
  const [properties, setProperties] = useState<Property[]>(initialProperties)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)

  const shouldUseBan = Boolean(filters.city && filters.city.trim() !== '')

  useEffect(() => {
    // Reset search state when query changes
    setPage(1)
    setHasMore(false)

    if (!shouldUseBan) {
      setProperties(initialProperties)
      setError(undefined)
      setLoading(false)
      return
    }

    const controller = new AbortController()
    const query = filters.city ?? ''

    const timeoutId = window.setTimeout(async () => {
      setLoading(true)
      setError(undefined)
      try {
        const features = await searchBanAddress(query, 20, 1, controller.signal)
        const banProperties = features.map(f => banFeatureToProperty(f, purpose))

        setProperties(banProperties)
        setHasMore(features.length === 20)
      } catch (e) {
        if (e instanceof Error && e.name === 'AbortError') return
        setError(e instanceof Error ? e.message : String(e))
      } finally {
        setLoading(false)
      }
    }, 450)

    return () => {
      window.clearTimeout(timeoutId)
      controller.abort()
    }
  }, [filters.city, purpose, initialProperties, shouldUseBan])

  const filteredProperties = useMemo(() => {
    return properties.filter((property: Property) => {
      if (property.purpose !== purpose) return false
      if (filters.type && filters.type.length > 0 && !filters.type.includes(property.type)) return false
      if (filters.priceMin && property.price < filters.priceMin) return false
      if (filters.priceMax && property.price > filters.priceMax) return false
      if (filters.roomsMin && property.rooms < filters.roomsMin) return false
      if (filters.surfaceMin && property.surface < filters.surfaceMin) return false
      if (filters.city && !property.location.city.toLowerCase().includes(filters.city.toLowerCase())) return false
      if (filters.amenities && filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every(a => property.amenities.includes(a))
        if (!hasAllAmenities) return false
      }
      return true
    })
  }, [properties, filters, purpose])

  const loadMore = async () => {
    if (!shouldUseBan || !hasMore || loading) return

    setLoading(true)
    setError(undefined)

    const controller = new AbortController()
    const query = filters.city ?? ''
    const nextPage = page + 1

    try {
      const features = await searchBanAddress(query, 20, nextPage, controller.signal)
      const banProperties = features.map(f => banFeatureToProperty(f, purpose))

      setProperties(prev => {
        const merged = [...prev, ...banProperties]
        const uniqueById = Array.from(new Map(merged.map(p => [p.id, p])).values())
        const added = uniqueById.length - prev.length

        // Si on ne reçoit aucun nouvel ID, on considère qu'il n'y a plus de pages.
        setHasMore(added > 0 && features.length === 20)

        return uniqueById
      })

      setPage(nextPage)
    } catch (e) {
      if (e instanceof Error && e.name === 'AbortError') return
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setLoading(false)
    }
  }

  return { properties: filteredProperties, loading, error, loadMore, hasMore }
}
