import { useState } from 'react'
import FilterBar from '../components/FilterBar'
import PropertyCard from '../components/PropertyCard'
import PropertyDetailsModal from '../components/PropertyDetailsModal'
import { Filter, Property } from '../types/Property'
import { useBanProperties } from '../hooks/useBanProperties'
import './ListingPage.css'

interface ListingPageProps {
  purpose: 'rent' | 'sale'
}

export default function ListingPage({ purpose }: ListingPageProps) {
  const [filters, setFilters] = useState<Filter>({ purpose })
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid')
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)

  const { properties: filteredProperties, loading, error, loadMore, hasMore } = useBanProperties(filters, purpose)

  const pageTitle = purpose === 'rent' ? 'À Louer' : 'À Vendre'

  const handleSelectProperty = (property: Property) => {
    setSelectedProperty(property)
  }

  const closeModal = () => {
    setSelectedProperty(null)
  }

  return (
    <div className="listing-page">
      <div className="listing-header">
        <h1>{pageTitle}</h1>
        <p>{filteredProperties.length} résultat{filteredProperties.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="listing-container">
        <aside className="listing-sidebar">
          <FilterBar onFilterChange={setFilters} purpose={purpose} />
        </aside>

        <main className="listing-main">
          <div className="view-switcher">
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Vue grille"
            >
              ⊞ Grille
            </button>
            <button
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="Vue liste"
            >
              ☰ Liste
            </button>
          </div>

          {loading ? (
            <div className="loading">Chargement des adresses…</div>
          ) : error ? (
            <div className="error">
              <p>Impossible de charger les adresses.</p>
              <p>{error}</p>
            </div>
          ) : filteredProperties.length > 0 ? (
            <>
              <div className={`properties-${viewMode}`}>
                {filteredProperties.map(property => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onSelect={handleSelectProperty}
                  />
                ))}
              </div>

              {hasMore && (
                <div className="load-more">
                  <button className="btn" onClick={loadMore} disabled={loading}>
                    {loading ? 'Chargement…' : 'Charger plus'}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="no-results">
              <p>Aucune propriété trouvée avec ces critères</p>
              <p>Essayez d'ajuster vos filtres</p>
            </div>
          )}
        </main>
      </div>

      {selectedProperty && (
        <PropertyDetailsModal property={selectedProperty} onClose={closeModal} />
      )}
    </div>
  )
}
