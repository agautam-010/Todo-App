import Toast from 'react-native-toast-message';
import {lightOrDark, showErrorMessage, reportError} from '../functions';

jest.mock('react-native-toast-message', () => ({
  show: jest.fn(), // mock the show method
}));

describe('lightOrDark', () => {
  it('should return dark for dark RGB color', () => {
    const result = lightOrDark('rgb(0, 0, 0)');
    expect(result).toBe('dark');
  });

  it('should return light for light RGB color', () => {
    const result = lightOrDark('rgb(255, 255, 255)');
    expect(result).toBe('light');
  });

  it('should return dark for dark hex color', () => {
    const result = lightOrDark('#000000');
    expect(result).toBe('dark');
  });

  it('should return light for light hex color', () => {
    const result = lightOrDark('#FFFFFF');
    expect(result).toBe('light');
  });

  it('should handle rgba colors with alpha channel', () => {
    const result = lightOrDark('rgba(0, 0, 0, 0.5)');
    expect(result).toBe('dark');
  });
});

describe('showErrorMessage', () => {
  it('should call Toast.show with correct parameters', () => {
    const message = 'An error occurred';
    showErrorMessage(message);

    expect(Toast.show).toHaveBeenCalledWith({
      type: 'error',
      text1: message,
      position: 'bottom',
      bottomOffset: 100,
    });
  });
});

describe('reportError', () => {
  beforeEach(() => {
    console.log = jest.fn(); // Mock console.log
  });

  it('should log the error message', () => {
    const error = 'Some error occurred';

    reportError(error);

    expect(console.log).toHaveBeenCalledWith(error); // Should log the original error
  });

  it('should catch and log errors from catch block', () => {
    // Force the try-catch block to throw
    const error = 'Some error occurred';
    console.log.mockImplementationOnce(() => {
      throw new Error(error);
    });

    reportError(error);

    expect(console.log).toHaveBeenCalledWith('Some error occurred');
    expect(console.log).toHaveBeenCalledWith('Original error:', error);
  });
});
