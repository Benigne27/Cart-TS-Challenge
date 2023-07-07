import React, { useState } from 'react';
import '../styles/SearchBar.css'

type SearchBarProps = {
  onSearch: (searchTerm: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleFormSubmit} className='submit-form'>
      <input className='search-field'
        type="text"
        placeholder="Looking for something..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button className='search-button' type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
