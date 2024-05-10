'use client'
import Link from 'next/link';
import Image from 'next/image'
import { NavSideLinks, NavSideLinks2 } from '../../ui/dashboard/nav-links';
// import NavSideLinks
// import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ApiPath from '@/app/lib/ApiPath';
import axios from 'axios';
import { Divider } from '@mui/material';
const Logo = '/logo.png'

// import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import 'bootstrap/dist/css/bootstrap.min.css';

export default function SideNav() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState(null)
  const [chats, setChats] = useState([])
  const handleMenuClick = event => {
    //console.log(event.currentTarget.id);
  }


  const loadCurrentUser = async () => {
    if (typeof localStorage !== 'undefined') {
      if (!localStorage.getItem(process.env.REACT_APP_LocalSavedUser)) {
        navigate("/onboarding");
      } else {
        ////console.log("User is saved in Dashboard")
        ////console.log(process.env.REACT_APP_LocalSavedUser)
        let user = JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LocalSavedUser)
        )
        setCurrentUser(
          user
        );
        loadChats(user)
        //   loadUsers(currentUser.token);
      }
    }
  };

  useEffect(() => {
    loadCurrentUser()

    const handleEvent = (data) => {
      //console.log('Event data:', data);
    };
    window.addEventListener("newChat", (event) => {
      // Execute the callback function, passing the event's detail as an argument
      //console.log("Event Received Side Nav", event.detail)
      var user = null
      if (typeof localStorage !== 'undefined') {
        user = JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LocalSavedUser)
        )
      }
      loadChats(user)
    });
    // Register the event listener
    // listenToEvent('myCustomEvent', handleEvent);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('newChat', handleEvent);
    };
  }, [])


  const loadChats = async (user) => {

    if (user) {
      //console.log("Loading messages " + ApiPath.GetChats)
      const config = {
        headers: {
          "Authorization": "Bearer " + user.token,
        }
      };
      axios.get(ApiPath.GetChats, config).then(data => {
        //console.log("chats api loaded")
        //console.log(JSON.stringify(data.data))
        if (data.status) {
          setChats(data.data.data)
        }
        // listViewRef._listRef._scrollRef.scrollToEnd({animated: true});
      }).catch(error => {
        //console.log(error)
      })
    }
    else {
      //
    }
  }

  return (
    <div className="flex h-full flex-col px-3 py-1 md:px-2 bg-appgreen">

      <Link
        className="mb-1 flex h-20 items-start justify-start rounded-md  p-4 md:h-40 "
        href="/dashboard"
      >
        <div className=" text-white">
          {/* <AcmeLogo /> */}
          <Image src={Logo} width={150} height={100}></Image>
        </div>
      </Link>
      <div className=" flex grow flex-row justify-start space-x-2 md:flex-col  md:space-x-0 md:space-y-0 bg-appgreen">
        <NavSideLinks />
        {/* We can have below div to show list of chats */}
        <div className=" flex flex-col h-80 w-full rounded-md md:block overflow-y-scroll ">
          {
            chats.map((item, index) => {
              return (
                <ChatListSingleItem key={item.id} chat={item} chatSelected={(prompt, chat) => {
                  let data = { chatViewVisible: true, newChat: false, prompt: prompt, chat: chat }
                  if (typeof localStorage !== 'undefined') {
                    localStorage.setItem("CURRENTCHAT", JSON.stringify(data))
                  }
                  router.push("/dashboard/chat?chatid=" + chat.id)
                  // router.push("/");
                }} />
              )
            })
          }
        </div>
        {/* <NavSideLinks2 /> */}
        {/* <form>
          <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-appgreen p-3 text-sm font-medium hover:bg-appgreen hover:text-white md:flex-none md:justify-start md:p-2 md:px-3"
            onClick={(event) => {
              event.preventDefault()
              //console.log("Logout here")
              if (typeof localStorage !== 'undefined') {
                localStorage.setItem(process.env.REACT_APP_LocalSavedUser, null)
              }
              router.push("/");
            }}
          >
            <PowerIcon className="w-6" color="white" />
            <div className="hidden md:block text-white">Sign Out</div>
          </button>
        </form> */}
      </div>
    </div>
  );
}




function ChatListSingleItem(props) {
  const chat = props.chat;
  //console.log("-----Chat prop-------");
  //console.log(chat);
  const p = chat.Prompt;

  const handleClick = (event) => {
    //console.log(p);
    props.chatSelected(p, chat);
  };

  return (
    // Replace TouchableOpacity with a div or button as needed
    <div className="flex flex-col bg-transparent py-2 cursor-pointer" onClick={handleClick}>
      {/* <div className="bg-[#ffffff00] mx-2.5 rounded-full h-30 w-full p-4 gap-4 justify-between" style={{ width: 'screenWidth' }}> */}
      <div className="flex flex-row gap-4">
        <Image src={p.user.profile_image} alt="Profile" className="w-8 h-8 rounded-full " width={8} height={8} />
        <div className="flex flex-col  items-start">
          <span className="font-bold text-white text-sm break-words">{p.user.username}</span>
          <span className="font-bold text-white text-xs max-h-16 break-words">{p.title}</span>
        </div>

      </div>
      {/* <div className='w-full bg-[#ffffff33] my-2' style={{ height: '2px' }} > </div> */}
      {/* </div> */}
    </div>
  );
}
