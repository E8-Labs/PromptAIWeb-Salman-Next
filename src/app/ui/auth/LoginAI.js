'use client'
import React, { useState, useEffect, useCallback, Component } from "react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CustomTextField } from "../customcomponents/CustomTextField";
import { Button, Stack, IconButton, CircularProgress } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import { PageControl } from "../customcomponents/PageControl";
// import { Link, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
const background = '/bg-image.png'
const notpermissionLogo = '/notpermission.svg'
const userIcon = '/user-icon-white.svg'
const crossIcon = '/cross.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Images
const upload_image = '/upload_image.svg';


import ApiPath from "../../lib/ApiPath";

function LoginAI(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [loading, setLoading] = useState(false)





    function handleKeyPress(e) {
        if (e.target.name == "username") {
            // setUsername(e.target.value)

        }
    }

    function handleBackButton(event) {
        event.preventDefault()
        console.log("Handle back button")
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





                {/* </form> */}
            </div>
            <ToastContainer />
        </div>




    );

}
export default LoginAI;