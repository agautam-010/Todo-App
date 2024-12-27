import React from 'react';
import {Text} from 'react-native';

import {THEME, Types} from '@utils';

const Typography = ({
  style,
  text,
  color = THEME.COLORS.black, // Default text color
  size, // Font size
  noOfLine,
  fw, // Font weight
  children, // Additional children to render
  onPress,
  ...props // Other props
}: Types.TypographyProps) => {
  return (
    <Text
      style={[
        {
          color: color,
          fontSize: size,
          fontWeight: fw,
        },
        style,
      ]}
      numberOfLines={noOfLine}
      onPress={onPress}
      {...props}>
      {text}
      {children}
    </Text>
  );
};

export default React.memo(Typography); // Memoized for performance
