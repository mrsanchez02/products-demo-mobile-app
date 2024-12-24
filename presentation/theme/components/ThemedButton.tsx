import { Ionicons } from '@expo/vector-icons';
import { Pressable, PressableProps, StyleSheet, Text } from 'react-native';
import { useThemeColor } from '../hooks/useThemeColor';

interface ThemedButtonProps extends PressableProps {
  children: string;
  iconStart?: keyof typeof Ionicons.glyphMap;
  iconEnd?: keyof typeof Ionicons.glyphMap;
}

export const ThemedButton = ({
  children,
  iconEnd,
  iconStart,
  ...rest
}: ThemedButtonProps) => {

  const primaryColor = useThemeColor({}, 'primary');

  return (
    <Pressable
      style={({pressed}) => [
        {
          backgroundColor: pressed ? primaryColor + '80' : primaryColor,
        },
        style.button,
      ]}
      {...rest}
    >
      {iconStart && <Ionicons name={iconStart} size={24} color={"white"}  style={{marginEnd: 5}} />}
      <Text style={{color: 'white'}}>{children}</Text>
      {iconEnd && <Ionicons name={iconEnd} size={24} color={"white"} style={{marginStart: 5}} />}
    </Pressable>
  );
};

const style = StyleSheet.create({
  button: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  }
})