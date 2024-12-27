import React from 'react';
import {render} from '@testing-library/react-native';
import {Card} from '../Card';

describe('Testing Card', () => {
  it('renders Card correctly', async () => {
    const {toJSON} = render(<Card />);
    expect(toJSON()).toMatchSnapshot();
  });
});
