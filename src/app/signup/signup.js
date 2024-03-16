"use client";

import React from 'react'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import { getMessaging, onMessage } from 'firebase/messaging'
import { signInWithPopup } from 'firebase/auth'
import { requestPermission, app, initMessaging, googleProvider, auth, appleProvider } from "../firebase"

import "./style.css";

export default function SignUp() {
    const router = useRouter()
    const handleSignin = () => {
        router.push('/')
    }

    //sign in with social links
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
        <div className='background'>
            <div className='card rounded-lg'>
                <div className='flex mt-7 justify-center w-full'>
                    <img style={{
                        height: 'auto',
                        width: '100%',
                        maxWidth: '60px'
                    }} src='/chatgpt.svg' />
                </div>
                <div className='text-center mt-1'>
                    Sign up with <span className='text-[#00C28C]'>OpenAI</span>
                </div>
                <div className='flex justify-center AIButton'>
                    <Button className=' bg-[#00C28C] hover:bg-[#00000030] rounded-3xl text-[white]'>SIGN UP WITH OPEN AI</Button>
                </div>
                <div className='flex w-full justify-center signINBtn'>
                    <p className='text-[white]'>Alredy Have ann account</p><button className='text-[white]  font-medium hover:text-lg ms-2 hover:text-[#00C28C] hover:font-semibold' onClick={handleSignin}>Sign In</button>
                </div>
                <div className='mt-2 text-[white] text-center'>
                    Or Sign Up with
                </div>
                <div className='w-full flex justify-center mt-5'>
                    <button onClick={handleSigninWithGoogleBtnClick}><img src='/google.png' style={{ height: 'auto', width: '100%', maxWidth: '50px' }} /></button>
                    <button onClick={handleSigninWithAppleBtnClick} className='ms-2'><img src='/appleicon3.png' style={{ height: 'auto', width: '100%', maxWidth: '48px', borderRadius: '50%' }} /></button>
                </div>
            </div>
        </div>
    )
}