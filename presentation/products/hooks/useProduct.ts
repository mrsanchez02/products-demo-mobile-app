import { getProductById } from "@/core/products/actions/get-product-by-id.actions"
import { Product } from "@/core/products/interface/product.interface"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Alert } from "react-native"

export const useProduct = (productId: string) => {
  
  const productQuery = useQuery({
    queryKey: ['products', productId],
    queryFn: () => getProductById(productId),
    staleTime: 1000 * 60 * 60 // 1 hour.
  })

  // Mutacion.
  const productMutation = useMutation({
    mutationFn: async (data: Product) => {
      // TODO Fire save action.
      console.log(data)
      return data;
    },
    onSuccess( data: Product ) {
      // TODO: Invalidate product queries
      Alert.alert("Product Saved", `The Product ${data.title} was saved successfully`)
    }
  })

  // Mantener el iD del producto en caso de ser uno nuevo.
  
  return {
    productQuery,
    productMutation
  }
}
