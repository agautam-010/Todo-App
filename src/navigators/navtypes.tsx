import {NativeStackScreenProps} from '@react-navigation/native-stack';
export type {NativeStackScreenProps} from '@react-navigation/native-stack';
export type {NativeStackNavigationProp} from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  LocalAuthenticate: undefined;
  Todo: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;
