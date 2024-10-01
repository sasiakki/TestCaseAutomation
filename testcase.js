Here are the Jest test cases for the provided JavaScript files:

```javascript
// App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Login component', () => {
  render(<App />);
  const loginElement = screen.getByText(/Login/i);
  expect(loginElement).toBeInTheDocument();
});

// Login.test.js
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

  test('Valid login', () => {
    render(<Login />);
    const usernameInput = screen.getByLabelText(/Username:/i);
    const passwordInput = screen.getByLabelText(/Password:/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    const mockLogin = jest.fn();
    Login.prototype.handleLogin = mockLogin;
    
    fireEvent.click(loginButton);
    
    expect(mockLogin).toHaveBeenCalledWith('admin', 'password123');
  });

  test('Invalid username', () => {
    render(<Login />);
    const usernameInput = screen.getByLabelText(/Username:/i);
    const passwordInput = screen.getByLabelText(/Password:/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    fireEvent.change(usernameInput, { target: { value: 'invaliduser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    expect(screen.getByText(/Invalid username or password/i)).toBeInTheDocument();
  });

  test('Invalid password', () => {
    render(<Login />);
    const usernameInput = screen.getByLabelText(/Username:/i);
    const passwordInput = screen.getByLabelText(/Password:/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(loginButton);

    expect(screen.getByText(/Invalid username or password/i)).toBeInTheDocument();
  });

  test('Empty username', () => {
    render(<Login />);
    const passwordInput = screen.getByLabelText(/Password:/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    expect(screen.getByText(/Please enter both username and password/i)).toBeInTheDocument();
  });

  test('Empty password', () => {
    render(<Login />);
    const usernameInput = screen.getByLabelText(/Username:/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.click(loginButton);

    expect(screen.getByText(/Please enter both username and password/i)).toBeInTheDocument();
  });

  test('Both fields empty', () => {
    render(<Login />);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    fireEvent.click(loginButton);

    expect(screen.getByText(/Please enter both username and password/i)).toBeInTheDocument();
  });

  test('Trim whitespace', () => {
    render(<Login />);
    const usernameInput = screen.getByLabelText(/Username:/i);
    const passwordInput = screen.getByLabelText(/Password:/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    fireEvent.change(usernameInput, { target: { value: ' admin ' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    const mockLogin = jest.fn();
    Login.prototype.handleLogin = mockLogin;
    
    fireEvent.click(loginButton);
    
    expect(mockLogin).toHaveBeenCalledWith('admin', 'password123');
  });

  test('Case sensitivity', () => {
    render(<Login />);
    const usernameInput = screen.getByLabelText(/Username:/i);
    const passwordInput = screen.getByLabelText(/Password:/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    fireEvent.change(usernameInput, { target: { value: 'Admin' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    expect(screen.getByText(/Invalid username or password/i)).toBeInTheDocument();
  });

  test('Login button state', () => {
    render(<Login />);
    const usernameInput = screen.getByLabelText(/Username:/i);
    const passwordInput = screen.getByLabelText(/Password:/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    expect(loginButton).toBeEnabled();

    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(loginButton).toBeEnabled();

    fireEvent.change(usernameInput, { target: { value: '' } });
    fireEvent.change(passwordInput, { target: { value: '' } });
    expect(loginButton).toBeEnabled();
  });
});

// index.test.js
import React from 'react';
import { render } from '@testing-library/react';
import { createRoot } from 'react-dom/client';
import App from './App';

jest.mock('react-dom/client', () => ({
  createRoot: jest.fn(() => ({
    render: jest.fn(),
  })),
}));

test('renders without crashing', () => {
  const div = document.createElement('div');
  div.id = 'root';
  document.body.appendChild(div);
  require('./index.js');
  expect(createRoot).toHaveBeenCalledWith(div);
});
```