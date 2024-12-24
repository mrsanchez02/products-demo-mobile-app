import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useThemeColor } from '../hooks/useThemeColor';

interface Props {
  options: string[]
  selectedOption: string[]

  onSelect: (option: string) => void;
}

const ThemedButtonGroup = ({ options, selectedOption, onSelect }: Props) => {

  const primaryColor = useThemeColor({}, 'primary')

  return (
    <View style={styles.container}>
      {
        options.map(option => (
          <TouchableOpacity key={option} onPress={() => onSelect(option)} style={[styles.button, selectedOption.includes(option) && {
            backgroundColor: primaryColor
          }]}>
              <Text 
              adjustsFontSizeToFit
              numberOfLines={1}
                style={
                  [styles.buttonText,
                  selectedOption.includes(option) && styles.selectedButtonText
                  ]} 
              >{option[0].toUpperCase() + option.slice(1)}</Text>
          </TouchableOpacity>
        ))
      }
    </View>
  )
}

export default ThemedButtonGroup

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonText: {
    fontSize: 16,
  },
  selectedButtonText: {
    color: '#fff',
  }
})