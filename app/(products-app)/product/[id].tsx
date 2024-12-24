import { useProduct } from '@/presentation/products/hooks/useProduct'
import { useProducts } from '@/presentation/products/hooks/useProducts'
import ThemedTextInput from '@/presentation/theme/components/ThemedTextInput'
import { ThemedView } from '@/presentation/theme/components/ThemedView'
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor'
import { Ionicons } from '@expo/vector-icons'
import { Redirect, useLocalSearchParams, useNavigation } from 'expo-router'
import React, { useEffect } from 'react'
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native'

const ProductScreen = () => {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation()
  const { productQuery } = useProduct(`${id}`)

  const primaryColor = useThemeColor({}, 'text');

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons name='camera-outline' size={24} />
      )
    })
  }, [])

  useEffect(() => {
    if (productQuery.data) {
      navigation.setOptions({
        title: productQuery.data.title
      })
    }
  }, [productQuery.data])

  if (productQuery.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' color={primaryColor} />
      </View>
    )
  }

  if (!productQuery.data) {
    return <Redirect href='/(products-app)/(home)' />
  }

  if (productQuery.isError) {
    return <Text>Error</Text>
  }

  const product = productQuery.data

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView>
        {/* TODO Product Images */}
        <ThemedView style={{ marginHorizontal: 15, marginTop: 20 }}>
          <ThemedTextInput
            placeholder='Product Name'
            onChangeText={text => console.log(text)}
            style={{ marginVertical: 5 }}
          />
          <ThemedTextInput
            placeholder='Slug'
            onChangeText={text => console.log(text)}
            style={{ marginVertical: 5 }}
          />
          <ThemedTextInput
            placeholder='Description'
            onChangeText={text => console.log(text)}
            style={{ marginVertical: 5 }}
            multiline
            numberOfLines={5}
          />
        </ThemedView>
        <ThemedView style={{ marginHorizontal: 15, marginVertical: 5, flexDirection: 'row', gap: 10 }}>
          <ThemedTextInput
            placeholder='Price'
            onChangeText={text => console.log(text)}
            style={{ flex: 1 }}
          />
          <ThemedTextInput
            placeholder='Stock'
            onChangeText={text => console.log(text)}
            style={{ flex: 1 }}
          />
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default ProductScreen