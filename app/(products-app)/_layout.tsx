import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { useAuthStore } from '@/presentation/auth/store/useAuthStore'
import { Redirect, Stack } from 'expo-router'

const CheckAuthenticationLayout = () => {

  const  { status, checkStatus} = useAuthStore()

  useEffect(() => {
    checkStatus()
  },[])

  if (status === 'checking') {
    return <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 5,
    }}>
      <ActivityIndicator size={'large'} />
    </View>
  }

  if (status === 'unauthenticated') {
    // Guardar la ruta del usuario
    return <Redirect href='/auth/login' />
  }

  return (
    <Stack>
      <Stack.Screen 
        name='(home)/index'
        options={{
          title: 'Productos',
        }}
        />
    </Stack>
  )
}

export default CheckAuthenticationLayout