type Hut = Readonly<{
  id: number,
  globalId: string,
  name: string,
  location: string,
  imageUrl: string,
  hutUrl: string,
  facilities: string[],
  lat: number,
  lon: number,
  bookable: boolean,
}>
