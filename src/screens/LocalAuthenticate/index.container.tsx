import React, {useEffect, useCallback} from 'react';
import {AppState, AppStateStatus} from 'react-native';

import LocalAuthenticateScreen from './';
import {
  setAuthentictionType,
  checkAuthenticationType,
} from '@utils/biometricServices';
import useAuthStore from '@store/useAuthStore';

function LocalAuthenticate() {
  const {
    hasAuthentication,
    setHasAuthentication,
    setIsAuthenticated,
    authenticate,
  } = useAuthStore();

  // Function to check and update authentication type
  const checkAndUpdateAuthentication = useCallback(async () => {
    const response = await checkAuthenticationType();
    if (response?.status) {
      setHasAuthentication(response);
    }
  }, [setHasAuthentication]);

  // Handle app state changes
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active' && !hasAuthentication) {
        checkAndUpdateAuthentication();
      }
    };

    // Check authentication when the app is active initially
    if (AppState.currentState === 'active' && !hasAuthentication) {
      checkAndUpdateAuthentication();
    }

    // Subscribe to AppState changes
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove(); // Clean up listener
    };
  }, [checkAndUpdateAuthentication, hasAuthentication]);

  // Handle user authentication
  const onAuthenticatePress = useCallback(async () => {
    const isAuthenticated = await authenticate();
    if (isAuthenticated) setIsAuthenticated();
  }, [authenticate]);

  return (
    <LocalAuthenticateScreen
      {...{hasAuthentication, setAuthentictionType, onAuthenticatePress}}
    />
  );
}

export default LocalAuthenticate;
