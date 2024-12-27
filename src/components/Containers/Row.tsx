import * as React from 'react';
import {View} from 'react-native';

import {Types, GLOBAL_STYLE} from '@utils';

export const Row = ({
  style,
  autoMargin = false,
  children,
}: Types.WrapperProps) => (
  <View style={[GLOBAL_STYLE.row, autoMargin ? GLOBAL_STYLE.wrap : {}, style]}>
    {children}
  </View>
);
