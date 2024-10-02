Here are the Jest test cases for the Login component based on the provided code:

```javascript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

describe('Login', () => {
  it('Should render username and password input fields', () => {
    render(<Login />);
    expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password:/i)).toBeInTheDocument();
  });

  it('Should render a login button', () => {
    render(<Login />);
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  it('Should call validation function on login button click', () => {
    render(<Login />);
    const loginButton = screen.getByRole('button', { name: /Login/i });
    fireEvent.click(loginButton);
    expect(screen.getByText(/Please fill in all fields/i)).toBeInTheDocument();
  });

  it('Should successfully log in with valid credentials', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/Email:/i);
    const passwordInput = screen.getByLabelText(/Password:/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    fireEvent.change(emailInput, { target: { value: 'admin@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    expect(screen.queryByText(/Please fill in all fields/i)).not.toBeInTheDocument();
  });

  it('Should show error message for invalid credentials', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/Email:/i);
    const passwordInput = screen.getByLabelText(/Password:/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    fireEvent.change(emailInput, { target: { value: 'invalid@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(loginButton);

    expect(screen.queryByText(/Please fill in all fields/i)).not.toBeInTheDocument();
  });

  it('Should not allow login with empty fields', () => {
    render(<Login />);
    const loginButton = screen.getByRole('button', { name: /Login/i });
    fireEvent.click(loginButton);
    expect(screen.getByText(/Please fill in all fields/i)).toBeInTheDocument();
  });
});
```