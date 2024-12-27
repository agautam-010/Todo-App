import React, {useMemo} from 'react';

import {AuthenticationStack, HomeStack} from './stack-navigator';
import {Stack, STACK_NAV_DEFAUKT_OPTIONS} from '.';
import useAuthStore from '@store/useAuthStore';

// Root navigator for conditional stack rendering
export function RootNavigator() {
  const {isAuthenticated} = useAuthStore(); // Get authentication state

  // Determine available screens based on authentication state
  const availableScreens = useMemo(() => {
    if (!isAuthenticated) {
      return AuthenticationStack;
    }
    return HomeStack;
  }, [isAuthenticated]);

  return (
    <Stack.Navigator screenOptions={STACK_NAV_DEFAUKT_OPTIONS}>
      {availableScreens}
    </Stack.Navigator>
  );
}
