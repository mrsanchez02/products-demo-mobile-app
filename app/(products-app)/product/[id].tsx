import { Size } from '@/core/products/interface/product.interface'
import ProductImages from '@/presentation/products/components/ProductImages'
import { useProduct } from '@/presentation/products/hooks/useProduct'
import { useCameraStore } from '@/presentation/store/useCameraStore'
import MenuIconButton from '@/presentation/theme/components/MenuIconButton'
import { ThemedButton } from '@/presentation/theme/components/ThemedButton'
import ThemeButtonGroup from '@/presentation/theme/components/ThemedButtonGroup'
import ThemedTextInput from '@/presentation/theme/components/ThemedTextInput'
import { ThemedView } from '@/presentation/theme/components/ThemedView'
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor'
import { Redirect, router, useLocalSearchParams, useNavigation } from 'expo-router'
import { Formik } from 'formik'
import React, { useEffect } from 'react'
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native'

const ProductScreen = () => {

  const { selectedImages, clearImages } = useCameraStore()

  const { id } = useLocalSearchParams();
  const navigation = useNavigation()
  const { productQuery, productMutation } = useProduct(`${id}`)

  const primaryColor = useThemeColor({}, 'text');

  useEffect(() => {
    return () => {
      clearImages()
    }
  },[])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MenuIconButton
          icon='camera-outline'
          onPress={() => router.push('/camera')}
        />
      )
    })
  }, [])

  useEffect(() => {
    if (productQuery.data) {
      // console.log("🚀 ~ useEffect ~ productQuery.data:", productQuery.data)
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
    <Formik
      initialValues={product}
      onSubmit={(producLike) => productMutation.mutate({...producLike, images: [...product.images, ...selectedImages]})}
      // onSubmit={productMutation.mutate}
    >
      {
        ({ values, handleSubmit, handleChange, setFieldValue }) => (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <ScrollView>
              <ProductImages images={[...product.images, ...selectedImages]} />
              <ThemedView style={{ marginHorizontal: 15, marginTop: 20 }}>
                <ThemedTextInput
                  placeholder='Product Name'
                  // style={{ marginVertical: 5 }}
                  value={values.title}
                  onChangeText={handleChange('title')}
                />
                <ThemedTextInput
                  placeholder='Slug'
                  // style={{ marginVertical: 5 }}
                  value={values.slug}
                  onChangeText={handleChange('slug')}
                />
                <ThemedTextInput
                  placeholder='Description'
                  // style={{ marginVertical: 5 }}
                  multiline
                  numberOfLines={5}
                  value={values.description}
                  onChangeText={handleChange('description')}
                />
              </ThemedView>
              <ThemedView style={{ marginHorizontal: 15, marginVertical: 5, flexDirection: 'row', gap: 10 }}>
                <ThemedTextInput
                  placeholder='Price'
                  // style={{ flex: 1 }}
                  value={values.price.toString()}
                  onChangeText={handleChange('price')}
                  keyboardType='number-pad'
                />
                <ThemedTextInput
                  placeholder='Stock'
                  // style={{ flex: 1 }}
                  value={values.stock.toString()}
                  onChangeText={handleChange('stock')}
                  keyboardType='number-pad'
                />
              </ThemedView>
              <ThemedView style={{ marginHorizontal: 15, marginVertical: 5 }}>
                <ThemeButtonGroup
                  options={['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']}
                  selectedOption={values.sizes ?? []}
                  onSelect={(selectedSize) => {
                    if (values.sizes.includes(selectedSize as Size)) {
                      setFieldValue('sizes', values.sizes.filter(size => size !== selectedSize))
                    } else {
                      setFieldValue('sizes', [...values.sizes, selectedSize])
                    }
                  }}
                />
                <ThemeButtonGroup
                  options={['kid', 'men', 'women', 'unisex']}
                  selectedOption={[values.gender]}
                  onSelect={(selectedOption) => setFieldValue('gender', selectedOption)}
                />
              </ThemedView>
              {/* Button to save */}
              <ThemedView style={{ marginHorizontal: 15, marginTop: 10, marginBottom: 50 }}>
                <ThemedButton
                  iconStart={'save-outline'}
                  onPress={() => handleSubmit()}
                >
                  Save
                </ThemedButton>
              </ThemedView>
            </ScrollView>
          </KeyboardAvoidingView>

        )
      }
    </Formik>
  )
}

export default ProductScreen