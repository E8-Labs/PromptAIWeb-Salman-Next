"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styled from 'styled-components';
import ProfileBannerView from "./ProfileBanner";
import PromptItem from "../prompt/PromptItem";
import PromptItemMyprofile from "../prompt/promptitemmyprofile";
import { IconButton, Snackbar } from "@mui/material";
import axios from "axios";
import Icons from "../../lib/Icons";
import ProfileManagement from './ProfileManagement'
import ApiPath from "../../lib/ApiPath";
import PromptChatQuestionsPopup from "../prompt/PromptChatQuestions";
import Modal from 'react-modal';
//AI component, Profile Manage Componnent

import Manageprofile from './Manageprofile';
import AIpersonality from './AIpersonality';

const RecentIcon = '/assets/recent.svg'
const PopularIcon = '/assets/popular.svg'


export default function ProfileBaseView(props) {

  const router = useRouter()
  // const user = props.user;
  const [user, setUser] = useState(props.user) // user whose profle we are viewing
  const userImage = ""
  const [snackBarOpen, setSnackbarOpen] = useState(false)
  const [snackMessage, setSnackMessage] = useState("")
  const [menuSelected, setMenuSelected] = useState('personal_info')
  const [currentUser, setCurrentUser] = useState(null);
  const [prompts, setPrompts] = useState([])
  const [currentSelectedPrompt, setCurrentSelectedPrompt] = useState(false)
  const [promptQuestionDialogueVisible, setPromptQuestionDeialogueVisible] = useState(false)
  const [currentChat, setCurrentChat] = useState(null)
  const [loading, setLoading] = useState(false)

  const customStyles = {
    overlay: {
      background: "#00000090",
    },
    content: {
      background: "#00000090",
      border: "none"
    },
  };

  useEffect(() => {
    //console.log("prompts loaded")
    if (currentUser != null) {
      getUserProfile()
      loadPrompts()
    }

  }, [currentUser])


  useEffect(() => {
    loadCurrentUser()
    console.log("Other user profile obtained", user)
  }, [])


  const loadCurrentUser = async () => {
    if (typeof localStorage !== 'undefined') {
      if (!localStorage.getItem(process.env.REACT_APP_LocalSavedUser)) {
        navigate("/login");
      } else {
        console.log("User already logged in")
        setCurrentUser(
          await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LocalSavedUser)
          )
        );
        //   loadUsers(currentUser.token);
      }
    }
  };
  const loadPrompts = () => {
    //console.log("In Load Prompts. Remove return statement when implemented")
    // return 
    var u = null
    if (typeof localStorage !== 'undefined') {
      u = JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LocalSavedUser)
      )
    }

    //   this.setState({currentUser: user})
    // setCurrentUser(u)
    // console.log("Token in get Prompts " + u)
    const config = {
      headers: {
        "Authorization": "Bearer " + u.token,
      }
    };
    let otherUserProfileIdParameter = ""
    if (user.token === "") {
      otherUserProfileIdParameter = "&userid=" + user.user.id
    }
    const route = ApiPath.GetUserPrompts + `?offset=${prompts.length}${otherUserProfileIdParameter}`;
    // console.log(route)
    axios.get(route, config)
      .then(res => {
        // console.log("Data is ")
        console.log(res.data)
        // setMessages(res.data)

        res.data.data.map((m, index) => {
          setPrompts((prevState) =>
            [...prevState, m]
          )
        })
        // console.log("Prompts count is ", prompts.length)
      })
      .catch(err => {
        console.log(err)
      })


  }

  const handleLoadingClose = () => {
    setLoading(false)
  }

  function afterOpenModal() {

  }

  function closeModal() {
    setPromptQuestionDeialogueVisible(false);
  }

  
  const handlePromptSelected = (prompt) => {
    console.log("Prompt in List Profile" + prompt.title + " Clicked")

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
    // console.log("PromptListDashboard: Prompt after sending to questions ", prompt)
    //console.log(prompt)
    //console.log("Length is " + prompt.questions.length);
    console.log("Hello Hamza")
    let text = prompt.prompt;
    try{
      for (let i = 0; i < prompt.questions.length; i++) {
        let q = prompt.questions[i];
        text = text.replace(`[${q.question}]`, q.answer);
      }
    }
    catch(error){
      console.log("Error In Parsing Questions ", error)
    }
    console.log("Here")
    prompt.prompt = text;
    // create chat api
    console.log("Here")
    let u = null
    if (typeof localStorage !== 'undefined') {
      u = JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LocalSavedUser)
      )
    }
    console.log("user in profile chat", u)
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


  const logoutCurrentuser = () => {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(process.env.REACT_APP_LocalSavedUser)
    }
    // navigate("/")
  }
  const getUserProfile = async () => {
    console.log("Loading Profile Api", user.user.id)
    console.log("With token ", currentUser.token)
    let userid = user.user.id;
    const config = {
      headers: {
        "Authorization": "Bearer " + currentUser.token,
      }
    };
    // try{
    let route = ApiPath.Profile + "?userid=" + userid
    console.log("Route ", route)
    axios.get(route, config).then((resData) => {
      console.log("Profile api loaded ")
      console.log(resData.data)
      if (resData.data.status) {
        if (resData.data.data) {
          let u = resData.data.data;
          setUser({ user: u, token: "" })

          // setUserLoaded(true)
        }
      }
      else {
        console.log("No user found with this auth token")
        setUser(null)
        //   setUserLoaded(true)

      }
    }).catch((error) => {
      console.log("Error fetching user ", error);
      // setUser(null)
      // setUserLoaded(true)

    })

  }
  const handleMenuClick = event => {
    console.log(event.currentTarget.id);
    setMenuSelected(event.currentTarget.id)
    if (event.currentTarget.id == "logout") {
      logoutCurrentuser()
    }
  };

  //code for AI Personality
  const [aiPersonality, SetAiPersonality] = useState(false)

  const handleAI = () => {
    setAllprompts(false)
    setProfilemanage(false)
    SetAiPersonality(true)
  }

  //code for profilemanagement
  const [profilemanage, setProfilemanage] = useState(true)

  const handleProfileManagement = () => {
    setAllprompts(false)
    SetAiPersonality(false)
    setProfilemanage(true)
  }

  //code for prompts
  const [allprompts, setAllprompts] = useState(false)

  const handleUserPrompts = () => {
    SetAiPersonality(false)
    setProfilemanage(false)
    setAllprompts(true)
  }

  return (
    <div className="flex  flex-col  flex-grow w-full h-full bg-black px-2">
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
      {
        currentUser != null && (
          <div className={` ${user.user.id !== currentUser.user.id ? "" : 'hidden'}`} style={{}}>
            <IconButton onClick={() => {
              props.closeProfileView()
            }}>
              <Icons.CloseIcon sx={{ color: 'white' }} />
            </IconButton>
          </div>
        )
      }

      <ProfileBannerView user={user} />

      {/*<div className="flex gap-2 pt-5 justify-between">

         <div class="flex gap-2 pt-5" role="group" aria-label="First group">
          <div style={{ height: '38px', paddingLeft: 15, paddingRight: 15, paddingTop: 10, paddingBottom: 10, background: 'rgba(14, 110, 255, 0.10)', borderRadius: 15, justifyContent: 'flex-start', alignItems: 'center', gap: 7, display: 'inline-flex' }}>
            <div style={{ width: 20, height: 20, paddingTop: 1.25, paddingBottom: 1.88, paddingLeft: 1.87, paddingRight: 1.25, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
              <img src={RecentIcon}></img>
            </div>
            <div style={{ color: 'white', fontSize: 15, fontFamily: 'Rubik', fontWeight: '500', wordWrap: 'break-word' }}>Recent</div>
          </div>
          <div style={{ height: '38px', paddingLeft: 15, paddingRight: 15, paddingTop: 10, paddingBottom: 10, background: 'rgba(14, 110, 255, 0.10)', borderRadius: 15, justifyContent: 'flex-start', alignItems: 'center', gap: 7, display: 'inline-flex' }}>
            <div style={{ width: 20, height: 20, paddingTop: 1.25, paddingBottom: 1.88, paddingLeft: 1.87, paddingRight: 1.25, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
              <img src={PopularIcon}></img>
            </div>
            <div style={{ color: 'white', fontSize: 15, fontFamily: 'Rubik', fontWeight: '500', wordWrap: 'break-word' }}>Popular</div>
          </div>
        </div> 
      </div>*/}
      <div className="mt-5 flex flex-row">
        <button className="rounded flex flex-row p-3"
          onClick={handleProfileManagement}
          style={{
            backgroundColor: profilemanage ? '#00C28C30' : '',
            border: 'none'
          }}>
          <img className="h-auto w-5" src="/Setting.png" /> <p className="text-white ms-2">Profile Management</p>
        </button>
        <button className="rounded ms-2 p-3 flex flex-row"
          onClick={handleAI} style={{
            backgroundColor: aiPersonality ? '#00C28C30' : '',
            border: 'none'
          }}
        >
          <img className="h-auto w-5" src="/chatgpt.svg" /><p className="text-white ms-2">AI Personality</p>
        </button>
        <button className="rounded p-3 flex flex-row"
          onClick={handleUserPrompts} style={{
            backgroundColor: allprompts ? '#00C28C30' : '',
            border: 'none'
          }}
        >
          <img className="h-auto w-5" src="/chatgpt.svg" /> <p className="text-white ms-2">My Prompts</p>
        </button>
      </div>

      {/* Code for AllPrompts User Created */}
      {allprompts && (
        <div className="mb-10 mt-7" style={{
          overflow: 'scroll',
          height: '520px'
        }}>
          {
            currentUser != null && (
              <div className={`${user.user.id !== currentUser.user.id ? " grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'}`} style={{}}>
                {

                  prompts.map((element, index) => {
                    // <label>{element}</label>
                    {
                      console.log("Prompt in map is ", element)
                    }
                    return (
                      <div className="rounded bg-appgreen p-0 " key={element.id}>
                        {/* <PromptItemMyprofile prompt={element}  itemSelected = {handlePromptSelected}/> */}
                        <PromptItem className='promptitem' prompt={element} itemSelected={handlePromptSelected} saveAction={() => {
                          console.log("Buy btn clicked")

                        }}></PromptItem>
                      </div>
                    )
                  })
                }
              </div>
            )
          }
        </div>
      )}

      {/* Code for Profilemanage */}
      {profilemanage && (
        <div className="mt-10">
          {/*<ProfileManagement />*/}
          <Manageprofile />
        </div>
      )}

      {/* Code for AI Personality */}
      {aiPersonality && (
        <div className="text-white">
          <AIpersonality />
        </div>
      )}
    </div>
  )
}


const Container = styled.div`
display: flex;
flex-direction: column;
// width: 100%;
// height: 100%;
background-color: transparent;
// align-content: center;
// padding-top: 1rem;
.horizontalspacingvsmall{
    width: 0.5rem;
}

.horizontalspacingvmedium{
    width: 1.0rem;
}
.horizontalspacingvlarge{
    width: 1.5rem;
}


.detailsdiv{
    position: relative;
    // background-color: yellow;
    display: flex;
    flex-direction: row;
    .leftmenudiv{
        height: 20rem;
        width: 12rem;
        background-color: #00C28C10;
        display: flex;
        padding-left: 2rem;
        flex-direction: column;
        gap: 1.5rem;
        text-align: left;
        justify-content: center;
        align-items: left;
        border-radius: 1rem;
        button{
            text-align: left;
            background-color: transparent;
            border: none;
            color: white;
            cursor: pointer;
        }
        .btnmenuselected{
            text-align: left;
            background-color: transparent;
            border: none;
            color: #00C28C;
            cursor: pointer;
        }
        .logoutbtn{
            color: #FF124B;
        }
    }
}
`;
