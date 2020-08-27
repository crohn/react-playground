import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Home } from '../Home';

describe('Home component', () => {
  it('renders the list of projects', () => {
    const { getByText } = render(<Home />, { wrapper: MemoryRouter });

    expect(getByText(/pizza menu filter/i)).toBeInTheDocument();
    expect(getByText(/react grid layout/i)).toBeInTheDocument();
  });
});
