import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from './Login';

describe('Login component', () => {
  it('should render login form', () => {
    const { getByLabelText, getByRole } = render(<Login />);
    expect(getByLabelText('Username:')).toBeInTheDocument();
    expect(getByLabelText('Password:')).toBeInTheDocument();
    expect(getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('should update input fields', () => {
    const { getByLabelText } = render(<Login />);
    const usernameInput = getByLabelText('Username:');
    const passwordInput = getByLabelText('Password:');
    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(usernameInput.value).toBe('admin');
    expect(passwordInput.value).toBe('password123');
  });

  it('should validate correct credentials', () => {
    const { getByLabelText, getByRole } = render(<Login />);
    const usernameInput = getByLabelText('Username:');
    const passwordInput = getByLabelText('Password:');
    const loginButton = getByRole('button', { name: 'Login' });
    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);
    expect(/* mock success message or redirect */).toHaveBeenCalled();
  });

  it('should show error for incorrect credentials', () => {
    const { getByLabelText, getByRole, getByText } = render(<Login />);
    const usernameInput = getByLabelText('Username:');
    const passwordInput = getByLabelText('Password:');
    const loginButton = getByRole('button', { name: 'Login' });
    fireEvent.change(usernameInput, { target: { value: 'wronguser' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpass' } });
    fireEvent.click(loginButton);
    expect(getByText('Invalid username or password')).toBeInTheDocument();
  });

  it('should show error for empty fields', () => {
    const { getByRole, getByText } = render(<Login />);
    const loginButton = getByRole('button', { name: 'Login' });
    fireEvent.click(loginButton);
    expect(getByText('Username is required')).toBeInTheDocument();
    expect(getByText('Password is required')).toBeInTheDocument();
  });
});
