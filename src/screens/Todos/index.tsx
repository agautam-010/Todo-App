import React, {useState, useCallback} from 'react';
import {LinearGradient} from 'react-native-linear-gradient';
import moment from 'moment';
import {
  NativeSyntheticEvent,
  Platform,
  TextInputContentSizeChangeEventData,
} from 'react-native';

import {
  Container,
  FlatList,
  Input,
  Button,
  Wrapper,
  Typography,
} from '@components';
import TodoItem from './TodoItem';

import {THEME} from '@utils';
import {Todo} from '@store/useTodoStore';

import {TodoScreenProps} from './types';
import styles from './styles';

const TodoScreen = ({
  todos,
  todo,
  setTodo,
  editId,
  onTodoAction,
  setEditId,
}: TodoScreenProps) => {
  const [inputHeight, setInputHeight] = useState(60);

  // Optimized input height calculation
  const onContentSizeChange = useCallback(
    (e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
      const {height} = e.nativeEvent.contentSize;
      setInputHeight(
        height > 60 ? height + (Platform.OS === 'ios' ? 60 : 10) : 60,
      );
    },
    [],
  );

  // Memoized render function for TodoItem
  const renderTodo = useCallback(
    ({item, index}: {item: Todo; index: number}) => (
      <TodoItem
        item={item}
        onEdit={() => onTodoAction('EDIT', item)}
        onDelete={() => onTodoAction('DELETE', item)}
        index={index}
        style={!index ? styles.listItem : {}}
        editId={editId}
        setEditId={setEditId}
      />
    ),
    [onTodoAction, editId],
  );

  return (
    <Container style={styles.container} barColor={THEME.COLORS.primary}>
      <LinearGradient
        style={styles.headWrap}
        colors={[
          THEME.COLORS.gradient.primary,
          THEME.COLORS.gradient.secondary,
          THEME.COLORS.gradient.third,
        ]}>
        <Typography
          style={styles.headDate}
          text={moment().format('MMM, DD, YYYY')}
        />
        <Typography style={[styles.title]} text="My Todo List" />
      </LinearGradient>
      <Wrapper style={styles.bodyWrap}>
        <Wrapper
          style={[styles.contentWrap, todos?.length < 2 && styles.smallList]}>
          <Wrapper
            style={[styles.listWrap, !todos?.length && styles.emptyData]}>
            {todos?.length ? (
              <FlatList
                contentContainerStyle={[styles.listContainer]}
                data={todos}
                renderItem={renderTodo}
                keyExtractor={item => item.id}
              />
            ) : (
              <Typography
                text={'No Records\nNo todos found, add few.'}
                style={styles.noRecordTitle}
                size={16}
                color={THEME.COLORS.primary}
              />
            )}
          </Wrapper>

          <Input
            value={todo}
            style={{...styles.input, height: inputHeight}}
            onChangeText={setTodo}
            placeholder="What's on your mind?"
            multiline
            placeholderTextColor={THEME.COLORS.placeholder}
            right={
              <Button
                testID="ADD_UPDATE"
                title={editId ? 'UPDATE' : 'ADD'}
                onPress={() => onTodoAction()}
                style={styles.addButton}
                textStyle={styles.inputBtnText}
              />
            }
            onContentSizeChange={onContentSizeChange}
          />
        </Wrapper>
      </Wrapper>
    </Container>
  );
};

export default TodoScreen;
