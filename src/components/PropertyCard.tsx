import { Property } from '../types/Property'
import './PropertyCard.css'

interface PropertyCardProps {
  property: Property
  onSelect?: (property: Property) => void
  onDelete?: () => void
}

export default function PropertyCard({ property, onSelect, onDelete }: PropertyCardProps) {
  const priceLabel = property.purpose === 'rent' ? '€/mois' : '€'
  const typeLabel = {
    apartment: 'Appartement',
    house: 'Maison',
    studio: 'Studio',
    land: 'Terrain'
  }[property.type]

  return (
    <div className="property-card" onClick={() => onSelect?.(property)}>
      {/* Image */}
      <div className="property-image">
        <img src={property.images[0]} alt={property.title} />
        <span className="property-type">{typeLabel}</span>
        {property.purpose === 'rent' && <span className="badge-rent">À louer</span>}
        {property.purpose === 'sale' && <span className="badge-sale">À vendre</span>}
      </div>

      {/* Content */}
      <div className="property-content">
        <h3>{property.title}</h3>
        
        <div className="property-location">
          <span>{property.location.city}, {property.location.zipCode}</span>
        </div>

        <p className="description">{property.description}</p>

        {/* Features */}
        <div className="property-features">
          {property.rooms > 0 && (
            <div className="feature">
              <span>🛏️</span>
              <span>{property.rooms} pièce{property.rooms > 1 ? 's' : ''}</span>
            </div>
          )}
          {property.bathrooms > 0 && (
            <div className="feature">
              <span></span>
              <span>{property.bathrooms} SdB</span>
            </div>
          )}
          <div className="feature">
            <span></span>
            <span>{property.surface} m²</span>
          </div>
        </div>

        {/* Rating */}
        {property.rating && (
          <div className="property-rating">
            <span>{property.rating}</span>
            <span className="reviews">({property.reviews} avis)</span>
          </div>
        )}

        {/* Price */}
        <div className="property-footer">
          <div className="price">
            <span className="amount">{property.price.toLocaleString('fr-FR')}</span>
            <span className="currency">{priceLabel} TTC</span>
          </div>
          <div className="property-actions">
            {onDelete && (
              <button
                type="button"
                className="btn-delete"
                onClick={(event) => {
                  event.stopPropagation()
                  onDelete()
                }}
              >
                Supprimer
              </button>
            )}
            <button
              type="button"
              className="btn-details"
              onClick={(event) => {
                event.stopPropagation()
                onSelect?.(property)
              }}
            >
              Voir détails
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
