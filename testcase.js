Here's the Jest test code for the Login component based on the provided test cases:

```javascript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from './Login';

describe('Login component', () => {
  it('Test valid login credentials', () => {
    render(<Login />);
    const usernameInput = screen.getByLabelText('Username:');
    const passwordInput = screen.getByLabelText('Password:');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    expect(screen.getByText('Login successful')).toBeInTheDocument();
  });

  it('Test invalid username', () => {
    render(<Login />);
    const usernameInput = screen.getByLabelText('Username:');
    const passwordInput = screen.getByLabelText('Password:');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.change(usernameInput, { target: { value: 'invaliduser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    expect(screen.getByText('Invalid username or password')).toBeInTheDocument();
  });

  it('Test invalid password', () => {
    render(<Login />);
    const usernameInput = screen.getByLabelText('Username:');
    const passwordInput = screen.getByLabelText('Password:');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(loginButton);

    expect(screen.getByText('Invalid username or password')).toBeInTheDocument();
  });

  it('Test empty form submission', () => {
    render(<Login />);
    const loginButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.click(loginButton);

    expect(screen.getByText('Username is required')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });

  it('Test username field validation', () => {
    render(<Login />);
    const usernameInput = screen.getByLabelText('Username:');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.change(usernameInput, { target: { value: '' } });
    fireEvent.click(loginButton);

    expect(screen.getByText('Username is required')).toBeInTheDocument();
  });

  it('Test password field validation', () => {
    render(<Login />);
    const passwordInput = screen.getByLabelText('Password:');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.change(passwordInput, { target: { value: '' } });
    fireEvent.click(loginButton);

    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });

  it('Test login button functionality', () => {
    render(<Login />);
    const usernameInput = screen.getByLabelText('Username:');
    const passwordInput = screen.getByLabelText('Password:');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    expect(loginButton).toBeEnabled();

    fireEvent.change(usernameInput, { target: { value: 'invaliduser' } });
    fireEvent.change(passwordInput, { target: { value: 'invalidpass' } });

    expect(loginButton).toBeEnabled();

    fireEvent.click(loginButton);

    expect(screen.getByText('Invalid username or password')).toBeInTheDocument();
  });
});
```

This test code covers all the test cases provided in the JSON structure. It uses Jest and React Testing Library to render the Login component and simulate user interactions. The tests check for successful login, invalid credentials, form validation, and button functionality.