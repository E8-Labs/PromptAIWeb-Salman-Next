import React from 'react';

const SuggestionsOverlay = ({ suggestions, handleSuggestionClick, handleChangeText }) => {

  //code for functions
  const handleClick = async (event) => {
    let suggestion = suggestions[event.target.id]
    
    handleSuggestionClick(suggestion);
    console.log('suggestion is', event.target.id)

    //code for calling advanced sugestions api


  }

  return (
    <div className="absolute top-12 left-0 w-full bg-gray-900 border border-white text-white rounded-md shadow-md" style={{zIndex: 1000 }}>
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index} id={index} onClick={handleClick} className="p-3 cursor-pointer hover:bg-gray-700">
            {typeof suggestion === 'string' ? suggestion : suggestion.username || suggestion.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestionsOverlay;
