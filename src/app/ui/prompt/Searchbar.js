// components/SearchBar.js

import React, { useEffect, useState } from 'react';

import Icons from '@/app/lib/Icons';
import { Icon, IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import SuggestionsOverlay from './promptEditing/SuggestionsOverlay'

const SearchBar = (props) => {

  // const handleTextChange = (e) => {
  //   const value = e?.target?.value ?? ''; // Check if event object and its properties exist
  //   broadcastEvent("searchTextChanged", value);
  // }

  // const handleTextChange = (e) => {
  //   broadcastEvent("searchTextChanged", e.target.value)
  //   // props.textChanged(e.target.value)
  //   //broadcast event searchTextChanged
  //   //
  // }

  // function broadcastEvent(eventName, data) {
  //   // Create a custom event with the specified name and detail
  //   const event = new CustomEvent(eventName, { detail: data });
  //   // Dispatch the event on the window object, making it available throughout the application
  //   window.dispatchEvent(event);
  //   //console.log("Event broadcasted from ChatView ", eventName)
  // }

  //test code
  // const router = useRouter()
  // const { pathname } = router;

  // // Check if the current path matches /dashboard/search
  // const isDashboardSearch = pathname === '/dashboard/search';
  // //console.log('pathname is', pathname)


  //test code for search icon click

  const handleTextChange = (value) => {
    setInputValue(value);
    broadcastEvent("searchTextChanged", value);
  }

  function broadcastEvent(eventName, data) {
    const event = new CustomEvent(eventName, { detail: data });
    window.dispatchEvent(event);
  }

  const handleSearch = () => {
    broadcastEvent("searchTextChanged", inputValue);
  }


  //code for suggestions

  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = async (e) => {
    const { value } = e.target;
    console.log('Value is', value)
    setInputValue(value);

    //code for calling api for getting suggestions

    let SuggestionsList;

    try {
      // const Apilink = "https://www.blindcircle.com:444/prompt/api/prompts/suggestions?offset=0&search=Angus";
      const Apilink = `https://www.blindcircle.com:444/prompt/api/prompts/suggestions?offset=0&search=${encodeURIComponent(value)}`;
      const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo4LCJuYW1lIjoidW5kZWZpbmVkIiwidXNlcm5hbWUiOiJzYWxtYW5fYWxpIiwiZW1haWwiOiJzYWxtYW5AZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkcS9BQjIvNExhSjBYRGFvRzBPMGlyLjkyNG9nQmJtQ2hNaEtTRnRacTZSbmRkTC9PSHMyQy4iLCJiaW8iOm51bGwsInByb2ZpbGVfaW1hZ2UiOiJodHRwczovL3Byb21wdGFpYXBwYnVja2V0LnMzLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tL2ltYWdlMTY5OTU0OTE4NzE0NSIsInlvdXR1YmVfdXJsIjoidW5kZWZpbmVkIiwiaW5zdGFncmFtX3VybCI6InVuZGVmaW5lZCIsIndlYl91cmwiOiJ1bmRlZmluZWQiLCJkaXNjb3JkX3VybCI6InVuZGVmaW5lZCIsInRpa3Rva191cmwiOiJ1bmRlZmluZWQiLCJjcmVhdGVkQXQiOiIyMDIzLTExLTA5VDE2OjU5OjQ3LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIzLTExLTA5VDE2OjU5OjQ3LjAwMFoifSwiaWF0IjoxNzAxNTMyNTM5LCJleHAiOjE3MzMwNjg1Mzl9.6oxaqFVKwIhLwEClPW8G8GJNWcXkVPmJ9qTCijNSh5g";
      const response = await fetch(Apilink, {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + authToken
        }
      });
      console.log('Authtoken for suggestions api is', authToken);
      if (response.ok) {
        let DATA = await response.json();
        SuggestionsList = DATA.data;
        // console.log('Response for suggestions api is', SuggestionsList);
      }
    } catch (error) {
      console.log('Error occured is', error)
    }
    console.log('Suggestions stored outside are', SuggestionsList);

    // Dummy suggestions, you can replace this with your logic to fetch suggestions
    // const dummySuggestions = ['apple', 'sports', 'youtube', 'tate.ai', 'Palestine', 'america'];
    //   const filteredSuggestions = SuggestionsList.filter((suggestion) =>
    //     typeof suggestion === 'string' && suggestion.toLowerCase().includes(value.toLowerCase())
    //   );
    //   console.log('Filtered suggestions are', filteredSuggestions)
    //   setSuggestions(filteredSuggestions);
    // };

    const filteredSuggestions = SuggestionsList.filter((item) => {
      if (typeof item === 'string') {
        return item.toLowerCase().includes(value.toLowerCase());
      } else if (item.username) {
        return item.username.toLowerCase().includes(value.toLowerCase());
      }
      else if (item.title) {
        return item.title.toLowerCase().includes(value.toLowerCase());
      }
      else {
        return false;
      }
    });
    console.log('Filtered suggestions are', filteredSuggestions)
    setSuggestions(filteredSuggestions);
  }

  const [SuggestionTypeSelected, setSuggestionTypeSelected] = useState('')

  const handleSuggestionClick = (suggestion) => {
    // Check if suggestion is a string or an object
    // const newValue = typeof suggestion === 'string' ? suggestion : suggestion.username || suggestion.title;
    // setInputValue(newValue);
    setSuggestions([]);
    console.log('Suggestion clicked is', suggestion)
    const type = typeof suggestion.username === 'undefined' ? 'prompt' : 'user';
    console.log("Suggestions clicked is ", type)
    broadcastEvent("suggestionSelected", suggestion);
    // setSuggestionTypeSelected(type)
  };
  
  // console.log('Value stored 2 is', SuggestionTypeSelected)

  //code for broadcasting selected suggestion value

  //   const handleSuggestionClick = (suggestion) => {
  //   if (typeof suggestion === 'string') {
  //     setInputValue(suggestion);
  //   } else if (suggestion && suggestion.username) {
  //     setInputValue(suggestion.username);
  //   } else if (suggestion && suggestion.title) {
  //     setInputValue(suggestion.title);
  //   } else {
  //     // Handle undefined or invalid suggestion
  //     console.error("Invalid suggestion:", suggestion);
  //     return;
  //   }
  //   setSuggestions([]);
  //   broadcastEvent("searchTextChanged", suggestion?.username || suggestion?.title || ''); // Broadcast username or title or empty string
  // };

  //code for handeling input onchange funtions
  // handleTextChange(e);
  const handleInputChange = (e) => {
    handleChange(e);
  }

  //code to confirm that value is sent
  useEffect(() => {
    const handleSearchTextChange = (event) => {
      const searchText = event.detail; // Extract the value from the event
      console.log("Search text changed:", searchText);
      // You can perform any further actions based on the received value
    };

    // Add event listener to window object to listen for "searchTextChanged" event
    window.addEventListener("searchTextChanged", handleSearchTextChange);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener("searchTextChanged", handleSearchTextChange);
    };
  }, []);

  return (
    <div className="relative mx-auto max-w-md">

      <div className="flex items-center border border-white rounded-full h-10 p-3" style={{ width: '500px' }}>
        <input
          autoFocus
          type="text"
          value={inputValue}
          placeholder="Search..."
          className="w-full px-4 bg-transparent focus:outline-none text-white"
          onChange={handleInputChange}
        />
        <div>
          <IconButton onClick={handleSearch} className=' p-0'>
            <Icons.SearchIcon sx={{ color: 'white', width: 20, height: 20 }} />
          </IconButton>
        </div>
      </div>
      {/*<ul>
        {inputValue.trim() !== '' && suggestions.map((suggestion, index) => (
          <li key={index} onClick={() => handleSuggestionClick(suggestion)} style={{ color: 'white', cursor: 'pointer' }}>
            {typeof suggestion === 'string' ? suggestion : suggestion.username || suggestion.title}
          </li>
        ))}
      </ul>*/}

      <ul>
        {(inputValue && inputValue.trim() !== '' && suggestions && suggestions.length > 0) && ( // Added null checks
          <SuggestionsOverlay suggestions={suggestions} handleSuggestionClick={handleSuggestionClick} handleChangeText={handleTextChange} />
        )}
      </ul>
    </div>
  );
};

export default SearchBar;


// {suggestions.length === 0  && (
//   <li style={{ color: 'white' }}>No results match</li>
// )}