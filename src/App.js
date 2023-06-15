import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Container } from 'reactstrap';
import LoginPage from './login';
import RegistrationPage from './registration';
import NotesPage from './notes';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faTrash, faSignOutAlt, faNoteSticky } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useMediaQuery } from 'react-responsive';

import backendURL from './config';

library.add(faTrash, faEdit, faSignOutAlt, faNoteSticky);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const checkLogin = () => {
    fetch(`${backendURL}/session`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => {

        return response.json()
      })
      .then((response) => {
        // console.log(response);
        if (response.username) {
          setIsLoggedIn(true);
          setUsername(response.username);
        } else {
          setIsLoggedIn(false);
          setUsername(null);
        }
      })
      .catch((error) => {
        console.error(error.message);
        setIsLoggedIn(false);
        setUsername(null);
      });
  };

  const handleLogout = () => {
    fetch(`${backendURL}/logout`, {
      method: 'POST',
      credentials: 'include'
    })
      .then((response) => {
        if (response.status === 200) {
          checkLogin()
          console.log('Logout successful');
        } else {
          throw new Error('Failed to logout');
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const isMobile = useMediaQuery({ maxWidth: 576 });

  return (
    <div className="App">
      <Router>
        <header>
          <Container className='header-container'>
            <div className="logo-container">
              {/* <img src={logo} alt="Logo" className="logo" /> */}
              <FontAwesomeIcon icon={faNoteSticky} size='xl' className='logo'/>
              <h1>Notes</h1>
              <h6>App:</h6>
            </div>
            <div className="button-container">
              {isLoggedIn && 
                <div className="nav-link">
                  <Link to="/notes">My Notes</Link>
                </div>
              }
              {!isLoggedIn && 
                <div className="nav-link">
                  <Link to="/login">Login</Link>
                </div>
              }
              {!isLoggedIn && 
                <div className="nav-link">
                  <Link to="/registration">Register</Link>
                </div>
              }
              {isLoggedIn && 
                <div className="nav-link">
                  <Button onClick={handleLogout} color='primary'>
                    <FontAwesomeIcon icon="sign-out-alt" /> Log out {`(${username})`}
                  </Button>
                </div>
              }
            </div>
          </Container>
        </header>
        <Routes>
          <Route path="/" element={<LoginPage updateLoginStatus={checkLogin} />} />
          <Route path="/login" element={<LoginPage updateLoginStatus={checkLogin} />} />
          <Route path="/registration" element={<RegistrationPage updateLoginStatus={checkLogin} />} />
          <Route path="/notes" element={<NotesPage isLoggedIn={isLoggedIn}/>} />
          {/* Add more routes for other pages */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
