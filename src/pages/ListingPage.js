import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import FilterBar from '../components/FilterBar';
import PropertyCard from '../components/PropertyCard';
import PropertyDetailsModal from '../components/PropertyDetailsModal';
import { useBanProperties } from '../hooks/useBanProperties';
import './ListingPage.css';
export default function ListingPage({ purpose }) {
    const [filters, setFilters] = useState({ purpose });
    const [viewMode, setViewMode] = useState('grid');
    const [selectedProperty, setSelectedProperty] = useState(null);
    const { properties: filteredProperties, loading, error, loadMore, hasMore } = useBanProperties(filters, purpose);
    const pageTitle = purpose === 'rent' ? 'À Louer' : 'À Vendre';
    const handleSelectProperty = (property) => {
        setSelectedProperty(property);
    };
    const closeModal = () => {
        setSelectedProperty(null);
    };
    return (_jsxs("div", { className: "listing-page", children: [_jsxs("div", { className: "listing-header", children: [_jsx("h1", { children: pageTitle }), _jsxs("p", { children: [filteredProperties.length, " r\u00E9sultat", filteredProperties.length !== 1 ? 's' : ''] })] }), _jsxs("div", { className: "listing-container", children: [_jsx("aside", { className: "listing-sidebar", children: _jsx(FilterBar, { onFilterChange: setFilters, purpose: purpose }) }), _jsxs("main", { className: "listing-main", children: [_jsxs("div", { className: "view-switcher", children: [_jsx("button", { className: `view-btn ${viewMode === 'grid' ? 'active' : ''}`, onClick: () => setViewMode('grid'), title: "Vue grille", children: "\u229E Grille" }), _jsx("button", { className: `view-btn ${viewMode === 'list' ? 'active' : ''}`, onClick: () => setViewMode('list'), title: "Vue liste", children: "\u2630 Liste" })] }), loading ? (_jsx("div", { className: "loading", children: "Chargement des adresses\u2026" })) : error ? (_jsxs("div", { className: "error", children: [_jsx("p", { children: "Impossible de charger les adresses." }), _jsx("p", { children: error })] })) : filteredProperties.length > 0 ? (_jsxs(_Fragment, { children: [_jsx("div", { className: `properties-${viewMode}`, children: filteredProperties.map(property => (_jsx(PropertyCard, { property: property, onSelect: handleSelectProperty }, property.id))) }), hasMore && (_jsx("div", { className: "load-more", children: _jsx("button", { className: "btn", onClick: loadMore, disabled: loading, children: loading ? 'Chargement…' : 'Charger plus' }) }))] })) : (_jsxs("div", { className: "no-results", children: [_jsx("p", { children: "Aucune propri\u00E9t\u00E9 trouv\u00E9e avec ces crit\u00E8res" }), _jsx("p", { children: "Essayez d'ajuster vos filtres" })] }))] })] }), selectedProperty && (_jsx(PropertyDetailsModal, { property: selectedProperty, onClose: closeModal }))] }));
}
