import React from 'react';
import {render, fireEvent, act} from '@testing-library/react-native';
import {AppState} from 'react-native';

import LocalAuthenticate from '../index.container';
import LocalAuthenticateScreen from '../';

import useAuthStore from '@store/useAuthStore';
import * as biometricServicesUtils from '@utils/biometricServices';

// Mocking imports
jest.mock('@store/useAuthStore');
jest.mock('@utils/biometricServices');

describe('LocalAuthenticate', () => {
  beforeEach(() => {
    // Reset mocks before each test
    useAuthStore.mockReturnValue({
      hasAuthentication: false,
      setHasAuthentication: jest.fn(),
      authenticate: jest.fn(),
    });
    biometricServicesUtils.checkAuthenticationType.mockResolvedValue({
      status: true,
    });
  });

  it('should check and update authentication status when app becomes active', async () => {
    render(<LocalAuthenticate />);

    // Manually simulate AppState change to 'active'
    await act(async () => {
      AppState.currentState = 'active'; // Change the app state manually
      // Trigger the AppState listener callback directly
      AppState.addEventListener.mock.calls[0][1]('active');
    });

    expect(
      biometricServicesUtils.checkAuthenticationType,
    ).toHaveBeenCalledTimes(1);
  });

  it('should call authenticate when Go to Authenticate is pressed', async () => {
    // Mock the setAuthentictionType function
    const mockSetAuthentictionType = jest.fn();
    const mockOnAuthenticatePress = jest.fn();

    const {getByTestId} = render(
      <LocalAuthenticateScreen
        hasAuthentication={true}
        setAuthentictionType={mockSetAuthentictionType}
        onAuthenticatePress={mockOnAuthenticatePress}
      />,
    );

    // Find the "Go to Settings" button by testID
    const goToSettingsButton = getByTestId('authenticate-button');
    fireEvent.press(goToSettingsButton);

    // Check if setAuthentictionType was called
    expect(mockOnAuthenticatePress).toHaveBeenCalledTimes(1);
    expect(mockOnAuthenticatePress).toHaveBeenCalledWith(); // Optional: to check if arguments were passed
  });

  it('should call setAuthentictionType when Go to Settings button is pressed', async () => {
    // Mock the setAuthentictionType function
    const mockSetAuthentictionType = jest.fn();
    const mockOnAuthenticatePress = jest.fn();

    const {getByTestId} = render(
      <LocalAuthenticateScreen
        hasAuthentication={false}
        setAuthentictionType={mockSetAuthentictionType}
        onAuthenticatePress={mockOnAuthenticatePress}
      />,
    );

    // Find the "Go to Settings" button by testID
    const goToSettingsButton = getByTestId('authenticate-type');
    fireEvent.press(goToSettingsButton);

    // Check if setAuthentictionType was called
    expect(mockSetAuthentictionType).toHaveBeenCalledTimes(1);
    expect(mockSetAuthentictionType).toHaveBeenCalledWith(); // Optional: to check if arguments were passed
  });

  it('should subscribe and unsubscribe to AppState changes', () => {
    const {unmount} = render(<LocalAuthenticate />);

    // Check if AppState subscription is set up
    const spy = jest.spyOn(AppState, 'addEventListener');
    expect(spy).toHaveBeenCalledWith('change', expect.any(Function));

    const subscription = spy.mock.results[0].value;
    const removeEventListenerSpy = jest.spyOn(subscription, 'remove');

    // Unmount the component to test cleanup
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(1);
  });
});
