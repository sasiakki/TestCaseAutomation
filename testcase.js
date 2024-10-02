Here are the Jest test cases for the login form based on the specifications provided:

```javascript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

describe('Login Component', () => {
  const setup = () => {
    render(<Login />);
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });
    return { usernameInput, passwordInput, loginButton };
  };

  const login = (username, password) => {
    const { usernameInput, passwordInput, loginButton } = setup();
    fireEvent.change(usernameInput, { target: { value: username } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.click(loginButton);
  };

  test('valid login credentials', () => {
    login('admin', 'password123');
    expect(screen.queryByText(/invalid credentials/i)).not.toBeInTheDocument();
  });

  test('invalid username', () => {
    login('invaliduser', 'password123');
    expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
  });

  test('invalid password', () => {
    login('admin', 'wrongpassword');
    expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
  });

  test('empty username field', () => {
    login('', 'password123');
    expect(screen.getByText(/username is required/i)).toBeInTheDocument();
  });

  test('empty password field', () => {
    login('admin', '');
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });

  test('empty username and password fields', () => {
    login('', '');
    expect(screen.getByText(/username is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });

  test('case-sensitivity of the username', () => {
    login('ADMIN', 'password123');
    expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
  });

  test('case-sensitivity of the password', () => {
    login('admin', 'PASSWORD123');
    expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
  });

  test('trimming of whitespace in username and password', () => {
    login(' admin ', ' password123 ');
    expect(screen.queryByText(/invalid credentials/i)).not.toBeInTheDocument();
  });
});
```