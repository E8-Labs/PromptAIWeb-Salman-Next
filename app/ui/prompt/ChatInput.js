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
      <Container className=" border-2 border-white  rounded justify-self-center">
        <div className="input-container">
        <textarea
             value={message}
          className="w-full  bg-transparent  rounded p-2 border-none focus:border-none rounded p-2 focus:outline-none"
          placeholder="Type your message..."
          onChange={handleMessageChange}
        ></textarea>
        <button className="text-white p-2 ml-2" onClick={(e)=>{
            e.preventDefault()
            
            props.handleSendMessage(message)
            setMessage("")
        }}>
        <IoMdSend></IoMdSend>
        </button>
        </div>
      </Container>
    // </div>
    )

}



const Container = styled.div`
display: grid;
grid-template-columns: 100%;
width: 66%;
align-items: center;
justify-content: center;
// background-color: transparent;
padding: 0 2rem; 
padding-bottom: 0.3rem;
min-height: 50px;
overflow-y: auto;
white-space: pre-wrap; /* This allows for line breaks */

.input-container{
    width: 100%;
    // height: 60%;
    // background-color: transparent;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    // background-color: #ffffff34;

     input{
        width: 90%;
        // height: 60%;
        background-color: transparent;
        color: white;
        border: none;
        padding-left: 1rem;
        font-size: 1.2rem;
        &::selection{
            background-color: #9186f3;

        }
        &::focus{
            outline: none;
        }
        button{
            padding 0.3rem 2rem;
            border-radius: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #9a86f3;
            border: none;
            svg{
                font-size: 2rem;
                color: white;
                
            }
        }
     }
}
`;