import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import './FilterBar.css';
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
];
const PROPERTY_TYPES = [
    { value: 'apartment', label: 'Appartement' },
    { value: 'house', label: 'Maison' },
    { value: 'studio', label: 'Studio' },
    { value: 'land', label: 'Terrain' }
];
export default function FilterBar({ onFilterChange, purpose }) {
    const [filters, setFilters] = useState({
        purpose,
        type: [],
        priceMin: undefined,
        priceMax: undefined,
        roomsMin: undefined,
        surfaceMin: undefined,
        city: '',
        amenities: []
    });
    const [expandedAdvanced, setExpandedAdvanced] = useState(false);
    const handleFilterChange = (newFilters) => {
        const updated = { ...filters, ...newFilters };
        setFilters(updated);
        onFilterChange(updated);
    };
    const toggleType = (type) => {
        const newTypes = filters.type?.includes(type)
            ? filters.type.filter(t => t !== type)
            : [...(filters.type || []), type];
        handleFilterChange({ type: newTypes });
    };
    const toggleAmenity = (amenity) => {
        const newAmenities = filters.amenities?.includes(amenity)
            ? filters.amenities.filter(a => a !== amenity)
            : [...(filters.amenities || []), amenity];
        handleFilterChange({ amenities: newAmenities });
    };
    return (_jsxs("div", { className: "filter-bar", children: [_jsxs("div", { className: "filter-section", children: [_jsx("h3", { children: "Type de bien" }), _jsx("div", { className: "filter-group", children: PROPERTY_TYPES.map(type => (_jsxs("label", { className: "checkbox", children: [_jsx("input", { type: "checkbox", checked: filters.type?.includes(type.value) || false, onChange: () => toggleType(type.value) }), _jsx("span", { children: type.label })] }, type.value))) })] }), _jsxs("div", { className: "filter-section", children: [_jsx("h3", { children: "Prix" }), _jsxs("div", { className: "price-inputs", children: [_jsx("input", { type: "number", placeholder: "Min", value: filters.priceMin || '', onChange: (e) => handleFilterChange({ priceMin: e.target.value ? Number(e.target.value) : undefined }) }), _jsx("span", { children: "-" }), _jsx("input", { type: "number", placeholder: "Max", value: filters.priceMax || '', onChange: (e) => handleFilterChange({ priceMax: e.target.value ? Number(e.target.value) : undefined }) })] })] }), _jsxs("div", { className: "advanced-filters-wrapper", children: [_jsxs("button", { className: `btn-advanced ${expandedAdvanced ? 'expanded' : ''}`, onClick: () => setExpandedAdvanced(!expandedAdvanced), children: [_jsx("span", { children: "Filtres avanc\u00E9s" }), _jsx("span", { className: "chevron", children: expandedAdvanced ? '▼' : '▶' })] }), expandedAdvanced && (_jsxs("div", { className: "advanced-filters", children: [_jsxs("div", { className: "filter-section", children: [_jsx("h3", { children: "\uD83D\uDECF\uFE0F Pi\u00E8ces" }), _jsx("input", { type: "number", min: "0", placeholder: "Min pi\u00E8ces", value: filters.roomsMin || '', onChange: (e) => handleFilterChange({ roomsMin: e.target.value ? Number(e.target.value) : undefined }) })] }), _jsxs("div", { className: "filter-section", children: [_jsx("h3", { children: "Surface (m\u00B2)" }), _jsx("input", { type: "number", min: "0", placeholder: "Min m\u00B2", value: filters.surfaceMin || '', onChange: (e) => handleFilterChange({ surfaceMin: e.target.value ? Number(e.target.value) : undefined }) })] }), _jsxs("div", { className: "filter-section", children: [_jsx("h3", { children: "Ville" }), _jsx("input", { type: "text", placeholder: "Ex: Paris", value: filters.city || '', onChange: (e) => handleFilterChange({ city: e.target.value }) })] }), _jsxs("div", { className: "filter-section", children: [_jsx("h3", { children: "Amenit\u00E9s" }), _jsx("div", { className: "amenities-grid", children: AMENITIES.map(amenity => (_jsx("button", { className: `amenity-tag ${filters.amenities?.includes(amenity) ? 'active' : ''}`, onClick: () => toggleAmenity(amenity), children: amenity }, amenity))) })] })] }))] })] }));
}
