function stableHash(str) {
    const s = str ?? '';
    let hash = 0;
    for (let i = 0; i < s.length; i++) {
        hash = (hash * 31 + s.charCodeAt(i)) >>> 0;
    }
    return hash;
}
const PROPERTY_TYPES = ['apartment', 'house', 'studio', 'land'];
export function banFeatureToProperty(feature, purpose = 'rent') {
    const [lng, lat] = feature.geometry.coordinates;
    const seed = stableHash(feature.id);
    const type = PROPERTY_TYPES[seed % PROPERTY_TYPES.length];
    // Des valeurs cohérentes selon le type pour donner plus de diversité
    const typeDefaults = {
        apartment: { price: purpose === 'rent' ? 1200 : 250000, rooms: 2, bathrooms: 1, surface: 50 },
        house: { price: purpose === 'rent' ? 2000 : 450000, rooms: 4, bathrooms: 2, surface: 160 },
        studio: { price: purpose === 'rent' ? 700 : 170000, rooms: 1, bathrooms: 1, surface: 28 },
        land: { price: purpose === 'rent' ? 500 : 90000, rooms: 0, bathrooms: 0, surface: 500 }
    };
    const { price, rooms, bathrooms, surface } = typeDefaults[type];
    return {
        id: feature.id,
        title: feature.properties.label,
        description: `Adresse : ${feature.properties.label}`,
        type,
        price,
        purpose,
        rooms,
        bathrooms,
        surface,
        location: {
            city: feature.properties.city,
            zipCode: feature.properties.postcode,
            address: feature.properties.label,
            lat,
            lng
        },
        amenities: [],
        images: [],
        agencyId: 'ban',
        createdAt: new Date().toISOString(),
        rating: 4,
        reviews: 1
    };
}
