import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import ProfileBannerView from "./ProfileBanner";
import PromptItem from "../prompt/PromptItem";
import PromptItemMyprofile from "../prompt/promptitemmyprofile";
import { IconButton, Snackbar } from "@mui/material";
import axios from "axios";
import Icons from "@/app/lib/Icons";

import ApiPath from "../../lib/ApiPath";

const RecentIcon = '/assets/recent.svg'
const PopularIcon = '/assets/popular.svg'


export default function ProfileBaseView(props) {

  // const user = props.user;
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
  };
  const loadPrompts = () => {
    //console.log("In Load Prompts. Remove return statement when implemented")
    // return 
    const u = JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LocalSavedUser)
    )

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


  const handlePromptSelected = (prompt) => {
    console.log("Prompt selected ", prompt)
  }


  const logoutCurrentuser = () => {
    localStorage.removeItem(process.env.REACT_APP_LocalSavedUser)
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

  return (
    <div className="flex  flex-col  flex-grow w-full h-full bg-black px-2">
      {
        currentUser != null &&(
          <div className={` ${user.user.id !== currentUser.user.id ? " " : 'hidden'}`} style={{}}>
            <IconButton onClick={()=> {
              props.closeProfileView()
            }}>
              <Icons.CloseIcon sx={{color: 'white'}}/>
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

      {
        currentUser != null &&(
          <div className={`overflow-y-scroll py-6  ${user.user.id !== currentUser.user.id ? " grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'}`} style={{  }}>
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
