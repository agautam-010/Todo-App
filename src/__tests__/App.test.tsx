import React from 'react';
import {render} from '@testing-library/react-native';

import App from '../';
import {Stack} from '@navigators';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
}));

describe('App Component', () => {
  it('renders correctly', () => {
    render(<App />);
    expect(Stack).toBeDefined();
  });
});
