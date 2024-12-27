import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import {RootNavigator} from './navigators/root-navigator';

export default function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
      <Toast />
    </NavigationContainer>
  );
}
