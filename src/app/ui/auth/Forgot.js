'use client'
import React, { useState, useEffect, Component } from "react";
import { useRouter } from "next/navigation";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CustomTextField } from "../customcomponents/CustomTextField";
import { Button, Stack, CircularProgress, Icon, IconButton } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
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

function Forgot(props) {
    let router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [code, setCode] = useState('')
    const [codeSent, setCodeSent] = useState(true)
    const [loading, setLoading] = useState(false)
    const [loadingCode, setLoadingCode] = useState(false)
    // const [loading, setLoading] = useState(false)





    function handleKeyPress(e) {
        if (e.target.name == "username") {
            // setUsername(e.target.value)

        }
    }

    function handleChangeCode(e){
        setCode(e.target.value)
    }

    function sendCode() {
        if (email === null || email === "") {
            toast(`Add email`);
            return
        }

        const apiParams = {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": email,
            }),
            redirect: 'follow'
        }
        console.log("Sending Reset Api")
        setLoadingCode(true)
        fetch(ApiPath.SendResetCode, apiParams)
            .then(function (res) {
                setLoading(false)
                // console.log("Response is ", res)
                return res.json();
            }).then(resJson => {
                setLoadingCode(false)
                // this.props.clickEvent("stap6");
                if (resJson.status == true) {
                    console.log("Code sent")
                    setCodeSent(true)

                } else {
                    console.log("Error login ", resJson.message)
                    toast(`Error: ${resJson.message}`);
                }
            })
            .catch(error => {
                setLoading(false)
                console.log("User error " + error)
                toast(`Error: ${error}`);
                // this.setState({ showerror: true ,showerrortype : 2 ,showerrormessage: "Invalid Response" });
                // this.error_handaling();
            });
    }

    function forgotPassword(e) {
        //load forgotpassword

        router.push("/forgotpassword")
    }

    function handleBackButton(event) {
        event.preventDefault()
        console.log("Handle back button")
        // props.backAction("intro")
    }
    
    function handleChange(event) {
        event.preventDefault()
        console.log("Email changed " + event.target.value)
        setEmail(event.target.value)

    }
    function handleChangePassword(event) {
        event.preventDefault()
        console.log("Email changed " + event.target.value)
        setPassword(event.target.value)

    }
    function chagePasswordClicked(event) {
        event.preventDefault()
        console.log("Chaning password")
        //call the api to change password
        if (code === null || code === "") {
            toast(`Enter a valid code`);
            return
        }
        if (password === null || password === "") {
            toast(`Enter a valid password`);
            return
        }

        const apiParams = {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": email,
                "password": password,
                "code": code
            }),
            redirect: 'follow'
        }
        console.log("Sending Reset Api")
        setLoading(true)
        fetch(ApiPath.UpdatePassword, apiParams)
            .then(function (res) {
                setLoading(false)
                // console.log("Response is ", res)
                return res.json();
            }).then(resJson => {
                setLoading(false)
                // this.props.clickEvent("stap6");
                if (resJson.status == true) {
                    console.log("Password updated")
                    router.push("/")

                } else {
                    console.log("Error login ", resJson.message)
                    toast(`Error: ${resJson.message}`);
                }
            })
            .catch(error => {
                setLoading(false)
                console.log("User error " + error)
                toast(`Error: ${error}`);
                // this.setState({ showerror: true ,showerrortype : 2 ,showerrormessage: "Invalid Response" });
                // this.error_handaling();
            });
    }

    return (

        <div className="flex-col flex-grow w-full h-full justify-center justify-center items-center mb-3">
            <div className="flex flex-grow h-12 w-full  items-center justify-between mb-6">

                <div className="flex-grow flex items-center justify-center">
                    <h3 className="text-white">Forgot password</h3>
                </div>

            </div>


            <div className='flex flex-col flex-grow gap-6 w-full justify-center items-center mt-6 px-6'>

                <CustomTextField

                    InputProps={{
                        endAdornment: (

                            <InputAdornment position="end">
                                <LoadingButton

                                    className="text-xs"
                                    loading={loadingCode}
                                    loadingIndicator={<CircularProgress color="inherit" size={16} sx={{ color: 'white' }} />}
                                    
                                    onClick={sendCode}
                                    edge="end"
                                    
                                >
                                    Send Code
                                </LoadingButton>
                            </InputAdornment>

                        )
                    }}
                    required
                    id="outlined-required"
                    label="Email"
                    defaultValue=""
                    placeholder='Email'
                    sx={{ "label": { color: "gray" }, width: '100%' }}
                    onChange={handleChange}

                />

                {
                    codeSent && (
                        <div className="flex-col gap-3">
                            <CustomTextField
                            type="text"
                            required
                            id="outlined-required"
                            label="Verification Code"
                            defaultValue=""
                            placeholder='Verification Code'
                            sx={{ "label": { color: "gray" }, width: '100%' }}
                            onChange={handleChangeCode}
                        />
                        <CustomTextField
                            type="password"
                            required
                            id="outlined-required"
                            label="Password"
                            defaultValue=""
                            placeholder='Password'
                            sx={{ "label": { color: "gray" }, width: '100%', marginTop: 3 }}
                            onChange={handleChangePassword}
                        />
                        </div>
                    )
                }


                <div className={`flex-col flex  w-full  justify-center items-center ${codeSent ? "" : "hidden"}`}>
                    {/* <Stack direction={'row'} className=''> */}
                    {/* <PageControl selectedColor={"#00C28C"} selectedIndex={1} pages={5} /> */}
                    {/* </Stack> */}

                    <div className="bg-appgreenlight rounded-full p-0">
                        <LoadingButton
                            loading={loading || false}
                            loadingIndicator={<CircularProgress color="inherit" size={16} sx={{ color: 'white' }} />}
                            variant="contained"
                            className=""
                            // endIcon={<ArrowForwardIcon />}
                            sx={{
                                bgcolor: '#00C28C',
                                padding: 1.5,
                                paddingX: 4,
                                borderRadius: 10,
                                ":hover": {
                                    backgroundColor: "#001812",
                                },
                            }}
                            onClick={chagePasswordClicked}
                        >
                            Update Password
                        </LoadingButton>
                    </div>
                </div>

            </div>
            <ToastContainer />
        </div>




    );

}
export default Forgot;