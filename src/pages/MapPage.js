import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import FilterBar from '../components/FilterBar';
import PropertyDetailsModal from '../components/PropertyDetailsModal';
import { useBanProperties } from '../hooks/useBanProperties';
import './MapPage.css';
export default function MapPage() {
    const [purposeFilter, setPurposeFilter] = useState('all');
    const [filters, setFilters] = useState({});
    const [selectedProperty, setSelectedProperty] = useState(null);
    const { properties: filteredProperties, loading, error, loadMore, hasMore } = useBanProperties(filters, purposeFilter === 'all' ? undefined : purposeFilter);
    const pageTitle = purposeFilter === 'rent'
        ? 'Carte - À Louer'
        : purposeFilter === 'sale'
            ? 'Carte - À Vendre'
            : 'Carte';
    const handleSelectProperty = (property) => {
        setSelectedProperty(property);
    };
    const closeModal = () => {
        setSelectedProperty(null);
    };
    // Calculer le centre de la carte (moyenne des positions)
    const center = filteredProperties.length > 0
        ? [
            filteredProperties.reduce((sum, p) => sum + p.location.lat, 0) / filteredProperties.length,
            filteredProperties.reduce((sum, p) => sum + p.location.lng, 0) / filteredProperties.length
        ]
        : [48.8566, 2.3522]; // Paris par défaut
    return (_jsxs("div", { className: "map-page", children: [_jsxs("div", { className: "map-header", children: [_jsx("h1", { children: pageTitle }), _jsxs("p", { children: [filteredProperties.length, " propri\u00E9t\u00E9", filteredProperties.length !== 1 ? 's' : '', " affich\u00E9e", filteredProperties.length !== 1 ? 's' : ''] }), _jsxs("div", { className: "map-purpose-tabs", children: [_jsx("button", { className: `tab-btn ${purposeFilter === 'all' ? 'active' : ''}`, type: "button", onClick: () => setPurposeFilter('all'), children: "Tous" }), _jsx("button", { className: `tab-btn ${purposeFilter === 'rent' ? 'active' : ''}`, type: "button", onClick: () => setPurposeFilter('rent'), children: "Location" }), _jsx("button", { className: `tab-btn ${purposeFilter === 'sale' ? 'active' : ''}`, type: "button", onClick: () => setPurposeFilter('sale'), children: "Vente" })] })] }), _jsxs("div", { className: "map-container", children: [_jsx("aside", { className: "map-sidebar", children: _jsx(FilterBar, { onFilterChange: setFilters }) }), _jsxs("main", { className: "map-main", children: [loading ? (_jsx("div", { className: "loading", children: "Recherche d'adresses en cours\u2026" })) : error ? (_jsxs("div", { className: "error", children: [_jsx("p", { children: "Impossible de charger les adresses." }), _jsx("p", { children: error })] })) : (_jsxs(_Fragment, { children: [_jsxs(MapContainer, { center: center, zoom: 12, style: { height: '100%', width: '100%' }, children: [_jsx(TileLayer, { attribution: '\u00A9 <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" }), filteredProperties.map(property => (_jsx(Marker, { position: [property.location.lat, property.location.lng], children: _jsx(Popup, { children: _jsxs("div", { className: "popup-content", children: [_jsx("h4", { children: property.title }), _jsx("p", { children: _jsxs("strong", { children: [property.price.toLocaleString(), " ", property.purpose === 'rent' ? '€/mois' : '€'] }) }), _jsxs("p", { children: [property.rooms, " pi\u00E8ce", property.rooms !== 1 ? 's' : '', " \u2022 ", property.surface, " m\u00B2"] }), _jsx("p", { children: property.location.address }), _jsx("button", { type: "button", className: "btn-view", onClick: () => handleSelectProperty(property), children: "Voir d\u00E9tails" })] }) }) }, property.id)))] }), hasMore && (_jsx("div", { className: "load-more", children: _jsx("button", { className: "btn", onClick: loadMore, disabled: loading, children: loading ? 'Chargement…' : 'Charger plus' }) }))] })), selectedProperty && (_jsx(PropertyDetailsModal, { property: selectedProperty, onClose: closeModal }))] })] })] }));
}
