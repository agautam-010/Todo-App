import React from 'react';
import {LinearGradient} from 'react-native-linear-gradient';
import {
  TouchableOpacity,
  ActivityIndicator,
  TouchableOpacityProps,
  Animated,
  StyleSheet,
} from 'react-native';

import Typography from '../Typography';
import {THEME, Types} from '@utils';

import styles from './styles';

export default function Button({
  title,
  style,
  textStyle,
  color,
  inProgress = false,
  loaderColor = THEME.COLORS.black, // Default loader color
  children,
  ...rest
}: Types.ButtonProps & TouchableOpacityProps) {
  const scale = new Animated.Value(1);

  // Animation for button press
  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const btnStyle = StyleSheet.flatten([
    styles.btnStyle,
    color && {backgroundColor: color},
  ]);

  return (
    <Animated.View style={{transform: [{scale}]}}>
      <LinearGradient
        colors={[
          THEME.COLORS.gradient.primary,
          THEME.COLORS.gradient.secondary,
          THEME.COLORS.gradient.third,
        ]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={[{borderRadius: styles.btnStyle.borderRadius}, style]}>
        <TouchableOpacity
          testID="CUSTOM_BTN"
          style={[btnStyle, style]}
          activeOpacity={1}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          {...rest}>
          {inProgress ? (
            <ActivityIndicator
              testID="BTN_LOADER"
              size={24}
              color={loaderColor ?? THEME.COLORS.white}
            />
          ) : (
            children || (
              <Typography
                text={title}
                style={[styles.btnText, textStyle ?? {}]}
              />
            )
          )}
        </TouchableOpacity>
      </LinearGradient>
    </Animated.View>
  );
}
