import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './PropertyCard.css';
export default function PropertyCard({ property, onSelect, onDelete }) {
    const priceLabel = property.purpose === 'rent' ? '€/mois' : '€';
    const typeLabel = {
        apartment: 'Appartement',
        house: 'Maison',
        studio: 'Studio',
        land: 'Terrain'
    }[property.type];
    return (_jsxs("div", { className: "property-card", onClick: () => onSelect?.(property), children: [_jsxs("div", { className: "property-image", children: [_jsx("img", { src: property.images[0], alt: property.title }), _jsx("span", { className: "property-type", children: typeLabel }), property.purpose === 'rent' && _jsx("span", { className: "badge-rent", children: "\u00C0 louer" }), property.purpose === 'sale' && _jsx("span", { className: "badge-sale", children: "\u00C0 vendre" })] }), _jsxs("div", { className: "property-content", children: [_jsx("h3", { children: property.title }), _jsx("div", { className: "property-location", children: _jsxs("span", { children: [property.location.city, ", ", property.location.zipCode] }) }), _jsx("p", { className: "description", children: property.description }), _jsxs("div", { className: "property-features", children: [property.rooms > 0 && (_jsxs("div", { className: "feature", children: [_jsx("span", { children: "\uD83D\uDECF\uFE0F" }), _jsxs("span", { children: [property.rooms, " pi\u00E8ce", property.rooms > 1 ? 's' : ''] })] })), property.bathrooms > 0 && (_jsxs("div", { className: "feature", children: [_jsx("span", {}), _jsxs("span", { children: [property.bathrooms, " SdB"] })] })), _jsxs("div", { className: "feature", children: [_jsx("span", {}), _jsxs("span", { children: [property.surface, " m\u00B2"] })] })] }), property.rating && (_jsxs("div", { className: "property-rating", children: [_jsx("span", { children: property.rating }), _jsxs("span", { className: "reviews", children: ["(", property.reviews, " avis)"] })] })), _jsxs("div", { className: "property-footer", children: [_jsxs("div", { className: "price", children: [_jsx("span", { className: "amount", children: property.price.toLocaleString('fr-FR') }), _jsxs("span", { className: "currency", children: [priceLabel, " TTC"] })] }), _jsxs("div", { className: "property-actions", children: [onDelete && (_jsx("button", { type: "button", className: "btn-delete", onClick: (event) => {
                                            event.stopPropagation();
                                            onDelete();
                                        }, children: "Supprimer" })), _jsx("button", { type: "button", className: "btn-details", onClick: (event) => {
                                            event.stopPropagation();
                                            onSelect?.(property);
                                        }, children: "Voir d\u00E9tails" })] })] })] })] }));
}
