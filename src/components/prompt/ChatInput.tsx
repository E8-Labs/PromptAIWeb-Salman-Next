import { IoMdSend } from "react-icons/io";
import React from "react";
import styled from "styled-components";

type ChatInputProps = {
  chat: string;
};

export default function ChatInput({}: ChatInputProps) {
  const [chat, setChat] = React.useState(null);

  const [message, setMessage] = React.useState<string>();

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  React.useEffect(() => {
    setChat(chat);
  }, []);
  React.useEffect(() => {
    if (chat) {
    }
  }, [chat]);
  return (
    <Container className=" justify-self-center border-2 border-white rounded">
      {/* <StackPromptsInput prompt={props.prompt} chat={chat}/> */}
      <div className="input-container  ">
        <textarea
          value={message}
          className="w-full text-white bg-transparent rounded p-2 border-none focus:border-none focus:outline-none"
          placeholder="Type your message..."
          onChange={handleMessageChange}
        ></textarea>
        <button
          className="text-white p-2 ml-2"
          onClick={(e) => {
            e.preventDefault();

            // TODO: Make server action?
            // handleSendMessage(message);
            setMessage("");
          }}
        >
          <IoMdSend />
        </button>
      </div>
    </Container>
  );
}

const Container = styled.div`
display: grid;
grid-template-columns: 100%;
width: 100%;
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
