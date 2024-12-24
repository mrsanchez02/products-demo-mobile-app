import { API_URL, productsAPI } from "@/core/api/productsApi";
import { Product } from "../interface/product.interface";

export const getProductById = async (id: string): Promise<Product> => {
  try {
    const { data } = await productsAPI.get<Product>(`/products/${id}`);

    return {
      ...data,
      images: data.images.map(image => `${API_URL}/files/product/${image}`)
    };

  } catch (error) {
    throw new Error(`Product with id ${id} not found`);
    
  }
}