'use client'
import Link from 'next/link';
import Image from 'next/image'
import { usePathname } from 'next/navigation';
// import NavLinks from '@/app/ui/dashboard/nav-links';
// import AcmeLogo from '@/app/ui/acme-logo';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// import { IconButton } from '@mui/material';
// import Icons from '@/app/lib/Icons';
import SearchBar from '../prompt/Searchbar';
const Logo = '/logo.png'
import {
    Backdrop, CircularProgress, Menu, MenuItem, Drawer, Box, Icon,
    Divider, Autocomplete, Chip, Button, Stack, IconButton, createTheme
} from '@mui/material';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import Icons from '@/app/lib/Icons';

export default function TopNav(props) {

    const router = useRouter()
    const pathname = usePathname();



    //rough code written previously
    const [currentUser, setCurrentUser] = useState(null)
    const handleMenuClick = event => {
        console.log(event.currentTarget.id);
        if (event.currentTarget.id == "search") {
            router.push("/dashboard/search")
        }
    }


    //check if path matches /dashboard
    const isDashboard = pathname == '/dashboard';
    console.log('Path is', pathname)
    console.log('Path to show is', isDashboard)

    // Check if the current path matches /dashboard/search
    const isDashboardSearch = pathname == '/dashboard/search';
    console.log('pathname is', pathname)
    console.log('shouldShow is', isDashboardSearch)


    //code for search bar
    const handleTextChange = (e) => {
        props.textChanged(e.target.value)
    }
    const [searchBar, setsearchBar] = useState(null)
    const handleSearch = event => {
        console.log(event.currentTarget.id);
        if (event.currentTarget.id == "search") {
            router.push("/dashboard/search")
            setsearchBar(<div><SearchBar /></div>)
        }
    }

    //code for icons starts here
    const starIcon = (
        <Icon>
            <img alt="all" src="/assets/star.svg" />
        </Icon>
    );
    const createdIcon = (
        <Icon>
            <img alt="all" src="/assets/created.svg" />
        </Icon>
    );
    //code for icons ends here

    const loadCurrentUser = async () => {
        if (typeof localStorage !== 'undefined') {
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
                //loadUsers(currentUser.token);
            }
        }
    };

    useEffect(() => {
        loadCurrentUser()
    }, [])


    //code for broadcasting event

    function broadcastEvent(eventName, navSelected) {
        // Create a custom event with the specified name and detail
        const event = new CustomEvent(eventName, { detail: navSelected });
        // Dispatch the event on the window object, making it available throughout the application
        window.dispatchEvent(event);
        console.log("Event broadcasted from ChatView ", eventName)
    }


    //code for stack buttons background color
    const [focusedButton, setFocusedButton] = useState("all"); // Set initial state to 1

    const handleFocus = (buttonNumber) => {
        setFocusedButton(buttonNumber);
    };

    return (
        <div className="flex h-50 flex-col px-3 py-2 md:px-2 bg-appgreen">
            <div className="rightdiv min-w-screen w-full flex flex-row justify-end items-center ">

                {/* Test code for stack buttons */}

                {/* Code for searchbar */}

                {isDashboardSearch && (
                    <div className='w-full flex justify-center'>
                        <SearchBar />
                    </div>
                )
                }

                {/*  */}


                {/* Path for stackbuttons */}
                {isDashboard && (
                    <div className='w-full'>
                        <Stack direction={'row'} className='gap-3'>
                            <Button className='rounded-xl p-2 px-6' variant="contained" startIcon={starIcon} style={{
                                backgroundColor: focusedButton === "all" ? '#00C28C10' : '#FFAD0E00',
                                fontSize: "14px",
                                fontWeight: 600
                            }} onClick={(e) => {
                                broadcastEvent("navMenuSelected", "All")
                            }}
                                onFocus={() => handleFocus("all")}
                            >
                                All
                            </Button>

                            <Button className='rounded-xl p-2 px-6' variant="contained" startIcon={<TurnedInIcon />} style={{
                                backgroundColor: focusedButton === "saved" ? '#00C28C10' : '#FFAD0E00',
                                fontSize: "14px",
                                fontWeight: 600
                            }} onClick={(e) => {
                                broadcastEvent("navMenuSelected", "Saved")
                            }}
                                onFocus={() => handleFocus("saved")}
                            >
                                Saved
                            </Button>

                            <Button className='rounded-xl p-2 px-6' variant="contained" startIcon={createdIcon} style={{

                                backgroundColor: focusedButton === "created" ? '#00C28C10' : '#FFAD0E00',
                                fontSize: "14px",
                                fontWeight: 600,
                            }} onClick={(e) => {
                                broadcastEvent("navMenuSelected", "Created")
                            }}
                                onFocus={() => handleFocus("created")}
                            >
                                Created
                            </Button>
                        </Stack>
                    </div>
                )}


                <div className="nav-item ">
                    {/* <button className="btn text-white" id="search" onClick={handleMenuClick}><i className="fa fa-search"></i></button> */}
                    {!isDashboardSearch && (
                        <IconButton id="search" color='white' onClick={handleSearch} sx={{ color: 'white' }}>
                            <Icons.SearchIcon />
                        </IconButton>
                    )
                    }
                </div>
                <div className="nav-item ">
                    {/* <button className="btn text-white" id="notifications" onClick={handleMenuClick}><i className="fa fa-bell"></i></button> */}
                    <IconButton id="notifications" color='white' onClick={handleMenuClick} sx={{ color: 'white' }}>
                        <Icons.NotificationsNoneIcon />
                    </IconButton>
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
