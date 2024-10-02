Here's the Jest test code for the Login component based on the specifications provided:

```javascript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

describe('Login Component', () => {
  test('renders login form', () => {
    render(<Login />);
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  test('renders username and password fields', () => {
    render(<Login />);
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
  });

  test('renders login button', () => {
    render(<Login />);
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  test('validates correct credentials', () => {
    render(<Login />);
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'admin' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
  });

  test('validates incorrect username', () => {
    render(<Login />);
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'wronguser' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
  });

  test('validates incorrect password', () => {
    render(<Login />);
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'admin' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
  });

  test('validates empty fields', () => {
    render(<Login />);
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });
});
```