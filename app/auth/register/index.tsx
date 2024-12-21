import { ThemedButton } from '@/presentation/theme/components/ThemedButton'
import { ThemedText } from '@/presentation/theme/components/ThemedText'
import ThemedTextInput from '@/presentation/theme/components/ThemedTextInput'
import { ThemeLink } from '@/presentation/theme/components/ThemeLink'
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor'
import React from 'react'
import { KeyboardAvoidingView, ScrollView, useWindowDimensions, View } from 'react-native'

const RegisterScreen = () => {
  const { height } = useWindowDimensions();
  const backgroundColor = useThemeColor({}, 'background');

  return (
    <KeyboardAvoidingView
      behavior='padding'
      style={{flex: 1}}
    >
      <ScrollView style={{paddingHorizontal: 40, backgroundColor: backgroundColor}}>
        
        <View
          style={{
            paddingTop: height * 0.35,
          }}
        >
          <ThemedText type="title">Crear cuenta</ThemedText>
          <ThemedText style={{ color: 'grey'}}>Por favor crea una cuenta para continuar</ThemedText>
        </View>

        {/* Email and password */}
        <View style={{paddingTop: 20}}>
          <ThemedTextInput
            placeholder='Nombre Completo'
            autoCapitalize='words'
            icon='person-outline'
          />

          <ThemedTextInput
            placeholder='Correo electronico'
            keyboardType='email-address'
            autoCapitalize='none'
            icon='mail-outline'
          />

          <ThemedTextInput
            placeholder='Contraseña'
            secureTextEntry
            autoCapitalize='none'
            icon="lock-closed-outline"
          />

        </View>
        {/* Spacer */}
        <View style={{marginTop: 10}} />

        {/* Boton */}
        <ThemedButton iconEnd='arrow-forward-outline'>Crear cuenta</ThemedButton>

        {/* Spacer */}
        <View style={{marginTop: 50}} />

        {/* Enlace a registro */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ThemedText>Ya tienes una cuenta?</ThemedText>
            <ThemeLink href="/auth/login" style={{marginHorizontal: 5}}>Ingresar.</ThemeLink>
          </View>

      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen