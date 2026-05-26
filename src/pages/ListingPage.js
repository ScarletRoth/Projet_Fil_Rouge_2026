import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import FilterBar from '../components/FilterBar';
import PropertyCard from '../components/PropertyCard';
import PropertyDetailsModal from '../components/PropertyDetailsModal';
import { useBanProperties } from '../hooks/useBanProperties';
import { DEFAULT_PROPERTIES } from '../hooks/useBanProperties';
import './ListingPage.css';
export default function ListingPage({ purpose }) {
    const { currentUser } = useAuth();
    const isAdmin = currentUser?.role === 'admin';
    const [filters, setFilters] = useState({ purpose });
    const [viewMode, setViewMode] = useState('grid');
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [availableProperties, setAvailableProperties] = useState(() => {
        const saved = window.localStorage.getItem('ymmo_properties');
        return saved ? JSON.parse(saved) : DEFAULT_PROPERTIES;
    });
    const [showAddForm, setShowAddForm] = useState(false);
    const [newProperty, setNewProperty] = useState({
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
    });
    const { properties: filteredProperties, loading, error, loadMore, hasMore } = useBanProperties(filters, purpose, availableProperties);
    const pageTitle = purpose === 'rent' ? 'À Louer' : 'À Vendre';
    const handleSelectProperty = (property) => {
        setSelectedProperty(property);
    };
    const closeModal = () => {
        setSelectedProperty(null);
    };
    const savePropertyState = (properties) => {
        setAvailableProperties(properties);
        window.localStorage.setItem('ymmo_properties', JSON.stringify(properties));
    };
    const handleDeleteProperty = (propertyId) => {
        const updated = availableProperties.filter((property) => property.id !== propertyId);
        savePropertyState(updated);
    };
    const handleAddProperty = () => {
        if (!newProperty.title.trim() || !newProperty.address.trim() || !newProperty.city.trim()) {
            return;
        }
        const createdAt = new Date().toISOString().split('T')[0];
        const property = {
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
        };
        const updated = [property, ...availableProperties];
        savePropertyState(updated);
        setShowAddForm(false);
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
        });
    };
    return (_jsxs("div", { className: "listing-page", children: [_jsxs("div", { className: "listing-header", children: [_jsxs("div", { children: [_jsx("h1", { children: pageTitle }), _jsxs("p", { children: [filteredProperties.length, " r\u00E9sultat", filteredProperties.length !== 1 ? 's' : ''] })] }), isAdmin && (_jsx("div", { className: "admin-actions", children: _jsx("button", { type: "button", className: "btn-admin", onClick: () => setShowAddForm(!showAddForm), children: showAddForm ? 'Annuler' : 'Ajouter un bien' }) }))] }), _jsxs("div", { className: "listing-container", children: [_jsx("aside", { className: "listing-sidebar", children: _jsx(FilterBar, { onFilterChange: setFilters, purpose: purpose }) }), _jsxs("main", { className: "listing-main", children: [showAddForm && isAdmin && (_jsxs("section", { className: "admin-form", children: [_jsx("h2", { children: "Ajouter un nouveau bien" }), _jsxs("div", { className: "admin-form-grid", children: [_jsxs("label", { children: ["Titre", _jsx("input", { type: "text", value: newProperty.title, onChange: (event) => setNewProperty({ ...newProperty, title: event.target.value }) })] }), _jsxs("label", { children: ["Type", _jsxs("select", { value: newProperty.type, onChange: (event) => setNewProperty({ ...newProperty, type: event.target.value }), children: [_jsx("option", { value: "apartment", children: "Appartement" }), _jsx("option", { value: "house", children: "Maison" }), _jsx("option", { value: "studio", children: "Studio" }), _jsx("option", { value: "land", children: "Terrain" })] })] }), _jsxs("label", { children: ["Vente / Location", _jsxs("select", { value: newProperty.purpose, onChange: (event) => setNewProperty({ ...newProperty, purpose: event.target.value }), children: [_jsx("option", { value: "rent", children: "Location" }), _jsx("option", { value: "sale", children: "Vente" })] })] }), _jsxs("label", { children: ["Prix", _jsx("input", { type: "number", value: newProperty.price, onChange: (event) => setNewProperty({ ...newProperty, price: event.target.value }) })] }), _jsxs("label", { children: ["Pi\u00E8ces", _jsx("input", { type: "number", value: newProperty.rooms, onChange: (event) => setNewProperty({ ...newProperty, rooms: event.target.value }) })] }), _jsxs("label", { children: ["Salles de bain", _jsx("input", { type: "number", value: newProperty.bathrooms, onChange: (event) => setNewProperty({ ...newProperty, bathrooms: event.target.value }) })] }), _jsxs("label", { children: ["Surface", _jsx("input", { type: "number", value: newProperty.surface, onChange: (event) => setNewProperty({ ...newProperty, surface: event.target.value }) })] }), _jsxs("label", { children: ["Ville", _jsx("input", { type: "text", value: newProperty.city, onChange: (event) => setNewProperty({ ...newProperty, city: event.target.value }) })] }), _jsxs("label", { children: ["Code postal", _jsx("input", { type: "text", value: newProperty.zipCode, onChange: (event) => setNewProperty({ ...newProperty, zipCode: event.target.value }) })] }), _jsxs("label", { children: ["Adresse", _jsx("input", { type: "text", value: newProperty.address, onChange: (event) => setNewProperty({ ...newProperty, address: event.target.value }) })] }), _jsxs("label", { children: ["Image URL", _jsx("input", { type: "text", value: newProperty.imageUrl, onChange: (event) => setNewProperty({ ...newProperty, imageUrl: event.target.value }) })] }), _jsxs("label", { className: "admin-fullwidth", children: ["Description", _jsx("textarea", { value: newProperty.description, onChange: (event) => setNewProperty({ ...newProperty, description: event.target.value }) })] }), _jsxs("label", { className: "admin-fullwidth", children: ["Amenit\u00E9s (virgule s\u00E9par\u00E9)", _jsx("input", { type: "text", value: newProperty.amenities, onChange: (event) => setNewProperty({ ...newProperty, amenities: event.target.value }) })] })] }), _jsx("button", { type: "button", className: "btn-admin-submit", onClick: handleAddProperty, children: "Enregistrer le bien" })] })), _jsxs("div", { className: "view-switcher", children: [_jsx("button", { className: `view-btn ${viewMode === 'grid' ? 'active' : ''}`, onClick: () => setViewMode('grid'), title: "Vue grille", children: "\u229E Grille" }), _jsx("button", { className: `view-btn ${viewMode === 'list' ? 'active' : ''}`, onClick: () => setViewMode('list'), title: "Vue liste", children: "\u2630 Liste" })] }), loading ? (_jsx("div", { className: "loading", children: "Chargement des adresses\u2026" })) : error ? (_jsxs("div", { className: "error", children: [_jsx("p", { children: "Impossible de charger les adresses." }), _jsx("p", { children: error })] })) : filteredProperties.length > 0 ? (_jsxs(_Fragment, { children: [_jsx("div", { className: `properties-${viewMode}`, children: filteredProperties.map(property => (_jsx(PropertyCard, { property: property, onSelect: handleSelectProperty, onDelete: isAdmin ? () => handleDeleteProperty(property.id) : undefined }, property.id))) }), hasMore && (_jsx("div", { className: "load-more", children: _jsx("button", { className: "btn", onClick: loadMore, disabled: loading, children: loading ? 'Chargement…' : 'Charger plus' }) }))] })) : (_jsxs("div", { className: "no-results", children: [_jsx("p", { children: "Aucune propri\u00E9t\u00E9 trouv\u00E9e avec ces crit\u00E8res" }), _jsx("p", { children: "Essayez d'ajuster vos filtres" })] }))] })] }), selectedProperty && (_jsx(PropertyDetailsModal, { property: selectedProperty, onClose: closeModal }))] }));
}
