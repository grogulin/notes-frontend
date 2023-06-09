import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import backendURL from './config';

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = () => {
    fetch(`${backendURL}/notes`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 401) {
          throw new Error('Unauthorized');
        } else {
          throw new Error('Failed to fetch notes');
        }
      })
      .then((data) => {
        // Handle the response from the backend
        console.log(data);
        setNotes(data);
        setError('');
      })
      .catch((error) => {
        // Handle any error that occurred during the request
        console.error(error.message);
        setNotes([]);
        setError('Error: Failed to fetch notes');
      });
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col xs={12} md={{ size: 6, offset: 3 }}>
          <h3 className="registration-title">My Notes</h3>
          {error && <div className="error-banner">{error}</div>}
          <Card>
            <CardBody>
              {/* Render the notes content here */}
              {notes.map((note) => (
                <div key={note.id}>
                  {/* Display each note */}
                  <h4>{note.title}</h4>
                  <p>{note.content}</p>
                </div>
              ))}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default NotesPage;