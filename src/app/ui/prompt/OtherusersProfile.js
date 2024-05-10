import React, { useEffect, useState } from 'react'
import {useRouter} from 'next/navigation'
import { } from './styles.css'
import Icons from "@/app/lib/Icons";
import { IconButton, Snackbar, Backdrop, CircularProgress } from "@mui/material";
import ApiPath from "../../lib/ApiPath";
import axios from "axios";
import PromptItem from "../prompt/PromptItem";
import ProfileBannerView from '../profile/ProfileBanner';
import Modal from 'react-modal';
import PromptChatQuestionsPopup from './PromptChatQuestions';

const customStyles = {
    zIndex: 9999,
    overlay: {
      background: "#00000090",
    },
    content: {
      background: "#00000090",
      border: "none"
    },
  };

const OtherusersProfile = (props) => {

    let router = useRouter()
    const [user, setUser] = useState(props.user) // user whose profle we are viewing
    const userImage = ""
    const [snackBarOpen, setSnackbarOpen] = useState(false)
    const [snackMessage, setSnackMessage] = useState("")
    const [menuSelected, setMenuSelected] = useState('personal_info')
    const [currentUser, setCurrentUser] = useState(null);
    const [prompts, setPrompts] = useState([])

    //Prompt Selection related
    const [currentSelectedPrompt, setCurrentSelectedPrompt] = useState(false)
    const [promptQuestionDialogueVisible, setPromptQuestionDeialogueVisible] = useState(false)
    const [currentChat, setCurrentChat] = useState(null)
    const [loading, setLoading] = useState(false)


    const handleLoadingClose = () => {
        setLoading(false)
      }
    
      function afterOpenModal() {
    
      }
    
      function closeModal() {
        setPromptQuestionDeialogueVisible(false);
      }


    useEffect(() => {
        ////console.log("prompts loaded")
        if (currentUser != null) {
            getUserProfile()
            loadPrompts()
        }

    }, [currentUser])

    useEffect(() => {
        loadCurrentUser()
        //console.log("Other user profile obtained", user)
    }, [])


    const loadCurrentUser = async () => {
        if (typeof localStorage !== 'undefined') {
            if (!localStorage.getItem(process.env.REACT_APP_LocalSavedUser)) {
                navigate("/login");
            } else {
                //console.log("User already logged in")
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
        ////console.log("In Load Prompts. Remove return statement when implemented")
        // return 
        var u = null
        if (typeof localStorage !== 'undefined') {
            u = JSON.parse(
                localStorage.getItem(process.env.REACT_APP_LocalSavedUser)
            )
        }

        //   this.setState({currentUser: user})
        // setCurrentUser(u)
        // //console.log("Token in get Prompts " + u)
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
        // //console.log(route)
        axios.get(route, config)
            .then(res => {
                // //console.log("Data is ")
                //console.log(res.data)
                // setMessages(res.data)

                res.data.data.map((m, index) => {
                    setPrompts((prevState) =>
                        [...prevState, m]
                    )
                })
                // //console.log("Prompts count is ", prompts.length)
            })
            .catch(err => {
                //console.log(err)
            })


    }

    const getUserProfile = async () => {
        //console.log("Loading Profile Api", user.user.id)
        //console.log("With token ", currentUser.token)
        let userid = user.user.id;
        const config = {
            headers: {
                "Authorization": "Bearer " + currentUser.token,
            }
        };
        // try{
        let route = ApiPath.Profile + "?userid=" + userid
        //console.log("Route ", route)
        axios.get(route, config).then((resData) => {
            //console.log("Profile api loaded ")
            //console.log(resData.data)
            if (resData.data.status) {
                if (resData.data.data) {
                    let u = resData.data.data;
                    setUser({ user: u, token: "" })

                    // setUserLoaded(true)
                }
            }
            else {
                //console.log("No user found with this auth token")
                setUser(null)
                //   setUserLoaded(true)

            }
        }).catch((error) => {
            //console.log("Error fetching user ", error);
            // setUser(null)
            // setUserLoaded(true)

        })

    }

    //Prompt Selected Logic
    const handlePromptSelected = (prompt) => {
        //console.log("Prompt in Other User Profile" + prompt.title + " Clicked")

        setCurrentSelectedPrompt(prompt)
        if (prompt.questions.length == 0) {
            createChat(prompt)
        }
        else {
            //console.log("PromptListDashboard: Prompt before sending to questions ", prompt)
            setPromptQuestionDeialogueVisible(true)
        }
        // props.handlePromptSelected(prompt)
    }

    const createChat = (prompt) => {

        setCurrentSelectedPrompt(prompt)
        setPromptQuestionDeialogueVisible(false)
        // //console.log("PromptListDashboard: Prompt after sending to questions ", prompt)
        ////console.log(prompt)
        ////console.log("Length is " + prompt.questions.length);
        //console.log("Hello Hamza")
        let text = prompt.prompt;
        try {
            for (let i = 0; i < prompt.questions.length; i++) {
                let q = prompt.questions[i];
                text = text.replace(`[${q.question}]`, q.answer);
            }
        }
        catch (error) {
            //console.log("Error In Parsing Questions ", error)
        }
        //console.log("Here")
        prompt.prompt = text;
        // create chat api
        //console.log("Here")
        let u = null
        if (typeof localStorage !== 'undefined') {
            u = JSON.parse(
                localStorage.getItem(process.env.REACT_APP_LocalSavedUser)
            )
        }
        //console.log("user in profile chat", u)
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
                //console.log("Chat create response")
                //console.log(data.data)
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
                    //console.log("Some error ", data.data.message)
                }


            })
            .catch(error => {
                //console.log("Exception", error)
            })
        ////console.log(text)
    }

    const handleChatNavigation = (prompt, chat) => {
        //console.log("Prompt page in List " + prompt.title + " Clicked")
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
        //console.log("Search text ", text)
        setSearch(text)
    }

    return (
        <div className='text-white'>
            <Backdrop key={"123"}
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
                onClick={handleLoadingClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
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
            <div>
                <IconButton onClick={() => {
                    props.closeProfileView()
                }}>
                    <Icons.CloseIcon sx={{ color: 'white' }} />
                </IconButton>
            </div>
            <ProfileBannerView user={user} />
            {
                currentUser != null && (
                    <div className={`${user.user.id !== currentUser.user.id ? " grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'}`} style={{ marginTop: '3%' }}>
                        {

                            prompts.map((element, index) => {
                                // <label>{element}</label>
                                {
                                    //console.log("Prompt in map is ", element)
                                }
                                return (
                                    <div className="rounded bg-appgreen p-0 " key={element.id}>
                                        {/* <PromptItemMyprofile prompt={element}  itemSelected = {handlePromptSelected}/> */}
                                        <PromptItem className='promptitem' prompt={element} itemSelected={handlePromptSelected} saveAction={() => {
                                            //console.log("Buy btn clicked")

                                        }}></PromptItem>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }
        </div>
    )
}

export default OtherusersProfile
