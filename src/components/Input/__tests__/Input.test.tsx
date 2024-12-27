import React from 'react';
import {render} from '@testing-library/react-native';
import {Input} from '@components';

describe('Testing Input Component', () => {
  it('Renders Input Successfully', async () => {
    let {toJSON} = render(<Input />);
    expect(toJSON()).toMatchSnapshot();
  });
});
