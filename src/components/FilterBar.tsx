import { useState } from 'react'
import { Filter } from '../types/Property'
import './FilterBar.css'

interface FilterBarProps {
  onFilterChange: (filters: Filter) => void
  purpose: 'rent' | 'sale'
}

const AMENITIES = [
  'balcon',
  'jardin',
  'garage',
  'piscine',
  'terrasse',
  'ascenseur',
  'chauffage',
  'climatisation',
  'meublé',
  'wifi',
  'parking',
  'cuisine équipée'
]

const PROPERTY_TYPES = [
  { value: 'apartment', label: 'Appartement' },
  { value: 'house', label: 'Maison' },
  { value: 'studio', label: 'Studio' },
  { value: 'land', label: 'Terrain' }
]

export default function FilterBar({ onFilterChange, purpose }: FilterBarProps) {
  const [filters, setFilters] = useState<Filter>({
    purpose,
    type: [],
    priceMin: undefined,
    priceMax: undefined,
    roomsMin: undefined,
    surfaceMin: undefined,
    city: '',
    amenities: []
  })

  const handleFilterChange = (newFilters: Partial<Filter>) => {
    const updated = { ...filters, ...newFilters }
    setFilters(updated)
    onFilterChange(updated)
  }

  const toggleType = (type: string) => {
    const newTypes = filters.type?.includes(type)
      ? filters.type.filter(t => t !== type)
      : [...(filters.type || []), type]
    handleFilterChange({ type: newTypes })
  }

  const toggleAmenity = (amenity: string) => {
    const newAmenities = filters.amenities?.includes(amenity)
      ? filters.amenities.filter(a => a !== amenity)
      : [...(filters.amenities || []), amenity]
    handleFilterChange({ amenities: newAmenities })
  }

  return (
    <div className="filter-bar">
      <div className="filter-section">
        <h3>Type de bien</h3>
        <div className="filter-group">
          {PROPERTY_TYPES.map(type => (
            <label key={type.value} className="checkbox">
              <input
                type="checkbox"
                checked={filters.type?.includes(type.value) || false}
                onChange={() => toggleType(type.value)}
              />
              <span>{type.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3>Prix</h3>
        <div className="price-inputs">
          <input
            type="number"
            placeholder="Min"
            value={filters.priceMin || ''}
            onChange={(e) => handleFilterChange({ priceMin: e.target.value ? Number(e.target.value) : undefined })}
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.priceMax || ''}
            onChange={(e) => handleFilterChange({ priceMax: e.target.value ? Number(e.target.value) : undefined })}
          />
        </div>
      </div>

      <div className="filter-section">
        <h3>🛏️ Pièces</h3>
        <input
          type="number"
            min="0"
            placeholder="Min pièces"
            value={filters.roomsMin || ''}
            onChange={(e) => handleFilterChange({ roomsMin: e.target.value ? Number(e.target.value) : undefined })}
          />
      </div>

      <div className="filter-section">
        <h3>Surface (m²)</h3>
        <input
          type="number"
          min="0"
          placeholder="Min m²"
          value={filters.surfaceMin || ''}
          onChange={(e) => handleFilterChange({ surfaceMin: e.target.value ? Number(e.target.value) : undefined })}
        />
      </div>

      <div className="filter-section">
        <h3>Ville</h3>
        <input
          type="text"
          placeholder="Ex: Paris"
          value={filters.city || ''}
          onChange={(e) => handleFilterChange({ city: e.target.value })}
        />
      </div>

      <div className="filter-section">
        <h3>Amenités</h3>
        <div className="amenities-grid">
          {AMENITIES.map(amenity => (
            <button
              key={amenity}
              className={`amenity-tag ${filters.amenities?.includes(amenity) ? 'active' : ''}`}
              onClick={() => toggleAmenity(amenity)}
            >
              {amenity}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
