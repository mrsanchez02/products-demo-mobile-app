import { Product } from "@/core/products/interface/product.interface";
import { ThemedText } from "@/presentation/theme/components/ThemedText";
import { ThemedView } from "@/presentation/theme/components/ThemedView";
import { router } from "expo-router";
import { Image, TouchableOpacity } from "react-native";

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  return (
    <ThemedView
      style={{
        flex: 1,
        backgroundColor: '#F9F9F9',
        margin: 3,
        borderRadius: 5,
        overflow: 'hidden',
        padding: 5,
      }}
    >
      <TouchableOpacity onPress={() => router.push(`/product/${product.id}` as any)}>
        {product.images.length === 0 ? (
          <Image
            source={require('../../../assets/images/no-product-image.png')}
            style={{ width: '100%', height: 200 }}
          />
        ) : (
          <Image
            source={{ uri: product.images[0] }}
            style={{ flex: 1, height: 200, width: '100%' }}
          />
        )}

        <ThemedText
          numberOfLines={2}
          style={{ textAlign: 'center' }}
          darkColor={'black'}
        >
          {product.title}
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};