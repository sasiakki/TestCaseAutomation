Here's the Jest test code for the Login component based on the requirements:

```javascript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

describe('Login Component', () => {
  const setup = () => {
    render(<Login />);
    const usernameInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const loginButton = screen.getByRole('button', { name: /login/i });
    return { usernameInput, passwordInput, loginButton };
  };

  test('Test valid login credentials', () => {
    const { usernameInput, passwordInput, loginButton } = setup();
    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);
    expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
  });

  test('Test invalid username', () => {
    const { usernameInput, passwordInput, loginButton } = setup();
    fireEvent.change(usernameInput, { target: { value: 'invaliduser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);
    expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
  });

  test('Test invalid password', () => {
    const { usernameInput, passwordInput, loginButton } = setup();
    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: 'invalidpassword' } });
    fireEvent.click(loginButton);
    expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
  });

  test('Test empty username field', () => {
    const { passwordInput, loginButton } = setup();
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);
    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('Test empty password field', () => {
    const { usernameInput, loginButton } = setup();
    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.click(loginButton);
    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('Test empty username and password fields', () => {
    const { loginButton } = setup();
    fireEvent.click(loginButton);
    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('Test username case sensitivity', () => {
    const { usernameInput, passwordInput, loginButton } = setup();
    fireEvent.change(usernameInput, { target: { value: 'AdMiN' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);
    expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
  });

  test('Test password case sensitivity', () => {
    const { usernameInput, passwordInput, loginButton } = setup();
    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: 'PaSsWoRd123' } });
    fireEvent.click(loginButton);
    expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
  });

  test('Test trimming whitespace from inputs', () => {
    const { usernameInput, passwordInput, loginButton } = setup();
    fireEvent.change(usernameInput, { target: { value: '  admin  ' } });
    fireEvent.change(passwordInput, { target: { value: '  password123  ' } });
    fireEvent.click(loginButton);
    expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
  });
});
```