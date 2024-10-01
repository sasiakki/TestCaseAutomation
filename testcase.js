Here are the Jest test cases for the login form based on the provided specifications:

```javascript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

describe('Login Component', () => {
  test('Render login form', () => {
    render(<Login />);
    expect(screen.getByLabelText(/Username:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  test('Successful login with correct credentials', () => {
    render(<Login />);
    const usernameInput = screen.getByLabelText(/Username:/i);
    const passwordInput = screen.getByLabelText(/Password:/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    expect(screen.getByText(/Login successful/i)).toBeInTheDocument();
  });

  test('Failed login with invalid username', () => {
    render(<Login />);
    const usernameInput = screen.getByLabelText(/Username:/i);
    const passwordInput = screen.getByLabelText(/Password:/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    fireEvent.change(usernameInput, { target: { value: 'invaliduser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    expect(screen.getByText(/Invalid username or password/i)).toBeInTheDocument();
  });

  test('Failed login with invalid password', () => {
    render(<Login />);
    const usernameInput = screen.getByLabelText(/Username:/i);
    const passwordInput = screen.getByLabelText(/Password:/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(loginButton);

    expect(screen.getByText(/Invalid username or password/i)).toBeInTheDocument();
  });

  test('Empty username validation', () => {
    render(<Login />);
    const passwordInput = screen.getByLabelText(/Password:/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    expect(screen.getByText(/Please enter both username and password/i)).toBeInTheDocument();
  });

  test('Empty password validation', () => {
    render(<Login />);
    const usernameInput = screen.getByLabelText(/Username:/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.click(loginButton);

    expect(screen.getByText(/Please enter both username and password/i)).toBeInTheDocument();
  });

  test('Both fields empty validation', () => {
    render(<Login />);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    fireEvent.click(loginButton);

    expect(screen.getByText(/Please enter both username and password/i)).toBeInTheDocument();
  });

  test('Login button state', () => {
    render(<Login />);
    const usernameInput = screen.getByLabelText(/Username:/i);
    const passwordInput = screen.getByLabelText(/Password:/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    expect(loginButton).toBeDisabled();

    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(loginButton).toBeEnabled();

    fireEvent.change(usernameInput, { target: { value: '' } });
    expect(loginButton).toBeDisabled();

    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: '' } });
    expect(loginButton).toBeDisabled();
  });
});
```