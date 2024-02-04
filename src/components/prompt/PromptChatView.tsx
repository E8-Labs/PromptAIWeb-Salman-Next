import React from "react";
import { styled } from "styled-components";
import Image from "next/image";
import Modal from "react-modal";
import axios from "axios";

import { API_PATH } from "utils/lib/constants";
import ChatInput from "./ChatInput";
import StackPromptsInput from "./StackPromptsInput";

import PromptChatQuestionsPopup from "./PromptChatQuestions";
import { IconButton } from "@mui/material";
import Icons from "utils/lib/Icons";

const artIcon = "/art.png";
const MessageType = Object.freeze({
  Prompt: "prompt",
  StackPrompt: "StackPrompt",
  Loading: "Loading",
  TextMessage: "TextMessage",
});

// const IntractionType = Object.freeze({
//   Like: 'Like',
//   DisLike: 'DisLike',
//   View: "View",
//   Flag: "Flag"
// })

const PromptHintDisplayStatus = Object.freeze({
  NotShowing: 0,
  CanShow: 1,
  Showing: 2,
});

type PromptChatViewProps = {
  prompt: any;
  newChat: any;
  defaultChat: any;
  navigation: any;
};

const PromptChatView = ({ prompt, defaultChat, newChat, navigation }: PromptChatViewProps) => {
  const [subprompt, setSubprompt] = React.useState<any>(null);
  const [chat, setChat] = React.useState<any>(defaultChat);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [canShowPromptHint, setCanShowPromptHint] = React.useState(0);
  const [messages, setMessages] = React.useState<any[]>([]);
  const bottomRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const loadMessages = async (user: any) => {
      if (chat) {
        if (prompt.subprompts) {
          setCanShowPromptHint(
            chat.stackedPromptIndexToShow < prompt.subprompts.length
              ? PromptHintDisplayStatus.CanShow
              : PromptHintDisplayStatus.NotShowing,
          );
        }
      }
      if (user) {
        const config = {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        };
        axios
          .get(API_PATH.GetMessages + "?chatid=" + chat.id, config)
          .then((data) => {
            //console.log("messages api loaded")
            // //console.log(JSON.stringify(data.data))
            if (data.status) {
              setMessages(data.data.data);
              setCanShowPromptHint(PromptHintDisplayStatus.CanShow);
            }
            //   listViewRef._listRef._scrollRef.scrollToEnd({animated: true});
          })
          .catch((error) => {
            //console.log(error)
          });
      } else {
        //console.log("User is not there to send message")
      }
    };

    const sendFirstPromptForNewChat = async (user: any) => {
      sendMessage({
        message: prompt.prompt,
        from: "me",
        type: MessageType.Prompt,
        title: prompt.title,
      });
    };

    const u = JSON.parse(localStorage.getItem(process.env.REACT_APP_LocalSavedUser));
    setUser(u);

    //console.log("New Chat ", newChat)
    //console.log("Chat ", props.chat)
    setChat(chat);
    if (newChat && chat) {
      //console.log("Sending FirstPrompt")
      newChat = false;
      sendFirstPromptForNewChat(u);
    } else {
      if (chat) {
        loadMessages(u);
      }
    }
    //call the api to load more prompts
  }, [chat]);

  React.useEffect(() => {
    //console.log("Checking what stacked prompt to show")
    if (canShowPromptHint === PromptHintDisplayStatus.CanShow && chat) {
      if (prompt.subprompts) {
        if (chat.stackedPromptIndexToShow < prompt.subprompts.length) {
          // can show prompt
          updateStackedPromptIndex(chat.stackedPromptIndexToShow);
        }
      }
    }
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    // createSummary()
  }, [canShowPromptHint, messages, chat]);

  React.useEffect(() => {
    console.log("Subprompt set ChatView", subprompt);
    if (subprompt != null) {
      setModalVisible(true);
    }
  }, [subprompt]);

  //logic to show stacked prompts
  const updateStackedPromptIndex = (index: number) => {
    //console.log("Checking update Stacked ", messages.length)
    if (prompt.subprompts) {
      if (
        prompt.subprompts.length > 0 &&
        messages.length >= 2 &&
        messages[messages.length - 1]?.type !== MessageType.Loading &&
        messages[messages.length - 1]?.id !== 0
      ) {
        //console.log("This prompt has sub prompts index = " + index + " & prompts" + prompt.subprompts.length)//ADDING logic to show stacked prompts
        setMessages((old) => [
          ...old,
          {
            message: prompt.subprompts[index].prompt,
            from: "me",
            id: messages.length + 1,
            type: MessageType.StackPrompt,
          },
        ]);
        setCanShowPromptHint(PromptHintDisplayStatus.Showing); // now showing
      }
    }
  };

  // use prompt
  const makeUsePrompt = (prompt: any) => {
    setModalVisible(false);
    let p = prompt;
    //console.log("Use Prompt Now. Create Questionaire ", p)
    let text = p.prompt;
    for (let i = 0; i < p.questions.length; i++) {
      let q = p.questions[i];
      text = text.replace(`[${q.question}]`, q.answer);
    }
    p.prompt = text;
    console.log("Subprompt text is ", text);
    sendMessage({ message: p.prompt, from: "me", type: MessageType.StackPrompt, title: p.title });
    setSubprompt(null);
    // updateStackedPromptIndex
  };

  function afterOpenModal() {}

  function closeModal() {
    setModalVisible(false);
  }

  //events like btn taps, text changes etc
  const handleBackTap = (event: React.MouseEvent) => {
    navigation.pop();
  };

  // will update this function to accomodate chat generation on the server instead of in the app.
  const sendMessagesToServer = async (messagesToSend: any) => {
    //console.log("Sending message to server now", messagesToSend)
    //console.log("------------------------------------")
    //console.log(messagesToSend)
    const u = JSON.parse(localStorage.getItem(process.env.REACT_APP_LocalSavedUser));

    //console.log("User")
    //console.log(u)
    //console.log("Chat ID ", props.chat.id)
    //console.log("------------------------------------")
    const config = {
      headers: {
        Authorization: "Bearer " + u.token,
      },
    };
    const data = {
      chatid: chat.id,
      messages: [
        {
          message: messagesToSend[0].message,
          from: messagesToSend[0].from,
          type: messagesToSend[0].type,
          title: messagesToSend[0].title,
        },
      ],
    };
    //console.log("Sending Message Data ", data)
    axios
      .post(API_PATH.SendMessage, data, config)
      .then((data) => {
        //console.log("Send Message response")
        //console.log(data.data)
        try {
          // listViewRef._listRef._scrollRef.scrollToEnd({ animated: true });
        } catch (error) {
          //console.log("Scroll Error ", error)
        }
        if (data.data.status) {
          let receieved = data.data.data.messages;
          let c = data.data.data.chat;
          if (c) {
            setChat(c);
          }
          let summary = data.data.summary;
          if (chat) {
            chat.summary = summary;
          }
          console.log("Messages received from server");
          console.log("M1 ", receieved[0]);
          console.log("M2 ", receieved[1]);
          // setMessages(messages.filter(item => item.type !== MessageType.Loading)) // remove the loading message
          let newArray = messages.filter(
            (item) => item.id !== 0 && item.type !== MessageType.Loading,
          ); //[...messages]
          // newArray.pop()
          // newArray.pop()
          // setMessages(messages.filter(item => item.id !== 0)) // 0 is for local messages. remove them and add new one
          newArray.push(receieved[0]);
          newArray.push(receieved[1]);

          setMessages(newArray);
        } else {
          //console.log("Error is here in send message", data.data.message)
        }
      })
      .catch((error) => {
        //console.log(error)
      });
  };

  // const createSummary = () => {
  //   //console.log("Printing Summary")
  //   let summary = "";
  //   let allMessages = [];
  //   messages.map((item) => {
  //     summary = summary + "\n" + item.from === "me" ? "user: " : "system: " + item.message;
  //     let message = { role: item.from === "me" ? "user" : "system", content: item.message };
  //     allMessages.push(message);
  //   });
  //   // console.warn("Summar ", summary)
  //   //console.log("Summar ", summary)
  //   // setSummary(summary)
  //   generateSummaryFromGPT(allMessages);
  // };

  const sendMessage = async (message: any) => {
    //console.log("Sending Message ", message)
    setMessages((old) => [
      ...old,
      {
        message:
          message.type === MessageType.Prompt || message.type === MessageType.StackPrompt
            ? message.title
            : message.message,
        from: "me",
        id: 0,
      },
    ]);
    setMessages((old) => [
      ...old,
      { message: "Loading....", from: "gpt", id: 0, type: MessageType.Loading },
    ]);
    const m1 = {
      message:
        message.type === MessageType.Prompt || message.type === MessageType.StackPrompt
          ? message.message
          : message.message,
      from: "me",
      type: message.type,
      title: message.title,
    };
    // setMessage("")
    sendMessagesToServer([m1]);
  };

  const likeDislikePrompt = async (vote, prompt, messageid) => {
    const data = { promptid: prompt.id, intractiontype: vote, messageid: messageid };
    console.log("Like Dislike prompt", vote);
    console.log("data", data);
    // return
    const u = JSON.parse(localStorage.getItem(process.env.REACT_APP_LocalSavedUser));
    const config = {
      headers: {
        Authorization: "Bearer " + u.token,
      },
    };

    let result = await axios.post(API_PATH.VotePrompt, data, config);
    console.log("Result Like Dislike");
    console.log(result);
    if (result.data.status) {
      let updatedList = messages.map((item) => {
        if (item.id == messageid) {
          if (vote === IntractionType.Like) {
            return { ...item, liked: true }; //gets everything that was already in item, and updates "done"
          } else if (vote === IntractionType.DisLike) {
            return { ...item, disliked: true }; //gets everything that was already in item, and updates "done"
          }
        }
        return item; // else return unmodified item
      });
      console.log("Messages new ", updatedList);
      setMessages(updatedList);
    } else {
    }
  };

  // const likePrompt = async (message: any) => {
  //   //console.log("Like prompt", prompt.id)
  //   await likeDislikePrompt(InteractionType.Like, prompt.id, message);
  // };

  // const disLikePrompt = async (message: any) => {
  //   //console.log("DisLike prompt", prompt.id)
  //   await likeDislikePrompt(InteractionType.DisLike, prompt.id, message);
  // };

  // const handleFlag = async (message: any) => {
  //   if (message.isFlagged) {
  //     // let toast = Toast.show('Flagged already ', {
  //     //   duration: Toast.durations.LONG,
  //     // });
  //   } else {
  //     setMessages(messages.filter((item) => item.type !== MessageType.Loading));
  //   }
  //   //console.log("Flag prompt response", message)
  //   await likeDislikePrompt(InteractionType.Flag, prompt.id, message.id);
  // };

  const handleSendMessage = async (msg: any) => {
    //console.log("Send Message button in ChatINput clicked")
    sendMessage({ message: msg, from: "me", type: "text" });
  };

  return (
    <Container
      className="flex flex-col h-full pb-3  mx-auto justify-center overflow-y-none bg-black"
      style={{ height: "100%" }}
    >
      {chat && (
        <Modal
          isOpen={modalVisible}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Prompt Questions"
        >
          <PromptChatQuestionsPopup
            onClose={() => {
              setModalVisible(false);
            }}
            defaultPrompt={subprompt}
            onPublish={(prompt) => {
              makeUsePrompt(prompt);
            }}
          />
        </Modal>
      )}
      <ChatHeader username={prompt.user.username} userImage={prompt.user.profile_image} />
      {/* <MessagesList className='flex-grow ' messages={messages} prompt={prompt} ref={bottomRef}/> */}
      <div className="flex flex-grow flex-col messages-list h-11/12   w-8/12   items-center overflow-y-auto mx-auto ">
        {messages.map((item, index) => {
          {
            return (
              <div key={index} className={`flex w-full my-1 `}>
                {item.from === "me" ? (
                  <div
                    className={`flex mx-1 p-4 w-10/12 my-1  rounded-lg  border-white`}
                    key={item.id}
                  >
                    <p className="text-white">{item.message}</p>
                  </div>
                ) : (
                  <IncomingMessage
                    voteAction={(vote: any) => likeDislikePrompt(vote, prompt, item.id)}
                    message={item}
                    prompt={prompt}
                  />
                )}
              </div>
            );
          }
        })}
        <div ref={bottomRef}></div>
      </div>
      <div className="flex flex-col justify-left  w-8/12 rounded-md bg-appgreen">
        <StackPromptsInput
          prompt={prompt}
          chat={chat}
          handleSubmitSubPrompt={(subprompts: any) => {
            //send stacked sub prompt here
            console.log("Use Stacked Prompt Now ", subprompts[chat.stackedPromptIndexToShow + 1]);
            setSubprompt(subprompts[chat.stackedPromptIndexToShow + 1]);
            setModalVisible(true);
          }}
        />
        <div className=" flex flex-grow w-full justify-center items-center p-2">
          <ChatInput chat={chat} />
        </div>
      </div>
    </Container>
  );
};

export default PromptChatView;

const IncomingMessage = ({
  message,
  prompt,
  voteAction,
}: {
  message: any;
  prompt: any;
  voteAction?(input: any): void;
}) => {
  let loading = message.type === MessageType.Loading;
  return (
    <>
      {!loading == true && (
        <div
          className={`flex-col w-full my-1 justify-center items-center p-2 bg-appgreen mb-15 rounded`}
        >
          <div className={`flex-col mx-1 p-2 w-full my-1`} key={message.id}>
            <div className="flex flex-grow justify-between  w-full">
              <Image
                className=" rounded-full"
                src={prompt.user.profile_image}
                alt=""
                objectFit="cover"
                width="40"
                height="40"
                style={{ borderRadius: "50%" }}
              ></Image>
              <IconButton sx={{ color: "white" }} onClick={() => {}}>
                <Icons.TurnedInIcon sx={{ color: "white" }} />
              </IconButton>
            </div>
            <div className={`flex mt-3 ps-3 py-3 `}>
              <p className="text-white">{message.message}</p>
            </div>
          </div>
          <div
            className="mb-3 w-11/12 rounded"
            style={{ backgroundColor: "white", height: "1px" }}
          ></div>
          <div className="flex w-full   justify-between items-center pb-2 px-2">
            <p className="  text-white w-6/7">How would you like to rate this Answer?</p>
            <div className="flex w-full  justify-end items-center">
              <IconButton
                onClick={() => {
                  // voteAction(IntractionType.Like);
                }}
              >
                {!message.liked && <Icons.ThumbUpOffAltIcon sx={{ color: "white" }} />}

                {message.liked && <Icons.ThumbUpIcon sx={{ color: "white" }} />}
              </IconButton>

              <IconButton
                onClick={() => {
                  // voteAction(IntractionType.DisLike);
                }}
              >
                {!message.disliked && <Icons.ThumbDownOffAltIcon sx={{ color: "white" }} />}

                {message.disliked && <Icons.ThumbDownIcon sx={{ color: "white" }} />}
              </IconButton>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="typing-container bg-gray-500 w-50 h-20 rounded-full justify-center items-center">
          <div className={`typing-bubble ${loading ? "animate-bounce" : ""}`}></div>
          <div className={`typing-bubble ${loading ? "animate-bounce" : ""}`}></div>
          <div className={`typing-bubble ${loading ? "animate-bounce" : ""}`}></div>
        </div>
      )}
    </>
  );
};

const ChatHeader = ({ username, userImage }: { username: string; userImage: string }) => {
  return (
    <div className="chat-header h-50  ">
      <div className="user-details">
        <div className="avatar">
          <img src={userImage} alt="User" />
        </div>
        <div className="username">
          <h3>{username}</h3>
        </div>
      </div>
    </div>
  );
};

const MessagesList = ({ messages, prompt }: { messages: any; prompt: any }) => {
  return (
    <div className="messages-list  w-8/12   items-center overflow-y-auto mx-auto ">
      {messages.map((item: any, index: number) => {
        {
          return (
            <div key={index} className={`flex w-full my-1 `}>
              {item.from === "me" ? (
                <div
                  className={`flex mx-1 p-4 w-10/12 my-1  rounded-lg  border-white`}
                  key={item.id}
                >
                  <p className="text-white">{item.message}</p>
                </div>
              ) : (
                <IncomingMessage message={item} prompt={prompt} />
              )}
            </div>
          );
        }
      })}
    </div>
  );
};

const customStyles = {
  overlay: {
    background: "#00000090",
  },
  content: {
    background: "#00000090",
    border: "none",
  },
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  overflow: hidden;
  width: 100%;
  // grid-template-rows: 10% 75% 10%;
  padding-top: 0.1rem;
  justify-content: center;
  align-items: center;
  // margin-x: auto;
  // text-align: center;
  margin-bottom: 1rem;

  .messages-list {
    flex: 1;
  }

  .chat-header {
    display: flex;
    justify-content: left;
    align-items: left;
    padding: 0 0rem;
    width: 66%;
    // background-color: red;
    justify-self: center;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
          width: 3rem;
          border-radius: 1.5rem;
        }
      }
      .username {
        color: white;
      }
    }
  }
`;
