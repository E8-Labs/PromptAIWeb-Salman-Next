'use client'

import { useRouter } from 'next/navigation'

import React, { useState, useEffect, useCallback } from "react";
import styled from 'styled-components'


const dashboardLogo = '/dashboard.svg';
const userIcon = '/user-icon.svg';
const headphoneIcon = '/headphone.svg';
const usersIcon = '/users.svg';
const privacyIcon = '/privacy.svg';
const termIcon = '/terms.svg';
import PromptItem from '../ui/prompt/PromptItem';




// import ReactModal from 'react-modal';
// import { createPromptRoute, getPromptsRoute } from "../utils/APIRoutes";

// import Grid from '@mui/material/Grid';
// import ProfileBaseView from "../components/Profile/Profile";
// import ChatContainer from "../components/Chat/ChatContainer";
// import CreatePromptTitle from "./CreatePromptTitle";
import axios from 'axios'
import ApiPath from '../lib/ApiPath';

function PromptsList() {
    const userImage = "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRk9ereOPzUWlYLy1dLFUbRLodoiDsPuIuAUmo749NjSSsyZSyf"
    // const prompts = ["Prompt1", "Promt2", "Prompt1", "Promt2", "Prompt1", "Promt2", "Prompt1", "Promt2", "Prompt1", "Promt2", "Prompt1", "Promt2", "Prompt1", "Promt2", "Prompt1", "Promt2"]
  
    // const navigate = useNavigate()
    const [menuSelected, setMenuSelected] = useState("dashboard")
    const [currentUser, setCurrentUser] = useState(undefined);
    const [role, setRole] = useState('user') // or coach
    const [isCreatePromptOpen, setIsPopupOpen] = useState(false);
    const [prompts, setPrompts] = useState([])
    const [prompt, setPrompt] = useState(null)
  
    const handleMenuClick = event => {
        console.log(event.currentTarget.id);
        setMenuSelected(event.currentTarget.id)
        if(event.currentTarget.id === "dashboard"){
          loadPrompts()
        }
      };
      const closePopup = (event) => {
        setIsPopupOpen(false)
        console.log("Popup closed")
      }

      const handleCreatePrompt = event => {
        console.log(event.currentTarget.id);
        setIsPopupOpen(true)
      };

      const handlePromptSelected = (prompt)=>{
        console.log("Prompt in List " + prompt.title + " Clicked")
        setPrompt(prompt)
        setMenuSelected("chatgpt")
      }

      const loadCurrentUser = useCallback(async()=>{
        if (!localStorage.getItem(process.env.REACT_APP_LocalSavedUser)) {
          navigate("/onboarding");
        } else {
          console.log("User is saved in Dashboard")
            console.log(process.env.REACT_APP_LocalSavedUser)

          setCurrentUser(

            JSON.parse(
              localStorage.getItem(process.env.REACT_APP_LocalSavedUser)
            )
          );
        //   loadUsers(currentUser.token);
        }
      });



      const loadPrompts = () => {
        console.log("In Load Prompts. Remove return statement when implemented")
        // return 
            const user = JSON.parse(
                localStorage.getItem(process.env.REACT_APP_LocalSavedUser)
              )
              
            //   this.setState({currentUser: user})
            setCurrentUser(user)
              console.log("Tokan in get Prompts " + user.token)
            const config = {
                headers:{
                  "Authorization": "Bearer " + user.token,
                }
              };
              const route = ApiPath.GetPromptsList + `?offset=${prompts.length}`;
              console.log(route)
            axios.get(route, config)
            .then(res=> {
              console.log("Data is ")
                console.log(res.data.data.prompts)
                // setMessages(res.data.data)
                
                res.data.data.prompts.map((m, index) =>{
                    setPrompts((prevState) =>
                        [...prevState, m]
                        )
                })
            })
            .catch(err=> console.log(err))
        
        
    }
    useEffect(()=>{
        console.log("prompts loaded")
        loadPrompts()
    }, [])


      useEffect(()=>{
          if(currentUser === undefined){
            loadCurrentUser()
          }
          else{
            console.log(currentUser.username)
          }
      }, [])


      useEffect(()=>{
        
        if(currentUser === undefined){
            loadCurrentUser()
          }
          else{
            console.log(currentUser.username)
            console.log("Current User Obtained " + currentUser.user.email)
            if(currentUser.user.role === null || typeof(currentUser.user.role) === 'undefined'){
                setRole("user")
            }
            else{
                console.log("Setting user role " + currentUser.user.role)
                setRole(currentUser.user.role)
            }
          }
      }, [currentUser, role])
    return (
    <div className="container-fluid bg-app-dark-green overflow-none" style={{height: "100vh"}}>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        {/* <ReactModal
            isOpen={isCreatePromptOpen}
            contentLabel="Create Prompt"
            onRequestClose={()=>{setIsPopupOpen(false)}}
            style={customStyles}
            >
            <CreatePromptTitle closePopup={closePopup} />
      </ReactModal> */}
      {/* <div className="modal fade" tabIndex={"-1"} role="dialog">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-body">
                <CreatePromptTitle closePopup={closePopup} />
                </div>
            </div>
        </div>
      </div> */}
      <div className="row mb-3" style={{height: "6vh"}}>
       
        <nav className="navbar navbar-expand-lg navbar-dark ">
          <div className="container-fluid rounded">
            <div className='justify-center my-auto p-4'>
              <a className="" href="#"  style={{color: "white", fontSize: 26, fontWeight: 'bold'}}>Prompt.</a>
              <a  href="#" style={{color: "#00C28C", fontSize: 26, fontWeight: 'bold'}}>ai</a>
            </div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end top-nav-custom-class" id="navbarNav">
              <ul className="navbar-nav">

                <li className={"nav-item " + (role === "user" ? "d-none" : "") }>
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
                  <img id="profile" className="rounded-pill border" onClick={handleMenuClick} src={userImage} style={{width:"50px", height: "50px", objectFit: "contain"}}/>
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

      <div className="row md:p-4"  style={{height: "100%"}}>
        <div className="col-sm-2 col-md-3 d-none d-md-inline flex flex-grow flex-col float-left" style={{height: '100%'}}>
            <div className="row">
                <div className="col-sm-12  dbmenubtn " id="dashboard" onClick={handleMenuClick}>
                    <img className="icon" src={dashboardLogo}></img>
                    <button className="button fs-6">Dashboard</button>
                </div>
                <div className="col-md-12 dbmenubtn" id="chatgpt" onClick={handleMenuClick}>
                    <img className="icon" src={userIcon}></img>
                    <button className="button fs-6">ChatGPT</button>
                </div>
                <div className="col-md-12 dbmenubtn" id="support" onClick={handleMenuClick}>
                    <img className="icon" src={headphoneIcon}></img>
                    <button className="button fs-6">Customer Support</button>
                </div>
                <div className="col-md-12 dbmenubtn" id="community" onClick={handleMenuClick}>
                    <img className="icon" src={usersIcon}></img>
                    <button className="button fs-6">Community Forum</button>
                </div>
                <div className="col-md-12 dbmenubtn" id="privacy" onClick={handleMenuClick}>
                    <img className="icon" src={privacyIcon}></img>
                    <button className="button fs-6">Privacy Policy</button>
                </div>
                <div className="col-md-12 dbmenubtn" id="terms" onClick={handleMenuClick}>
                    <img className="icon" src={termIcon}></img>
                    <button className="button fs-6">Terms & conditions</button>
                </div>
            </div>
        </div>
        <div className={"col-md-9 flex flex-col flex-grow  pb-6 " + (menuSelected === "chatgpt" ? "" : "overflow-y-auto")} style={{height: '100%'}} >
        {
            //disabled flow if the menu is chat gpt in the div above.
            menuSelected == "chatgpt" && prompt !== null &&(
                // <ChatContainer prompt={prompt}/>
                    <div>This is chat screen</div>
            )
        }
        {
            menuSelected == "privacy" &&(
                <div><h1>This is Privacy</h1></div>
            ) 
        }
        {
            menuSelected == "terms" &&(
                <div><h1>This is Terms</h1></div>
            ) 
        }
        {
            menuSelected == "notifications" &&(
                <div><h1>This is Notifications Screen</h1></div>
            ) 
        }
        {
            menuSelected == "search" &&(
                <div><h1>This is Search</h1></div>
            ) 
        }
        {
            menuSelected == "dashboard" &&(
              // <div>This is main prompts list screen</div>
              
              //tailwind
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {
                      
                        prompts.map((element, index) => {
                        // <label>{element}</label>
                        {
                          console.log(element)
                        }
                            return(
                                <div className="rounded bg-appgreen p-0 " key={element._id}>
                                    <PromptItem className='promptitem' prompt={element}  itemSelected = {handlePromptSelected}></PromptItem>
                                </div>
                            // <Grid item xs={window.screen.availWidth < 720 ? 2 : 3}  className='griditem' key={element + index}>
                            //     <PromptItem className='promptitem' title={element}></PromptItem>
                            // </Grid>
                            )
                        })
                    }
                  </div>
            ) 
        }
        {
            menuSelected == "support" &&(
                <div><h1>This is Customer Support</h1></div>
            ) 
        }
        {
            menuSelected == "community" &&(
                <div><h1>This is Community</h1></div>
            ) 
        }
        {
            menuSelected == "profile" &&(
              <div>This is profile screen</div>
                // <ProfileBaseView user={currentUser}/>
            ) 
        }
        </div>
      </div>
    </div>
  )
}

const customStyles = {
    overlay:{
        background: "000000"
    },
    content: {
      background: "#00000090",
      border: "none"
    },
  };

// const Container = styled.div`
// height: 100vh;
// width: 100vw;
// display: grid;
// grid-template-rows: 10% 90%;
// align-items: center;
// justify-content: left;
// flex-direction: column;
// background-color: #060c0a;
// .horizontalspacesmall{
//     width: 0.5rem;
// }
// .verticalspace{
//     height: 2.5rem;
// }
// .titlediv{
//     height: 100%;
//     width: 100vw;
//     background-color: #060c0a;
//     display: flex;
//     flex-direction: space-between;
//     vertical-align: middle;
//     flex-direction: row;
//     padding: 1rem;
//     h3{
//         color: white;
//     }

//     .rightbtns{
//         width: 100vw;
//         gap: 1rem;
//         display: flex;
//         flex-direction: row;
       
//         justify-content: right;
//         background-color: transparent;
//         button{
//             width: 2.5rem;
//             height: 2.5rem;
//             background-color: transparent;
//             border: none;
//             color: white;
//             font-size: 1.4rem; /* Set a font size */
//             cursor: pointer;
//         }
//         img{
//             width: 2.4rem;
//             height: 2.4rem;
//             border-radius: 1.2rem;
//             border: 0.1rem solid white;
//             object-fit: cover;
//             cursor: pointer;
//         }
//     }
// }


// .bottomdiv{
//     height: 100%;
//     width: 100vw;
//     display: grid;
//     grid-template-columns: 15% 80% 5%;
//     background-color: transparent;
//     .leftpane{
//         padding: 1rem;
//         display: flex;
//         flex-direction: column;
//         gap: 1.5rem;
//         .menubtn{
            
//             cursor: pointer;
//             vertical-align: middle;
//             justify-content: left;
//             align-items: center;
//             display: flex;
//             img{
//                 background-color: transparent;
//             }
//             button{

//                 // background-color: red;
//                 padding: 1rem;
//                 background-color: transparent;
//                 border: none;
//                 font-size: 0.8rem;
//                 cursor: pointer;
//                 color: white;
//                 text-align: left;
//             }
//         }
//     }
    
//     .rightpane{
//         display: flex;
//         // flex-direction: column;
//         // grid-template-columns: 33% 33% 33%;
//         background-color: transparent;
//         overflow: scroll;
//         color: white;

//         .promptitem, .griditem{
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             height: 40%;
//         }
//     }
//     .extremerightdiv{
//         background-color: red;
//     }
// }
// `;

export default PromptsList


