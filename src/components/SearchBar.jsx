import { FiSearch, FiX } from 'react-icons/fi';
import { useNotes } from '../context/NotesContext';

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useNotes();

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FiSearch className="h-4 w-4 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
      />
      {searchTerm && (
        <button 
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={() => setSearchTerm('')}
        >
          <FiX className="h-4 w-4 text-gray-400 hover:text-gray-600" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
