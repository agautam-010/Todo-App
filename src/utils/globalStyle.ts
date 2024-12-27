import {ViewStyle} from 'react-native';

export const container: ViewStyle = {
  flex: 1,
  width: '100%',
};

export const wrap: ViewStyle = {
  width: '100%',
  marginTop: 10,
};

export const row: ViewStyle = {
  width: '100%',
  flexDirection: 'row',
};

export const centerItem: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};
const GlobalStyle = {
  container,
  wrap,
  row,
  centerItem,
};
export const gestureHandler = {flex: 1};
export default GlobalStyle;
