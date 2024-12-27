import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import {RootStackParamList} from './navtypes';

const Stack = createNativeStackNavigator<RootStackParamList>();
const STACK_NAV_DEFAUKT_OPTIONS: NativeStackNavigationOptions = {
  headerShown: false,
  headerShadowVisible: false,
  headerTitleAlign: 'center',
};
export {Stack, STACK_NAV_DEFAUKT_OPTIONS};
