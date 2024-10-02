import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

describe('Login component', () => {
  const setup = () => {
    render(<Login />);
    const usernameInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const loginButton = screen.getByRole('button', { name: /login/i });
    return { usernameInput, passwordInput, loginButton };
  };

  test('valid login credentials', () => {
    const { usernameInput, passwordInput, loginButton } = setup();
    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);
    expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
  });

  test('invalid username', () => {
    const { usernameInput, passwordInput, loginButton } = setup();
    fireEvent.change(usernameInput, { target: { value: 'invaliduser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);
    expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
  });

  test('invalid password', () => {
    const { usernameInput, passwordInput, loginButton } = setup();
    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: 'invalidpassword' } });
    fireEvent.click(loginButton);
    expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
  });

  test('empty username field', () => {
    const { passwordInput, loginButton } = setup();
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);
    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('empty password field', () => {
    const { usernameInput, loginButton } = setup();
    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.click(loginButton);
    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('empty username and password fields', () => {
    const { loginButton } = setup();
    fireEvent.click(loginButton);
    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('case-sensitivity of the username', () => {
    const { usernameInput, passwordInput, loginButton } = setup();
    fireEvent.change(usernameInput, { target: { value: 'Admin' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);
    expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
  });

  test('case-sensitivity of the password', () => {
    const { usernameInput, passwordInput, loginButton } = setup();
    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123' } });
    fireEvent.click(loginButton);
    expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
  });

  test('trimming of whitespace in username and password', () => {
    const { usernameInput, passwordInput, loginButton } = setup();
    fireEvent.change(usernameInput, { target: { value: ' admin ' } });
    fireEvent.change(passwordInput, { target: { value: ' password123 ' } });
    fireEvent.click(loginButton);
    expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
  });
});