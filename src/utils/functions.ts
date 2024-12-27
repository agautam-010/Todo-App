import Toast from 'react-native-toast-message';

// Determines whether a color is light or dark
export function lightOrDark(color: any) {
  let r, g, b;
  if (color.match(/^rgb/)) {
    // Check if the color is in RGB format
    color = color.match(
      /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/,
    );
    r = parseInt(color[1], 10);
    g = parseInt(color[2], 10);
    b = parseInt(color[3], 10);
  } else {
    // If the color is in hex format, convert it to RGB
    color = +('0x' + color.slice(1).replace(color.length < 5 && /./g, '$&$&'));
    r = color >> 16;
    g = (color >> 8) & 255;
    b = color & 255;
  }
  // Calculate the perceived brightness (HSP)
  const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
  const type = hsp > 127.5 ? 'light' : 'dark';
  return type;
}

// Get opposite bar style depending upon the type of barColor
export const getStatusBarStyle = (barColor: string) => {
  const type = lightOrDark(barColor);
  return type === 'light' ? 'dark-content' : 'light-content';
};

// Shows an error message using a Toast
export const showErrorMessage = (message: string) => {
  Toast.show({
    type: 'error',
    text1: message,
    position: 'bottom',
    bottomOffset: 100,
  });
};

// Logs an error to the console and handles fallback if logging fails
export const reportError = (e: any) => {
  try {
    console.log(e);
  } catch (e2) {
    console.log('Original error:', e);
  }
};
