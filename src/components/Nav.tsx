"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { IconButton } from "@mui/material";

import Icons from "@/utils/Icons";

export default function TopNav() {
  const router = useRouter();

  const [currentUser, setCurrentUser] = React.useState<any>(null);
  const handleMenuClick = (event: React.MouseEvent) => {
    console.log(event.currentTarget.id);
    if (event.currentTarget.id == "search") {
      router.push("/dashboard/search");
    }
  };

  // TODO: Wrap this in a hook useLocalUser
  const loadCurrentUser = async () => {
    if (!localStorage.getItem(process.env.REACT_APP_LocalSavedUser)) {
      router.push("/onboarding");
    } else {
      //console.log("User is saved in Dashboard")
      //console.log(process.env.REACT_APP_LocalSavedUser)

      setCurrentUser(JSON.parse(localStorage.getItem(process.env.REACT_APP_LocalSavedUser)));
      //   loadUsers(currentUser.token);
    }
  };

  React.useEffect(() => {
    loadCurrentUser();
  }, []);

  return (
    <div className="flex h-50 flex-col px-3 py-2 md:px-2 bg-appgreen">
      <div className="rightdiv min-w-screen w-full flex flex-row justify-end items-center ">
        <div className="nav-item ">
          <IconButton id="search" onClick={handleMenuClick} sx={{ color: "white" }}>
            <Icons.SearchIcon />
          </IconButton>
        </div>
        <div className="nav-item ">
          <IconButton id="notifications" onClick={handleMenuClick} sx={{ color: "white" }}>
            <Icons.NotificationsNoneIcon />
          </IconButton>
        </div>
        <Link
          href={{
            pathname: "/dashboard/profile",
            query: {
              username: "salman",
            },
          }}
        >
          <Image
            id="myprofile"
            src={currentUser ? currentUser.user.profile_image : ""}
            alt={""}
            className="rounded-full w-8 h-8 "
            width={40}
            height={40}
            style={{ borderRadius: 20 }}
          />
        </Link>
      </div>
    </div>
  );
}
