import { API_URL, productsAPI } from "@/core/api/productsApi";
import { Product } from "../interface/product.interface";

export const getProducts = async (limit = 20, offset = 0): Promise<Product[]> => {
  try {
    const { data } = await productsAPI.get<Product[]>('/products', {
      params: {
        limit,
        offset
      }
    });

    return data.map( product => ({
      ...product,
      images: product.images.map(image => `${API_URL}/files/product/${image}`)
    }))

  } catch (error) {
    throw new Error("Unable to load products");
    
  }
}