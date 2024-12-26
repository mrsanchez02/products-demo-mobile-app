import { ActivityIndicator, View } from 'react-native'
import { useProducts } from '@/presentation/products/hooks/useProducts'
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor';
import ProductList from '@/presentation/products/components/ProductList';
import { FAB } from '@/presentation/theme/components/FAB';
import { router } from 'expo-router';

const HomeScreen = () => {

  const { productsQuery, loadNextPage } = useProducts();
  const primaryColor = useThemeColor({}, 'text');

  if (productsQuery.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' color={primaryColor} />
      </View>
    )
  }

  return (
    <View style={{ paddingHorizontal: 10 }}>
      <ProductList loadNextPage={loadNextPage} products={productsQuery.data?.pages.flatMap(page => page) ?? []} />
      <FAB 
        iconName='add-outline'
        onPress={() => router.push('/(products-app)/product/new')}
      />
    </View>
  )
}

export default HomeScreen