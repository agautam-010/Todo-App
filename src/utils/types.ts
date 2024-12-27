import React, {ReactNode} from 'react';
import {
  ViewStyle,
  TextStyle,
  FlatList,
  TextProps,
  View,
  TextInput,
} from 'react-native';

export type {ViewStyle, TextStyle} from 'react-native';
export {FlatList as FlatListTypes};

export interface ContainerProps {
  style?: ViewStyle | ViewStyle[];
  children?: React.ReactNode;
  scroll?: boolean;
  safearea?: boolean;
  barColor?: string;
  higherChilds?: React.ReactNode;
}

export type WrapperProps = {autoMargin?: boolean | number} & View['props'];

export type KeyboardAvoidProps = {
  style?: ViewStyle | ViewStyle[];
  children: ReactNode;
  offset?: number;
};

export interface TypographyProps extends TextProps {
  style?: TextStyle | TextStyle[];
  text?: string | number | undefined | null;
  color?: string;
  size?: number;
  noOfLine?: number;
  fw?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | undefined;
  children?: React.ReactNode;
  onPress?: () => void;
}

export type TextInputTypes = TextInput['props'] & {
  left?: JSX.Element;
  onLeftIconPress?: () => void;
  right?: JSX.Element;
  onRightIconPress?: () => void;
  onRetry?: () => void;
  style?: ViewStyle & {color?: string; fontSize?: number};
  disabled?: boolean;
  label?: string | null;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  shadow?: boolean;
  textVerticalAlign?: boolean;
};

export interface FlatListExtraProps {
  emptyTitle?: string;
  emptyMsg?: string;
  onRetry?: () => void;
}

export interface ButtonProps {
  title?: string;
  textStyle?: TextStyle;
  color?: string;
  inProgress?: boolean;
  loaderColor?: string;
}
