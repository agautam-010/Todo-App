import EncryptedStorage from 'react-native-encrypted-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

// The structure of a todo item
export interface Todo {
  id: string;
  text: string;
}

// The shape of the store
interface TodoStore {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, text: string) => void;
}

const useTodoStore = create<TodoStore>()(
  persist(
    set => ({
      todos: [],

      // Add a new todo item
      addTodo: todo => set(state => ({todos: [...state.todos, todo]})),

      // Delete a todo item by ID
      deleteTodo: id =>
        set(state => ({
          todos: state.todos.filter(item => item.id !== id),
        })),

      // Update the text of a todo item by ID
      updateTodo: (id, text) =>
        set(state => ({
          todos: state.todos.map(item =>
            item.id === id ? {...item, text} : item,
          ),
        })),
    }),
    {
      name: 'todo-storage', // The name of the storage key
      storage: createJSONStorage(() => EncryptedStorage), // Storage that has be used for persisting todo data
    },
  ),
);

export default useTodoStore;
