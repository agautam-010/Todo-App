import {Todo} from '@store/useTodoStore';
import {ViewStyle} from 'react-native';

export type TodoActionType = 'DELETE' | 'EDIT';

interface EditTypes {
  editId: null | string;
  setEditId: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface TodoScreenProps extends EditTypes {
  todos: Todo[];
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  onTodoAction: (type?: TodoActionType, todo?: Todo) => void;
}

export interface TodoItemProps extends EditTypes {
  item: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
  index: number;
  style?: ViewStyle;
}
