import { Property } from '../types/Property'
import './PropertyDetailsModal.css'

interface PropertyDetailsModalProps {
  property: Property
  onClose: () => void
}

export default function PropertyDetailsModal({ property, onClose }: PropertyDetailsModalProps) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-card">
        <div className="modal-header">
          <div>
            <p className="modal-purpose">{property.purpose === 'rent' ? 'Location' : 'Vente'}</p>
            <h2>{property.title}</h2>
            <p className="modal-location">{property.location.address}, {property.location.zipCode} {property.location.city}</p>
          </div>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Fermer">
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-gallery">
            {property.images.map((src, index) => (
              <img key={index} src={src} alt={`${property.title} ${index + 1}`} />
            ))}
          </div>

          <div className="modal-details">
            <div className="modal-summary">
              <div>
                <strong>Prix</strong>
                <span>{property.price.toLocaleString()} {property.purpose === 'rent' ? '€/mois' : '€'}</span>
              </div>
              <div>
                <strong>Surface</strong>
                <span>{property.surface} m²</span>
              </div>
              <div>
                <strong>Pièces</strong>
                <span>{property.rooms}</span>
              </div>
              <div>
                <strong>Salles de bain</strong>
                <span>{property.bathrooms}</span>
              </div>
            </div>

            <div className="modal-description">
              <h3>Description</h3>
              <p>{property.description}</p>
            </div>

            <div className="modal-amenities">
              <h3>Aménagements</h3>
              <div className="amenities-list">
                {property.amenities.map((amenity) => (
                  <span key={amenity} className="amenity-tag">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            <div className="modal-extra">
              <div>
                <strong>Note</strong>
                <span>{property.rating ?? '—'} / 5</span>
              </div>
              <div>
                <strong>Avis</strong>
                <span>{property.reviews ?? 0}</span>
              </div>
              <div>
                <strong>Ajoutée le</strong>
                <span>{property.createdAt}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
