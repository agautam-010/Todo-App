import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);

jest.mock('react-native-encrypted-storage', () => {
  return {
    setItem: jest.fn(),
    getItem: jest.fn(),
    removeItem: jest.fn(),
  };
});

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useRoute: jest.fn(() => ({
      params: {},
    })),
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: jest.fn(),
    }),
  };
});

jest.mock('expo-local-authentication', () => {
  return {
    isEnrolledAsync: jest.fn(),
    authenticateAsync: jest.fn(),
    hasHardwareAsync: jest.fn(),
    getEnrolledLevelAsync: jest.fn(),
  };
});

jest.mock('@expo/vector-icons', () => ({
  Ionicons: '',
  MaterialIcons: '',
}));

jest.useFakeTimers();
