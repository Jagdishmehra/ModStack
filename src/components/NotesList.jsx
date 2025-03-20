import Note from './Note';
import { FiFileText } from 'react-icons/fi';
import { useNotes } from '../context/NotesContext';
import { useRef, useEffect } from 'react';

const NotesList = ({ isAdding, setIsAdding }) => {
  const { notes } = useNotes();
  const notesContainerRef = useRef(null);

  useEffect(() => {
    if (isAdding && notesContainerRef.current && notes.length > 0) {
      const firstNoteElement = notesContainerRef.current.firstChild;
      if (firstNoteElement) {
        firstNoteElement.scrollIntoView({ behavior: 'smooth' });
        firstNoteElement.focus();
        setIsAdding(false);
      }
    }
  }, [isAdding, notes.length, setIsAdding]);

  if (notes.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-10 text-center shadow-md">
        <div className="flex justify-center">
          <div className="rounded-full bg-blue-100 p-3 text-blue-500">
            <FiFileText className="h-10 w-10" />
          </div>
        </div>
        <h3 className="mt-4 text-xl font-medium text-gray-900">No notes found</h3>
        <p className="mt-2 text-gray-600">Get started by creating your first note!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[80vh] overflow-y-auto pr-2" ref={notesContainerRef}>
      {notes.map(note => (
        <div key={note.id} className="h-full">
          <Note 
            note={note} 
            isNewlyCreated={isAdding && note.id === notes[0].id} 
          />
        </div>
      ))}
    </div>
  );
};

export default NotesList;
