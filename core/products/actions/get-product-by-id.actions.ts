import { API_URL, productsAPI } from "@/core/api/productsApi";
import { Gender, Product } from "../interface/product.interface";

const emptyProduct: Product = {
  id: '',
  title: 'New product',
  description: '',
  price: 0,
  images: [],
  slug: '',
  gender: Gender.Men,
  sizes: [],
  stock: 0,
  tags: []
}

export const getProductById = async (id: string): Promise<Product> => {
  if (id === 'new') return emptyProduct;
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