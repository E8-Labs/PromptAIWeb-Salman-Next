import React from 'react'

const ProfileManagement = () => {
    return (
        <div>
            <div className='flex flex-row w-full'>
                <div className='bg-[#00C28C30] ms-3 w-1/4 flex justify-center rounded-2xl'>
                    <div className='w-10/12'>
                        <div className='text-[#00C28C] font-medium text-md pt-10'>Personal Information</div>
                        <div className='text-[white] font-medium text-md mt-10'>Subscription Plans</div>
                        <div className='text-[white] font-medium text-md mt-10'>Payment Method</div>
                        <button className='text-[#FF124B] font-medium text-md mt-10'>Log out</button>
                    </div>
                </div>
                <div className='flex justify-end w-3/4 ms-5'>
                    <div className='w-11/12'>
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
                            <div className='w-full flex flex-row'><input className='border-2 py-3 border-green-500 w-6/12' type='text' style={{backgroundColor: 'none'}} /><img src='/pencil.png' alt='pen' style={{ height: 'auto', width: '100%', maxWidth: '44px' }} /></div>
                            <label className='text-white'>Username</label><br />
                            <div className='w-full flex flex-row'><input className='border-2 py-3 border-green-500 w-6/12' type='text' style={{backgroundColor: 'none'}} /><img src='/pencil.png' alt='pen' style={{ height: 'auto', width: '100%', maxWidth: '44px' }} /></div>
                            <label className='text-white'>Email</label><br />
                            <div className='w-full flex flex-row'><input className='border-2 py-3 border-green-500 w-6/12' type='text' style={{backgroundColor: 'none'}} /><img src='/pencil.png' alt='pen' style={{ height: 'auto', width: '100%', maxWidth: '44px' }} /></div>
                            <div className='w-full flex flex-row'><input className='border-2 py-3 border-green-500 w-6/12' type='text' style={{backgroundColor: 'none'}} /><img src='/pencil.png' alt='pen' style={{ height: 'auto', width: '100%', maxWidth: '44px' }} /></div>
                            <div className='w-full flex flex-row'><input className='border-2 py-3 border-green-500 w-6/12' type='text' style={{backgroundColor: 'none'}} /><img src='/pencil.png' alt='pen' style={{ height: 'auto', width: '100%', maxWidth: '44px' }} /></div>
                            <div className='w-full flex flex-row'><input className='border-2 py-3 border-green-500 w-6/12' type='text' style={{backgroundColor: 'none'}} /><img src='/pencil.png' alt='pen' style={{ height: 'auto', width: '100%', maxWidth: '44px' }} /></div>
                        </div>
                        <div className='text-white'>Hamza</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileManagement
