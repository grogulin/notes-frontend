import React, { useState } from 'react';
import { Container, Form, FormGroup, Label, Input, Button, Row, Col } from 'reactstrap';
import backendURL from './config';

const RegistrationPage = ({ updateLoginStatus }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleRegistration = (event) => {
    event.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    const userData = {
      username,
      password,
    };

    fetch(`${backendURL}/registration`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the backend
        console.log(data);
        setRegistrationSuccess(true);
        setErrorMessage('');
        updateLoginStatus();
      })
      .catch((error) => {
        // Handle any error that occurred during the request
        console.error(error.message);
        setRegistrationSuccess(false);
        setErrorMessage('Registration failed');
      });
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col xs={12} md={{size: 6, offset: 3}}>
            <h3 className="registration-title">Registration form</h3>
            <Form>
                
                    <FormGroup>
                    <Label className="label-text text-left" for="username">Username</Label>
                    <Input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    </FormGroup>
                    <FormGroup>
                    <Label className="label-text text-left" for="password">Password</Label>
                    <Input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    </FormGroup>
                    <FormGroup>
                    <Label className="label-text text-left" for="confirmPassword">Confirm Password</Label>
                    <Input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    </FormGroup>
                    {errorMessage && <p className="text-danger">{errorMessage}</p>}
                    {registrationSuccess ? (
                    <p className="text-success">Registration successful! You can now login.</p>
                    ) : (
                    <Row className='justify-content-end'>
                        <Col>
                            <Button className='w-100' color="primary" onClick={handleRegistration}>
                                Create account
                            </Button>
                        </Col>
                    </Row>
                    
                    )}
            </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegistrationPage;
