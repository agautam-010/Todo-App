import React, {forwardRef} from 'react';
import {TextInput, Platform, View, TextStyle, Pressable} from 'react-native';

import Typography from '../Typography';
import {THEME, Types} from '@utils';

import styles from './styles';

const Input = forwardRef<TextInput, Types.TextInputTypes>(
  (
    {
      left, // Left icon
      onLeftIconPress, // Function to handle left icon press
      right, // Right icon
      onRightIconPress, // Function to handle right icon press
      style = {},
      label,
      containerStyle,
      labelStyle = {},
      textVerticalAlign = false,
      textAlign,
      ...rest // Other props passed to TextInput
    },
    ref,
  ) => {
    // Determine if platform os apple
    const isIOS = Platform.OS === 'ios';

    const textInputStyle: TextStyle = isIOS
      ? styles.ios // iOS-specific styles
      : ({textAlignVertical: textAlign ?? 'top'} as TextStyle); // Android-specific text alignment

    // Styles for the text input, including dynamic height handling
    const inputStyles: TextStyle = {
      color: style.color || THEME.COLORS.black,
      fontSize: style.fontSize || 14,
      ...(textVerticalAlign ? {height: style.height} : {}),
    };

    // Utility function to render the left or right icon with press functionality
    const getIcon = (
      icon: JSX.Element,
      onPress?: () => void,
      isRight?: boolean,
    ) => (
      <Pressable
        style={isRight ? styles.inputRightBtn : styles.inputLeftBtn}
        onPress={onPress}
        disabled={rest.disabled}>
        {icon}
      </Pressable>
    );

    const inputContainerPaddingRight = {
      paddingRight: right ? 130 : 10,
      paddingLeft: left ? 130 : 10,
    };
    const inputContainerPaddingHeight = {
      height: Math.max(style?.height || 80, style.height || 0),
    };

    return (
      <View style={containerStyle}>
        {label && (
          // Render the label if provided
          <Typography
            text={label}
            color={THEME.COLORS.black}
            style={[styles.inputLabel, labelStyle]}
          />
        )}
        <View style={styles.chatInpWrap}>
          {/* Render the left icon if provided */}
          {left && getIcon(left, onLeftIconPress)}

          {/* Input container */}
          <View
            style={[
              styles.inputContainer,
              inputContainerPaddingRight, // Adjust padding based on icons
              style, // Custom styles from props
              inputContainerPaddingHeight, // Ensure a minimum height for the container
            ]}>
            {/* Render the main TextInput */}
            <TextInput
              ref={ref}
              style={[textInputStyle, styles.input, inputStyles]} // Combine all styles
              {...rest} // Pass down remaining props
            />
          </View>

          {/* Render the right icon if provided */}
          {right && getIcon(right, onRightIconPress, true)}
        </View>
      </View>
    );
  },
);

export default Input;
