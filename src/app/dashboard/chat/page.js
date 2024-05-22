'use client'

import React, { useEffect, useState } from 'react'
import PromptChatView from '../../ui/prompt/PromptChatView'

export default function Page() {
  const [data, setData] = useState(null);
  const [prompt, setPrompt] = useState(null);


  const removeDuplicates = (array, key) => {
    const seen = new Set();
    return array.filter(item => {
      const duplicate = seen.has(item[key]);
      seen.add(item[key]);
      return !duplicate;
    });
  };
  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      try {
        const storedData = localStorage.getItem("CURRENTCHAT");
        const p = localStorage.getItem("Prompt");
        
        if (storedData && p) {
          let currentPrompt = JSON.parse(p);
          let subs = removeDuplicates(currentPrompt.subprompts, 'id');
          currentPrompt.subprompts = subs;
          
          console.log("Retrieved prompt: ", subs);

          const d = JSON.parse(storedData);
          console.log("Retrieved data before merge: ", d);

          d.prompt = currentPrompt;
          console.log("Merged data: ", d);

          setPrompt(currentPrompt);
          setData(d);
        }
      } catch (error) {
        console.error("Error parsing localStorage data: ", error);
      }
    }
  }, []);

  useEffect(() => {
    console.log("Data changed: ", data);
  }, [data]);

  return (
    <div className='h-full overflow-none' style={{ height: '100%' }}>
      {(data && prompt) && (
        <PromptChatView 
          chatViewVisible={data.chatViewVisible} 
          newChat={data.newChat} 
          chat={data.chat} 
          prompt={prompt} 
        />
      )}
    </div>
  );
}
