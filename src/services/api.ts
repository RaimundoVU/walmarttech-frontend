import axios, { AxiosResponse } from "axios";

const baseUrl = 'http://localhost:8888'

export const getProducts = async (searchValue: string): Promise<AxiosResponse<IProduct[]>> => {
  try {
    const products: AxiosResponse<IProduct[]> = await axios.get(
      baseUrl + "/search-product?" + searchValue
    )
    return products
  } catch (error) {
    console.log('algo fallo')
    throw new Error();
  }
}
