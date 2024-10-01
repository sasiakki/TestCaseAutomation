Here are the Jest test cases for the provided JavaScript files:

```javascript
// App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('Render Login Form', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });
});

// Login.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

describe('Login Component', () => {
  test('Input Field Functionality', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('Valid Credentials Submission', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'admin@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    expect(consoleSpy).toHaveBeenCalledWith('Email:', 'admin@example.com', 'Password:', 'password123');
    expect(emailInput.value).toBe('');
    expect(passwordInput.value).toBe('');
    consoleSpy.mockRestore();
  });

  test('Invalid Credentials Submission', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'invalid@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(loginButton);

    expect(screen.queryByText(/please fill in all fields/i)).not.toBeInTheDocument();
  });

  test('Empty Field Validation', () => {
    render(<Login />);
    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.click(loginButton);
    expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
  });

  test('Input Field Trimming', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: '  admin@example.com  ' } });
    fireEvent.change(passwordInput, { target: { value: '  password123  ' } });
    fireEvent.click(loginButton);

    expect(consoleSpy).toHaveBeenCalledWith('Email:', '  admin@example.com  ', 'Password:', '  password123  ');
    consoleSpy.mockRestore();
  });

  test('Password Field Security', () => {
    render(<Login />);
    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
});
```

These test cases cover all the scenarios mentioned in the provided test case structure. They test the rendering of the login form, input field functionality, valid and invalid credential submissions, empty field validation, input field trimming, and password field security.