import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LoginPage from '../login';
import { waitFor } from '@testing-library/react';
import { jest } from '@jest/globals';


test('Login form renders correctly', () => {
  const { getByLabelText, getByText } = render(<LoginPage />);
  
  const usernameInput = getByLabelText('Username');
  const passwordInput = getByLabelText('Password');
  const loginButton = getByText('Login');
  
  // Assert that the necessary form elements are rendered
  expect(usernameInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
});

test('Successful login', async () => {
  const mockUpdateLoginStatus = jest.fn();

  const { getByLabelText, getByText, queryByText } = render(<LoginPage updateLoginStatus={mockUpdateLoginStatus} />);
  
  const usernameInput = getByLabelText('Username');
  const passwordInput = getByLabelText('Password');
  const loginButton = getByText('Login');
  
  // Enter valid login credentials
  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  fireEvent.change(passwordInput, { target: { value: 'password' } });
  
  // Submit the login form
  fireEvent.click(loginButton);
  
  // Wait for the login process to complete (e.g., handle server response)
  await waitFor(() => {
    // Assert that the updateLoginStatus function is called
    expect(mockUpdateLoginStatus).toHaveBeenCalled();
  });
});

test('Login with incorrect credentials', async () => {
  const mockUpdateLoginStatus = jest.fn();

  const { getByLabelText, getByText, queryByText } = render(<LoginPage updateLoginStatus={mockUpdateLoginStatus} />);
  
  const usernameInput = getByLabelText('Username');
  const passwordInput = getByLabelText('Password');
  const loginButton = getByText('Login');
  
  // Enter invalid login credentials
  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  fireEvent.change(passwordInput, { target: { value: 'incorrectpassword' } });
  
  // Submit the login form
  fireEvent.click(loginButton);
  
  // Wait for the login process to complete (e.g., handle server response)
  await waitFor(() => {
    // Assert that the error message is displayed
    expect(queryByText('Invalid username or password.')).toBeInTheDocument();
  });
});
