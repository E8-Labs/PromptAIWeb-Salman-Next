import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Manageprofile = (props) => {

    //Check Personal Information
    //console.log("Manage Profile ", props.user.user.email)
    const router = useRouter()
    const [showSnack, setShowSnack] = useState(false)
    const [snackMessage, setSnackMessage] = useState('')
    const [personalInfo, setPersonalInfo] = useState(true)
    const [user, setUser] = useState(props.user)
    const handlePersonalInfo = () => {
        //console.log("Personal Info Button clicked")
        setSubscription(false)
        setPaymentMethod(false)
        setPersonalInfo(true)
    }

    //Check SubscriptionPlans
    const [subscription, setSubscription] = useState('')
    const handleSubscription = () => {
        //console.log("Subcription clicked")
        setPaymentMethod(false)
        setPersonalInfo(false)
        setSubscription(true)
    }

    //check PaymentMethod
    const [PaymentMethod, setPaymentMethod] = useState('')
    const handlePaymentMethod = () => {
        //console.log("Payment button clicked")
        setPersonalInfo(false)
        setSubscription(false)
        setPaymentMethod(true)
    }

    //code for input button
    // const inputRef = useRef(null);

    // const handleClick = () => {
    //     if (inputRef.current) {
    //         inputRef.current.focus();
    //     }
    // };


    React.useEffect(() => {

    }, [])
    const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

    const handleClick = (index) => {
        if (inputRefs[index].current) {
            inputRefs[index].current.focus();
        }
    };

    //save email and name 
    // const d = storedData
    const [name, setName] = useState(props.user.user.name)
    console.log('Data passed of user profile is', props.user)
    const [email, setEmail] = useState(props.user.user.email)
    const [profileImage, setProfileImage] = useState(props.user.user.profile_image)
    const [username, setUsername] = useState(props.user.user.username)

    const [localStorageData, setLocalStorageData] = useState('')

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('data'))
        const D = storedData
        //console.log('Data recieved from localstorage is stored in', D)
        setLocalStorageData(D)
        //console.log('New Data stored in lsd is', localStorageData)
    }, [])

    const linkRef = useRef(null);

    //code for updateprofile api

    //code for updateloader

    const [updateLoading, setUpdateLoading] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setShowSnack(false);
      };
    const handleUpdateProfileClick = async () => {
        try {
            setUpdateLoading(true)
            const apiURl = 'https://www.blindcircle.com:444/prompt/api/users/update_profile';
            const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMSwibmFtZSI6ImFuZ3VzMTIzIiwidXNlcm5hbWUiOiJhbmd1cyIsImVtYWlsIjoiYW5ndXNAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkdFRhanQ1NzJqNVZzYWguTzRDUFhaT3VXa0MuS3gwa3hhczVJdmY3dkxsZ2s0SXVlQlkxRGEiLCJiaW8iOm51bGwsInByb2ZpbGVfaW1hZ2UiOiJodHRwczovL3Byb21wdGFpYXBwYnVja2V0LnMzLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tL2ltYWdlMTcwNTA3MjEyMzc4MSIsImJhbm5lcl9pbWFnZSI6Imh0dHBzOi8vcHJvbXB0YWlhcHBidWNrZXQuczMudXMtZWFzdC0yLmFtYXpvbmF3cy5jb20vaW1hZ2VCYW5uZXIxNzE1MDA5ODQxMjYzIiwieW91dHViZV91cmwiOm51bGwsImluc3RhZ3JhbV91cmwiOiJ3d3cuaW5zdGFncmFtLmNvbS9hbmd1cyIsIndlYl91cmwiOiJ3d3cuYW5ndXMuY29tIiwiZGlzY29yZF91cmwiOm51bGwsInRpa3Rva191cmwiOm51bGwsImZjbV90b2tlbiI6bnVsbCwicHJvdmlkZXJfaWQiOm51bGwsInByb3ZpZGVyX25hbWUiOm51bGwsImNyZWF0ZWRBdCI6IjIwMjQtMDEtMTJUMTU6MDg6NDQuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjQtMDUtMTFUMDQ6MzM6NTguMDAwWiJ9LCJpYXQiOjE3MTU0MDIxMjEsImV4cCI6MTc0NjkzODEyMX0.-nJMZLYN0DwmfOVEm3hFf8fN-zJ4OlEd4oEasvOL3gY"
            const response = await fetch(apiURl, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authToken
                },
                body: JSON.stringify({ name, email, username })
            });
            // console.log('Token is', props.user.token)
            if (response.ok) {
                let data = await response.json();
                console.log('Response data:', data);
                const UpdatedData = data;//JSON.parse(data);
                setName(UpdatedData.name)
                setEmail(UpdatedData.email)
                setUsername(UpdatedData.username)
                toast(`Profile updated`);
                // setSnackMessage("Profile updated")
                // setShowSnack(true)
            }
            else {
                toast(`Error updating profile`);
                // setSnackMessage("Error updating profile")
                // setShowSnack(true)
                // console.log('Response is not fine')
            }
        }
        catch (error) {
            toast(error.message);
            // setSnackMessage(error.message)
                // setShowSnack(true)
            console.log('Error occured is', error)
        }
        finally {
            setUpdateLoading(false)
        }
    }

    return (
        <div>
            {/* <Snackbar
                open={showSnack}
                autoHideDuration={6000}
                onClose={handleClose}
                message={snackMessage}
                // action={action}
            /> */}
            <ToastContainer />
            <div className='flex flex-grow flex-row w-full overflow-y-auto ' style={{ maxHeight: 'calc(100vh - 300px)' }}>
                <div className='bg-[#00C28C30]  w-60 ms-10 ms-3 w-1/4 flex justify-center rounded-2xl' style={{ height: '53vh' }}>
                    <div className='w-10/12 pb-5' >
                        <div className='text-[#00C28C] font-medium text-md pt-10'>
                            <button onClick={handlePersonalInfo}
                                style={{
                                    color: personalInfo ? '#00C28C' : '',
                                }}
                            >
                                Personal Information
                            </button>
                        </div>
                        <div className='text-[white] font-medium text-md mt-10'><button onClick={handleSubscription}
                            style={{
                                color: subscription ? '#00C28C' : '',
                            }}
                        >Subscription Plans</button></div>
                        <div className='text-[white] font-medium text-md mt-10'><button onClick={handlePaymentMethod}
                            style={{
                                color: PaymentMethod ? '#00C28C' : '',
                            }}
                        >Payment Method</button></div>
                        <div className='text-[white] font-medium text-md mt-10'>
                            <Link href='/dashboard/privacy' target='_blank' ref={linkRef}>PrivacyPolicy</Link>
                        </div>
                        <div className='text-[white] font-medium text-md mt-10'>
                            <Link href='/dashboard/terms' target='_blank' ref={linkRef}>Terms & Conditions</Link>
                        </div>
                        <button className='text-[#FF124B] font-medium text-md mt-10' onClick={() => {
                            event.preventDefault()
                            //console.log("Logout here")
                            if (typeof localStorage !== 'undefined') {
                                localStorage.setItem(process.env.REACT_APP_LocalSavedUser, null)
                            }
                            router.push("/");
                        }}>Log out</button>
                    </div>
                </div>

                {/* Visible when PersonalInfo button is focused */}
                {personalInfo && (
                    <div className='flex justify-end w-3/4 ms-5'>
                        <div className='w-11/12' >
                            <div className='flex flex-row'>
                                <div>
                                    <Image src={profileImage} width={70}
                                        height={70} style={{
                                            borderRadius: '50%'
                                        }} /></div>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }} className='ms-7'>
                                    <div>
                                        {/* <div className='text-white font-semibold'>{printname}</div>
                            <div className='text-white'>{printEmail}</div> */}
                                        {/* printname && (
                                            <div>
                                                <div className='text-white font-semibold'>{printname.name}</div>
                                                <div className='text-white font-semibold'>{printname.email}</div>
                                            </div>
                                        ) */}
                                        {
                                            localStorageData ? (
                                                <div>
                                                    <div className='text-white font-semibold'>{name}</div>
                                                    <div className='text-white font-semibold'>{email}</div>
                                                </div>
                                            ) : ''
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='ms-3 mt-5'>
                                <label className='text-white'>Name</label><br />
                                <div className='w-full flex flex-row'><input value={name} onChange={(e) => setName(e.target.value)} ref={inputRefs[0]} className='py-3 w-6/12 text-white outline-none border-none text-xs' type='text' placeholder='Enter Name' style={{ backgroundColor: 'black' }} /><button onClick={() => handleClick(0)}><img src='/pencil.png' alt='pen' style={{ height: 'auto', width: '100%', maxWidth: '44px' }} /></button></div>
                                <label className='text-white'>Username</label><br />
                                <div className='w-full flex flex-row'><input value={username} onChange={(e) => setUsername(e.target.value)} ref={inputRefs[1]} className='py-3 w-6/12 text-white outline-none border-none text-xs' type='text' placeholder='Enter User Name' style={{ backgroundColor: 'black' }} /><button onClick={() => handleClick(1)}><img src='/pencil.png' alt='pen' style={{ height: 'auto', width: '100%', maxWidth: '44px' }} /></button></div>
                                <label className='text-white'>Email</label><br />
                                <div className='w-full flex flex-row'><input value={email} onChange={(e) => setEmail(e.target.value)} ref={inputRefs[2]} className='py-3 w-6/12 text-white outline-none border-none text-xs' type='email' placeholder='Enter Email' style={{ backgroundColor: 'black' }} /><button onClick={() => handleClick(2)}><img src='/pencil.png' alt='pen' style={{ height: 'auto', width: '100%', maxWidth: '44px' }} /></button></div>
                                <div className='w-full flex flex-row mt-2'><input value={user.user.youtube_url} ref={inputRefs[3]} className='py-3 w-6/12 text-white outline-none border-none text-xs' type='text' placeholder='Youtube Link' style={{ backgroundColor: 'black' }} /><button><button onClick={() => handleClick(3)}><img src='/pencil.png' alt='pen' style={{ height: 'auto', width: '100%', maxWidth: '44px' }} /></button></button></div>
                                <div className='w-full flex flex-row mt-2'><input value={user.user.instagram_url} ref={inputRefs[4]} className='py-3 w-6/12 text-white outline-none  text-xs border-none' type='text' placeholder='Instagram Link' style={{ backgroundColor: 'black' }} /><button onClick={() => handleClick(4)}><button><img src='/pencil.png' alt='pen' style={{ height: 'auto', width: '100%', maxWidth: '44px' }} /></button></button></div>
                                <div className='w-full flex flex-row mt-2'><input value={user.user.web_url} ref={inputRefs[5]} className='py-3 w-6/12 text-white outline-none  text-xs border-none' type='text' placeholder='Website Link' style={{ backgroundColor: 'black' }} /><button onClick={() => handleClick(5)}><button><img src='/pencil.png' alt='pen' style={{ height: 'auto', width: '100%', maxWidth: '44px' }} /></button></button></div>

                                <div className='w-full flex flex-row mt-2'><input value={user.user.tiktok_url} ref={inputRefs[4]} className='py-3 w-6/12 text-white outline-none  text-xs border-none' type='text' placeholder='Tiktok Link' style={{ backgroundColor: 'black' }} /><button onClick={() => handleClick(4)}><button><img src='/pencil.png' alt='pen' style={{ height: 'auto', width: '100%', maxWidth: '44px' }} /></button></button></div>
                                <div className='w-full flex flex-row mt-2'><input value={user.user.discord_url} ref={inputRefs[5]} className='py-3 w-6/12 text-white outline-none  text-xs border-none' type='text' placeholder='Discord Link' style={{ backgroundColor: 'black' }} /><button onClick={() => handleClick(5)}><button><img src='/pencil.png' alt='pen' style={{ height: 'auto', width: '100%', maxWidth: '44px' }} /></button></button></div>
                            </div>
                            <div>
                                {/*<button className='hover:p-1 hover:border-2 hover:border-green-500 rounded '>
                                    Save
                                    </button>*/}
                                <Button onClick={handleUpdateProfileClick} variant="contained"
                                    sx={{
                                        backgroundColor: '#00C28C50',
                                        border: '1px solid #00C28C50',
                                        '&:hover': {
                                            bgcolor: '#00C28C90',
                                            border: '0px',
                                        },
                                    }} style={{ fontWeight: 'bold' }}
                                >
                                    {updateLoading ? <div>Loading...</div> : <div>Save</div>}
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Visible subscription button is focused */}
                {subscription && (
                    <div className='text-white w-3/4 font-bold text-center' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        Comming Soon...
                    </div>
                )}

                {/* Visible subscription button is focused */}
                {PaymentMethod && (
                    <div className='text-white w-3/4 font-bold text-center' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        Comming Soon...
                    </div>
                )}

            </div>
        </div>
    )
}

export default Manageprofile
