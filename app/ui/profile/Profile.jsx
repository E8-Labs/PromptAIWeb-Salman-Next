import React, { useState, useEffect, useCallback } from "react";
import styled from 'styled-components';
import ProfileBannerView from "./ProfileBanner";
import PromptItem from "../prompt/PromptItem";
import PromptItemMyprofile from "../prompt/promptitemmyprofile";
import { Snackbar } from "@mui/material";
import axios from "axios";

import ApiPath from "@/app/lib/ApiPath";

const RecentIcon = '/assets/recent.svg'
const PopularIcon = '/assets/popular.svg'


export default function ProfileBaseView(props) {

    const user = props.user;
    const userImage = "data:image/jpeg;base64,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"
    const [snackBarOpen, setSnackbarOpen] = useState(false)
    const[snackMessage, setSnackMessage] = useState("")
    const [menuSelected, setMenuSelected] = useState('personal_info')
    const [currentUser, setCurrentUser] = useState(undefined);
    const [prompts, setPrompts] = useState([])

    useEffect(() => {
        //console.log("prompts loaded")
        loadPrompts()
      }, [])



    const loadCurrentUser = useCallback(async()=>{
        if (!localStorage.getItem('chat-app-user')) {
          navigate("/login");
        } else {
            console.log("User already logged in")
          setCurrentUser(
            await JSON.parse(
              localStorage.getItem('chat-app-user')
            )
          );
        //   loadUsers(currentUser.token);
        }
      });
      const loadPrompts = () => {
        //console.log("In Load Prompts. Remove return statement when implemented")
        // return 
        const user = JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LocalSavedUser)
        )
    
        //   this.setState({currentUser: user})
        setCurrentUser(user)
        console.log("Token in get Prompts " + user)
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
      

     const handlePromptSelected = (prompt) =>{
        console.log("Prompt selected ", prompt)
     }


    const logoutCurrentuser = () => {
        localStorage.removeItem(process.env.REACT_APP_LocalSavedUser)
        // navigate("/")
    }
    const handleMenuClick = event => {
        console.log(event.currentTarget.id);
        setMenuSelected(event.currentTarget.id)
        if (event.currentTarget.id == "logout") {
            logoutCurrentuser()
        }
    };

    return (
        <div className="w-full h-full">

            <ProfileBannerView user={user} />

            <div className="flex gap-2 pt-5 justify-between">

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
                <div className="pt-5" style={{  height: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 15, display: 'inline-flex' }}>
                    <div style={{ paddingLeft: 15, paddingRight: 15, paddingTop: 10, paddingBottom: 10, background: 'rgba(255, 255, 255, 0.10)', borderRadius: 15, justifyContent: 'flex-start', alignItems: 'center', gap: 7, display: 'flex' }}>
                        <div style={{ color: 'white', fontSize: 15, fontFamily: 'Rubik', fontWeight: '500', wordWrap: 'break-word' }}>All</div>
                    </div>
                    <div style={{ paddingLeft: 15, paddingRight: 15, paddingTop: 10, paddingBottom: 10, background: 'rgba(255, 18.06, 74.93, 0)', borderRadius: 15, justifyContent: 'flex-start', alignItems: 'center', gap: 7, display: 'flex' }}>
                        <div style={{ color: 'white', fontSize: 15, fontFamily: 'Rubik', fontWeight: '500', wordWrap: 'break-word' }}>Free</div>
                    </div>
                    <div style={{ paddingLeft: 15, paddingRight: 15, paddingTop: 10, paddingBottom: 10, background: 'rgba(255, 18.06, 74.93, 0)', borderRadius: 15, justifyContent: 'flex-start', alignItems: 'center', gap: 7, display: 'flex' }}>
                        <div style={{ color: 'white', fontSize: 15, fontFamily: 'Rubik', fontWeight: '500', wordWrap: 'break-word' }}>Paid</div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4" >
                    {
                      
                        prompts.map((element, index) => {
                        // <label>{element}</label>
                        {
                          //console.log(element)
                        }
                            return(
                                <div className="rounded bg-appgreen p-0 " key={element.id}>
                                    {/* <PromptItemMyprofile prompt={element}  itemSelected = {handlePromptSelected}/> */}
                                    <PromptItem className='promptitem' prompt={element}  itemSelected = {handlePromptSelected} saveAction={() =>{
                                        console.log("Buy btn clicked")
                                        
                                    }}></PromptItem>
                                </div>
                            )
                        })
                    }
            </div>
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
