// components/SearchBar.js

import React from 'react';

const SearchBar = (props) => {

const handleTextChange = (e)=>{
    props.textChanged(e.target.value)
}

  return (
    <div className="relative mx-auto max-w-md">
      <div className="flex items-center border border-white rounded-full p-3">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 bg-transparent border-none focus:outline-none"
          onChange={handleTextChange}
        />
        <div className="mr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m-2 0a8 8 0 1 1-4-15.5 8 8 0 0 1 4 15.5z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
