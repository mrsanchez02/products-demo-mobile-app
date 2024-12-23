import { useAuthStore } from '@/presentation/auth/store/useAuthStore'
import { ThemedButton } from '@/presentation/theme/components/ThemedButton'
import { ThemedText } from '@/presentation/theme/components/ThemedText'
import ThemedTextInput from '@/presentation/theme/components/ThemedTextInput'
import { ThemeLink } from '@/presentation/theme/components/ThemeLink'
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Alert, KeyboardAvoidingView, ScrollView, useWindowDimensions, View } from 'react-native'

const RegisterScreen = () => {
  const { height } = useWindowDimensions();
  const backgroundColor = useThemeColor({}, 'background');

  const { register } = useAuthStore();

  const [isPosting, setIsPosting] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  })

  const onRegister = async () => {
    console.log("🚀 ~ onRegister ~ form:", form)
    const { email, password, confirmPassword, fullName } = form;

    if (password !== confirmPassword) {
      Alert.alert('Las contraseñas no coinciden');
      return;
    }
    
    if (isPosting) return;
    if (email.length === 0 || password.length === 0 || fullName.length === 0 || confirmPassword.length === 0) {
      Alert.alert('Todos los campos son requeridos');
      return;
    }
    
    setIsPosting(true);
    
    const wasSuccessful = await register(email, password, fullName);
    setIsPosting(false);

    if (wasSuccessful) {
      router.replace('/auth/login');
      return;
    }

    if (!wasSuccessful) {
      Alert.alert('Error', 'No se pudo crear la cuenta. Intenta de nuevo.');
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
          <ThemedText type="title">Crear cuenta</ThemedText>
          <ThemedText style={{ color: 'grey'}}>Por favor crea una cuenta para continuar</ThemedText>
        </View>

        {/* Email and password */}
        <View style={{paddingTop: 20}}>
          <ThemedTextInput
            placeholder='Nombre Completo'
            autoCapitalize='words'
            icon='person-outline'
            value={form.fullName}
            onChangeText={text => setForm({...form, fullName: text})}
          />

          <ThemedTextInput
            placeholder='Correo electronico'
            keyboardType='email-address'
            autoCapitalize='none'
            icon='mail-outline'
            value={form.email}
            onChangeText={text => setForm({...form, email: text})}
          />

          <ThemedTextInput
            placeholder='Contraseña'
            secureTextEntry
            autoCapitalize='none'
            icon="lock-closed-outline"
            value={form.password}
            onChangeText={text => setForm({...form, password: text})}
          />

          <ThemedTextInput
            placeholder='Confirmar contraseña'
            secureTextEntry
            autoCapitalize='none'
            icon="lock-closed-outline"
            value={form.confirmPassword}
            onChangeText={text => setForm({...form, confirmPassword: text})}
          />

        </View>
        {/* Spacer */}
        <View style={{marginTop: 10}} />

        {/* Boton */}
        <ThemedButton iconEnd='arrow-forward-outline' onPress={onRegister} >Crear cuenta</ThemedButton>

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
            <ThemeLink href="/auth/login" style={{marginHorizontal: 5}}>Ingresar</ThemeLink>
          </View>

      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen