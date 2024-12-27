import React from 'react';
import {render} from '@testing-library/react-native';
import {Typography} from '@components';

describe('Testing Typography', () => {
  it('renders Typography correctly', async () => {
    const {toJSON} = render(<Typography text="Hello world" />);
    expect(toJSON()).toMatchSnapshot();
  });
});
