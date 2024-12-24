import { View, Text, FlatList, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { Product } from '@/core/products/interface/product.interface'
import { ProductCard } from './ProductCard'
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor'
import { useQueryClient } from '@tanstack/react-query'

interface Props {
  products: Product[],
  loadNextPage: () => void
}

const ProductList = ({ loadNextPage, products }:Props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const queryClient = useQueryClient();

  const onPullToRefresh = async () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 200)); // Simulate a network request

    // Invalidate the cache
    queryClient.invalidateQueries({
      queryKey: ['products', 'infinite'],
    })

    setIsRefreshing(false);
  }

  return (
    <FlatList
      data={products}
      numColumns={2}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ProductCard product={item} />}
      onEndReached={loadNextPage}
      onEndReachedThreshold={0.8}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onPullToRefresh} />
      }
    />
  )
}

export default ProductList