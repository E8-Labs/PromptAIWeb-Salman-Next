// HorizontalScroll.js

import React, { useEffect, useState } from 'react';

const StackPromptsInput = (props) => {
  const prompt = props.prompt;
  const [subprompts, setSubPrompts] = useState([]);
const [chat, setChat] = useState(null)

  const removeDuplicates = (items)=>{
    return [...new Set(items)]; 
  }
  
  useEffect(()=>{
    let items = prompt.subprompts
    console.log("Props changed stack input ", props)
    setChat(props.chat)
    items.splice(0, 0, prompt);
    // console.log("Count After Splice ", items)
    const uniqueArray = items.filter((item, index, self) =>
        index === self.findIndex((t) => t.id === item.id)
    );
    setSubPrompts(uniqueArray)
    if(props.chat){
        console.log("Stacked Index To Show ", props.chat.stackedPromptIndexToShow)
    }
    // console.log("------------Start----------------")
    console.log("Subprompts Stack Input ", subprompts)
    // console.log("ITems ", items)
    // console.log("-------------End----------------")
  }, [props.chat])

  useEffect(()=>{
    console.log("Chat changed Stack", chat)
  }, [chat])

  return (
    <div className="flex items-center justify-start overflow-x-auto space-x-1 p-4 ">
      {subprompts.map((item, index) => (
        <div  key={item.id} className='flex justify-center items-center'  onClick={()=>{
            if(chat.stackedPromptIndexToShow >= index){
                console.log("Already submitted")
            }
            else{
                console.log("Submit here", )
                props.handleSubmitSubPrompt(subprompts)
            }
        }}>
            <div className={`flex  border-0 ${(chat &&chat.stackedPromptIndexToShow >= index) ? 'bg-appgreen ' : "bg-appgreenlight cursor-pointer"}  justify-center items-center align-self-center p-2`} style={{minWidth: '164px', height: '50px', borderRadius: '16px', borderWidth: 0}}>
                 <p className={`text-center text-sm ${(chat && chat.stackedPromptIndexToShow >= index) ? 'text-gray-500' : "text-white"}`}>{item.title}</p>
            </div>
            <div className={`bg-white w-10 ${ index == subprompts.length - 1 ? 'hidden' : ''}`} style={{height: '3px'}}> </div>
            <div className={`bg-white w-3 h-3 ${ index == subprompts.length - 1 ? 'hidden' : ''}`} style={{borderRadius: '50%'}}> </div>
        </div>
      ))}
    </div>
  );
};

export default StackPromptsInput;
