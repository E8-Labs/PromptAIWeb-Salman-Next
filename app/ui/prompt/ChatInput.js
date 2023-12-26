import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from 'react-router-dom'
import styled from "styled-components";
// import Logo from "../assets/logo.png";
// import Picker from 'emoji-picker-react'
import {IoMdSend} from "react-icons/io"
import {BsEmojiSmileFill} from "react-icons/bs"

export default function ChatInput(props){

    const [message, setMessage] = useState(null)

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };
    return(
        // <div className="flex">
      <div className="flex border-2 border-white bg-transparent rounded">
        <textarea
             value={message}
          className="w-full  bg-transparent  rounded p-2 border-none focus:border-none rounded p-2 focus:outline-none"
          placeholder="Type your message..."
          onChange={handleMessageChange}
        ></textarea>
        <button className=" text-white p-2 ml-2" onClick={(e)=>{
            e.preventDefault()
            
            props.handleSendMessage(message)
            setMessage("")
        }}>
        <IoMdSend></IoMdSend>
        </button>
      </div>
    // </div>
    )

}

