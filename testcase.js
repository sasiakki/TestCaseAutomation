import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from './Login';

describe('Login component', () => {
  it('renders login form correctly', () => {
    render(<Login />);
    expect(screen.getByLabelText('Username:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('accepts input in username and password fields', () => {
    render(<Login />);
    const usernameInput = screen.getByLabelText('Username:');
    const passwordInput = screen.getByLabelText('Password:');
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpass' } });
    expect(usernameInput).toHaveValue('testuser');
    expect(passwordInput).toHaveValue('testpass');
  });

  it('successfully logs in with valid credentials', () => {
    render(<Login />);
    const usernameInput = screen.getByLabelText('Username:');
    const passwordInput = screen.getByLabelText('Password:');
    const loginButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);
    expect(screen.getByText('Login successful')).toBeInTheDocument();
  });

  it('fails login with invalid username', () => {
    render(<Login />);
    const usernameInput = screen.getByLabelText('Username:');
    const passwordInput = screen.getByLabelText('Password:');
    const loginButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.change(usernameInput, { target: { value: 'wronguser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);
    expect(screen.getByText('Invalid username or password')).toBeInTheDocument();
  });

  it('fails login with invalid password', () => {
    render(<Login />);
    const usernameInput = screen.getByLabelText('Username:');
    const passwordInput = screen.getByLabelText('Password:');
    const loginButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpass' } });
    fireEvent.click(loginButton);
    expect(screen.getByText('Invalid username or password')).toBeInTheDocument();
  });

  it('fails login with both invalid username and password', () => {
    render(<Login />);
    const usernameInput = screen.getByLabelText('Username:');
    const passwordInput = screen.getByLabelText('Password:');
    const loginButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.change(usernameInput, { target: { value: 'wronguser' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpass' } });
    fireEvent.click(loginButton);
    expect(screen.getByText('Invalid username or password')).toBeInTheDocument();
  });

  it('fails login with empty username field', () => {
    render(<Login />);
    const passwordInput = screen.getByLabelText('Password:');
    const loginButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);
    expect(screen.getByText('Username is required')).toBeInTheDocument();
  });

  it('fails login with empty password field', () => {
    render(<Login />);
    const usernameInput = screen.getByLabelText('Username:');
    const loginButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.click(loginButton);
    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });

  it('fails login with both fields empty', () => {
    render(<Login />);
    const loginButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.click(loginButton);
    expect(screen.getByText('Username is required')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });

  it('trims leading and trailing whitespace in username', () => {
    render(<Login />);
    const usernameInput = screen.getByLabelText('Username:');
    const passwordInput = screen.getByLabelText('Password:');
    const loginButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.change(usernameInput, { target: { value: '  admin  ' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);
    expect(screen.getByText('Login successful')).toBeInTheDocument();
  });
});
