import {StyleSheet} from 'react-native';
import {THEME} from '@utils';
export default StyleSheet.create({
  screenContainer: {paddingHorizontal: 0, backgroundColor: THEME.COLORS.white},
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 20,
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: THEME.COLORS.title,
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    color: THEME.COLORS.description,
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: THEME.COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
});
