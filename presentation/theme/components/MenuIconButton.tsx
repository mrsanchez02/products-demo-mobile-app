import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useThemeColor } from '../hooks/useThemeColor';

interface Props {
  onPress: () => void;
  icon: keyof typeof Ionicons.glyphMap;
}

const MenuIconButton = ({icon, onPress}: Props) => {

  const primaryColor = useThemeColor({}, 'primary');

  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons name={icon} size={24} color={primaryColor} />
    </TouchableOpacity>
  )
}

export default MenuIconButton