"use client";

import React, { useEffect, useState } from 'react'
import { } from './styles.css'
import Icons from "../../lib/Icons";
import { IconButton, Snackbar } from "@mui/material";
import ApiPath from "../../lib/ApiPath";
import axios from "axios";
import PromptItem from "../prompt/PromptItem";
import ProfileBannerView from '../profile/ProfileBanner';

const OtherusersProfile = (props) => {

    const [user, setUser] = useState(props.user) // user whose profle we are viewing
    const userImage = ""
    const [snackBarOpen, setSnackbarOpen] = useState(false)
    const [snackMessage, setSnackMessage] = useState("")
    const [menuSelected, setMenuSelected] = useState('personal_info')
    const [currentUser, setCurrentUser] = useState(null);
    const [prompts, setPrompts] = useState([])

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

    return (
        <div className='text-white'>
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
                                    console.log("Prompt in map is ", element)
                                }
                                return (
                                    <div className="rounded bg-appgreen p-0 " key={element.id}>
                                        {/* <PromptItemMyprofile prompt={element}  itemSelected = {handlePromptSelected}/> */}
                                        <PromptItem className='promptitem' prompt={element} saveAction={() => {
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
    )
}

export default OtherusersProfile
