'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image';

import React, { useState, useEffect } from "react";
import styled from 'styled-components'
import MultiFormPopup from '../ui/prompt/promptcreation/PromptCreation';
import StackMultiFormPopup from '../ui/prompt/promptcreation/stackprompt/StackPromptCreation';
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



export default function Page() {

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
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(process.env.REACT_APP_LocalSavedUser, null)
      }
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
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem("CURRENTCHAT", JSON.stringify(data))
    }
    router.push("/dashboard/chat?chatid=" + chat.id)
  }

  const loadCurrentUser = async () => {
    if (typeof localStorage !== 'undefined') {
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
    }
  };

  //return particular list for menu
  //if selected = All, return prompts, if created return createdPrompts, if Saved return savedPrompts
  const getCurrentPromptsForMenu = () => {
    if (promptListMenuSelected == "All") {
      let pros = removeDuplicates(prompts, 'id');
      return pros
    }
    else if (promptListMenuSelected == "Created") {
      let pros = removeDuplicates(createdPrompts, 'id');
      return pros
    }
    else if (promptListMenuSelected == "Saved") {
      let pros = removeDuplicates(savedPrompts, 'id');
      return pros
      // return savedPrompts
    }
  }

  function removeDuplicates(arr, prop) {
    const unique = arr.reduce((acc, current) => {
      const x = acc.find(item => item[prop] === current[prop]);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);
    return unique;
  }

  const savePrompt = (prompt, indexToUpdate) => {
    console.log("Saving in ", promptListMenuSelected)
    if (promptListMenuSelected == "All") {
      const updatedArray = [...prompts]; // Create a copy of the array
      updatedArray[indexToUpdate].is_saved = !updatedArray[indexToUpdate].is_saved; // Update the value at the specified index
      console.log("Updated array ", updatedArray)
      setPrompts(updatedArray);
    }
    else if (promptListMenuSelected == "Created") {
      const updatedArray = [...createdPrompts]; // Create a copy of the array
      updatedArray[indexToUpdate].is_saved = !updatedArray[indexToUpdate].is_saved; // Update the value at the specified index
      setCreatedPrompts(updatedArray);
    }
    else if (promptListMenuSelected == "Saved") {
      let updatedArray = [...savedPrompts]; // Create a copy of the array
      // updatedArray.splice(indexToUpdate, 1);
      updatedArray = updatedArray.filter(function (item) {
        return item.id !== prompt.id
      })
      console.log("Array after deleting is ", updatedArray)
      // updatedArray[indexToUpdate].is_saved = !updatedArray[indexToUpdate].is_saved; // Update the value at the specified index
      setSavedPrompts(updatedArray);
      // return savedPrompts
    }
  }

  const loadPrompts = (isFirstLoading = false) => {
    //console.log("In Load Prompts. Remove return statement when implemented")
    // return 
    // if(isLoadingPrompts){
    //   return
    // }
    var user = null;
    if (typeof localStorage !== 'undefined') {
      let d = localStorage.getItem(process.env.REACT_APP_LocalSavedUser)
      console.log("User data stored is ", d)
      user = JSON.parse(
        d
      )
    }

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
    if (promptListMenuSelected == "Saved") {
      route = ApiPath.LoadSavedPrompts + `?offset=${savedPrompts.length}`
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
          let pros = removeDuplicates(res.data.data.prompts, 'id');

          pros.map((m, index) => {
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
          res.data.data.map((m, index) => {
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
          setPromptSaved={savePrompt}
        />

      </div>

      {/* </div> */}

      {/* </div> */}
      <Modal
        isOpen={isPopupOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Prompt"
        appElement={document.getElementById('body')}
      >
        <MultiFormPopup onClose={() => {
          loadPrompts();
          setPopupOpen(false);
        }} />
      </Modal>
    </div>

  )
}

const customStyles = {
  overlay: {
    background: "#00000090",

  },
  content: {

    background: "#00000090",
    border: "none",
  },
};

