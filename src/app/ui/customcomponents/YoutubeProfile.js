import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { SubscribeUser } from '../../lib/apimanager'
import { Button, Stack } from "@mui/material";

const YoutubeProfile = (props) => {
    let user = props.user

    const [following, setFollowing] = useState(user.amIFollowing)
    const [ProfileImage, setProfileImage] = useState('')

    useEffect(() => {
        setProfileImage(user.profile_image)
    }, [ProfileImage])

    const PlaceholderImage = "./placeholderImage.jpg"

    const handleSubscribeBtn = () => {
        console.log("Unsubscribe button here")
        SubscribeUser(user, (data, error) => {
            if (data) {
                if (data.status) {
                    user.amIFollowing = !user.amIFollowing
                    setFollowing(!following)
                }
            }
            else {
                console.log("Error following user ", error)
            }
        })
    }

    return (
        <div style={{ overflowX: 'auto', width: '100%' }}>
            <div className="w-full h-24 bg-white-100 flex justify-between items-center pl-10 pr-10 pt-2" >
                <div className="flex items-center space-x-4">
                    <Image
                        src={ProfileImage ? ProfileImage : PlaceholderImage}
                        alt="User Profile"
                        width={80} // Adjust width as needed
                        height={80} // Adjust height to maintain aspect ratio
                        className="rounded-full" // Optional: if you want rounded image like YouTube
                        style={{ backgroundColor: 'red' }}
                    />
                    <div className="flex flex-col ">
                        <span className="text-lg font-semibold text-white">{user.name}</span>
                        <span className="text-xsm text-gray-600 text-white" style={{ fontSize: 12 }}>@{`${user.username} - ${user.followers} subscribers`}</span>
                    </div>
                </div>
                <div>
                    <div className="bg-appgreenlight rounded-full p-0">
                        <Button variant="contained" className=""
                            sx={{
                                bgcolor: '#00C28C', padding: 1.5, paddingX: 4, borderRadius: 10, ":hover": {
                                    backgroundColor: "#001812"
                                }
                            }} onClick={handleSubscribeBtn}>{following ? "Unsubscribe" : "Subscribe"}</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default YoutubeProfile;
