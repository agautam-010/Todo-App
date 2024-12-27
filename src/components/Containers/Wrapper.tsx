import * as React from 'react';
import {View} from 'react-native';

import {Types, GLOBAL_STYLE} from '@utils';

export const Wrapper = ({
  autoMargin = false,
  children,
  style,
}: Types.WrapperProps) => (
  <View style={[autoMargin ? GLOBAL_STYLE.wrap : {}, style]}>{children}</View>
);
