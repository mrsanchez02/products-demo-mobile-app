import { Link, LinkProps } from 'expo-router';
import React from 'react';
import { useThemeColor } from '../hooks/useThemeColor';

interface Props extends LinkProps {}

export const ThemeLink = ({ style, ...rest }: Props) => {
  const primary = useThemeColor({}, 'primary');
  return (
    <Link
      style={[
        {
          color: primary,
        },
        style,
      ]}
      {...rest}
    />
  );
};
