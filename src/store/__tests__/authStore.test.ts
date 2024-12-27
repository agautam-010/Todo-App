import useAuthStore from '@store/useAuthStore';
import {authenticateUser} from '@utils/biometricServices';
import {UTILS} from '@utils';

jest.mock('@utils/biometricServices', () => ({
  authenticateUser: jest.fn(),
}));

jest.mock('@utils', () => ({
  UTILS: {
    showErrorMessage: jest.fn(),
  },
}));

describe('useAuthStore', () => {
  beforeEach(() => {
    useAuthStore.setState({isAuthenticated: false, hasAuthentication: false});
    jest.clearAllMocks();
  });

  it('should authenticate successfully', async () => {
    authenticateUser.mockResolvedValue(true);
    await useAuthStore.getState().authenticate();
    await useAuthStore.getState().setIsAuthenticated();

    expect(useAuthStore.getState().isAuthenticated).toBe(true);
    expect(UTILS.showErrorMessage).not.toHaveBeenCalled();
  });

  it('should fail authentication', async () => {
    authenticateUser.mockResolvedValue(false);
    await useAuthStore.getState().authenticate();

    expect(useAuthStore.getState().isAuthenticated).toBe(false);
    expect(UTILS.showErrorMessage).toHaveBeenCalledWith(
      'Authentication failed. Please try again.',
    );
  });

  it('should handle authentication error', async () => {
    authenticateUser.mockRejectedValue(new Error('Some error'));
    await useAuthStore.getState().authenticate();

    expect(useAuthStore.getState().isAuthenticated).toBe(false);
    expect(UTILS.showErrorMessage).toHaveBeenCalledWith(
      'An unexpected error occurred during authentication.',
    );
  });

  it('should set authentication status to true when valid response is received', () => {
    const response = {message: 'Success', status: true};
    useAuthStore.getState().setHasAuthentication(response);

    expect(useAuthStore.getState().hasAuthentication).toBe(true);
    expect(UTILS.showErrorMessage).not.toHaveBeenCalled();
  });

  it('should set authentication status to false and show error when invalid response is received', () => {
    const response = {message: 'Authentication failed', status: false};
    useAuthStore.getState().setHasAuthentication(response);

    expect(useAuthStore.getState().hasAuthentication).toBe(false);
    expect(UTILS.showErrorMessage).toHaveBeenCalledWith(
      'Authentication failed',
    );
  });
});
