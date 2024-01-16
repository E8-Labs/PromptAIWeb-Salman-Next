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

// import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import 'bootstrap/dist/css/bootstrap.min.css';



export default function page() {

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
  const [isLoadingPrompts, setIsLoadingPrompts] = useState(true);
  const [prompts, setPrompts] = useState([])
  const [savedPrompts, setSavedPrompts] = useState([])
  const [createdPrompts, setCreatedPrompts] = useState([])
  const [prompt, setPrompt] = useState(null)

  const [currentSelectedPrompt, setCurrentSelectedPrompt] = useState(null)
  const [chatViewVisible, setChatViewVisible] = useState(false)
  const [currentChat, setCurrentChat] = useState(null)
  //Categories and subcategories selected to fetch the list
  const [categoriesSelected, setCategoriesSelected] = useState([])
  const [subCategoriesSelected, setSubCategoriesSelected] = useState([])

  const [promptListMenuSelected, setPromptListMenuSelected] = useState("All")  // Saved, Created

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
    else if (event.currentTarget.id === "logout") {
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
    console.log("Prompt page in List " + prompt.title + " Clicked")
    setCurrentSelectedPrompt(prompt)
    setCurrentChat(chat)
    setMenuSelected("chatgpt")
    let data = { chatViewVisible: true, newChat: true, prompt: prompt, chat: chat }
    localStorage.setItem("CURRENTCHAT", JSON.stringify(data))
    router.push("/dashboard/chat?chatid=" + chat.id)
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

  //return particular list for menu
  //if selected = All, return prompts, if created return createdPrompts, if Saved return savedPrompts
  const getCurrentPromptsForMenu = () => {
    if (promptListMenuSelected == "All") {
      return prompts
    }
    else if (promptListMenuSelected == "Created") {
      return createdPrompts
    }
    else if (promptListMenuSelected == "Saved") {
      return savedPrompts
    }
  }

  const loadPrompts = (isFirstLoading = false) => {
    //console.log("In Load Prompts. Remove return statement when implemented")
    // return 
    // if(isLoadingPrompts){
    //   return
    // }
    let d = localStorage.getItem(process.env.REACT_APP_LocalSavedUser)
    console.log("User data stored is ", d)
    const user = JSON.parse(
      d
    )

    let categoriesString = ""
    let comma = ""
    for (let i = 0; i < categoriesSelected.length; i++) {
      let cat = categoriesSelected[i]
      categoriesString = categoriesString + comma + `${cat.id}`
      comma = ","
    }
    // console.log("Categories string is ", categoriesString)


    let subcategoriesString = ""
    comma = ""
    for (let i = 0; i < subCategoriesSelected.length; i++) {
      let cat = subCategoriesSelected[i]
      subcategoriesString = subcategoriesString + comma + `${cat.id}`
      comma = ","
    }
    // console.log("Subcategories string is ", subcategoriesString)
    comma = ""
    //   this.setState({currentUser: user})
    setCurrentUser(user)
    console.log("Token in get Prompts " + user)
    const config = {
      headers: {
        "Authorization": "Bearer " + user.token,
      }
    };
    let route = ApiPath.GetPromptsList + `?offset=${isFirstLoading ? '0' : `${prompts.length}`}&categoriesString=${categoriesString}&subCategoriesString=${subcategoriesString}`;
    if (promptListMenuSelected == "Created") {
      route = ApiPath.GetUserPrompts + `?offset=${createdPrompts.length}`
    }
    console.log(route)
    setIsLoadingPrompts(true)
    axios.get(route, config)
      .then(res => {
        setIsLoadingPrompts(false)
        console.log("Data is ")
        //console.log(res.data.data.prompts)
        // console.log(res.data)
        if (promptListMenuSelected == "All") {
          console.log("All Prompts ", res.data)
          res.data.data.prompts.map((m, index) => {
            setPrompts((prevState) =>
              [...prevState, m]
            )
          })
        }
        else if (promptListMenuSelected == "Created") {
          console.log("Created Prompts ", res.data)
          res.data.data.map((m, index) => {
            setCreatedPrompts((prevState) =>
              [...prevState, m]
            )
          })
        }
        else if (promptListMenuSelected == "Saved") {
          console.log("Saved Prompts ", res.data)
          res.data.data.prompts.map((m, index) => {
            setSavedPrompts((prevState) =>
              [...prevState, m]
            )
          })
        }

      })
      .catch(err => {
        setIsLoadingPrompts(false)
        console.log(err)
      })


  }
  useEffect(() => {
    //console.log("prompts loaded")
    setPrompts([])
    loadPrompts(true) // isFirstLoading = true
  }, [promptListMenuSelected])


  useEffect(() => {
    if (currentUser === undefined) {
      loadCurrentUser()
    }
    else {
      //console.log(currentUser.username)
    }
  }, [])

  useEffect(() => {
    console.log("Categories and subcategories selected. Loading New Prompts")
    setPrompts([])
    loadPrompts()
  }, [categoriesSelected, subCategoriesSelected])


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
    <div className="flex overflow-y-none h-full min-h-screen bg-black pl-2">

      {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" /> */}

      {/* <div className="md:p-1 overflow-y-none w-full h-full"> */}

        {/* <div className="col-md-9 flex flex-col flex-grow pb-6 h-full overflow-y-none"> */}

          <div className="overflow-y-none  w-full">
            <PromptsListDashboard
              promptListMenuSelected={promptListMenuSelected}
              setSelectedMenu={setPromptListMenuSelected}
              prompts={getCurrentPromptsForMenu()}
              handlePromptSelected={handlePromptSelected}
              isLoadingPrompts={isLoadingPrompts}
              handleAddAction={() => {
                setPopupOpen(true);
              }}
              setCategoriesSelected={(categories) => {
                setCategoriesSelected(categories);
              }}
              setSubCategoriesSelected={(categories) => {
                setSubCategoriesSelected(categories);
              }}
            />
            <Modal
              isOpen={isPopupOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <MultiFormPopup onClose={() => {
                loadPrompts();
                setPopupOpen(false);
              }} />
            </Modal>
          </div>

        {/* </div> */}

      {/* </div> */}

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

