import { useState, useEffect } from 'react';
import { useNotes } from '../context/NotesContext';
import NoteForm from '../components/NoteForm';
import NotesList from '../components/NotesList';
import SearchBar from '../components/SearchBar';

const NotesApp = () => {
  const [editing, setEditing] = useState(null);
  const { notes, deleteNote, updateNote, isLoading } = useNotes();

  const handleEdit = (note) => {
    setEditing(note);
    
    // Scroll to form when editing
    setTimeout(() => {
      document.querySelector('.note-form').scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }, 100);
  };

  const handleCancel = () => {
    setEditing(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-3 text-lg text-gray-700">Loading notes...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Notes</h1>
      <div className="mb-6">
        <SearchBar />
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <NoteForm editing={editing} onCancel={handleCancel} />
      </div>
      <div className="text-sm text-gray-500 mb-4">
        {notes.length} note{notes.length !== 1 ? 's' : ''}
      </div>
      <NotesList 
        notes={notes} 
        onDelete={deleteNote} 
        onEdit={handleEdit} 
      />
    </div>
  );
};

export default NotesApp;
