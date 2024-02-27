import React, { useState } from 'react'

const Manageprofile = () => {

    //Check Personal Information
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

    return (
        <div>
            <div className='flex flex-row w-full overflow-y-auto' style={{ maxHeight: 'calc(100vh - 300px)' }}>
                <div className='bg-[#00C28C30] h-80 w-60 ms-10 ms-3 w-1/4 flex justify-center rounded-2xl'>
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
                        <button className='text-[#FF124B] font-medium text-md mt-10'>Log out</button>
                    </div>
                </div>

                {/* Visible when PersonalInfo button is focused */}
                {personalInfo && (
                    <div className='flex justify-end w-3/4 ms-5'>
                        <div className='w-11/12 border-2 border-green-500' >
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
                                        <div className='text-white font-semibold'>Noah Nega</div>
                                        <div className='text-white'>noah@gmail.com</div>
                                    </div>
                                </div>
                            </div>
                            <div className='ms-3 mt-5'>
                                <label className='text-white'>Name</label><br />
                                <div className='w-full flex flex-row'><input className='py-3 w-6/12 text-white outline-none border-none text-xs' type='text' placeholder='Noah Nega' style={{ backgroundColor: 'black' }} /><button><img src='/pencil.png' alt='pen' style={{ height: 'auto', width: '100%', maxWidth: '44px' }} /></button></div>
                                <label className='text-white'>Username</label><br />
                                <div className='w-full flex flex-row'><input className='py-3 w-6/12 text-white outline-none border-none text-xs' type='text' placeholder='@noahTheDeveloper' style={{ backgroundColor: 'black' }} /><button><img src='/pencil.png' alt='pen' style={{ height: 'auto', width: '100%', maxWidth: '44px' }} /></button></div>
                                <label className='text-white'>Email</label><br />
                                <div className='w-full flex flex-row'><input className='py-3 w-6/12 text-white outline-none border-none text-xs' type='email' placeholder='heloe8@labs.com' style={{ backgroundColor: 'black' }} /><button><img src='/pencil.png' alt='pen' style={{ height: 'auto', width: '100%', maxWidth: '44px' }} /></button></div>
                                <div className='w-full flex flex-row mt-2'><input className='py-3 w-6/12 text-white outline-none border-none text-xs' type='text' placeholder='Youtube' style={{ backgroundColor: 'black' }} /><button><button><img src='/pencil.png' alt='pen' style={{ height: 'auto', width: '100%', maxWidth: '44px' }} /></button></button></div>
                                <div className='w-full flex flex-row mt-5'><input className='py-3 w-6/12 text-white outline-none  text-xs border-none' type='text' placeholder='Instagram Link' style={{ backgroundColor: 'black' }} /><button><button><img src='/pencil.png' alt='pen' style={{ height: 'auto', width: '100%', maxWidth: '44px' }} /></button></button></div>
                                <div className='w-full flex flex-row mt-5'><input className='py-3 w-6/12 text-white outline-none  text-xs border-none' type='text' placeholder='Website Link' style={{ backgroundColor: 'black' }} /><button><button><img src='/pencil.png' alt='pen' style={{ height: 'auto', width: '100%', maxWidth: '44px' }} /></button></button></div>
                            </div>
                            <div>
                                <button>
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Visible subscription button is focused */}
                {subscription && (
                    <div className='text-white w-3/4 font-bold border-2 border-green-300 text-center'>
                        Comming Soon...
                    </div>
                )}

                {/* Visible subscription button is focused */}
                {PaymentMethod && (
                    <div className='text-white w-3/4 font-bold border-2 text-center'>
                        Comming Soon...
                    </div>
                )}

            </div>
        </div>
    )
}

export default Manageprofile
