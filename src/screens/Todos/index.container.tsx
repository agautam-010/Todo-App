import React, {useCallback, useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';

import TodoScreen from './';
import useTodoStore, {Todo} from '@store/useTodoStore';
import useAuthStore from '@store/useAuthStore';

import {TodoActionType} from './types';

export default function Todos() {
  const {authenticate} = useAuthStore();
  const {todos, addTodo, deleteTodo, updateTodo} = useTodoStore();
  const [todo, setTodo] = useState('');
  const [editId, setEditId] = useState<string | null>(null);

  // Handles adding or updating a todo
  const onAddOrUpdateTodo = useCallback(async () => {
    const trimmedTodo = todo.trim();
    if (trimmedTodo) {
      const isAuthenticated = await authenticate(); // Before doing any action authenticate first
      if (isAuthenticated) {
        // Update todo item if there is editId
        if (editId) {
          updateTodo(editId, trimmedTodo);
          setEditId(null);
        } else {
          addTodo({id: Date.now().toString(), text: trimmedTodo});
        }
        setTodo('');
      }
    } else {
      // Show error in toast if {todo} state is empty
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Todo cannot be empty',
        position: 'bottom',
        bottomOffset: 100,
      });
    }
  }, [todo, editId, addTodo, updateTodo]);

  // Handles setting the edit state for a todo
  const onEditTodo = useCallback((item: Todo) => {
    setEditId(item.id);
    setTodo(item.text);
  }, []);

  // Centralized action handler
  const onTodoAction = useCallback(
    async (type?: TodoActionType, item?: Todo) => {
      if (type === 'EDIT' && item) {
        onEditTodo(item);
      } else if (type === 'DELETE' && item) {
        const isAuthenticated = await authenticate();
        if (isAuthenticated) deleteTodo(item.id);
        if (editId && editId === item.id) setTodo('');
      } else {
        onAddOrUpdateTodo();
      }
    },
    [onAddOrUpdateTodo, onEditTodo, deleteTodo],
  );

  /* 
    While toggling edit button on todo item if there is no `editId` and `todo` is not empty,
    reset the `todo` state to an empty string 
   */
  useEffect(() => {
    if (!editId && todo) setTodo('');
  }, [editId]);

  return (
    <TodoScreen {...{todos, todo, setTodo, editId, onTodoAction, setEditId}} />
  );
}
