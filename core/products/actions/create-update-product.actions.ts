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

const prepareImages = async (images: string[]): Promise<string[]> => {
  const fileImages = images.filter((img) => img.startsWith('file'))
  const currentImages = images.filter((img) => !img.startsWith('file'))

  if (fileImages.length > 0) {
    const uploadPromises = fileImages.map(uploadImages);
    const uploadedImages = await Promise.all(uploadPromises);
    currentImages.push(...uploadedImages)
  }

  return currentImages.map(img => img.split('/').pop()!);
}

const uploadImages = async (image: string): Promise<string> => {
  return ''
}

const updateProduct = async (productLike: Partial<Product>) => {
  const { id, images = [], user, ...rest } = productLike;

  try {
    const checkedImages = await prepareImages(images);
    const { data } = await productsAPI.patch<Product>(`/products/${id}`, {
      ...rest,
      images: checkedImages
    });

    return data;

  } catch (error) {
    throw new Error(`Error while updating the product`)
  }
}
const createProduct = async (productLike: Partial<Product>) => {
  const { id, images = [], user, ...rest } = productLike;
  try {
    const checkedImages = await prepareImages(images);
    const { data } = await productsAPI.post<Product>("/products/", {
      ...rest,
      images: checkedImages
    })

    return data;

  } catch (error) {
    throw new Error(`Error while creating the product`)
  }
}

