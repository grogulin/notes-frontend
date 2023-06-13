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
import { faEdit, faTrash, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import backendURL from './config';

library.add(faTrash, faEdit, faSignOutAlt);

function App() {
  // const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const checkLogin = () => {
    // console.log('Function was activated!');
    fetch(`${backendURL}/session`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => {
        if (response.status === 200) {
          setIsLoggedIn(false);
          setUsername(null);
          return response.json();
        } else {
          console.log(response)
          throw new Error('Failed to fetch session');
        }
      })
      .then((data) => {
        // Handle the session data from the backend
        setIsLoggedIn(true);
        setUsername(data.username);
        // navigate('/notes');
        
      })
      .catch((error) => {
        console.error(error.message);
        setIsLoggedIn(false);
        setUsername('');
      });
  };

  const handleLogout = () => {
    fetch(`${backendURL}/logout`, {
      method: 'POST',
      credentials: 'include'
    })
      .then((response) => {
        if (response.status === 200) {
          // Logout successful
          checkLogin()
          console.log('Logout successful');
          // navigate('/login'); // Navigate to the login page
          // return <Navigate to="/login" />;
        } else {
          throw new Error('Failed to logout');
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <div className="App">
      <Router>
        <header>
          <Container className='header-container'>
            <div className="logo-container">
              <img src={logo} alt="Logo" className="logo" />
              <h1>NotesApp</h1>
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
          <Route path="/notes" element={<NotesPage />} />
          {/* Add more routes for other pages */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
