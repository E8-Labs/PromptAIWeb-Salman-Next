import React, { useState, useEffect } from 'react'
import { styled } from 'styled-components';
import Image from 'next/image'
import axios from 'axios';
import ApiPath from '@/app/lib/ApiPath';
import ChatInput from './ChatInput';
import StackPromptsInput from "./StackPromptsInput";

import PromptChatQuestionsPopup from './PromptChatQuestions';
import Modal from 'react-modal'


const artIcon = "/art.png";
const MessageType = Object.freeze({
  Prompt: 'prompt',
  StackPrompt: 'StackPrompt',
  Loading: "Loading",
  TextMessage: "TextMessage"
})

const IntractionType = Object.freeze({
  Like: 'Like',
  DisLike: 'DisLike',
  View: "View",
  Flag: "Flag"
})

const PromptHintDisplayStatus = Object.freeze({
  NotShowing: 0,
  CanShow: 1,
  Showing: 2,
})


const PromptChatView = (props) => {


  const prompt = props.prompt;
  const [subprompt, setSubprompt] = useState(null)
  const [chat, setChat] = useState(null);
  const [modalVisible, setModalVisible] = useState(false)
  const [user, setUser] = useState(null);

  //console.log("Showing sub prompts")
  //console.log(prompt.subprompts)

  const [summary, setSummary] = useState(null);

  let newChat = props.newChat;

  const [canShowPromptHint, setCanShowPromptHint] = useState(0) // 0 can not show, 1 can show, 2 already showing
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState("")
  // //console.log("Prompt in ChatView ", props.prompt)


  //state management
  useEffect(() => {
    //console.log("Setting chat", props.chat)
    if (chat == null) {
      setChat(props.chat)
    }
  }, [props.chat])




  useEffect(() => {
    //console.log("Load messages useeffect ")
    const loadMessages = async (user) => {
      //console.log("Load messages useeffect ", user)
      if (chat) {
        if (prompt.subprompts) {
          setCanShowPromptHint(props.chat.stackedPromptIndexToShow < prompt.subprompts.length ? PromptHintDisplayStatus.CanShow : PromptHintDisplayStatus.NotShowing)
        }
      }
      if (user) {
        //console.log("Loading messages " + ApiPath.GetMessages + "?chatid=" + props.chat.id)
        const config = {
          headers: {
            "Authorization": "Bearer " + user.token,
          }
        };
        axios.get(ApiPath.GetMessages + "?chatid=" + props.chat.id, config).then(data => {
          //console.log("messages api loaded")
          // //console.log(JSON.stringify(data.data))
          if (data.status) {
            setMessages(data.data.data)
            setCanShowPromptHint(PromptHintDisplayStatus.CanShow)
          }
          //   listViewRef._listRef._scrollRef.scrollToEnd({animated: true});
        }).catch(error => {
          //console.log(error)
        })
      }
      else {
        //console.log("User is not there to send message")
      }
    }

    const sendFirstPromptForNewChat = async (user) => {
      //console.log("Sending First Message uncomment below sendMessage function " + prompt)
      sendMessage({message: prompt.prompt, from: "me", type: MessageType.Prompt, title: prompt.title})
    }

    const u = JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LocalSavedUser)
    )
    //console.log(u)
    setUser(u)

    //console.log("New Chat ", newChat)
    //console.log("Chat ", props.chat)
    setChat(props.chat)
    if (newChat && props.chat) {
      //console.log("Sending FirstPrompt")
      newChat = false;
      sendFirstPromptForNewChat(u)
    }
    else {
      if (props.chat) {
        loadMessages(u);
      }
    }
    //call the api to load more prompts
  }, [props.chat])


  useEffect(() => {
    //console.log("Checking what stacked prompt to show")
    if (canShowPromptHint === PromptHintDisplayStatus.CanShow && chat) {
      if (prompt.subprompts) {
        if (chat.stackedPromptIndexToShow < prompt.subprompts.length) {
          // can show prompt
          updateStackedPromptIndex(chat.stackedPromptIndexToShow)

        }
      }
    }
    // createSummary()
  }, [canShowPromptHint, messages, chat])


  useEffect(()=> {
    console.log("Subprompt set ChatView", subprompt)
    if(subprompt != null){
      setModalVisible(true)
    }
   
  }, [subprompt])

  //logic to show stacked prompts
  const updateStackedPromptIndex = (index) => {
    //console.log("Checking update Stacked ", messages.length)
    if (prompt.subprompts) {
      if (prompt.subprompts.length > 0 && messages.length >= 2 && messages[messages.length - 1].type !== MessageType.Loading && messages[messages.length - 1].id !== 0) {

        //console.log("This prompt has sub prompts index = " + index + " & prompts" + prompt.subprompts.length)//ADDING logic to show stacked prompts
        setMessages(old => [...old, { message: prompt.subprompts[index].prompt, from: "me", id: messages.length + 1, type: MessageType.StackPrompt }])
        setCanShowPromptHint(PromptHintDisplayStatus.Showing) // now showing
      }
    }
  }


  // use prompt 
  const usePrompt = (prompt) => {
    setModalVisible(false)
    let p = prompt
    //console.log("Use Prompt Now. Create Questionaire ", p)
    let text = p.prompt;
        for(let i = 0; i < p.questions.length; i++){
            let q = p.questions[i];
            text = text.replace(`[${q.question}]`, q.answer);
        }
        p.prompt = text;
        console.log("Subprompt text is ", text)
        sendMessage({message: p.prompt, from: "me", type: MessageType.StackPrompt, title: p.title})
        setSubprompt(null)
        // updateStackedPromptIndex
  }

  function afterOpenModal() {

  }

  function closeModal() {
    setModalVisible(false);
  }

  //events like btn taps, text changes etc
  const handleBackTap = (event) => {
    props.navigation.pop()
  }

  // will update this function to accomodate chat generation on the server instead of in the app.
  const sendMessagesToServer = async (messagesToSend) => {
    const chat = props.chat;
    //console.log("Sending message to server now", messagesToSend)
    //console.log("------------------------------------")
    //console.log(messagesToSend)
    const u = JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LocalSavedUser)
    )

    //console.log("User")
    //console.log(u)
    //console.log("Chat ID ", props.chat.id)
    //console.log("------------------------------------")
    const config = {
      headers: {
        "Authorization": "Bearer " + u.token,
      }
    };
    const data = {
      chatid: props.chat.id, messages: [
        {
          message: messagesToSend[0].message,
          from: messagesToSend[0].from,
          type: messagesToSend[0].type,
          title: messagesToSend[0].title,
        }
      ]
    };
    //console.log("Sending Message Data ", data)
    axios.post(ApiPath.SendMessage, data, config)
      .then(data => {
        //console.log("Send Message response")
        //console.log(data.data)
        try {
          listViewRef._listRef._scrollRef.scrollToEnd({ animated: true });
        }
        catch (error) {
          //console.log("Scroll Error ", error)
        }
        if (data.data.status) {
          let receieved = data.data.data.messages;
          let c = data.data.data.chat;
          if(c){
            setChat(c)
          }
          let summary = data.data.summary
          if (chat) {
            chat.summary = summary
          }
          //console.log("Messages received from server")
          //console.log("M1 ", receieved[0])
          //console.log("M2 ", receieved[1])
          // setMessages(messages.filter(item => item.type !== MessageType.Loading)) // remove the loading message
          let newArray = messages.filter(item => (item.id !== 0 && item.type !== MessageType.Loading))//[...messages]
          // newArray.pop()
          // newArray.pop()
          // setMessages(messages.filter(item => item.id !== 0)) // 0 is for local messages. remove them and add new one
          newArray.push(receieved[0])
          newArray.push(receieved[1])

          setMessages(newArray)
        }
        else {
          //console.log("Error is here in send message", data.data.message)
        }
      })
      .catch(error => {
        //console.log(error)
      })
  }

  const createSummary = () => {
    //console.log("Printing Summary")
    let summary = ""
    let allMessages = []
    messages.map((item) => {
      summary = summary + "\n" + item.from === "me" ? "user: " : "system: " + item.message
      let message = { role: item.from === "me" ? "user" : "system", content: item.message }
      allMessages.push(message)
    })
    // console.warn("Summar ", summary)
    //console.log("Summar ", summary)
    // setSummary(summary)
    generateSummaryFromGPT(allMessages)
  }

  const sendMessage = async (message) => {
    //console.log("Sending Message ", message)
    setMessages(old => [...old, { message: (message.type === MessageType.Prompt || message.type === MessageType.StackPrompt) ? message.title : message.message, from: "me", id: 0 }])
    setMessages(old => [...old, { message: "Loading....", from: "gpt", id: 0, type: MessageType.Loading }])
    const m1 = { message: (message.type === MessageType.Prompt || message.type === MessageType.StackPrompt) ? message.message : message.message, from: "me", type: message.type, title: message.title }
    // setMessage("")
    sendMessagesToServer([m1])

  }



  const likeDislikePrompt = async (vote, prompt, message) => {
    //console.log("Like Dislike prompt", vote)
    //console.log("Message id ", message)
    const u = JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LocalSavedUser)
    )
    const config = {
      headers: {
        "Authorization": "Bearer " + u.token,
      }
    };
    const data = { promptid: prompt, intractiontype: vote, messageid: message };
    let result = await axios.post(ApiPath.VotePrompt, data, config)
    //console.log("Result Like Dislike")
    //console.log(result)
    if (result.data.status) {
      //   let toast = Toast.show('Prompt ' + vote + "d", {
      //     duration: Toast.durations.LONG,
      //   });
    }
    else {

    }
  }



  const likePrompt = async (message) => {
    //console.log("Like prompt", prompt.id)
    await likeDislikePrompt(IntractionType.Like, prompt.id, message)
  }

  const disLikePrompt = async (message) => {
    //console.log("DisLike prompt", prompt.id)
    await likeDislikePrompt(IntractionType.DisLike, prompt.id, message)
  }

  const handleFlag = async (message) => {
    if (message.isFlagged) {
      // let toast = Toast.show('Flagged already ', {
      //   duration: Toast.durations.LONG,
      // });
    }
    else {
      setMessages(messages.filter(item => item.type !== MessageType.Loading))
    }
    //console.log("Flag prompt response", message)
    // await likeDislikePrompt(IntractionType.Flag, prompt.id, message.id)
  }

  const handleSendMessage = async (msg) => {
    //console.log("Send Message button in ChatINput clicked")
    sendMessage({ message: msg, from: "me", type: "text" });
  }


  return (
    <Container className='flex flex-col  mx-auto justify-center '>
      {
        chat && (
          <Modal
            isOpen={modalVisible}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Prompt Questions"
          >
            <PromptChatQuestionsPopup onClose={() => {
              setModalVisible(false)

            }} prompt={subprompt} onPublish={(prompt) => {
              usePrompt(prompt)
            }} />
          </Modal>
        )
      }
      <ChatHeader className='flex  h-50' username={prompt.user.username} userImage={prompt.user.profile_image} />
      <MessagesList className='flex-grow ' messages={messages} prompt={prompt}/>
      <div className='flex justify-left  w-8/12'>
        <StackPromptsInput prompt={props.prompt} chat={chat} handleSubmitSubPrompt={(subprompts) => {
          //send stacked sub prompt here
          console.log("Use Stacked Prompt Now ", subprompts[chat.stackedPromptIndexToShow + 1])
          setSubprompt(subprompts[chat.stackedPromptIndexToShow + 1])
          setModalVisible(true)
          
        }} />
      </div>
      <ChatInput className='w-full flex bg-red h-50' handleSendMessage={handleSendMessage} ></ChatInput>
    </Container>
  )
}

export default PromptChatView



const IncomingMessage = ({ message, prompt }) => {

  return (
    <div className={`flex-col w-full my-1 justify-center items-center p-2 bg-appgreen mb-15`}>
      <div className={`flex-col mx-1 p-2 w-11/12 my-1`} key={message.id}>
        <div style={{ borderRadius: '50%', overflow: 'hidden', width: '40px', height: '40px' }}>
          <Image className=' rounded-full' src={prompt.user.profile_image}
            objectFit="cover"
            width="40"
            height="40"
          >
          </Image>
        </div>
        <div className='flex mt-3 ps-3 py-3'>
          <p className='text-white'>{message.message}</p>
        </div>

      </div>
      <div className='mb-3 w-11/12 rounded' style={{ backgroundColor: 'white', height: '1px' }}></div>
    </div>
  )
}


const ChatHeader = ({ username, userImage }) => {
  return (
    <div className="chat-header ">
      <div className="user-details">
        <div className="avatar">
          <img src={userImage} alt="User">
          </img>
        </div>
        <div className='username'>
          <h3>
            {username}
          </h3>
        </div>
      </div>
    </div>
  )
}

const MessagesList = ({ messages, prompt }) => {
  return (
    <div className="messages-list  w-8/12   items-center overflow-y-auto mx-auto ">
      {
        messages.map((item, index) => {

          {
            return (

              <div key={index} className={`flex w-full my-1 `}>
                {
                  item.from === "me" ? (
                    <div className={`flex mx-1 p-4 w-10/12 my-1  rounded-lg  border-white`} key={item.id}>
                      <p className='text-white'>{item.message}</p>
                    </div>
                  ) :
                    (
                      <IncomingMessage message={item} prompt={prompt} />
                    )
                }
              </div>

            )
          }


        })
      }
    </div>
  )
}

const customStyles = {
  overlay: {
    background: "#00000090"
  },
  content: {
    background: "#00000090",
    border: "none"
  },
};

const Container = styled.div`
display: flex;
flex-direction: column;
gap: 0.1rem;
overflow: hidden;
width: 70%;
// grid-template-rows: 10% 75% 10%;
padding-top: 0.1rem;
justify-content: center;
align-items: center;
background-color: transparent;
// margin-x: auto;
// text-align: center;
margin-bottom: 1rem;

.messages-list{
  flex: 1;
}

.chat-header{
    display: flex;
    justify-content: left;
    align-items: left;
    padding: 0 0rem;
    width: 66%;
    // background-color: red;
    justify-self: center;
    .user-details{
        display: flex;
        align-items: center;
        gap: 1rem;
        .avatar{
            img{
                height: 3rem;
                width: 3rem;
                border-radius: 1.5rem;

            }
        }
        .username{
            color: white;
        }
    }
}
`;