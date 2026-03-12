import { useState, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import FilterBar from '../components/FilterBar'
import { mockProperties } from '../data/mockProperties'
import { Property, Filter } from '../types/Property'
import './MapPage.css'

interface MapPageProps {
  purpose: 'rent' | 'sale'
}

export default function MapPage({ purpose }: MapPageProps) {
  const [filters, setFilters] = useState<Filter>({ purpose })

  const filteredProperties = useMemo(() => {
    return mockProperties.filter((property: Property) => {
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
  }, [filters, purpose])

  const pageTitle = purpose === 'rent' ? 'Carte - À Louer' : 'Carte - À Vendre'

  // Calculer le centre de la carte (moyenne des positions)
  const center: [number, number] = filteredProperties.length > 0
    ? [
        filteredProperties.reduce((sum, p) => sum + p.location.lat, 0) / filteredProperties.length,
        filteredProperties.reduce((sum, p) => sum + p.location.lng, 0) / filteredProperties.length
      ]
    : [48.8566, 2.3522] // Paris par défaut

  return (
    <div className="map-page">
      <div className="map-header">
        <h1>{pageTitle}</h1>
        <p>{filteredProperties.length} propriété{filteredProperties.length !== 1 ? 's' : ''} affichée{filteredProperties.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="map-container">
        <aside className="map-sidebar">
          <FilterBar onFilterChange={setFilters} purpose={purpose} />
        </aside>

        <main className="map-main">
          <MapContainer center={center} zoom={12} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredProperties.map(property => (
              <Marker
                key={property.id}
                position={[property.location.lat, property.location.lng]}
              >
                <Popup>
                  <div className="popup-content">
                    <h4>{property.title}</h4>
                    <p><strong>{property.price.toLocaleString()} {property.purpose === 'rent' ? '€/mois' : '€'}</strong></p>
                    <p>{property.rooms} pièce{property.rooms !== 1 ? 's' : ''} • {property.surface} m²</p>
                    <p>{property.location.address}</p>
                    <button className="btn-view">Voir détails</button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </main>
      </div>
    </div>
  )
}
