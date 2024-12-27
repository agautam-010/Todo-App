import {StyleSheet} from 'react-native';

import {THEME} from '@utils';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.white,
    paddingHorizontal: 0,
  },
  headWrap: {
    backgroundColor: THEME.COLORS.primary,
    height: '25%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headDate: {
    textAlign: 'center',
    color: THEME.COLORS.white,
    fontWeight: '500',
    letterSpacing: 2,
  },
  bodyWrap: {
    position: 'absolute',
    paddingHorizontal: 15,
    height: '100%',
  },
  contentWrap: {marginTop: '25%', flex: 1},
  smallList: {marginTop: '45%'},
  listWrap: {flex: 0.98, marginBottom: 5},
  listContainer: {
    backgroundColor: THEME.COLORS.secondary,
    borderRadius: 15,
  },
  emptyData: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  noRecordTitle: {textAlign: 'center'},
  listItem: {borderTopWidth: 0},
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: THEME.COLORS.white,
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: THEME.COLORS.secondary,
    borderRadius: 15,
    borderColor: THEME.COLORS.primary,
    borderWidth: 1.5,
    color: THEME.COLORS.primary,
  },
  inputBtnText: {fontWeight: 'bold'},
  addButton: {
    right: 3.5,
    borderRadius: 15,
    height: 'auto',
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderTopWidth: 1,
    borderColor: '#B8B8B8',
  },
  todoItemLeftWrap: {width: '80%'},
  todoItemRightWrap: {
    width: '20%',
    justifyContent: 'flex-end',
  },
  todoEditBtn: {marginRight: 10},
  todoItemRow: {width: 'auto'},
  todoItemDot: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  todoTextWrap: {width: '87%'},
  todoText: {
    color: THEME.COLORS.black,
    fontWeight: '600',
    marginLeft: 12,
  },
  todoTimeStamp: {
    fontSize: 11,
    color: THEME.COLORS.description,
    lineHeight: 25,
  },
  evenItem: {
    borderColor: '#57BCFB',
    backgroundColor: '#A5CFFB',
  },
  oddItem: {
    borderColor: '#8CCA8E',
    backgroundColor: '#CBE8CE',
  },
  cancelEditIcon: {
    width: 25,
    height: 25,
    tintColor: THEME.COLORS.red,
  },
  widthAuto: {width: 'auto'},
});
