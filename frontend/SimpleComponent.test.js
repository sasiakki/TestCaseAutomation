import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

function SimpleComponent() {
  return <div>Hello, World!</div>;
}

test('renders SimpleComponent', () => {
  render(<SimpleComponent />);
  const element = screen.getByText(/Hello, World!/i);
  expect(element).toBeInTheDocument();
});
