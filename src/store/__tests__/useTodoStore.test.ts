import EncryptedStorage from 'react-native-encrypted-storage';
import useTodoStore, {Todo} from '../useTodoStore';

describe('useTodoStore', () => {
  it('should add a todo item', () => {
    const todo: Todo = {id: '1', text: 'Test Todo'};
    // Add the todo to the store
    useTodoStore.getState().addTodo(todo);

    expect(useTodoStore.getState().todos).toEqual([todo]);
  });

  it('should delete a todo item by ID', () => {
    const todo: Todo = {id: '1', text: 'Test Todo'};
    useTodoStore.getState().addTodo(todo);

    useTodoStore.getState().deleteTodo('1');

    expect(useTodoStore.getState().todos).toEqual([]);
  });

  it('should update the text of a todo item by ID', () => {
    const todo: Todo = {id: '1', text: 'Test Todo'};
    useTodoStore.getState().addTodo(todo);

    useTodoStore.getState().updateTodo('1', 'Updated Text');

    expect(useTodoStore.getState().todos[0].text).toBe('Updated Text');
  });

  it('should persist todos in EncryptedStorage', () => {
    const todo: Todo = {id: '1', text: 'Test Todo'};

    // Mock the setItem method to simulate persistence
    EncryptedStorage.setItem.mockResolvedValueOnce(null);

    useTodoStore.getState().addTodo(todo);

    expect(EncryptedStorage.setItem).toHaveBeenCalledWith(
      'todo-storage',
      JSON.stringify({
        state: {
          todos: [{id: '1', text: 'Test Todo'}],
        },
        version: 0,
      }),
    );
  });
});
