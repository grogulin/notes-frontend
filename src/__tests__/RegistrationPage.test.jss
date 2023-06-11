import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RegistrationPage from '../registration';
import { waitFor } from '@testing-library/react';


test('Registration form submission should call the register function with correct data', async () => {
  // Create a mock register function
  const mockRegister = jest.fn();
  const mockUpdateLoginStatus = jest.fn();
  

  // Render the RegistrationPage component
  const { getByLabelText, getByText } = render(<RegistrationPage updateLoginStatus={mockUpdateLoginStatus} />);
  const usernameInput = getByLabelText('Username');
  const passwordInput = getByLabelText('Password');
  const confirmPasswordInput = getByLabelText('Confirm Password');
  const registerButton = getByText('Register');

  // Simulate user input
  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  fireEvent.change(passwordInput, { target: { value: 'password' } });
  fireEvent.change(confirmPasswordInput, { target: { value: 'password' } });

  // Simulate form submission
  fireEvent.click(registerButton);

  // Wait for the form submission to complete (e.g., handle server response)
  await waitFor(() => {
    // Assert that the desired behavior occurs
    expect(mockRegister).toHaveBeenCalledWith('testuser', 'password');
    // Add additional assertions as needed
  });
});

// test('Registration form renders correctly', () => {
//     const { getByLabelText, getByText } = render(<RegistrationPage />);

//     const usernameInput = getByLabelText('Username');
//     const passwordInput = getByLabelText('Password');
//     const confirmPasswordInput = getByLabelText('Confirm Password');
//     const registerButton = getByText('Register');

//     // Assert that the necessary form elements are rendered
//     expect(usernameInput).toBeInTheDocument();
//     expect(passwordInput).toBeInTheDocument();
//     expect(confirmPasswordInput).toBeInTheDocument();
//     expect(registerButton).toBeInTheDocument();
// });

// test('Registration with matching passwords', async () => {
//     const { getByLabelText, getByText, queryByText } = render(<RegistrationPage />);

//     const usernameInput = getByLabelText('Username');
//     const passwordInput = getByLabelText('Password');
//     const confirmPasswordInput = getByLabelText('Confirm Password');
//     const registerButton = getByText('Register');

//     // Enter valid registration data
//     fireEvent.change(usernameInput, { target: { value: 'testuser' } });
//     fireEvent.change(passwordInput, { target: { value: 'password' } });
//     fireEvent.change(confirmPasswordInput, { target: { value: 'password' } });

//     // Submit the registration form
//     fireEvent.click(registerButton);

//     // console.log(queryByText('Registration successful! You can now login.'))

//     // Assert that the registration success message is displayed
//     await waitFor(() => {
//         expect(queryByText('Registration successful! You can now login.')).toBeInTheDocument();
//     });
// });

// test('Registration with non-matching passwords', async () => {
//     const { getByLabelText, getByText, queryByText } = render(<RegistrationPage />);

//     const usernameInput = getByLabelText('Username');
//     const passwordInput = getByLabelText('Password');
//     const confirmPasswordInput = getByLabelText('Confirm Password');
//     const registerButton = getByText('Register');

//     // Enter registration data with non-matching passwords
//     fireEvent.change(usernameInput, { target: { value: 'testuser' } });
//     fireEvent.change(passwordInput, { target: { value: 'password1' } });
//     fireEvent.change(confirmPasswordInput, { target: { value: 'password2' } });

//     // Submit the registration form
//     fireEvent.click(registerButton);

//     // Assert that the error message is displayed
//     await waitFor(() => {
//         expect(queryByText('Passwords do not match')).toBeInTheDocument();
//     });
// });

