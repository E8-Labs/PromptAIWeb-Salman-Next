"use client";

import { useRouter } from "next/navigation";

import React from "react";
import MultiFormPopup from "../ui/prompt/promptcreation/PromptCreation";

// import {  Modal,   ModalContent,   ModalHeader,   ModalBody,   ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import Modal from "react-modal";

import axios from "axios";
import PromptsListDashboard from "ui/prompt/PromptsListDashboard";
import { API_PATH } from "utils/lib/constants";

// import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import 'bootstrap/dist/css/bootstrap.min.css';

export default function Page() {
  const router = useRouter();
  const userImage =
    "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRk9ereOPzUWlYLy1dLFUbRLodoiDsPuIuAUmo749NjSSsyZSyf";
  // const prompts = ["Prompt1", "Promt2", "Prompt1", "Promt2", "Prompt1", "Promt2", "Prompt1", "Promt2", "Prompt1", "Promt2", "Prompt1", "Promt2", "Prompt1", "Promt2", "Prompt1", "Promt2"]
  const [isPopupOpen, setPopupOpen] = React.useState(false);
  // NextJs Model library
  // const {isOpen, onOpen, onOpenChange} = useDisclosure();
  // const navigate = useNavigate()
  const [menuSelected, setMenuSelected] = React.useState("dashboard");
  const [currentUser, setCurrentUser] = React.useState(undefined);
  const [role, setRole] = React.useState("user"); // or coach
  const [isLoadingPrompts, setIsLoadingPrompts] = React.useState(true);
  const [prompts, setPrompts] = React.useState([]);
  const [savedPrompts, setSavedPrompts] = React.useState([]);
  const [createdPrompts, setCreatedPrompts] = React.useState([]);
  const [prompt, setPrompt] = React.useState(null);

  const [currentSelectedPrompt, setCurrentSelectedPrompt] = React.useState(null);
  const [chatViewVisible, setChatViewVisible] = React.useState(false);
  const [currentChat, setCurrentChat] = React.useState(null);

  //Categories and subcategories selected to fetch the list
  const [categoriesSelected, setCategoriesSelected] = React.useState([]);
  const [subCategoriesSelected, setSubCategoriesSelected] = React.useState([]);

  const [promptListMenuSelected, setPromptListMenuSelected] = React.useState("All"); // Saved, Created

  function openModal() {
    setPopupOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    setPopupOpen(false);
  }

  const handleMenuClick = (event: React.MouseEvent) => {
    console.log(event.currentTarget.id);
    setMenuSelected(event.currentTarget.id);
    if (event.currentTarget.id === "dashboard") {
      loadPrompts();
    } else if (event.currentTarget.id === "logout") {
      //logout here
      localStorage.setItem(process.env.REACT_APP_LocalSavedUser, null);
      router.push("/");
    }
  };
  const handleClosePopup = (event) => {
    setPopupOpen(false);
    //console.log("Popup closed")
  };

  const handleCreatePrompt = (event) => {
    //console.log(event.currentTarget.id);
    setPopupOpen(true);
  };

  const handlePromptSelected = (prompt, chat) => {
    console.log("Prompt page in List " + prompt.title + " Clicked");
    setCurrentSelectedPrompt(prompt);
    setCurrentChat(chat);
    setMenuSelected("chatgpt");
    let data = { chatViewVisible: true, newChat: true, prompt: prompt, chat: chat };
    localStorage.setItem("CURRENTCHAT", JSON.stringify(data));
    router.push("/dashboard/chat?chatid=" + chat.id);
  };

  const loadCurrentUser = async () => {
    if (!localStorage.getItem(process.env.REACT_APP_LocalSavedUser)) {
      navigate("/onboarding");
    } else {
      //console.log("User is saved in Dashboard")
      //console.log(process.env.REACT_APP_LocalSavedUser)

      setCurrentUser(JSON.parse(localStorage.getItem(process.env.REACT_APP_LocalSavedUser)));
      //   loadUsers(currentUser.token);
    }
  };

  //return particular list for menu
  //if selected = All, return prompts, if created return createdPrompts, if Saved return savedPrompts
  const getCurrentPromptsForMenu = () => {
    if (promptListMenuSelected == "All") {
      return prompts;
    } else if (promptListMenuSelected == "Created") {
      return createdPrompts;
    } else if (promptListMenuSelected == "Saved") {
      return savedPrompts;
    }
  };

  const loadPrompts = (isFirstLoading = false) => {
    //console.log("In Load Prompts. Remove return statement when implemented")
    // return
    // if(isLoadingPrompts){
    //   return
    // }
    let d = localStorage.getItem(process.env.REACT_APP_LocalSavedUser);
    console.log("User data stored is ", d);
    const user = JSON.parse(d);

    let categoriesString = "";
    let comma = "";
    for (let i = 0; i < categoriesSelected.length; i++) {
      let cat = categoriesSelected[i];
      categoriesString = categoriesString + comma + `${cat.id}`;
      comma = ",";
    }
    // console.log("Categories string is ", categoriesString)

    let subcategoriesString = "";
    comma = "";
    for (let i = 0; i < subCategoriesSelected.length; i++) {
      let cat = subCategoriesSelected[i];
      subcategoriesString = subcategoriesString + comma + `${cat.id}`;
      comma = ",";
    }
    // console.log("Subcategories string is ", subcategoriesString)
    comma = "";
    //   this.setState({currentUser: user})
    setCurrentUser(user);
    console.log("Token in get Prompts " + user);
    const config = {
      headers: {
        Authorization: "Bearer " + user.token,
      },
    };
    let route =
      API_PATH.GetPromptsList +
      `?offset=${isFirstLoading ? "0" : `${prompts.length}`}&categoriesString=${categoriesString}&subCategoriesString=${subcategoriesString}`;
    if (promptListMenuSelected == "Created") {
      route = API_PATH.GetUserPrompts + `?offset=${createdPrompts.length}`;
    }
    console.log(route);
    setIsLoadingPrompts(true);
    axios
      .get(route, config)
      .then((res) => {
        setIsLoadingPrompts(false);
        console.log("Data is ");
        //console.log(res.data.data.prompts)
        // console.log(res.data)
        if (promptListMenuSelected == "All") {
          console.log("All Prompts ", res.data);
          res.data.data.prompts.map((m, index) => {
            setPrompts((prevState) => [...prevState, m]);
          });
        } else if (promptListMenuSelected == "Created") {
          console.log("Created Prompts ", res.data);
          res.data.data.map((m, index) => {
            setCreatedPrompts((prevState) => [...prevState, m]);
          });
        } else if (promptListMenuSelected == "Saved") {
          console.log("Saved Prompts ", res.data);
          res.data.data.prompts.map((m, index) => {
            setSavedPrompts((prevState) => [...prevState, m]);
          });
        }
      })
      .catch((err) => {
        setIsLoadingPrompts(false);
        console.log(err);
      });
  };
  useEffect(() => {
    //console.log("prompts loaded")
    setPrompts([]);
    loadPrompts(true); // isFirstLoading = true
  }, [promptListMenuSelected]);

  useEffect(() => {
    if (currentUser === undefined) {
      loadCurrentUser();
    } else {
      //console.log(currentUser.username)
    }
  }, []);

  useEffect(() => {
    console.log("Categories and subcategories selected. Loading New Prompts");
    setPrompts([]);
    loadPrompts();
  }, [categoriesSelected, subCategoriesSelected]);

  useEffect(() => {
    if (currentUser === undefined) {
      loadCurrentUser();
    } else {
      //console.log(currentUser.username)
      //console.log("Current User Obtained " + currentUser.user.email)
      if (currentUser.user.role === null || typeof currentUser.user.role === "undefined") {
        setRole("user");
      } else {
        //console.log("Setting user role " + currentUser.user.role)
        setRole(currentUser.user.role);
      }
    }
  }, [currentUser, role]);
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
      </div>

      {/* </div> */}

      {/* </div> */}
      <Modal
        isOpen={isPopupOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Prompt"
        appElement={document.getElementById("body")}
      >
        <MultiFormPopup
          onClose={() => {
            loadPrompts();
            setPopupOpen(false);
          }}
        />
      </Modal>
    </div>
  );
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
