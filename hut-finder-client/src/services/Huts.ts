import axiosInstance from './Api.ts';


export const getHuts = async (query: string, categories: number[]): Promise<Hut[]> => {
  const response = await axiosInstance.get<Hut[]>('/public/huts', {
    params: {
      query: query,
      categories: categories,
    }
  });
  return response.data;
}

export const getHutById = async (id: number): Promise<Hut> => {
  const response = await axiosInstance.get<Hut>(`/public/huts/${id}`);
  return response.data;
}

export const getHutByGlobalId = async (globalId: string): Promise<Hut> => {
  const response = await axiosInstance.get<Hut>(`/public/huts/global/${globalId}`);
  return response.data;
}