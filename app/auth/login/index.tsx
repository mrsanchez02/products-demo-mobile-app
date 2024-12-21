import { useAuthStore } from '@/presentation/auth/store/useAuthStore'
import { ThemedButton } from '@/presentation/theme/components/ThemedButton'
import { ThemedText } from '@/presentation/theme/components/ThemedText'
import ThemedTextInput from '@/presentation/theme/components/ThemedTextInput'
import { ThemeLink } from '@/presentation/theme/components/ThemeLink'
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Alert, KeyboardAvoidingView, ScrollView, useWindowDimensions, View } from 'react-native'

const LoginScreen = () => {
  const { login } = useAuthStore();
  const { height } = useWindowDimensions();
  const backgroundColor = useThemeColor({}, 'background');

  const [isPosting, setIsPosting] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const onLogin = async () => {
    const { email, password } = form;
    
    if (isPosting) return;
    if (email.length === 0 || password.length < 6) {
      Alert.alert('Email y password son requeridos');
      return;
    }
    
    setIsPosting(true);
    
    const wasSuccessful = await login(email, password);
    setIsPosting(false);

    if (wasSuccessful) {
      router.replace('/');
      return
    }

    if (!wasSuccessful) {
      Alert.alert('Error', 'No se pudo iniciar sesion. Usuario o contraseña incorrectos.');
    }

  }

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
          <ThemedText type="title">Ingresar</ThemedText>
          <ThemedText style={{ color: 'grey'}}>Por favor ingrese para continuar</ThemedText>
        </View>

        {/* Email and password */}
        <View style={{paddingTop: 20}}>
          <ThemedTextInput
            placeholder='Correo electronico'
            keyboardType='email-address'
            autoCapitalize='none'
            icon='mail-outline'
            value={form.email}
            onChangeText={(value) => setForm({...form, email: value})}
          />

          <ThemedTextInput
            placeholder='Contraseña'
            secureTextEntry
            autoCapitalize='none'
            icon="lock-closed-outline"
            value={form.password}
            onChangeText={(value) => setForm({...form, password: value})}
          />

        </View>
        {/* Spacer */}
        <View style={{marginTop: 10}} />

        {/* Boton */}
        <ThemedButton iconEnd='arrow-forward-outline' onPress={() => onLogin()} disabled={isPosting}>Ingresar</ThemedButton>

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
            <ThemedText>No tienes cuenta?</ThemedText>
            <ThemeLink href="/auth/register" style={{marginHorizontal: 5}}>Crear cuenta</ThemeLink>
          </View>

      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen