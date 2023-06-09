import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import LoginPage from './login';
import RegistrationPage from './registration';
import NotesPage from './notes';

function App() {
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
            <div className="nav-link">
              <Link to="/notes">My Notes</Link>
            </div>
            <div className="nav-link">
              <Link to="/login">Login</Link>
            </div>
            <div className="nav-link">
              <Link to="/registration">Register</Link>
            </div>
          </div>
        </Container>
      </header>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/notes" element={<NotesPage />} />
          {/* Add more routes for other pages */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
