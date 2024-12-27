import React from 'react';
import {render} from '@testing-library/react-native';
import {Typography, Container} from '@components';

describe('Testing Container', () => {
  it('renders container correctly', async () => {
    const {toJSON} = render(
      <Container>
        <Typography>Testing</Typography>
      </Container>,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
