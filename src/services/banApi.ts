export type BanFeature = {
  id: string
  properties: {
    label: string
    name?: string
    postcode: string
    city: string
    district?: string
    street?: string | null
  }
  geometry: {
    type: string
    coordinates: [number, number]
  }
}

export type BanSearchResult = {
  type: string
  version: string
  features: BanFeature[]
}

export async function searchBanAddress(query: string, limit = 20, page = 1, signal?: AbortSignal): Promise<BanFeature[]> {
  const url = `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=${limit}&page=${page}`
  const res = await fetch(url, { signal })
  if (!res.ok) throw new Error(`BAN API error: ${res.status}`)
  const data: BanSearchResult = await res.json()
  return data.features
}
