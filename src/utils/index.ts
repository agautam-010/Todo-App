import {
  Platform,
  Alert,
  Keyboard,
  Dimensions,
  StyleSheet,
  BackHandler,
  Share,
  Linking,
} from 'react-native';

const RNApis = {
  Platform,
  Alert,
  Keyboard,
  Dimensions,
  StyleSheet,
  BackHandler,
  Share,
  Linking,
};

import * as UTILS from './functions';
import * as THEME from './theme';
import * as Types from './types';
import {IMAGES, ICONS} from './images';
import GLOBAL_STYLE from './globalStyle';

export {RNApis, UTILS, THEME, Types, GLOBAL_STYLE, IMAGES, ICONS};
