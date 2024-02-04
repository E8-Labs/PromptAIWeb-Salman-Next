"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import React from "react";
import axios from "axios";

import { PowerIcon } from "@heroicons/react/24/outline";
import { API_PATH } from "utils/lib/constants";

const dashboardLogo = "/dashboard.svg";
const headphoneIcon = "/headphone.svg";
const privacyIcon = "/privacy.svg";
const termIcon = "/terms.svg";
const Logo = "/logo.png";

type ChatListItemProps = {
  chat: any;
  chatSelected(prompt: any, chat: any): void;
};

// import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import 'bootstrap/dist/css/bootstrap.min.css';

export default function SideNav() {
  const { push } = useRouter();
  const pathname = usePathname();

  const [currentUser, setCurrentUser] = React.useState(null);
  const [chats, setChats] = React.useState([]);

  const loadCurrentUser = async () => {
    if (!localStorage.getItem(process.env.REACT_APP_LocalSavedUser)) {
      push("/onboarding");
    } else {
      //console.log("User is saved in Dashboard")
      //console.log(process.env.REACT_APP_LocalSavedUser)
      let user = JSON.parse(localStorage.getItem(process.env.REACT_APP_LocalSavedUser));
      setCurrentUser(user);
      loadChats(user);
      //   loadUsers(currentUser.token);
    }
  };

  React.useEffect(() => {
    loadCurrentUser();
  }, []);

  const loadChats = async (user: any) => {
    if (user) {
      console.log("Loading messages " + API_PATH.GetChats);
      const config = {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      };
      axios
        .get(API_PATH.GetChats, config)
        .then((data) => {
          console.log("chats api loaded");
          console.log(JSON.stringify(data.data));
          if (data.status) {
            setChats(data.data.data);
          }
          // listViewRef._listRef._scrollRef.scrollToEnd({animated: true});
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      //
    }
  };

  return (
    <div className="flex h-full flex-col px-3 py-1 md:px-2 bg-appgreen">
      <Link
        className="mb-2 flex h-20 items-start justify-start rounded-md  p-4 md:h-40 "
        href="/dashboard"
      >
        <div className=" text-white">
          <Image src={Logo} alt="" width={150} height={100} />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col  md:space-x-0 md:space-y-0 bg-appgreen">
        <div className="bg-appgreen gap-5 w-full">
          <Link
            href="/dashboard"
            className={clsx(
              "flex h-[48px] text-white  grow items-center justify-center gap-2 rounded-md  p-5 text-sm font-medium hover:bg-appgreenlight300 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3 bg-appgreen ",
              pathname === "dashboard" && "bg-appgreenlight700 text-white",
            )}
          >
            <Image
              height={24}
              width={24}
              className="icon w-6"
              alt="Dashboard Logo"
              src={dashboardLogo}
            />
            <span className="hidden md:block">Dashboard</span>
          </Link>
          <Link
            href="/dashboard"
            className="flex h-[48px] text-white  grow items-center justify-center gap-2 rounded-md  p-5 text-sm font-medium hover:bg-appgreenlight300 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3 bg-appgreen "
          >
            <Image
              height={24}
              width={24}
              className="icon w-6"
              alt="Dashboard Logo"
              src={dashboardLogo}
            />
            <span className="hidden md:block">Dashboard</span>
          </Link>
        </div>
        <div className=" flex flex-col h-80 w-full rounded-md md:block overflow-y-scroll">
          {chats.map((item) => {
            return (
              <ChatListItem
                key={item}
                chat={item}
                chatSelected={(prompt: any, chat: any) => {
                  let data = { chatViewVisible: true, newChat: false, prompt: prompt, chat: chat };
                  localStorage.setItem("CURRENTCHAT", JSON.stringify(data));
                  push("/dashboard/chat?chatid=" + chat.id);
                }}
              />
            );
          })}
        </div>
        <div className="bg-appgreen gap-5 w-full">
          <Link
            href="/dashboard/support"
            className={clsx(
              "flex h-[48px] text-white  grow items-center justify-center gap-2 rounded-md  p-5 text-sm font-medium hover:bg-appgreenlight300 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3 bg-appgreen ",
              pathname === "/dashboard/support" && "bg-appgreenlight700 text-white",
            )}
          >
            <Image
              height={24}
              width={24}
              alt="Customer Support Icon"
              className="icon w-6"
              src={headphoneIcon}
            />
            <span className="hidden md:block">Customer Support</span>
          </Link>
          <Link
            href="/dashboard/privacy"
            className={clsx(
              "flex h-[48px] text-white  grow items-center justify-center gap-2 rounded-md  p-5 text-sm font-medium hover:bg-appgreenlight300 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3 bg-appgreen ",
              pathname === "/dashboard/privacy" && "bg-appgreenlight700 text-white",
            )}
          >
            <Image
              height={24}
              width={24}
              alt="Privacy Icon"
              className="icon w-6"
              src={privacyIcon}
            />
            <span className="hidden md:block">Privacy</span>
          </Link>
          <Link
            href="/dashboard/terms"
            className={clsx(
              "flex h-[48px] text-white  grow items-center justify-center gap-2 rounded-md  p-5 text-sm font-medium hover:bg-appgreenlight300 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3 bg-appgreen ",
              pathname === "/dashboard/terms" && "bg-appgreenlight700 text-white",
            )}
          >
            <Image
              height={24}
              width={24}
              alt="Terms & Conditions Icon"
              className="icon w-6"
              src={termIcon}
            />
            <span className="hidden md:block">Terms & Conditions</span>
          </Link>
        </div>
        <form>
          <button
            className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-appgreen p-3 text-sm font-medium hover:bg-appgreen hover:text-white md:flex-none md:justify-start md:p-2 md:px-3"
            onClick={(event) => {
              event.preventDefault();
              console.log("Logout here");
              localStorage.setItem(process.env.REACT_APP_LocalSavedUser, null);
              push("/");
            }}
          >
            <PowerIcon className="w-6" color="white" />
            <div className="hidden md:block text-white">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}

function ChatListItem({ chat, chatSelected }: ChatListItemProps) {
  const p = chat.Prompt;

  const handleClick = () => {
    console.log(p);
    chatSelected(p, chat);
  };

  return (
    // TODO: Replace TouchableOpacity with a div or button as needed
    <div className="flex flex-col bg-transparent py-2 cursor-pointer" onClick={handleClick}>
      <div className="flex flex-row gap-4">
        <Image
          src={p.user.profile_image}
          alt="Profile"
          className="w-8 h-8 rounded-full "
          width={8}
          height={8}
        />
        <div className="flex flex-col  items-start">
          <span className="font-bold text-white text-sm break-words">{p.user.username}</span>
          <span className="font-bold text-white text-xs max-h-16 break-words">{p.title}</span>
        </div>
      </div>
    </div>
  );
}
