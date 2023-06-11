import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState } from 'react';
import { Container, Form, FormGroup, Label, Input, Button, Row, Col } from 'reactstrap';
import backendURL from './config';

// import NotesPage from './notes';

const LoginPage = ({ updateLoginStatus }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [unauthorized, setUnauthorized] = useState(false);
  const [errorMessage, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  

  const handleLogin = (event) => {
    // Perform login logic here
    const userData = {
        username,
        password
    };

    event.preventDefault();

    fetch(`${backendURL}/login`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData),
    credentials: 'include'
    })
    .then((response) => {
        if (response.status === 200) {
            setIsLoggedIn(true);
        } else if (response.status === 401) {
            setUnauthorized(true);
        } else {
            setUnauthorized(false)
        }
        return response;
    })
    .then(response => response.json())
    .then((response) => {
        updateLoginStatus()
    })
    // .then(data => {
    //     // Handle the response from the backend
    //     // console.log(data);
    //     setError(data.message)
    //     if (isLoggedIn) {
    //         fetch(`${backendURL}/notes`, {
    //             method: 'GET',
    //             credentials: 'include',
    //         })
    //         .then(response => response.json())
    //         .then(data => {
    //             updateLoginStatus()
    //         })
    //         .catch(error => {
    //             // Handle any error that occurred during the request
    //             console.error(error.message);
    //         });
    //     }
    // })

    
    .catch(error => {
        // Handle any error that occurred during the request
        setUnauthorized(true)
        console.error(error.message);
    });
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col xs={12} md={{ size: 6, offset: 3 }}>
          <h3 className="registration-title">Login form</h3>
          <Form>
            <FormGroup>
              {unauthorized && <div className="error-banner">{errorMessage}</div>}
              <Label className="label-text text-left" for="login">
                Username
              </Label>
              <Input
                type="email"
                id="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label className="label-text text-left" for="password">
                Password
              </Label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <Row className="justify-content-end">
              <Col>
                <Button className="w-100" color="primary" onClick={handleLogin}>
                  Login
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
