"use client";

import React, { useEffect, useState } from 'react'
import PromptItem from './PromptItem'
import PromptSearchItem from './promptsearchitem';
import Image from 'next/image';
import { CircularProgress } from '@mui/material';
import InfiniteScroll from "react-infinite-scroll-component";

import {
  Grid,
  Card,
  Typography,
  CardContent,
  CardMedia,
  capitalize
} from '@mui/material';

import { useRouter } from 'next/navigation'

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import PromptChatView from './PromptChatView';
import PromptChatQuestionsPopup from './PromptChatQuestions';
import Modal from 'react-modal';


import axios from 'axios';
import ApiPath from '../../lib/ApiPath';
// import { useScroll } from 'framer-motion';
import SearchBar from './Searchbar';

const PlusIcon = "/whiteplusicon.svg";

const customStyles = {
  overlay: {
    background: "#00000090",
  },
  content: {
    background: "#00000090",
    border: "none"
  },
};


function Promptsearch(props) {
  const [prompts, setPrompts] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [user, setUser] = useState(null)
  const [search, setSearch] = useState('')
  const [previousSearch, setPreviousSearch] = useState('')
  const [timerSearch, setTimerSearch] = useState('')
  const [loading, setLoading] = useState(false)

  const [currentSelectedPrompt, setCurrentSelectedPrompt] = useState(false)
  const [promptQuestionDialogueVisible, setPromptQuestionDeialogueVisible] = useState(false)

  const router = useRouter();

  let timeoutId;

  useEffect(() => {
    let u = null
    if (typeof localStorage !== 'undefined') {
      u = JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LocalSavedUser)
      )
    }
    setUser(u)
    loadPrompts(u)


    const handleEvent = (data) => {
      console.log('Event data from search:', data);
    };
    window.addEventListener("searchTextChanged", (event) => {
      // Execute the callback function, passing the event's detail as an argument
      console.log("Event Received Search screen", event.detail)
      // var user = null
      setSearch(event.detail)
    });
    // Register the event listener
    // listenToEvent('myCustomEvent', handleEvent);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('newChat', handleEvent);
    }
  }, [])



  const handleLoadingClose = () => {
    setLoading(false)
  }

  function afterOpenModal() {

  }

  function closeModal() {
    setPromptQuestionDeialogueVisible(false);
  }



  //listen searchTextChanged Event here

  // useEffect(()=>{

  //     if(search != ''){
  //         searchApi(user)
  //     }
  // }, [search])

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      // Perform the search request with the current query
      setPrompts([])
      setTimerSearch(search)
      loadPrompts(user)

    }, 500); // Set the delay to 100ms

    // Cleanup function to clear the timeout when component unmounts or when query changes
    return () => clearTimeout(delayedSearch);
  }, [search]);

  function delay(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    })
  }


  const searchApi = async (user) => {
    clearTimeout(timeoutId);
    setPrompts([])
    setTimerSearch(search)

    timeoutId = setTimeout(async () => {
      console.log("Searching ...", search)
      try {
        loadPrompts(user)
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    }, 400);
  }




  const loadPrompts = async (user) => {
    // console.log("In Load Prompts. Remove return statement when implemented")
    // console.log("Tokan in get Prompts " + user.token)
    const config = {
      headers: {
        "Authorization": "Bearer " + `${user ? user.token : ''}`,
      }
    };
    var offset = 0;
    if (search == previousSearch) {
      offset = prompts.length
    }
    else {


    }

    const route = ApiPath.GetPromptsList + `?offset=${offset}${search != '' ? `&search=${search}` : ''}`;
    console.log(route)
    setLoading(true)
    axios.get(route, config)
      .then(res => {
        setLoading(false)
        console.log("Data is ")
        console.log(res.data)
        // setMessages(res.data.data)

        res.data.data.prompts.map((m, index) => {
          setPrompts((prevState) =>
            [...prevState, m]
          )
        })
        setPreviousSearch(search)
      })
      .catch(err => {
        setLoading(false)
        console.log(err)
      })


  }


  const handlePromptSelected = (prompt) => {
    console.log("Prompt in List PromptsListDashboard" + prompt.title + " Clicked")

    setCurrentSelectedPrompt(prompt)
    if (prompt.questions.length == 0) {
      createChat(prompt)
    }
    else {
      console.log("PromptListDashboard: Prompt before sending to questions ", prompt)
      setPromptQuestionDeialogueVisible(true)
    }
    // props.handlePromptSelected(prompt)
  }

  // const savePromptApi = (prompt) => {
  //   let api = ApiPath.SavePrompt;
  //   let u = null
  //   if (typeof localStorage !== 'undefined') {
  //     u = JSON.parse(
  //       localStorage.getItem(process.env.REACT_APP_LocalSavedUser)
  //     )
  //   }

  //   const config = {
  //     headers: {
  //       "Authorization": "Bearer " + u.token,
  //     }
  //   };
  //   const data = {
  //     promptid: prompt.id,
  //   };
  //   //console.log("Sending Message Data ", data)
  //   axios.post(api, data, config)
  //     .then(data => {
  //       console.log("Save prompt response")
  //       console.log(data.data)
  //       if (data.data.status) {
  //         // call the callback function here
  //       }
  //       else {
  //         //console.log("Error is here in send message", data.data.message)
  //       }
  //     })
  //     .catch(error => {
  //       //console.log(error)
  //     })
  // }

  const createChat = (prompt) => {

    setCurrentSelectedPrompt(prompt)
    setPromptQuestionDeialogueVisible(false)
    console.log("PromptListDashboard: Prompt after sending to questions ", prompt)
    //console.log(prompt)
    //console.log("Length is " + prompt.questions.length);
    let text = prompt.prompt;
    for (let i = 0; i < prompt.questions.length; i++) {
      let q = prompt.questions[i];
      text = text.replace(`[${q.question}]`, q.answer);
    }
    prompt.prompt = text;
    // create chat api
    let u = null
    if (typeof localStorage !== 'undefined') {
      u = JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LocalSavedUser)
      )
    }
    //console.log(u)
    const config = {
      headers: {
        "Authorization": "Bearer " + u.token,
      }
    };
    const data = { promptId: prompt.id };
    setLoading(true)
    axios.post(ApiPath.CreateChat, data, config)
      .then(data => {
        setLoading(false)
        console.log("Chat create response")
        console.log(data.data)
        if (data.data.status) {
          let chat = data.data.data; //chat data
          let isNew = true
          if (data.data.message === "Chat already exists") {
            isNew = false;
          }
          chat.isNew = isNew
          setCurrentChat(chat)
          handleChatNavigation(prompt, chat)
          // setChatViewVisible(true)
        }
        else {
          console.log("Some error ", data.data.message)
        }


      })
      .catch(error => {
        console.log("Exception", error)
      })
    //console.log(text)
  }

  const handleChatNavigation = (prompt, chat) => {
    console.log("Prompt page in List " + prompt.title + " Clicked")
    // setCurrentSelectedPrompt(prompt)
    // setCurrentChat(chat)
    // setMenuSelected("chatgpt")
    let data = { chatViewVisible: true, newChat: true, prompt: prompt, chat: chat }
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem("CURRENTCHAT", JSON.stringify(data))
    }
    router.push("/dashboard/chat?chatid=" + chat.id)
  }
  const searchTextChanged = (text) => {
    console.log("Search text ", text)
    setSearch(text)
  }



  const renderCards = (prompt, index) => {

    return (
      <Grid key={prompt.id} item xs={12} sm={6} md={4} lg={4}>
        <div className="rounded bg-appgreen p-0 " >
          <PromptItem className='promptitem' prompt={prompt} itemSelected={(item) => {
            handlePromptSelected(item)
            // setAnchorEl(event.currentTarget);
          }} profileClicked={() => {
            setOtherUserProfile(prompt.user)
            console.log("Profile tapped ", prompt.user.username)
          }}
            savePromptClicked={() => {
              //call the api here
              savePromptApi(prompt)
              console.log("Saving prompt ", prompt)
              props.setPromptSaved(prompt, index)
            }}
          ></PromptItem>


        </div>
      </Grid>
    );
  };



  return (
    <div className='flex-col justify-left w-full h-full'>
      {/*<SearchBar textChanged={searchTextChanged} />*/}
      <Modal
        isOpen={promptQuestionDialogueVisible}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Prompt Questions"
      >
        <PromptChatQuestionsPopup onClose={() => {
          setPromptQuestionDeialogueVisible(false)

        }} prompt={currentSelectedPrompt} onPublish={createChat} />
      </Modal>
      <div className='flex-col overflow-hidden h-full  '>

        {/**/}

        {(prompts.length === 0 && !loading) && (<div className='text-white text-center mt-5'>No Prompts Matching Search</div>)}

        {
          loading && (
            <div className='flex flex-row h-full w-full justify-center items-center gap-2'>

              <CircularProgress />
              <h4 className='text-white'>Loading...</h4>
            </div>

          )
        }

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4 mt-5 " >

          {/* Salman's code for displaying search if no items then show no prompt or loading  */}
          {
            prompts.length > 0 && (
              <div className=' overflow-y-auto  mt-3 pr-2 py-6' style={{ height: '80vh', width: '80vw' }}>
                <InfiniteScroll
                  dataLength={prompts.length}
                  next={() => {
                    console.log("Next data")
                  }}
                  hasMore={true}
                  scrollThreshold={1}
                  // loader={<LinearProgress />}
                  // Let's get rid of second scroll bar
                  style={{ overflow: "unset" }}
                >
                  <Grid container spacing={4} className=''>
                    {prompts.map((prompt, index) => renderCards(prompt, index))}
                  </Grid>
                </InfiniteScroll>
              </div>
            )
          }
          {/*
            (prompts.length === 0 && !loading) && (
              <div className='flex flex-col h-full w-full justify-center items-center '>
                <h4 className='text-white'>No Prompts Matching Search</h4>
              </div>
            )*/
          }
          {/*
            loading && (
              <div className='flex flex-row h-full w-full justify-center items-center gap-2'>

                <CircularProgress />
                <h4 className='text-white'>Loading...</h4>
              </div>

            )
            */}
        </div>
      </div>
    </div>
  )
}

export default Promptsearch
