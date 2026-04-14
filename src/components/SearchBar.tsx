import React, { useState } from 'react';
import { useDebounce } from '@hooks/useDebounce';

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  onAddClick?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search...',
  onSearch,
  onAddClick,
}) => {
  const [query, setQuery] = useState('');

  const debouncedSearch = useDebounce((value: string) => {
    onSearch(value);
  }, 300);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="flex gap-1.5 md:gap-2 mb-4 md:mb-6">
      <div className="flex-1 relative group">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="
            w-full px-3 md:px-4 py-2.5 md:py-3 rounded-xl md:rounded-2xl text-xs md:text-base
            bg-dark-700/50 hover:bg-dark-700 focus:bg-dark-700 text-white placeholder-dark-500
            border-2 border-dark-600 hover:border-dark-500 focus:border-primary-500
            focus:outline-none transition-all duration-300
            shadow-lg
          "
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 text-dark-400 hover:text-primary-400 text-sm md:text-base transition-colors duration-200"
          >
            ✕
          </button>
        )}
      </div>
      {onAddClick && (
        <button
          onClick={onAddClick}
          className="
            px-3 md:px-5 py-2.5 md:py-3 rounded-xl md:rounded-2xl
            bg-gradient-to-r from-primary-500 to-primary-600
            text-white font-bold text-sm md:text-lg
            hover:from-primary-400 hover:to-primary-500
            transition-all duration-300 transform hover:scale-110
            active:scale-95 shadow-lg hover:shadow-xl flex-shrink-0
          "
        >
          +
        </button>
      )}
    </div>
  );
};
