import { useEffect, useMemo, useState } from 'react'
import { Filter, Property } from '../types/Property'
import { banFeatureToProperty } from '../services/banToProperty'
import { searchBanAddress } from '../services/banApi'

function parseJson<T>(value: string | null, defaultValue: T): T {
  if (!value) return defaultValue
  try {
    return JSON.parse(value) as T
  } catch {
    return defaultValue
  }
}

function getSavedProperties(): Property[] {
  return parseJson<Property[]>(window.localStorage.getItem('ymmo_properties'), DEFAULT_PROPERTIES)
}

export const DEFAULT_PROPERTIES: Property[] = [
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
    images: ['https://picsum.photos/seed/apartment-1/600/400'],
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
    images: ['https://picsum.photos/seed/house-2/600/400'],
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
    images: ['https://picsum.photos/seed/studio-3/600/400'],
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
    images: ['https://picsum.photos/seed/apartment-4/600/400'],
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
    images: ['https://picsum.photos/seed/land-5/600/400'],
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
    images: ['https://picsum.photos/seed/apartment-6/600/400'],
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
    images: ['https://picsum.photos/seed/house-7/600/400'],
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
    images: ['https://picsum.photos/seed/apartment-8/600/400'],
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
    images: ['https://picsum.photos/seed/land-9/600/400'],
    agencyId: 'agency-3',
    createdAt: '2024-03-05',
    rating: 4.4,
    reviews: 9
  },
  {
        id: '10',
        title: 'Loft Industriel Marais',
        description: "Ancien atelier d'artiste rénové avec verrière et HSP",
        type: 'apartment',
        price: 1450000,
        purpose: 'sale',
        rooms: 4,
        bathrooms: 2,
        surface: 110,
        location: {
            city: 'Paris',
            zipCode: '75004',
            address: 'Rue des Francs-Bourgeois',
            lat: 48.8584,
            lng: 2.3591
        },
        amenities: ['ascenseur', 'domotique', 'parquet'],
        images: ['https://picsum.photos/seed/paris-10/600/400'],
        agencyId: 'agency-1',
        createdAt: '2024-04-10',
        rating: 4.8,
        reviews: 12
    },
    {
        id: '11',
        title: 'Studio Vue Tour Eiffel',
        description: 'Studio optimisé avec balcon filant au 7ème étage',
        type: 'apartment',
        price: 420000,
        purpose: 'sale',
        rooms: 1,
        bathrooms: 1,
        surface: 22,
        location: {
            city: 'Paris',
            zipCode: '75015',
            address: 'Avenue de Suffren',
            lat: 48.8530,
            lng: 2.2980
        },
        amenities: ['balcon', 'gardien', 'vue dégagée'],
        images: ['https://picsum.photos/seed/paris-11/600/400'],
        agencyId: 'agency-1',
        createdAt: '2024-05-02',
        rating: 4.2,
        reviews: 5
    },
    {
        id: '12',
        title: 'Villa Contemporaine Corniche',
        description: 'Villa avec piscine à débordement et vue panoramique mer',
        type: 'house',
        price: 2100000,
        purpose: 'sale',
        rooms: 6,
        bathrooms: 3,
        surface: 250,
        location: {
            city: 'Marseille',
            zipCode: '13007',
            address: "Chemin du Vallon de l'Oriol",
            lat: 43.2845,
            lng: 5.3520
        },
        amenities: ['piscine', 'garage', 'terrasse'],
        images: ['https://picsum.photos/seed/marseille-12/600/400'],
        agencyId: 'agency-2',
        createdAt: '2024-03-20',
        rating: 4.9,
        reviews: 3
    },
    {
        id: '13',
        title: 'T3 Vieux-Port',
        description: 'Appartement de caractère dans immeuble Pouillon',
        type: 'apartment',
        price: 385000,
        purpose: 'sale',
        rooms: 3,
        bathrooms: 1,
        surface: 75,
        location: {
            city: 'Marseille',
            zipCode: '13002',
            address: 'Quai du Port',
            lat: 43.2965,
            lng: 5.3712
        },
        amenities: ['climatisation', 'proche métro', 'interphone'],
        images: ['https://picsum.photos/seed/marseille-13/600/400'],
        agencyId: 'agency-5',
        createdAt: '2024-04-15',
        rating: 4.5,
        reviews: 15
    },
    {
        id: '14',
        title: "Appartement Haussmannien Presqu'île",
        description: 'Prestations anciennes conservées : cheminées, moulures',
        type: 'apartment',
        price: 890000,
        purpose: 'sale',
        rooms: 5,
        bathrooms: 2,
        surface: 135,
        location: {
            city: 'Lyon',
            zipCode: '69002',
            address: 'Rue Victor Hugo',
            lat: 45.7538,
            lng: 4.8315
        },
        amenities: ['cave', 'grenier', 'double vitrage'],
        images: ['https://picsum.photos/seed/lyon-14/600/400'],
        agencyId: 'agency-8',
        createdAt: '2024-02-28',
        rating: 4.7,
        reviews: 8
    },
    {
        id: '15',
        title: 'Terrain Constructible Écully',
        description: 'Terrain viabilisé en zone résidentielle calme',
        type: 'land',
        price: 450000,
        purpose: 'sale',
        rooms: 0,
        bathrooms: 0,
        surface: 800,
        location: {
            city: 'Écully',
            zipCode: '69130',
            address: 'Chemin de la Forêt',
            lat: 45.7745,
            lng: 4.7801
        },
        amenities: ['viabilisé', 'piscinable', 'clôturé'],
        images: ['https://picsum.photos/seed/lyon-15/600/400'],
        agencyId: 'agency-8',
        createdAt: '2024-05-05',
        rating: 4.3,
        reviews: 2
    },
    {
        id: '16',
        title: 'Échoppe Bordelaise Rénovée',
        description: 'Maison de plain-pied avec jardin intime sans vis-à-vis',
        type: 'house',
        price: 545000,
        purpose: 'sale',
        rooms: 4,
        bathrooms: 1,
        surface: 95,
        location: {
            city: 'Bordeaux',
            zipCode: '33000',
            address: 'Rue de Bègles',
            lat: 44.8250,
            lng: -0.5630
        },
        amenities: ['jardin', 'puit de jour', 'cuisine équipée'],
        images: ['https://picsum.photos/seed/bordeaux-16/600/400'],
        agencyId: 'agency-12',
        createdAt: '2024-04-22',
        rating: 4.6,
        reviews: 11
    },
    {
        id: '17',
        title: 'Duplex Chartrons',
        description: 'Dernier étage avec terrasse dans un ancien chai',
        type: 'apartment',
        price: 620000,
        purpose: 'sale',
        rooms: 3,
        bathrooms: 2,
        surface: 88,
        location: {
            city: 'Bordeaux',
            zipCode: '33300',
            address: 'Cours de la Martinique',
            lat: 44.8510,
            lng: -0.5720
        },
        amenities: ['terrasse', 'parking', 'climatisation'],
        images: ['https://picsum.photos/seed/bordeaux-17/600/400'],
        agencyId: 'agency-12',
        createdAt: '2024-05-01',
        rating: 4.8,
        reviews: 7
    },
    {
        id: '18',
        title: 'Maison de Ville Vieux-Lille',
        description: 'Maison en briques avec cour intérieure et cachet',
        type: 'house',
        price: 495000,
        purpose: 'sale',
        rooms: 5,
        bathrooms: 2,
        surface: 120,
        location: {
            city: 'Lille',
            zipCode: '59800',
            address: 'Rue de la Monnaie',
            lat: 50.6405,
            lng: 3.0620
        },
        amenities: ['cour', 'cheminée', 'proche commerces'],
        images: ['https://picsum.photos/seed/lille-18/600/400'],
        agencyId: 'agency-4',
        createdAt: '2024-03-15',
        rating: 4.4,
        reviews: 14
    },
    {
        id: '19',
        title: 'Appartement Etudiant Vauban',
        description: 'Investissement locatif idéal à deux pas des facultés',
        type: 'apartment',
        price: 135000,
        purpose: 'sale',
        rooms: 1,
        bathrooms: 1,
        surface: 28,
        location: {
            city: 'Lille',
            zipCode: '59000',
            address: 'Boulevard Vauban',
            lat: 50.6320,
            lng: 3.0450
        },
        amenities: ['meublé', 'wifi inclus', 'local vélo'],
        images: ['https://picsum.photos/seed/lille-19/600/400'],
        agencyId: 'agency-4',
        createdAt: '2024-05-08',
        rating: 4.0,
        reviews: 4
    }
]

export function useBanProperties(
  filters: Filter,
  purpose?: 'rent' | 'sale',
  initialProperties: Property[] = getSavedProperties()
) {
  const [properties, setProperties] = useState<Property[]>(initialProperties)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)

  const shouldUseBan = Boolean(filters.city && filters.city.trim() !== '')

  useEffect(() => {
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
    const searchPurpose = purpose ?? 'rent'

    const timeoutId = window.setTimeout(async () => {
      setLoading(true)
      setError(undefined)
      try {
        const features = await searchBanAddress(query, 20, 1, controller.signal)
        const banProperties = features.map(f => banFeatureToProperty(f, searchPurpose))

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
      if (purpose && property.purpose !== purpose) return false
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
