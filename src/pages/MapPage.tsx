import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import FilterBar from '../components/FilterBar'
import PropertyDetailsModal from '../components/PropertyDetailsModal'
import { Filter, Property } from '../types/Property'
import { useBanProperties } from '../hooks/useBanProperties'
import './MapPage.css'

export default function MapPage() {
  const [purposeFilter, setPurposeFilter] = useState<'all' | 'rent' | 'sale'>('all')
  const [filters, setFilters] = useState<Filter>({})
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)

  const { properties: filteredProperties, loading, error, loadMore, hasMore } = useBanProperties(
    filters,
    purposeFilter === 'all' ? undefined : purposeFilter
  )

  const pageTitle = purposeFilter === 'rent'
    ? 'Carte - À Louer'
    : purposeFilter === 'sale'
      ? 'Carte - À Vendre'
      : 'Carte'

  const handleSelectProperty = (property: Property) => {
    setSelectedProperty(property)
  }

  const closeModal = () => {
    setSelectedProperty(null)
  }

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
        <div className="map-purpose-tabs">
          <button
            className={`tab-btn ${purposeFilter === 'all' ? 'active' : ''}`}
            type="button"
            onClick={() => setPurposeFilter('all')}
          >
            Tous
          </button>
          <button
            className={`tab-btn ${purposeFilter === 'rent' ? 'active' : ''}`}
            type="button"
            onClick={() => setPurposeFilter('rent')}
          >
            Location
          </button>
          <button
            className={`tab-btn ${purposeFilter === 'sale' ? 'active' : ''}`}
            type="button"
            onClick={() => setPurposeFilter('sale')}
          >
            Vente
          </button>
        </div>
      </div>

      <div className="map-container">
        <aside className="map-sidebar">
          <FilterBar onFilterChange={setFilters} />
        </aside>

        <main className="map-main">
          {loading ? (
            <div className="loading">Recherche d'adresses en cours…</div>
          ) : error ? (
            <div className="error">
              <p>Impossible de charger les adresses.</p>
              <p>{error}</p>
            </div>
          ) : (
            <>
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
                        <button
                          type="button"
                          className="btn-view"
                          onClick={() => handleSelectProperty(property)}
                        >
                          Voir détails
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>

              {hasMore && (
                <div className="load-more">
                  <button className="btn" onClick={loadMore} disabled={loading}>
                    {loading ? 'Chargement…' : 'Charger plus'}
                  </button>
                </div>
              )}
            </>
          )}

          {selectedProperty && (
            <PropertyDetailsModal property={selectedProperty} onClose={closeModal} />
          )}
        </main>
      </div>
    </div>
  )
}
