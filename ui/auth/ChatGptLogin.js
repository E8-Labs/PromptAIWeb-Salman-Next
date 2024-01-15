/* @client */
import React, { useState, useEffect, useCallback } from "react";
// import { Link, Route, Routes } from 'react-router-dom';
import { styled } from "styled-components";
// import background from '../../assets/bg-image.png'
// import gptLogo from '../../../public/chatgpt.svg'
// import userIcon from '/user-icon-white.svg'
// import crossIcon from '../../../public/cross.svg'
import Link from "next/link";
import Image from "next/image";
import { Button, Icon } from "@mui/material";

// import { alignProperty } from "@mui/material/styles/cssUtils";

function ChatGptLogin(props) {
    const starIcon = (
        <Icon>
            <img alt="all" src="/user-icon-white.svg" />
        </Icon>
    );
    console.log(props)
    const [index, setIndex] = useState(0);
    const nextPreviousBtnClicked = (event) => {
        // console.log("button clicked")
        if (event.currentTarget.id === "next") {
            console.log(event.currentTarget.id + " btn clicked")
            if (index == 2) {
                setIndex(0)
            }
            else {
                setIndex(index + 1)
            }
        }
        else {
            console.log(event.currentTarget.id + " btn clicked")
            if (index == 0) {
                setIndex(2)
            }
            else {
                setIndex(index + - 1)
            }
        }
    }

    const handleSigninBtnClick = (e) => {
        props.signinBtnTapped()
    }
    const handleRegisterBtnClick = (e) => {
        props.registerBtnTapped()
    }
    return (
        <div className="flex  w-full h-full justify-center items-center">
            <div className="flex-col flex gap-2 h-96   justify-center items-center">
                <div className="flex-col gap-2 my-4">
                    <div className="flex-grow  flex justify-center mx-auto p-0">
                        <Image className="" src="/chatgpt.svg" width={60} height={60} alt="Logo" />
                    </div>
                    <div className="flex-row flex justify-center gap-2">
                        <h3 className="text-white text-right">Sign in with</h3>
                        <h3 className="text-start" style={{ color: "var(--app-primary)" }}>Open AI</h3>
                    </div>
                </div>
                <div className="flex w-full justify-center items-center">
                    <Button variant="contained" startIcon={starIcon}
                        sx={{
                            bgcolor: '#00C28C', padding: 1.5, paddingX: 3, borderRadius: 8, ":hover": {
                                bgcolor: "#001812"
                            }
                        }} onClick={handleSigninBtnClick}>Sign In with OpenAI</Button>
                </div>
                {/* <div className="row flex-grow flex justify-center ">
                        <div className="flex    justify-center  p-0  md:p-4 bg-app-primary rounded-full"
                            onClick={e => handleSigninBtnClick(e)}>
                            <button className="flex flex-row  justify-center gap-2 items-center">
                                <Image className="btnicon" src="/user-icon-white.svg" width={20} height={20} />
                                <span className="text-white text-lg">Sign In with OpenAI</span>
                            </button>
                        </div>
                    </div> */}

                <div className="row my-5">
                    <div className="flex items-center justify-center p-md-2 p-0 gap-1">
                        <span className="mb-20 text-white">Don't have an account? <Link href={"/"} onClick={e => handleRegisterBtnClick(e)} className="font-semibold" variant="outline-success">Sign up now</Link></span>
                    </div>
                </div>

            </div>
        </div>

    )
}



export default ChatGptLogin;