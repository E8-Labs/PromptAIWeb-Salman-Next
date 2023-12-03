/* @client */
import React, { useState, useEffect, useCallback } from "react";
// import { Link, Route, Routes } from 'react-router-dom';
import { styled } from "styled-components";
// import background from '../../assets/bg-image.png'
import gptLogo from '../../../public/chatgpt.svg'
// import userIcon from '/user-icon-white.svg'
import crossIcon from '../../../public/cross.svg'
import Link from "next/link";
import Image from "next/image";

// import { alignProperty } from "@mui/material/styles/cssUtils";

function ChatGptLogin(props){
    console.log(props)
    const [index, setIndex] = useState(0);
    const nextPreviousBtnClicked = (event) =>{
        // console.log("button clicked")
        if(event.currentTarget.id === "next"){
            console.log(event.currentTarget.id + " btn clicked")
            if (index == 2){
                setIndex(0)
            }
            else{
                setIndex(index + 1)
            }
        }
        else{
            console.log(event.currentTarget.id + " btn clicked")
            if (index == 0){
                setIndex(2)
            }
            else{
                setIndex(index +- 1)
            }
        }
    }

    const handleSigninBtnClick = (e)=>{
        props.signinBtnTapped()
    }
    const handleRegisterBtnClick = (e)=> {
        props.registerBtnTapped()
    }
    return(
        <div className="container" style={{width: '100%'}}>
            <div className="row ">
                <div className="col-md-12">
                    {/* <div className="row row-cross-icon"> 
                        <div className="col-sd-2 align-self-end">
                            <img src={crossIcon} alt="Cancel"></img>
                        </div>
                    </div> */}
                    <div className="row  my-md-5 gap-2  my-5 ">
                        <div className="flex-grow flex  justify-center mx-auto p-0" >
                            {/* <div className=" bg-blue-100 align-items-center justify-content-center"> */}
                                {/* <img src={gptLogo} alt=""/> */}
                                <Image className="" src="/chatgpt.svg" width={60} height={60} alt="Logo" />
                            {/* </div> */}
                        </div>
                        <div className="col-12  flex-grow flex  justify-center mx-auto" >
                            <h3 className="text-white text-start">Sign in with</h3>
                        </div>
                        <div className="col-auto flex-grow flex  justify-center mx-auto  " >
                            <h3 className="text-start" style={{color:"var(--app-primary)"}}>Open AI</h3>
                        </div>
                    </div>

                    <div className="row flex-grow flex  justify-center mx-auto p-md-5" >
                        <div className="mx-auto justify-center p-md-2 p-0 gap-1 bg-app-primary rounded-pill"
                                onClick={e => handleSigninBtnClick(e)}>
                            <button className="btn btn-md d-flex mx-auto justify-center gap-2 ">
                            <Image className="btnicon" src="/user-icon-white.svg" width={20} height={20} />
                              <span className="fs-6 fw-bold text-white">Sign In with OpenAI</span>
                            </button>
                        </div>
                    </div>
                    <div className="row my-5">
                        <div className="d-flex align-items-center justify-content-center p-md-2 p-0 gap-1">
                            <span style={{ marginBottom:"20px", color: "white" }}>Don't have an account? <Link href={"/"} onClick={e => handleRegisterBtnClick(e)} style={{fontWeight:"500"}}  variant="outline-success">Sign up now</Link></span>
                            
                        </div>
                    </div>
                    
                </div>
                
            </div>
        </div>
    )
}



export default ChatGptLogin;