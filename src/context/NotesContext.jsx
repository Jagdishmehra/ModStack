import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (user) {
      try {
        setIsLoading(true);
        const savedNotes = localStorage.getItem(`notes-${user.sub}`);
        if (savedNotes) {
          setNotes(JSON.parse(savedNotes));
        }
      } catch (error) {
        // Keep error handling without console.log
      } finally {
        setIsLoading(false);
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`notes-${user.sub}`, JSON.stringify(notes));
    }
  }, [notes, user]);

  const addNote = useCallback((note) => {
    const newNote = {
      id: Date.now().toString(),
      title: note.title || "Untitled",
      content: note.content || "",
      color: note.color || { bg: 'bg-white', text: 'text-gray-900', name: 'Default' },
      createdAt: new Date().toISOString(),
      userId: user?.sub
    };
    setNotes(prevNotes => [newNote, ...prevNotes]);
    return newNote;
  }, [user]);

  const deleteNote = useCallback((id) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  }, []);

  const updateNote = useCallback((id, updatedNote) => {
    setNotes(prevNotes => prevNotes.map(note => 
      note.id === id ? { 
        ...note, 
        ...updatedNote, 
        updatedAt: new Date().toISOString() 
      } : note
    ));
  }, []);

  const filteredNotes = useMemo(() => {
    if (!searchTerm) return notes;
    
    const lowerSearch = searchTerm.toLowerCase();
    return notes.filter(note => 
      note.title.toLowerCase().includes(lowerSearch) || 
      note.content.toLowerCase().includes(lowerSearch)
    );
  }, [notes, searchTerm]);

  const value = useMemo(() => ({
    notes: filteredNotes, 
    addNote, 
    deleteNote, 
    updateNote, 
    searchTerm, 
    setSearchTerm,
    isLoading
  }), [filteredNotes, addNote, deleteNote, updateNote, searchTerm, isLoading]);

  return (
    <NotesContext.Provider value={value}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);
