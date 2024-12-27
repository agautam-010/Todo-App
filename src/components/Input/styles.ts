import {StyleSheet} from 'react-native';
import {COLORS} from '@utils/theme';

export default StyleSheet.create({
  chatInpWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputContainer: {
    width: '100%',
    justifyContent: 'center',
    borderColor: COLORS.grey,
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 8,
  },
  inputContainerShadow: {
    shadowColor: '#4f4f4f',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    fontSize: 16,
  },
  inputRightBtn: {
    position: 'absolute',
    right: 0,
  },
  inputLeftBtn: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
  },
  inputIcon: {
    width: 20,
    height: 20,
    tintColor: '#305ff5',
  },
  inputLabel: {marginBottom: 10, fontSize: 15},
  ios: {
    textAlign: 'left',
    paddingTop: 8,
    paddingBottom: 8,
  },
});
