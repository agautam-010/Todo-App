import {StyleSheet} from 'react-native';
import {THEME} from '@utils';

export default StyleSheet.create({
  btnStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 30,
  },
  btnText: {
    color: THEME.COLORS.white,
    fontSize: 17,
  },
});
