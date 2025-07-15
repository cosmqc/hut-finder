import axiosInstance from './Api.ts'

export const getHuts = async (params: {
  query: string
  categories: number[]
  sortMethod: string
  regions: string[]
}): Promise<HutSearchResponse> => {
  const response = await axiosInstance.get<HutSearchResponse>('/huts', {
    params: params,
  })
  return response.data
}

export const getHutById = async (id: number): Promise<Hut> => {
  const response = await axiosInstance.get<Hut>(`/huts/${id}`)
  return response.data
}

export const getHutByGlobalId = async (globalId: string): Promise<Hut> => {
  const response = await axiosInstance.get<Hut>(`/huts/global/${globalId}`)
  return response.data
}
