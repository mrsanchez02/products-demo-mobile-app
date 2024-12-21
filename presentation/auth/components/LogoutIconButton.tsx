import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useAuthStore } from '../store/useAuthStore'

const LogoutIconButton = () => {
  const primaryColor = useThemeColor({}, 'primary')

  const { logout } = useAuthStore();

  return (
    <TouchableOpacity onPress={logout} style={{marginRight: 8}}>
      <Ionicons name="log-out-outline" size={24} color={primaryColor} style={{marginLeft: 10}} />
    </TouchableOpacity>
  )
}

export default LogoutIconButton