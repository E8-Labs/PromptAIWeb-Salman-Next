'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image';

import React, { useState, useEffect, useCallback } from "react";
import styled from 'styled-components'
import MultiFormPopup from '../ui/prompt/promptcreation/PromptCreation';
import PromptChatQuestionsPopup from '../ui/prompt/PromptChatQuestions';
import ReactModal from 'react-modal';
import PromptChatView from '../ui/prompt/PromptChatView';
import ProfileBaseView from '../ui/profile/Profile';
import UserProfileArea from '../ui/profile/UserProfileArea';

import { IconButton } from '@mui/material';

import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
const dashboardLogo = '/dashboard.svg';
const userIcon = '/user-icon.svg';
const headphoneIcon = '/headphone.svg';
const usersIcon = '/users.svg';
const privacyIcon = '/privacy.svg';
const termIcon = '/terms.svg';
import PromptItem from '../ui/prompt/PromptItem';

// import {  Modal,   ModalContent,   ModalHeader,   ModalBody,   ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import Modal from 'react-modal';



import axios from 'axios'
import ApiPath from '../lib/ApiPath';
import PromptsListDashboard from '../ui/prompt/PromptsListDashboard';
import Promptsearch from '../ui/prompt/promptsearch';




export default function PromptsList() {

  const router = useRouter();
  const userImage = "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRk9ereOPzUWlYLy1dLFUbRLodoiDsPuIuAUmo749NjSSsyZSyf"
  // const prompts = ["Prompt1", "Promt2", "Prompt1", "Promt2", "Prompt1", "Promt2", "Prompt1", "Promt2", "Prompt1", "Promt2", "Prompt1", "Promt2", "Prompt1", "Promt2", "Prompt1", "Promt2"]
  const [isPopupOpen, setPopupOpen] = useState(false);
  // NextJs Model library
  // const {isOpen, onOpen, onOpenChange} = useDisclosure();
  // const navigate = useNavigate()
  const [menuSelected, setMenuSelected] = useState("dashboard")
  const [currentUser, setCurrentUser] = useState(undefined);
  const [role, setRole] = useState('user') // or coach
  // const [isCreatePromptOpen, setIsPopupOpen] = useState(false);
  const [prompts, setPrompts] = useState([])
  const [prompt, setPrompt] = useState(null)

  const [currentSelectedPrompt, setCurrentSelectedPrompt] = useState(null)
  const [chatViewVisible, setChatViewVisible] = useState(false)
  const [currentChat, setCurrentChat] = useState(null)

  function openModal() {
    setPopupOpen(true);
  }

  function afterOpenModal() {
  }

  function closeModal() {
    setPopupOpen(false);
  }

  const handleMenuClick = event => {
    console.log(event.currentTarget.id);
    setMenuSelected(event.currentTarget.id)
    if (event.currentTarget.id === "dashboard") {
      loadPrompts()
    }
    else if (event.currentTarget.id === "logout"){
      //logout here
      localStorage.setItem(process.env.REACT_APP_LocalSavedUser, null)
      router.push("/")
    }
  };
  const handleClosePopup = (event) => {
    setPopupOpen(false)
    //console.log("Popup closed")
  }

  const handleCreatePrompt = event => {
    //console.log(event.currentTarget.id);
    setPopupOpen(true)
  };

  const handlePromptSelected = (prompt, chat) => {
    //console.log("Prompt page in List " + prompt.title + " Clicked")
    setCurrentSelectedPrompt(prompt)
    setCurrentChat(chat)
    setMenuSelected("chatgpt")
  }

  const loadCurrentUser = useCallback(async () => {
    if (!localStorage.getItem(process.env.REACT_APP_LocalSavedUser)) {
      navigate("/onboarding");
    } else {
      //console.log("User is saved in Dashboard")
      //console.log(process.env.REACT_APP_LocalSavedUser)

      setCurrentUser(

        JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LocalSavedUser)
        )
      );
      //   loadUsers(currentUser.token);
    }
  });



  const loadPrompts = () => {
    //console.log("In Load Prompts. Remove return statement when implemented")
    // return 
    let d = localStorage.getItem(process.env.REACT_APP_LocalSavedUser)
    console.log("User data stored is ", d)
    const user = JSON.parse(
      d
    )

    //   this.setState({currentUser: user})
    setCurrentUser(user)
    console.log("Tokan in get Prompts " + user)
    const config = {
      headers: {
        "Authorization": "Bearer " + user.token,
      }
    };
    const route = ApiPath.GetPromptsList + `?offset=${prompts.length}`;
    //console.log(route)
    axios.get(route, config)
      .then(res => {
        //console.log("Data is ")
        //console.log(res.data.data.prompts)
        // setMessages(res.data.data)

        res.data.data.prompts.map((m, index) => {
          setPrompts((prevState) =>
            [...prevState, m]
          )
        })
      })
      .catch(err => {
        console.log(err)
      })


  }
  useEffect(() => {
    //console.log("prompts loaded")
    loadPrompts()
  }, [])


  useEffect(() => {
    if (currentUser === undefined) {
      loadCurrentUser()
    }
    else {
      //console.log(currentUser.username)
    }
  }, [])


  useEffect(() => {

    if (currentUser === undefined) {
      loadCurrentUser()
    }
    else {
      //console.log(currentUser.username)
      //console.log("Current User Obtained " + currentUser.user.email)
      if (currentUser.user.role === null || typeof (currentUser.user.role) === 'undefined') {
        setRole("user")
      }
      else {
        //console.log("Setting user role " + currentUser.user.role)
        setRole(currentUser.user.role)
      }
    }
  }, [currentUser, role])
  return (
    <div className="container-fluid bg-app-dark-green overflow-none" style={{ height: "100vh" }}>

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

      <div className="row mb-3" style={{ height: "4vh" }}>

        <nav className="navbar navbar-expand-lg navbar-dark mt-5">
          <div className="container-fluid rounded">
            <div className='justify-between  my-auto p-4  flex'>
              <div className='flex'>
                <a className="" href="#" style={{ color: "white", fontSize: 26, fontWeight: 'bold' }}>Prompt.</a>
                <a href="#" style={{ color: "#00C28C", fontSize: 26, fontWeight: 'bold' }}>ai</a>
              </div>

              <div className=" flex justify-between align-center">
                <div className="nav-item mx-4">
                  <button className="btn text-white" id="search" onClick={handleMenuClick}><i className="fa fa-search"></i></button>
                </div>
                <div className="nav-item mx-4">
                  <button className="btn text-white" id="notifications" onClick={handleMenuClick}><i className="fa fa-bell"></i></button>
                </div>
                <Image id="myprofile" src={currentUser ? currentUser.user.profile_image : ""}
                  alt={""} className="rounded-full w-8 h-8 " width={40} height={40} style={{ borderRadius: 20 }}
                  onClick={handleMenuClick}
                >
                </Image>
              </div>
            </div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end top-nav-custom-class" id="navbarNav">
              <ul className="navbar-nav ">

                <li className={"nav-item " + (role === "user" ? "d-none" : "")}>
                  <button className="btn text-white" id="createPrompt" onClick={handleCreatePrompt}
                    data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"
                  >
                    Create Prompt</button>
                </li>

                <li className="nav-item ">
                  <button className="btn text-white" id="search" onClick={handleMenuClick}><i className="fa fa-search"></i></button>
                </li>
                <li className="nav-item">
                  <button className="btn text-white" id="notifications" onClick={handleMenuClick}><i className="fa fa-bell"></i></button>
                </li>
                <li className="nav-item">
                  <img id="profile" className="rounded-pill border" onClick={handleMenuClick} src={userImage} style={{ width: "50px", height: "50px", objectFit: "contain" }} />
                </li>
                <li className="nav-item d-lg-none">
                  <div className="col-sm-12 dbmenubtn " id="dashboard" onClick={handleMenuClick}>
                    <img className="icon" src={dashboardLogo}></img>
                    <button className="button fs-6">Dashboard</button>
                  </div>
                </li>
                <li className="nav-item d-lg-none">
                  <div className="col-sm-12 dbmenubtn " id="chatgpt" onClick={handleMenuClick}>
                    <img className="icon" src={userIcon}></img>
                    <button className="button fs-6">ChatGPT</button>
                  </div>
                </li>
                <li className="nav-item d-lg-none">
                  <div className="col-sm-12 dbmenubtn " id="support" onClick={handleMenuClick}>
                    <img className="icon" src={headphoneIcon}></img>
                    <button className="button fs-6">Customer Support</button>
                  </div>
                </li>
                <li className="nav-item d-lg-none">
                  <div className="col-sm-12 dbmenubtn " id="community" onClick={handleMenuClick}>
                    <img className="icon" src={usersIcon}></img>
                    <button className="button fs-6">Community Forum</button>
                  </div>
                </li>
                <li className="nav-item d-lg-none">
                  <div className="col-sm-12 dbmenubtn " id="privacy" onClick={handleMenuClick}>
                    <img className="icon" src={privacyIcon}></img>
                    <button className="button fs-6">Privacy Policy</button>
                  </div>
                </li>
                <li className="nav-item d-lg-none">
                  <div className="col-sm-12 dbmenubtn " id="terms" onClick={handleMenuClick}>
                    <img className="icon" src={termIcon}></img>
                    <button className="button fs-6">Terms & conditions</button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>

      </div>

      <div className="row md:p-4 " style={{ height: "100%" }}>
        <div className=" col-sm-2 col-md-3 d-none d-md-inline flex flex-grow flex-col float-left" style={{ height: '100%' }}>
          <div className="row d-flex justify-content-between">
            <div>
              <div className="col-sm-12  dbmenubtn  p-2 gap-2" id="dashboard" onClick={handleMenuClick}>
                <img className="icon" src={dashboardLogo}></img>
                <button className="button fs-6">Dashboard</button>
              </div>
              <div className="col-md-12 dbmenubtn   p-2 gap-2" id="chatgpt" onClick={handleMenuClick}>
                <img className="icon" src={userIcon}></img>
                <button className="button fs-6">ChatGPT</button>
              </div>
            </div>
            <div className="col-md-12 dbmenubtn   p-2 gap-2" id="support" onClick={handleMenuClick}>
              <img className="icon" src={headphoneIcon}></img>
              <button className="button fs-6">Customer Support</button>
            </div>
            <div className="col-md-12 dbmenubtn   p-2 gap-2" id="community" onClick={handleMenuClick}>
              <img className="icon" src={usersIcon}></img>
              <button className="button fs-6">Community Forum</button>
            </div>
            <div className="col-md-12 dbmenubtn   p-2 gap-2" id="privacy" onClick={handleMenuClick}>
              <img className="icon" src={privacyIcon}></img>
              <button className="button fs-6">Privacy Policy</button>
            </div>
            <div className="col-md-12 dbmenubtn   p-2 gap-2" id="terms" onClick={handleMenuClick}>
              <img className="icon" src={termIcon}></img>
              <button className="button fs-6">Terms & conditions</button>
            </div>
            <div className="col-md-12 dbmenubtn   p-1 gap-2" id="logout" onClick={handleMenuClick}>
              {/* <img className="icon" src={usersIcon} style={{color: 'red'}}></img> */}
              <IconButton style={{color: 'red'}}>
                <LogoutSharpIcon />
              </IconButton>

              <button className="button fs-4 " style={{color: 'red', fontSize: 15, fontWeight: 'bold'}}>Logout</button>
            </div>
          </div>
        </div>
        <div className={"col-md-9 flex flex-col flex-grow  pb-6 h-full " + ((menuSelected === "chatgpt" || menuSelected === "search") ? "" : "overflow-y-auto")} style={{ height: '100%' }} >
          {
            //disabled flow if the menu is chat gpt in the div above.
            menuSelected == "chatgpt" && currentSelectedPrompt !== null && currentChat !== null && (
              // <ChatContainer prompt={prompt}/>
              // <div>Th÷is is chat screen</div>
              <PromptChatView chatViewVisible={true} newChat={true} chat={currentChat} prompt={currentSelectedPrompt} />

            )
          }
          {
            menuSelected == "privacy" && (
              <div><h1>This is Privacy</h1></div>
            )
          }
          {
            menuSelected == "terms" && (
              <div><h1>This is Terms</h1></div>
            )
          }
          {
            menuSelected == "notifications" && (
              <div><h1>This is Notifications Screen</h1></div>
            )
          }
          {
            menuSelected == "h" && (
              <div><h1>This is Search</h1></div>
            )
          }
          {
            menuSelected == "dashboard" && (
              <div>


                {
                  // !isPopupOpen &&(
                  <PromptsListDashboard prompts={prompts} handlePromptSelected={handlePromptSelected} handleAddAction={() => {
                    //console.log("Dialogue open")
                    setPopupOpen(true)
                    // onOpen();
                  }} />
                  // )
                }
                <Modal
                  isOpen={isPopupOpen}
                  onAfterOpen={afterOpenModal}
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Example Modal"
                >
                  <MultiFormPopup onClose={() => {
                    setPopupOpen(false)
                  }} />
                </Modal>
              </div>
            )
          }
          {
            menuSelected == "support" && (
              <div><h1>This is Customer Support</h1></div>
            )
          }
          {
            menuSelected == "community" && (
              <div><h1>This is Community</h1></div>
            )
          }
          {
            menuSelected == "myprofile" && (
              <div className='h-full w-full '>
                {/* <UserProfileArea /> */}
                <ProfileBaseView user={currentUser}/>
              </div>
              // <ProfileBaseView user={currentUser}/>
            )
          }
          {
            menuSelected == "search" && (
              <Promptsearch />
            )
          }
        </div>
      </div>



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

