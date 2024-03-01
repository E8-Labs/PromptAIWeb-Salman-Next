/* @client */
import React, { useState, useEffect } from "react";
// import { Link, Route, Routes } from 'react-router-dom';
// import { styled } from "styled-components";
// import background from '../../assets/bg-image.png'
// import gptLogo from '../../../public/chatgpt.svg'
// import userIcon from '/user-icon-white.svg'
// import crossIcon from '../../../public/cross.svg'
import Link from "next/link";
import Image from "next/image";
import { Button, Icon, IconButton } from "@mui/material";
import { getMessaging, onMessage } from 'firebase/messaging';
import { signInWithPopup } from 'firebase/auth'
import { requestPermission, app, initMessaging, googleProvider, auth, appleProvider } from "./../../firebase"
import Icons from '@/app/lib/Icons';
import { useRouter } from "next/navigation";

// import { alignProperty } from "@mui/material/styles/cssUtils";

function ChatGptSignup(props) {
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
        // e.preventDefault()
        // requestPermission()
    }

    const handleRegisterBtnClick2 = (e) => {
        props.registerBtnTapped()
    }

    const handleSigninWithGoogleBtnClick = (e) => {
        console.log("Sign in with google here")
        signInWithPopup(auth, googleProvider).then((data) => {
            let userData = { email: data.user.email, name: data.user.name, providerId: data.user.uid, providerName: "Google" }
            console.log("User data is ", userData)
            props.registerWithSocial(userData)
            // localStorage.setItem('email', data.user.email)
            // setValue(data.user.email)
            // console.log("user email is", data.user.email)
        })
    }

    const handleSigninWithAppleBtnClick = (e) => {
        console.log("Sign in with Apple here")
        signInWithPopup(auth, appleProvider).then((data) => {
            // let userData = data.user
            let userData = { email: data.user.email, name: data.user.name, providerId: data.user.uid, providerName: "Apple" }
            console.log("User data is ", data.user.email)
            props.registerWithSocial(userData)
            // localStorage.setItem('email', data.user.email)
            // setValue(data.user.email)
            // console.log("user email is", data.user.email)
        })
    }



    useEffect(() => {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
            const messaging = getMessaging(app);
            const unsubscribe = onMessage(messaging, (payload) => {
                console.log('Foreground push notification received:', payload);
                // Handle the received push notification while the app is in the foreground
                // You can display a notification or update the UI based on the payload
            });
            return () => {
                unsubscribe(); // Unsubscribe from the onMessage event
            };
        }
    }, []);


    //test code to signup
    const router = useRouter()
    const handleSignup = () => { // when clicked already have an account button
        props.handleLoginBtn()
    }


    return (
        <div className="flex w-full h-full justify-center items-center">
            <div className="flex-col  flex gap-6 flex-grow h-full   justify-center items-center">
                <div className="flex-col gap-4 my-6 ">
                    <div className="flex-grow  flex justify-center mx-auto p-0">
                        <Image className="" src="/chatgpt.svg" width={60} height={60} alt="Logo" />
                    </div>
                    <div className="flex-row flex justify-center gap-2">
                        <h3 className="text-white text-right">Sign in with</h3>
                        <h3 className="text-start" style={{ color: "var(--app-primary)" }}>Open AI</h3>
                    </div>
                </div>
                <div className="h-20 w-full"></div>
                {/* //<div className="bg-appgreenlight rounded-full p-0"></div> */}
                <div className="bg-appgreenlight rounded-full p-0">
                    <Button variant="contained" startIcon={starIcon}
                        sx={{
                            padding: 1.5, paddingX: 3, borderRadius: 8, ":hover": {
                                bgcolor: "#001812"
                            }
                        }} onClick={handleSigninBtnClick}>Sign Up with OpenAI</Button>
                </div>
                <div className="h-20 w-full"></div>

                {/* <input type="button" title="Hello there"  style={{backgroundColor: 'red', height: 50, width: 120}} />

<button style={{backgroundColor: 'red', height: 50, width: 120}}>
    Hello
</button> */}
                <div className="flex-col my-2 justify-center items-center" >
                    <div className="flex items-center justify-center p-md-2 p-0 gap-1 ">
                        <span className="mb-4 text-white">Already have an account? <button onClick={handleSignup} className="font-semibold hover:text-lg hover:font-bold">Sign In Now</button> {/* <Link href={"/"} onClick={e => handleRegisterBtnClick(e)} className="font-semibold" variant="outline-success">Sign up now</Link> */}</span>
                    </div>
                    <div className="flex justify-center items-center w-full mb-2">
                        <span className=" text-white">Or Sign in with</span>
                    </div>
                    <div className="flex flex-row w-full items-center justify-center p-md-2 p-0 gap-1">


                        <div className="flex rounded" style={{
                            backgroundColor: '#FFFFFF', marginTop: 1,
                            marginBottom: 3,
                            borderRadius: '50%', ":hover": {
                                bgcolor: "#001812"
                            }
                        }}>
                            <IconButton
                                sx={{

                                }} onClick={handleSigninWithGoogleBtnClick}><Icons.GoogleIcon /></IconButton>
                        </div>
                        <div className="flex rounded-lg" style={{
                            backgroundColor: '#FFFFFF', marginTop: 1,
                            marginBottom: 3,
                            borderRadius: '50%', ":hover": {
                                bgcolor: "#001812"
                            }
                        }}>
                            <IconButton
                                sx={{

                                }} onClick={handleSigninWithAppleBtnClick}><Icons.AppleIcon /></IconButton>
                        </div>

                    </div>
                </div>

            </div>
        </div>

    )
}



export default ChatGptSignup;