import { useState, useRef, useEffect } from 'react';
import { FiEdit3, FiTrash2, FiSave, FiX, FiAperture } from 'react-icons/fi';
import { useNotes } from '../context/NotesContext';


const noteColors = [
  { bg: 'bg-white', text: 'text-gray-900', name: 'Default' },
  { bg: 'bg-red-50', text: 'text-red-900', name: 'Red' },
  { bg: 'bg-blue-50', text: 'text-blue-900', name: 'Blue' },
  { bg: 'bg-green-50', text: 'text-green-900', name: 'Green' },
  { bg: 'bg-yellow-50', text: 'text-yellow-900', name: 'Yellow' },
  { bg: 'bg-purple-50', text: 'text-purple-900', name: 'Purple' },
  { bg: 'bg-pink-50', text: 'text-pink-900', name: 'Pink' },
];

const Note = ({ note, isNewlyCreated }) => {
  const { updateNote, deleteNote } = useNotes();
  const [isEditing, setIsEditing] = useState(isNewlyCreated);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedContent, setEditedContent] = useState(note.content);
  const [selectedColor, setSelectedColor] = useState(note.color || noteColors[0]);
  
  const titleInputRef = useRef(null);
  const colorPickerRef = useRef(null);
  
  useEffect(() => {
    if (isEditing && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [isEditing]);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
        setShowColorPicker(false);
      }
    };

    if (showColorPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showColorPicker]);
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleSave = () => {
    if (!editedTitle.trim() || !editedContent.trim()) {
      return;
    }
    
    updateNote(note.id, { 
      title: editedTitle, 
      content: editedContent,
      color: selectedColor
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTitle(note.title);
    setEditedContent(note.content);
    setSelectedColor(note.color || noteColors[0]);
    setIsEditing(false);
  };

  const handleDelete = () => {
    setIsDeleting(true);
    

    setTimeout(() => {
      deleteNote(note.id);
    }, 300);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    setShowColorPicker(false);
  };

  const currentNoteColor = isEditing ? selectedColor : (note.color || noteColors[0]);

  return (
    <div 
      className={`rounded-lg shadow-md overflow-hidden transform transition-all duration-200 h-full flex flex-col
        ${currentNoteColor.bg}
        ${currentNoteColor.text}
        ${isExpanded && !isEditing ? 'ring-2 ring-blue-500 scale-[1.02]' : 'hover:shadow-lg'}
        ${isDeleting ? 'scale-95 opacity-0' : ''}
      `}
    >
      {isEditing ? (
        <div className="p-4 flex flex-col flex-grow">
          <input
            ref={titleInputRef}
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className={`text-lg font-medium border-b border-gray-200 pb-2 mb-2 focus:outline-none focus:border-blue-500 bg-transparent ${currentNoteColor.text}`}
            placeholder="Note title"
          />
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            rows={5}
            className={`resize-none flex-grow focus:outline-none bg-transparent ${currentNoteColor.text}`}
            placeholder="Write your note here..."
          />
          
          <div className="mt-4 flex justify-between">

            <div className="relative" ref={colorPickerRef}>
              <button
                onClick={() => setShowColorPicker(!showColorPicker)}
                className="px-3 py-1.5 text-xs flex items-center bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50"
                title="Change note color"
              >
                <FiAperture className="mr-1" />
                Color
              </button>

              {showColorPicker && (
                <div className="absolute left-0 bottom-10 bg-white p-2 rounded-md shadow-lg z-10 border border-gray-200">
                  <div className="grid grid-cols-4 gap-1">
                    {noteColors.map((color, index) => (
                      <button
                        key={index}
                        className={`w-6 h-6 rounded-full ${color.bg} border border-gray-300 hover:scale-110 transition-transform`}
                        onClick={() => handleColorChange(color)}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>


            <div className="flex space-x-2">
              <button 
                onClick={handleCancel}
                className="px-3 py-1.5 text-xs flex items-center bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50"
              >
                <FiX className="mr-1" />
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="px-3 py-1.5 text-xs flex items-center bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <FiSave className="mr-1" />
                Save
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div 
            className="flex-grow cursor-pointer"
            onClick={() => !isEditing && setIsExpanded(!isExpanded)}
          >
            <div className="p-4 border-b border-opacity-20 border-gray-300">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium truncate">{note.title}</h3>
              </div>
              <p className="text-xs opacity-70 mt-1">
                {formatDate(note.createdAt)}
                {note.updatedAt && ` · Updated: ${formatDate(note.updatedAt)}`}
              </p>
            </div>
            
            <div className={`p-4 ${isExpanded ? '' : 'max-h-20 overflow-hidden'}`}>
              <div className={`whitespace-pre-wrap ${isExpanded ? '' : 'line-clamp-3'}`}>
                {note.content}
              </div>
              {!isExpanded && note.content.length > 100 && (
                <div className="text-xs text-blue-600 mt-1 hover:underline">Read more</div>
              )}
            </div>
          </div>
          
          <div className="px-4 py-3 bg-opacity-10  flex justify-end space-x-2 mt-auto">
            <button 
              onClick={() => setIsEditing(true)}
              className="p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:bg-opacity-100"
              title="Edit"
            >
              <FiEdit3 size={16} />
            </button>
            <button 
              onClick={handleDelete}
              className="p-2 rounded-full text-red-500 hover:bg-red-50 hover:bg-opacity-50"
              title="Delete"
              disabled={isDeleting}
            >
              <FiTrash2 size={16} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Note;
