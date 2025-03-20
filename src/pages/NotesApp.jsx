import { useState } from 'react';
import { useNotes } from '../context/NotesContext';
import NotesList from '../components/NotesList';
import SearchBar from '../components/SearchBar';
import { FiFileText, FiLoader, FiPlusCircle } from 'react-icons/fi';

const NotesApp = () => {
  const { notes, addNote, isLoading } = useNotes();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddNewNote = () => {
    const newNote = {
      title: "New Note",
      content: "Start typing here...",
      color: { bg: 'bg-white', text: 'text-gray-900', name: 'Default' }
    };
    addNote(newNote);
    setIsAdding(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="flex flex-col items-center text-blue-600">
          <FiLoader className="h-10 w-10 animate-spin" />
          <p className="mt-4 text-lg text-gray-700">Loading your notes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <FiFileText className="mr-2" />
            My Notes
          </h1>
          <p className="text-gray-500">
            {notes.length} note{notes.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="w-full sm:w-64">
            <SearchBar />
          </div>
          <button 
            onClick={handleAddNewNote}
            className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 shadow-sm"
          >
            <FiPlusCircle className="mr-2" />
            Add New Note
          </button>
        </div>
      </div>

      <div className="mt-6">
        <NotesList isAdding={isAdding} setIsAdding={setIsAdding} />
      </div>
    </div>
  );
};

export default NotesApp;
