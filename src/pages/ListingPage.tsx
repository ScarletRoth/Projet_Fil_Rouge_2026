import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import FilterBar from '../components/FilterBar'
import PropertyCard from '../components/PropertyCard'
import PropertyDetailsModal from '../components/PropertyDetailsModal'
import { Filter, Property } from '../types/Property'
import { useBanProperties } from '../hooks/useBanProperties'
import { DEFAULT_PROPERTIES } from '../hooks/useBanProperties'
import './ListingPage.css'

interface ListingPageProps {
  purpose: 'rent' | 'sale'
}

type NewPropertyForm = {
  title: string
  type: 'apartment' | 'house' | 'studio' | 'land'
  purpose: 'rent' | 'sale'
  price: string
  rooms: string
  bathrooms: string
  surface: string
  city: string
  zipCode: string
  address: string
  description: string
  amenities: string
  imageUrl: string
}

export default function ListingPage({ purpose }: ListingPageProps) {
  const { currentUser } = useAuth()
  const isAdmin = currentUser?.role === 'admin'
  const [filters, setFilters] = useState<Filter>({ purpose })
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid')
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [availableProperties, setAvailableProperties] = useState<Property[]>(() => {
    const saved = window.localStorage.getItem('ymmo_properties')
    return saved ? JSON.parse(saved) : DEFAULT_PROPERTIES
  })
  const [showAddForm, setShowAddForm] = useState(false)
  const [newProperty, setNewProperty] = useState<NewPropertyForm>({
    title: '',
    type: 'apartment',
    purpose: 'rent',
    price: '',
    rooms: '1',
    bathrooms: '1',
    surface: '30',
    city: '',
    zipCode: '',
    address: '',
    description: '',
    amenities: '',
    imageUrl: ''
  })

  const { properties: filteredProperties, loading, error, loadMore, hasMore } = useBanProperties(filters, purpose, availableProperties)

  const pageTitle = purpose === 'rent' ? 'À Louer' : 'À Vendre'

  const handleSelectProperty = (property: Property) => {
    setSelectedProperty(property)
  }

  const closeModal = () => {
    setSelectedProperty(null)
  }

  const savePropertyState = (properties: Property[]) => {
    setAvailableProperties(properties)
    window.localStorage.setItem('ymmo_properties', JSON.stringify(properties))
  }

  const handleDeleteProperty = (propertyId: string) => {
    const updated = availableProperties.filter((property) => property.id !== propertyId)
    savePropertyState(updated)
  }

  const handleAddProperty = () => {
    if (!newProperty.title.trim() || !newProperty.address.trim() || !newProperty.city.trim()) {
      return
    }

    const createdAt = new Date().toISOString().split('T')[0]
    const property: Property = {
      id: Date.now().toString(),
      title: newProperty.title.trim(),
      description: newProperty.description.trim() || 'Nouveau bien ajouté par administrateur.',
      type: newProperty.type,
      price: Number(newProperty.price) || 0,
      purpose: newProperty.purpose,
      rooms: Number(newProperty.rooms) || 0,
      bathrooms: Number(newProperty.bathrooms) || 0,
      surface: Number(newProperty.surface) || 0,
      location: {
        city: newProperty.city.trim(),
        zipCode: newProperty.zipCode.trim(),
        address: newProperty.address.trim(),
        lat: 48.8566,
        lng: 2.3522
      },
      amenities: newProperty.amenities
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      images: newProperty.imageUrl
        ? [newProperty.imageUrl.trim()]
        : ['https://picsum.photos/seed/new-property/600/400'],
      agencyId: 'admin',
      createdAt,
      rating: 0,
      reviews: 0
    }

    const updated = [property, ...availableProperties]
    savePropertyState(updated)
    setShowAddForm(false)
    setNewProperty({
      title: '',
      type: 'apartment',
      purpose: 'rent',
      price: '',
      rooms: '1',
      bathrooms: '1',
      surface: '30',
      city: '',
      zipCode: '',
      address: '',
      description: '',
      amenities: '',
      imageUrl: ''
    })
  }

  return (
    <div className="listing-page">
      <div className="listing-header">
        <div>
          <h1>{pageTitle}</h1>
          <p>{filteredProperties.length} résultat{filteredProperties.length !== 1 ? 's' : ''}</p>
        </div>
        {isAdmin && (
          <div className="admin-actions">
            <button type="button" className="btn-admin" onClick={() => setShowAddForm(!showAddForm)}>
              {showAddForm ? 'Annuler' : 'Ajouter un bien'}
            </button>
          </div>
        )}
      </div>

      <div className="listing-container">
        <aside className="listing-sidebar">
          <FilterBar onFilterChange={setFilters} purpose={purpose} />
        </aside>

        <main className="listing-main">
          {showAddForm && isAdmin && (
            <section className="admin-form">
              <h2>Ajouter un nouveau bien</h2>
              <div className="admin-form-grid">
                <label>
                  Titre
                  <input
                    type="text"
                    value={newProperty.title}
                    onChange={(event) => setNewProperty({ ...newProperty, title: event.target.value })}
                  />
                </label>
                <label>
                  Type
                  <select
                    value={newProperty.type}
                    onChange={(event) => setNewProperty({ ...newProperty, type: event.target.value as any })}
                  >
                    <option value="apartment">Appartement</option>
                    <option value="house">Maison</option>
                    <option value="studio">Studio</option>
                    <option value="land">Terrain</option>
                  </select>
                </label>
                <label>
                  Vente / Location
                  <select
                    value={newProperty.purpose}
                    onChange={(event) => setNewProperty({ ...newProperty, purpose: event.target.value as any })}
                  >
                    <option value="rent">Location</option>
                    <option value="sale">Vente</option>
                  </select>
                </label>
                <label>
                  Prix
                  <input
                    type="number"
                    value={newProperty.price}
                    onChange={(event) => setNewProperty({ ...newProperty, price: event.target.value })}
                  />
                </label>
                <label>
                  Pièces
                  <input
                    type="number"
                    value={newProperty.rooms}
                    onChange={(event) => setNewProperty({ ...newProperty, rooms: event.target.value })}
                  />
                </label>
                <label>
                  Salles de bain
                  <input
                    type="number"
                    value={newProperty.bathrooms}
                    onChange={(event) => setNewProperty({ ...newProperty, bathrooms: event.target.value })}
                  />
                </label>
                <label>
                  Surface
                  <input
                    type="number"
                    value={newProperty.surface}
                    onChange={(event) => setNewProperty({ ...newProperty, surface: event.target.value })}
                  />
                </label>
                <label>
                  Ville
                  <input
                    type="text"
                    value={newProperty.city}
                    onChange={(event) => setNewProperty({ ...newProperty, city: event.target.value })}
                  />
                </label>
                <label>
                  Code postal
                  <input
                    type="text"
                    value={newProperty.zipCode}
                    onChange={(event) => setNewProperty({ ...newProperty, zipCode: event.target.value })}
                  />
                </label>
                <label>
                  Adresse
                  <input
                    type="text"
                    value={newProperty.address}
                    onChange={(event) => setNewProperty({ ...newProperty, address: event.target.value })}
                  />
                </label>
                <label>
                  Image URL
                  <input
                    type="text"
                    value={newProperty.imageUrl}
                    onChange={(event) => setNewProperty({ ...newProperty, imageUrl: event.target.value })}
                  />
                </label>
                <label className="admin-fullwidth">
                  Description
                  <textarea
                    value={newProperty.description}
                    onChange={(event) => setNewProperty({ ...newProperty, description: event.target.value })}
                  />
                </label>
                <label className="admin-fullwidth">
                  Amenités (virgule séparé)
                  <input
                    type="text"
                    value={newProperty.amenities}
                    onChange={(event) => setNewProperty({ ...newProperty, amenities: event.target.value })}
                  />
                </label>
              </div>
              <button type="button" className="btn-admin-submit" onClick={handleAddProperty}>
                Enregistrer le bien
              </button>
            </section>
          )}
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
                    onDelete={isAdmin ? () => handleDeleteProperty(property.id) : undefined}
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
