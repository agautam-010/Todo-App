import React from 'react';
import {render} from '@testing-library/react-native';
import {Wrapper} from '../Wrapper';

describe('Testing Wrapper', () => {
  it('renders Wrapper correctly', async () => {
    const {toJSON} = render(<Wrapper />);
    expect(toJSON()).toMatchSnapshot();
  });
});
