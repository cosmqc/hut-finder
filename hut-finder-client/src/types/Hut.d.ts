type HutSearchResponse = Readonly<{
  categories: HutCategory[]
  results: Hut[]
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
  largeImageUrl: string
  status: string
  numberOfBunks: number
}>

type ApiResponse<T> = {
  content: T
  state: SearchState
}
