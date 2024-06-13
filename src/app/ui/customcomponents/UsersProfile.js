'use client'
import Image from 'next/image';
import React, { useState } from 'react';

const UsersProfile = (props) => {
    let user = props.user

    const [following, setFollowing] = useState(user.amIFollowing);

    return (
        <div style={{ overflowX: 'auto', width: '100%' }}>
            <div className="w-full h-24 bg-white-100 flex justify-between items-center pl-2 pr-2 pt-1" >
                <div className="flex items-center space-x-4">
                    <Image
                        src={user.profile_image} // Replace with your image path
                        alt="User Profile"
                        width={80} // Adjust width as needed
                        height={80} // Adjust height to maintain aspect ratio
                        className="rounded-full" // Optional: if you want rounded image like YouTube
                    />
                    <div className="flex flex-col ">
                        <span className="text-lg font-semibold text-white">{user.name}</span>
                        <span className="text-xsm text-gray-600 text-white" style={{ fontSize: 12 }}>@{`${user.username}`}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsersProfile;
