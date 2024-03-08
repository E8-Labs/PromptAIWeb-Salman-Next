'use client'
import React, { useState, useEffect, Component } from "react";
import { useRouter } from "next/navigation";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CustomTextField } from "../customcomponents/CustomTextField";
import { Button, Stack, CircularProgress, Icon, IconButton } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import { PageControl } from "../customcomponents/PageControl";
import Icons from '@/app/lib/Icons';
// import { Link, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
const background = '/bg-image.png'
const notpermissionLogo = '/notpermission.svg'
const userIcon = '/user-icon-white.svg'
const crossIcon = '/cross.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getMessaging, onMessage } from 'firebase/messaging';
import { signInWithPopup } from 'firebase/auth'
import { requestPermission, app, initMessaging, googleProvider, auth, appleProvider } from "./../../firebase"

//Images
const upload_image = '/upload_image.svg';


import ApiPath from "../../lib/ApiPath";

function LoginAI(props) {
    let router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [loading, setLoading] = useState(false)





    function handleKeyPress(e) {
        if (e.target.name == "username") {
            // setUsername(e.target.value)

        }
    }

    function forgotPassword(e){
        //load forgotpassword
        
        router.push("/forgotpassword")
    }

    function handleBackButton(event) {
        event.preventDefault()
        console.log("Handle back button")
        props.backAction("intro")
    }
    function nextBtnClicked() {
        // setLoading(true)
        console.log("Email ", email)
        console.log("password", password)
        props.getEmailPassword(email, password)

    }
    function handleChange(event) {
        event.preventDefault()
        console.log("Email changed " + event.target.value)
        setEmail(event.target.value)

    }
    function handleChangePassword(event) {
        event.preventDefault()
        console.log("Password changed " + event.target.value)
        setPassword(event.target.value)

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



    return (

        <div className="flex-col flex-grow w-full h-full justify-center justify-center items-center mb-3">
            <div className="flex flex-grow h-12 w-full  items-center justify-between mb-6">
                <IconButton onClick={handleBackButton}>
                    <ArrowBackIcon sx={{ color: 'white' }} />
                </IconButton>
                <div className="flex-grow flex items-center justify-center">
                    <h3 className="text-white">Login</h3>
                </div>
                <IconButton className="invisible ..." onClick={handleBackButton}>
                    <ArrowBackIcon sx={{ color: 'transparent' }} />
                </IconButton>
            </div>


            <div className='flex flex-col flex-grow gap-6 w-full justify-center items-center mt-6 px-6'>

                {/* <form className='gap-sm-4 form '> */}

                {/* <input className='inputtext' type='text' placeholder='Title' name='title' onChange={e => updateFormData({ title: e.target.value })}></input> */}
                <CustomTextField

                    required
                    id="outlined-required"
                    label="Email"
                    defaultValue=""
                    placeholder='Email'
                    sx={{ "label": { color: "gray" }, width: '100%' }}
                    onChange={handleChange}
                />

                <CustomTextField
                    type="password"
                    required
                    id="outlined-required"
                    label="Password"
                    defaultValue=""
                    placeholder='Password'
                    sx={{ "label": { color: "gray" }, width: '100%' }}
                    onChange={handleChangePassword}
                />
                <div className="flex-col flex  w-full  justify-start items-start" >
                    <Button className="p-0 " onClick={forgotPassword}> Forgot Password </Button>
                </div>

                <div className="flex-col flex  w-full  justify-center items-center ">
                    {/* <Stack direction={'row'} className=''> */}
                    {/* <PageControl selectedColor={"#00C28C"} selectedIndex={1} pages={5} /> */}
                    {/* </Stack> */}

                    <div className="bg-appgreenlight rounded-full p-0">
                        <LoadingButton
                        loading={props.loading || false}
                        loadingIndicator={<CircularProgress color="inherit" size={16} sx={{color: 'white'}}/>}
                            variant="contained"
                            className=""
                            endIcon={<ArrowForwardIcon />}
                            sx={{
                                bgcolor: '#00C28C',
                                padding: 1.5,
                                paddingX: 4,
                                borderRadius: 10,
                                ":hover": {
                                    backgroundColor: "#001812",
                                },
                            }}
                            onClick={nextBtnClicked}
                        >
                            Login
                        </LoadingButton>
                    </div>
                </div>
                <div className="flex justify-center items-center w-full mb-2">
                        <span className=" text-white">Or Sign In with</span>
                </div>
                <div className="flex-col my-2 justify-center items-center" >
                    
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




                {/* </form> */}
            </div>
            <ToastContainer />
        </div>




    );

}
export default LoginAI;