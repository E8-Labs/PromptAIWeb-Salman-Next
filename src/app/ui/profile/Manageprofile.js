import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

const Manageprofile = () => {

    //Check Personal Information

    const router = useRouter()
    const [personalInfo, setPersonalInfo] = useState(true)
    const handlePersonalInfo = () => {
        console.log("Personal Info Button clicked")
        setSubscription(false)
        setPaymentMethod(false)
        setPersonalInfo(true)
    }

    //Check SubscriptionPlans
    const [subscription, setSubscription] = useState('')
    const handleSubscription = () => {
        console.log("Subcription clicked")
        setPaymentMethod(false)
        setPersonalInfo(false)
        setSubscription(true)
    }

    //check PaymentMethod
    const [PaymentMethod, setPaymentMethod] = useState('')
    const handlePaymentMethod = () => {
        console.log("Payment button clicked")
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

    const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

    const handleClick = (index) => {
        if (inputRefs[index].current) {
            inputRefs[index].current.focus();
        }
    };

    //save email and name 
    // const d = storedData
    const [name, setName] = useState('')
    const [printname, setPrintname] = useState(null)
    const handleNameSave = () => {
        const newData = {
            email,
            name
        }
        localStorage.setItem('data', JSON.stringify(newData))
        console.log("New data saved is", newData)
        setPrintname(newData)
        // const storedData = JSON.parse(localStorage.getItem('data'))  
    }

    const [localStorageData, setLocalStorageData] = useState('')

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('data'))
        const D = storedData
        console.log('Data recieved from localstorage is stored in', D)
        setLocalStorageData(D)
        console.log('New Data stored in lsd is', localStorageData)
    }, [])

    const [email, setEmail] = useState('')
    const [printEmail, setPrintEmail] = useState('')

    // const handleEmail = () => {
    //     // console.log("Email saved is" email)
    //     console.log("Email saved is email", email)
    //     setPrintEmail(email)
    // }

    const linkRef = useRef(null);

    return (
        <div>
            <div className='flex flex-row w-full overflow-y-auto' style={{ maxHeight: 'calc(100vh - 300px)' }}>
                <div className='bg-[#00C28C30] h-120 w-60 ms-10 ms-3 w-1/4 flex justify-center rounded-2xl'>
                    <div className='w-10/12 '>
                        <div className='text-[#00C28C] font-medium text-md pt-10'><button onClick={handlePersonalInfo}
                            style={{
                                color: personalInfo ? '#00C28C' : '',
                            }}
                        >Personal Information</button></div>
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
                        <button className='text-[#FF124B] font-medium text-md mt-3' onClick={() => {
                            event.preventDefault()
                            console.log("Logout here")
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
                                <div><img src='/noah.png' style={{
                                    height: 'auto',
                                    width: '100%',
                                    maxWidth: '98px'
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
                                                    <div className='text-white font-semibold'>{localStorageData.name}</div>
                                                    <div className='text-white font-semibold'>{localStorageData.email}</div>
                                                </div>
                                            ) : ''
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='ms-3 mt-5'>
                                <label className='text-white'>Name</label><br />
                                <div className='w-full flex flex-row'><input value={name} onChange={(e) => setName(e.target.value)} ref={inputRefs[0]} className='py-3 w-6/12 text-white outline-none border-none text-xs' type='text' placeholder='Noah Nega' style={{ backgroundColor: 'black' }} /><button onClick={() => handleClick(0)}><img src='/pencil.png' alt='pen' style={{ height: 'auto', width: '100%', maxWidth: '44px' }} /></button></div>
                                <label className='text-white'>Username</label><br />
                                <div className='w-full flex flex-row'><input ref={inputRefs[1]} className='py-3 w-6/12 text-white outline-none border-none text-xs' type='text' placeholder='@noahTheDeveloper' style={{ backgroundColor: 'black' }} /><button onClick={() => handleClick(1)}><img src='/pencil.png' alt='pen' style={{ height: 'auto', width: '100%', maxWidth: '44px' }} /></button></div>
                                <label className='text-white'>Email</label><br />
                                <div className='w-full flex flex-row'><input value={email} onChange={(e) => setEmail(e.target.value)} ref={inputRefs[2]} className='py-3 w-6/12 text-white outline-none border-none text-xs' type='email' placeholder='heloe8@labs.com' style={{ backgroundColor: 'black' }} /><button onClick={() => handleClick(2)}><img src='/pencil.png' alt='pen' style={{ height: 'auto', width: '100%', maxWidth: '44px' }} /></button></div>
                                <div className='w-full flex flex-row mt-2'><input ref={inputRefs[3]} className='py-3 w-6/12 text-white outline-none border-none text-xs' type='text' placeholder='Youtube' style={{ backgroundColor: 'black' }} /><button><button onClick={() => handleClick(3)}><img src='/pencil.png' alt='pen' style={{ height: 'auto', width: '100%', maxWidth: '44px' }} /></button></button></div>
                                <div className='w-full flex flex-row mt-5'><input ref={inputRefs[4]} className='py-3 w-6/12 text-white outline-none  text-xs border-none' type='text' placeholder='Instagram Link' style={{ backgroundColor: 'black' }} /><button onClick={() => handleClick(4)}><button><img src='/pencil.png' alt='pen' style={{ height: 'auto', width: '100%', maxWidth: '44px' }} /></button></button></div>
                                <div className='w-full flex flex-row mt-5'><input ref={inputRefs[5]} className='py-3 w-6/12 text-white outline-none  text-xs border-none' type='text' placeholder='Website Link' style={{ backgroundColor: 'black' }} /><button onClick={() => handleClick(5)}><button><img src='/pencil.png' alt='pen' style={{ height: 'auto', width: '100%', maxWidth: '44px' }} /></button></button></div>
                            </div>
                            <div>
                                <button onClick={handleNameSave} className='hover:p-1 hover:border-2 hover:border-green-500 rounded '>
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Visible subscription button is focused */}
                {subscription && (
                    <div className='text-white w-3/4 font-bold text-center'>
                        Comming Soon...
                    </div>
                )}

                {/* Visible subscription button is focused */}
                {PaymentMethod && (
                    <div className='text-white w-3/4 font-bold text-center'>
                        Comming Soon...
                    </div>
                )}

            </div>
        </div>
    )
}

export default Manageprofile
