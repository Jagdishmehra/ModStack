import { useState } from 'react';

const Note = ({ note, onDelete, onEdit }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    setIsDeleting(true);
    
    // Add small delay to show deletion animation
    setTimeout(() => {
      onDelete(note.id);
    }, 300);
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-200 ${
        isExpanded ? 'ring-2 ring-blue-500 scale-[1.02]' : 'hover:shadow-lg'
      } ${isDeleting ? 'scale-95 opacity-0' : ''}`}
    >
      <div 
        className="cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="p-4 border-b">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-medium text-gray-900 truncate">{note.title}</h3>
            <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">{formatDate(note.createdAt)}</span>
          </div>
          {note.updatedAt && (
            <p className="text-xs text-gray-400 mt-1">
              Edited: {formatDate(note.updatedAt)}
            </p>
          )}
        </div>
        
        <div className={`p-4 ${isExpanded ? '' : 'max-h-24 overflow-hidden'}`}>
          <div className={`text-gray-700 whitespace-pre-wrap ${isExpanded ? '' : 'line-clamp-3'}`}>
            {note.content}
          </div>
          {!isExpanded && note.content.length > 100 && (
            <div className="text-sm text-blue-600 mt-2 hover:underline">Read more</div>
          )}
        </div>
      </div>
      
      <div className="px-4 py-3 bg-gray-50 flex justify-end space-x-2">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onEdit(note);
          }}
          className="px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Edit
        </button>
        <button 
          onClick={handleDelete}
          className="px-3 py-1.5 text-xs bg-white border border-red-300 rounded-md text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          disabled={isDeleting}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Note;
