type HutSearchResponse = Readonly<{
  categories: HutCategory[]
  results: Hut[]
  regions: Region[]
}>

type HutCategory = Readonly<{
  id: number
  name: string
}>

type Hut = Readonly<{
  id: number
  globalId: string
  name: string
  location: string
  imageUrl: string
  hutUrl: string
  region: string
  facilities: string[]
  lat: number
  lon: number
  bookable: boolean
  category: number
  description: string
  status: string
  numberOfBunks: number
  alerts: Alert[]
}>

type Alert = Readonly<{
  id: number
  summary: string
  description: string
  descriptionHtml: string
  startDate: string
  endDate: string
  lastUpdated: string
  regions: {
    id: string
    name: string
  }[]
}>

type Region = Readonly<{
  id: string
  name: string
}>

type ApiResponse<T> = {
  content: T
  state: SearchState
}
