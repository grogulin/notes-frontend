import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import backendURL from './config';

// Initialize Font Awesome library
library.add(faTrash, faEdit);

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState('');
  const [editingNoteId, setEditingNoteId] = useState('');
  const [editingNoteText, setEditingNoteText] = useState('');
  const [creatingNewNote, setCreatingNewNote] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');

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
          throw new Error('You are not logged in. Please log in using link above');
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
        // console.error(error.message);
        setNotes([]);
        // setError('Error: Failed to fetch notes');
        setError(error.message)
      });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    };
    const formattedDate = `Last updated: ${date.toLocaleDateString('en-US', options)}`;
    return formattedDate;
  };

  const handleNewNote = () => {
    setCreatingNewNote(true);
  };

  const handleCreateNote = () => {
    // Perform the create request with the new note text
    const payload = {
      noteText: newNoteText
    };

    fetch(`${backendURL}/notes/new`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then((response) => {
        if (response.status === 201) {
          // Note created successfully
          console.log('Note created successfully');
          fetchNotes(); // Refresh the notes after creating
          setCreatingNewNote(false);
          setNewNoteText('');
        } else if (response.status === 401) {
          throw new Error('Unauthorized');
        } else {
          throw new Error('Failed to create note');
        }
      })
      .catch((error) => {
        console.error(error.message);
        setError('Error: Failed to create note');
      });
  };

  const handleEditNote = (noteId) => {
    const note = notes.find((note) => note.note_id === noteId);
    if (note) {
      setEditingNoteId(noteId);
      setEditingNoteText(note.note_text);
    }
  };

  const handleUpdateNote = (noteId) => {
    // Perform the update request with the updated note text
    const payload = {
      noteText: editingNoteText
    };

    fetch(`${backendURL}/notes/${noteId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then((response) => {
        if (response.status === 200) {
          // Note updated successfully
          console.log('Note updated successfully');
          fetchNotes(); // Refresh the notes after updating
          setEditingNoteId('');
          setEditingNoteText('');
        } else if (response.status === 401) {
          throw new Error('Unauthorized');
        } else {
          throw new Error('Failed to update note');
        }
      })
      .catch((error) => {
        console.error(error.message);
        setError('Error: Failed to update note');
      });
  };

  const handleDeleteNote = (noteId) => {
    // Perform the delete request
    fetch(`${backendURL}/notes/${noteId}`, {
      method: 'DELETE',
      credentials: 'include'
    })
      .then((response) => {
        if (response.status === 200) {
          // Note deleted successfully
          console.log('Note deleted successfully');
          fetchNotes(); // Refresh the notes after deleting
        } else if (response.status === 401) {
          throw new Error('Unauthorized');
        } else {
          throw new Error('Failed to delete note');
        }
      })
      .catch((error) => {
        console.error(error.message);
        setError('Error: Failed to delete note');
      });
  };

  return (
    <Container className="mt-5">
      <h3 className="registration-title">My Notes</h3>
      {error && <div className="error-banner">{error}</div>}
      <Row>
        <Col md={3} sm={12}>
          <Card className={`mb-4 ${creatingNewNote ? 'fade-in' : ''}`} onClick={handleNewNote} style={{ cursor: 'pointer' }}>
            <CardBody className="text-center">
              {creatingNewNote ? (
                <>
                  <textarea
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    rows={4}
                    cols={20}
                    style={{ marginBottom: '10px' }}
                  />
                  <button className="create-button" onClick={handleCreateNote}>
                    Create
                  </button>
                </>
              ) : (
                <>
                  <h4>Create New Note</h4>
                  <p>+</p>
                </>
              )}
            </CardBody>
          </Card>
        </Col>
        {notes.map((note) => (
          <Col key={note.note_id} md={3} sm={12}>
            <Card className="mb-4" style={{ position: 'relative' }}>
              <CardBody>
                <h4>{note.note_id}</h4>
                {editingNoteId === note.note_id ? (
                  <textarea
                    value={editingNoteText}
                    onChange={(e) => setEditingNoteText(e.target.value)}
                    rows={4}
                    cols={20}
                    style={{ marginBottom: '10px' }}
                  />
                ) : (
                  <p>{note.note_text}</p>
                )}
                <small>{formatDate(note.created_at)}</small>
              </CardBody>
              <div className="card-toolbar">
                {editingNoteId === note.note_id ? (
                  <button className="update-button" onClick={() => handleUpdateNote(note.note_id)}>
                    Update
                  </button>
                ) : (
                  <span className="toolbar-icon" onClick={() => handleEditNote(note.note_id)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </span>
                )}
                <span className="toolbar-icon" onClick={() => handleDeleteNote(note.note_id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </span>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default NotesPage;
