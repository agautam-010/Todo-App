import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Toast from 'react-native-toast-message';

import TodosScreen from '../index.container';
import Todos from '../';

import useTodoStore from '@store/useTodoStore';

// Mocking imports
jest.mock('@store/useTodoStore');
jest.mock('@utils/biometricServices');

describe('Todo Screen', () => {
  const todos = [
    {id: '1', text: 'Test Todo 1'},
    {id: '2', text: 'Test Todo 2'},
  ];
  const mockFn = jest.fn();

  beforeEach(() => {
    // Reset mocks before each test
    useTodoStore.mockReturnValue({
      todos,
      addTodo: jest.fn(),
      deleteTodo: jest.fn(),
      updateTodo: jest.fn(),
    });
  });

  it('should render correctly', async () => {
    const {toJSON} = render(<TodosScreen />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render todo items correctly', () => {
    const {getByText} = render(
      <Todos
        todos={todos}
        todo=""
        setTodo={mockFn}
        editId={null}
        onTodoAction={mockFn}
        setEditId={mockFn}
      />,
    );

    // Check if todos are displayed correctly
    expect(getByText('Test Todo 1')).toBeTruthy();
    expect(getByText('Test Todo 2')).toBeTruthy();
  });

  it('should call addTodo when add button is pressed', async () => {
    const {getByTestId} = render(
      <Todos
        todos={todos}
        todo="New Todo"
        setTodo={mockFn}
        editId={null}
        onTodoAction={mockFn}
        setEditId={mockFn}
      />,
    );

    const addButton = getByTestId('ADD_UPDATE');
    fireEvent.press(addButton);

    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith();
  });

  it('should call updateTodo when update button is pressed', async () => {
    const onTodoActionMock = jest.fn();
    const {getByPlaceholderText, getByTestId} = render(
      <Todos
        todos={todos}
        todo="Updated Todo"
        setTodo={mockFn}
        editId="1"
        onTodoAction={onTodoActionMock}
        setEditId={mockFn}
      />,
    );

    const input = getByPlaceholderText("What's on your mind?");
    fireEvent.changeText(input, 'Updated Todo');

    const updateButton = getByTestId('ADD_UPDATE');
    fireEvent.press(updateButton);

    expect(onTodoActionMock).toHaveBeenCalledTimes(1);
    expect(onTodoActionMock).toHaveBeenCalledWith();
  });

  it('should call deleteTodo when remove button is pressed', async () => {
    const onTodoActionMock = jest.fn();
    const {getByTestId} = render(
      <Todos
        todos={todos}
        todo=""
        setTodo={mockFn}
        editId=""
        onTodoAction={onTodoActionMock}
        setEditId={mockFn}
      />,
    );

    const deleteButton = getByTestId('REMOVE0');
    fireEvent.press(deleteButton);

    expect(onTodoActionMock).toHaveBeenCalledTimes(1);
    expect(onTodoActionMock).toHaveBeenCalledWith('DELETE', todos[0]);
  });

  it('should show validation error when trying to add an empty todo', () => {
    jest.spyOn(Toast, 'show').mockImplementation(() => {});
    const {getByTestId, getByPlaceholderText} = render(<TodosScreen />);

    const input = getByPlaceholderText("What's on your mind?");
    const addButton = getByTestId('ADD_UPDATE');

    // Ensure the input starts empty
    expect(input.props.value).toBe('');

    // Simulate pressing the add button without entering text
    fireEvent.press(addButton);

    expect(Toast.show).toHaveBeenCalledWith({
      type: 'error',
      text1: 'Validation Error',
      text2: 'Todo cannot be empty',
      position: 'bottom',
      bottomOffset: 100,
    });
  });

  it('should pre-fill input with todo text when editing', () => {
    const {getByTestId, getByPlaceholderText} = render(<TodosScreen />);

    const editButton = getByTestId('EDIT0');
    fireEvent.press(editButton);

    const input = getByPlaceholderText("What's on your mind?");
    expect(input.props.value).toBe('Test Todo 1');

    fireEvent.changeText(input, 'New Todo 1 updated');
    expect(input.props.value).toBe('New Todo 1 updated');
  });

  it('should handle EDIT action in onTodoAction', async () => {
    const onTodoActionMock = jest.fn();
    const {getByTestId} = render(
      <Todos
        todos={todos}
        todo=""
        setTodo={mockFn}
        editId=""
        onTodoAction={onTodoActionMock}
        setEditId={mockFn}
      />,
    );

    const editButton = getByTestId('EDIT0');
    fireEvent.press(editButton);

    expect(onTodoActionMock).toHaveBeenCalledTimes(1);
    expect(onTodoActionMock).toHaveBeenCalledWith('EDIT', todos[0]);
  });
});
