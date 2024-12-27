import * as React from 'react';
import {View} from 'react-native';

import {Types, GLOBAL_STYLE} from '@utils';

import {styles} from './styles';

export const Card = ({
  style,
  children,
  autoMargin = false,
}: Types.WrapperProps) => (
  <View style={[autoMargin ? GLOBAL_STYLE.wrap : {}, styles.card, style]}>
    {children}
  </View>
);
