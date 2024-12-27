import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Button} from '@components';

describe('Testing Button Component', () => {
  it('renders button successfully with a title', () => {
    const {toJSON, getByText} = render(
      <Button title="Click Me" onPress={() => {}} />,
    );
    expect(toJSON()).toMatchSnapshot();
    expect(getByText('Click Me')).toBeTruthy(); // Check if the title is rendered
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const {getByText} = render(
      <Button title="Click Me" onPress={onPressMock} />,
    );

    fireEvent.press(getByText('Click Me'));
    expect(onPressMock).toHaveBeenCalled(); // Ensure onPress is called when button is pressed
  });

  it('renders button with correct loader color', () => {
    const {getByTestId} = render(
      <Button
        title="Loading"
        inProgress={true}
        loaderColor="green"
        onPress={() => {}}
      />,
    );
    const loader = getByTestId('BTN_LOADER');
    expect(loader.props.color).toBe('green'); // Ensure loader color is correctly applied
  });
});
