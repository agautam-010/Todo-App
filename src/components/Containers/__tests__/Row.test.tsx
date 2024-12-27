import React from 'react';
import {render} from '@testing-library/react-native';
import {Row} from '../Row';

describe('Testing Row', () => {
  it('renders eow correctly', async () => {
    const {toJSON} = render(<Row />);
    expect(toJSON()).toMatchSnapshot();
  });
});
