// components/SearchBar.js

import React from 'react';

import Icons from '@/app/lib/Icons';
import { Icon, IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';

const SearchBar = (props) => {

  const handleTextChange = (e) => {
    broadcastEvent("searchTextChanged", e.target.value)
    // props.textChanged(e.target.value)
    //broadcast event searchTextChanged
    //
  }

  function broadcastEvent(eventName, data) {
    // Create a custom event with the specified name and detail
    const event = new CustomEvent(eventName, { detail: data });
    // Dispatch the event on the window object, making it available throughout the application
    window.dispatchEvent(event);
    console.log("Event broadcasted from ChatView ", eventName)
  }

  //test code
  const router = useRouter()
  // const { pathname } = router;

  // // Check if the current path matches /dashboard/search
  // const isDashboardSearch = pathname === '/dashboard/search';
  // console.log('pathname is', pathname)


  return (
    <div className="relative mx-auto max-w-md">
      
      <div className="flex items-center border border-white rounded-full h-10 p-3" style={{ width: '500px' }}>
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 bg-transparent focus:outline-none text-white"
          onChange={handleTextChange}
        />
        <div>
          <IconButton className=' p-0'>
            <Icons.SearchIcon sx={{ color: 'white', width: 20, height: 20 }} />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
