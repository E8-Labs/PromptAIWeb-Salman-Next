'use client'
import Link from 'next/link';
import Image from 'next/image'
// import NavLinks from '@/app/ui/dashboard/nav-links';
// import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
const Logo = '/logo.png'

export default function TopNav() {

    const router = useRouter()

    const [currentUser, setCurrentUser] = useState(null)
    const handleMenuClick = event => {
        console.log(event.currentTarget.id);
        if(event.currentTarget.id == "search"){
            router.push("/dashboard/search")
        }
    }
    

    const loadCurrentUser = useCallback(async () => {
        if (!localStorage.getItem(process.env.REACT_APP_LocalSavedUser)) {
            navigate("/onboarding");
        } else {
            //console.log("User is saved in Dashboard")
            //console.log(process.env.REACT_APP_LocalSavedUser)

            setCurrentUser(

                JSON.parse(
                    localStorage.getItem(process.env.REACT_APP_LocalSavedUser)
                )
            );
            //   loadUsers(currentUser.token);
        }
    });

    useEffect(() => {
        loadCurrentUser()
    }, [])

    return (
        <div className="flex h-50 flex-col px-3 py-2 md:px-2 bg-black">
            <div className="rightdiv min-w-screen w-full flex flex-row justify-end align-center ">
                <div className="nav-item mx-4">
                    <button className="btn text-white" id="search" onClick={handleMenuClick}><i className="fa fa-search"></i></button>
                </div>
                <div className="nav-item mx-4">
                    <button className="btn text-white" id="notifications" onClick={handleMenuClick}><i className="fa fa-bell"></i></button>
                </div>
                <Link href={{
                    pathname: '/dashboard/profile',
                    query: {
                         username: "salman"
                    }
                }}>
                    <Image id="myprofile" src={currentUser ? currentUser.user.profile_image : ""}
                        alt={""} className="rounded-full w-8 h-8 " width={40} height={40} style={{ borderRadius: 20 }}
                        
                    >
                    </Image>
                </Link>
            </div>

        </div>
    );
}
