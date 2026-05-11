export async function searchBanAddress(query, limit = 20, page = 1, signal) {
    const url = `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=${limit}&page=${page}`;
    const res = await fetch(url, { signal });
    if (!res.ok)
        throw new Error(`BAN API error: ${res.status}`);
    const data = await res.json();
    return data.features;
}
