import { API_URL, productsAPI } from "@/core/api/productsApi";
import { Product } from "../interface/product.interface";

export const updateCreateProduct = async (productLike: Partial<Product>) => {

  productLike.stock = isNaN(Number(productLike.stock)) ? 0 : Number(productLike.stock);
  productLike.price = isNaN(Number(productLike.price)) ? 0 : Number(productLike.price);

  if (productLike.id && productLike.id !== 'new') {
    return updateProduct(productLike);
  }

  return createProduct(productLike)

}

const updateProduct = async (productLike: Partial<Product>) => {
  const { id, images = [], user, ...rest } = productLike;
  try {
    const { data } = await productsAPI.patch<Product>(`/products/${id}`, {
      // todo: images
      ...rest
    })

    return data;

  } catch (error) {
    throw new Error(`Error while updating the product`)
  }
}
const createProduct = async (productLike: Partial<Product>) => {
  const { id, images = [], user, ...rest } = productLike;
  try {
    const { data } = await productsAPI.post<Product>("/products/", {
      // todo: images
      ...rest
    })

    return data;

  } catch (error) {
    throw new Error(`Error while creating the product`)
  }
}

