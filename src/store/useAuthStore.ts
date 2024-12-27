import {create} from 'zustand';

import {UTILS} from '@utils';
import {authenticateUser} from '@utils/biometricServices';
import {reportError} from '@utils/functions';

// Interface for the authentication response
export interface AuthResponseProps {
  message: string;
  status: boolean;
}

// State and actions for authentication
interface AuthState {
  isAuthenticated: boolean;
  hasAuthentication: boolean;
  setIsAuthenticated: () => void;
  setHasAuthentication: (response: AuthResponseProps) => void;
  authenticate: () => Promise<boolean>;
}

// Store for authentication
const useAuthStore = create<AuthState>(set => ({
  isAuthenticated: false,
  hasAuthentication: false,

  // Updates the biometric authentication status
  setHasAuthentication: ({message, status}) => {
    if (message) {
      if (status) {
        set({hasAuthentication: true});
      } else {
        UTILS.showErrorMessage(message);
      }
    }
  },

  // Handles setting isAuthenticated
  setIsAuthenticated: () => set({isAuthenticated: true}),

  // Handles user authentication logic
  authenticate: async () => {
    try {
      const success = await authenticateUser(); // Attempt biometric authentication
      if (success) {
        return true;
      } else {
        // Show error message as authenticateUser failed to authenticate
        UTILS.showErrorMessage('Authentication failed. Please try again.'); // Show error in toast
        return false;
      }
    } catch (error) {
      reportError(error); // Log error for debugging
      UTILS.showErrorMessage(
        'An unexpected error occurred during authentication.',
      );
      return false;
    }
  },
}));

export default useAuthStore;
