import { render } from '@testing-library/react';
import React from 'react';
import MainApp from './App';

test('renders learn react link', () => {
  const { getByText } = render(<MainApp />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
