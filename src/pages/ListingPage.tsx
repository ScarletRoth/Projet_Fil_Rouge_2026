import { useState, useMemo } from 'react'
import FilterBar from '../components/FilterBar'
import PropertyCard from '../components/PropertyCard'
import { mockProperties } from '../data/mockProperties'
import { Property, Filter } from '../types/Property'
import './ListingPage.css'

interface ListingPageProps {
  purpose: 'rent' | 'sale'
}

export default function ListingPage({ purpose }: ListingPageProps) {
  const [filters, setFilters] = useState<Filter>({ purpose })
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid')

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

  const pageTitle = purpose === 'rent' ? 'À Louer' : 'À Vendre'

  return (
    <div className="listing-page">
      <div className="listing-header">
        <h1>{pageTitle}</h1>
        <p>{filteredProperties.length} résultat{filteredProperties.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="listing-container">
        {/* Sidebar Filtres */}
        <aside className="listing-sidebar">
          <FilterBar onFilterChange={setFilters} purpose={purpose} />
        </aside>

        {/* Main Content */}
        <main className="listing-main">
          {/* View Toggle */}
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

          {/* Properties */}
          {filteredProperties.length > 0 ? (
            <div className={`properties-${viewMode}`}>
              {filteredProperties.map(property => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onSelect={(prop) => console.log('Selected:', prop)}
                />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p>Aucune propriété trouvée avec ces critères</p>
              <p>Essayez d'ajuster vos filtres</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
