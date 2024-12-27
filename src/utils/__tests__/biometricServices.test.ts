import {Linking} from 'react-native';
import LocalAuthentication from 'expo-local-authentication';

import {
  setAuthentictionType,
  checkAuthenticationType,
  authenticateUser,
} from '../biometricServices';

jest.mock('react-native', () => ({
  Linking: {
    sendIntent: jest.fn(),
    openURL: jest.fn(),
  },
  Platform: {
    OS: 'android',
  },
}));

describe('setAuthentiction', () => {
  it('should call Linking.sendIntent with correct parameters', async () => {
    await setAuthentictionType();

    expect(Linking.sendIntent).toHaveBeenCalledWith(
      'android.app.action.SET_NEW_PASSWORD',
    );
  });
});

describe('checkAuthenticationType', () => {
  it('should return error if no hardware or no enrolled authentication', async () => {
    LocalAuthentication.hasHardwareAsync.mockResolvedValue(false);
    LocalAuthentication.getEnrolledLevelAsync.mockResolvedValue(false);

    const result = await checkAuthenticationType();

    expect(result).toEqual({
      status: false,
      message: 'Biometric authentication not available',
    });
  });

  it('should return success if hardware and enrolled authentication are available', async () => {
    LocalAuthentication.hasHardwareAsync.mockResolvedValue(true);
    LocalAuthentication.getEnrolledLevelAsync.mockResolvedValue(true);

    const result = await checkAuthenticationType();

    expect(result).toEqual({
      status: true,
      message: 'Authentication type is set on your device.',
    });
  });
});

describe('authenticateUser', () => {
  it('should return true if authentication is successful', async () => {
    LocalAuthentication.authenticateAsync.mockResolvedValue({success: true});

    const result = await authenticateUser();

    expect(result).toBe(true);
  });

  it('should return false if authentication fails', async () => {
    LocalAuthentication.authenticateAsync.mockResolvedValue({success: false});

    const result = await authenticateUser();

    expect(result).toBe(false);
  });
});
