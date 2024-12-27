import React from 'react';

import {Stack} from '.';

import LocalAuthenticate from '@screens/LocalAuthenticate/index.container';
import Todos from '@screens/Todos/index.container';

export const AuthenticationStack = (
  <Stack.Screen name="LocalAuthenticate" component={LocalAuthenticate} />
);

export const HomeStack = <Stack.Screen name={'Todo'} component={Todos} />;
