import {Linking, Platform} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

import {AuthResponseProps} from '@store/useAuthStore';

// Opens the system's security settings to set authentication
export const setAuthentictionType = async () => {
  // Platform soecific flow for setting a new password or biometric
  if (Platform.OS === 'android') {
    Linking.sendIntent('android.app.action.SET_NEW_PASSWORD');
  } else {
    Linking.openURL('App-prefs:root=TOUCHID_PASSCODE');
  }
};

// Checks if biometric authentication is available and set up on the device
export const checkAuthenticationType = async (): Promise<AuthResponseProps> => {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const isLocalEnrolled = await LocalAuthentication.getEnrolledLevelAsync();

  // If Biometric is not supported or has not been setup
  if (!hasHardware || !isLocalEnrolled) {
    return {status: false, message: 'Biometric authentication not available'};
  }

  return {
    status: true,
    message: 'Authentication type is set on your device.',
  };
};

// Handles user authentication using biometric methods
export const authenticateUser = async (): Promise<boolean> => {
  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: 'Authenticate',
    fallbackLabel: 'Use Passcode',
  });
  return result.success;
};
