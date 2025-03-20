import { useState, useEffect } from 'react';
import { useNotes } from '../context/NotesContext';
import { FiSave, FiX, FiPlus } from 'react-icons/fi';

const NoteForm = ({ editing, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addNote, updateNote } = useNotes();

  useEffect(() => {
    if (editing) {
      setTitle(editing.title);
      setContent(editing.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [editing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      if (editing) {
        updateNote(editing.id, { title, content });
        onCancel();
      } else {
        addNote({ title, content });
        setTitle('');
        setContent('');
      }
    } catch (error) {
      console.error('Error saving note:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        {editing ? (
          <><FiSave className="mr-2" /> Edit Note</>
        ) : (
          <><FiPlus className="mr-2" /> Add New Note</>
        )}
      </h2>
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          id="title"
          type="text"
          placeholder="Enter a title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
          required
        />
      </div>
      <div className="mb-5">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Content</label>
        <textarea
          id="content"
          placeholder="Enter your note content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
          required
        />
      </div>
      <div className="flex justify-end space-x-3">
        {editing && (
          <button 
            type="button" 
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors flex items-center"
            disabled={isSubmitting}
          >
            <FiX className="mr-1.5" /> Cancel
          </button>
        )}
        <button 
          type="submit" 
          className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors flex items-center ${
            isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            <>
              <FiSave className="mr-1.5" />
              {editing ? 'Update Note' : 'Add Note'}
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
