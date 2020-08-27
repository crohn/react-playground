import React from 'react';
import { render } from 'test-utils';
import { GridLayout } from '../GridLayout';

describe('GridLayout component', () => {
  it('renders just title', () => {
    const { getByText } = render(<GridLayout />);

    expect(getByText(/react grid layout/i)).toBeInTheDocument();
  });
});
