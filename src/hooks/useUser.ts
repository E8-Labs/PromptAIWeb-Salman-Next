"use client";

import { useRouter } from "next/navigation";

import { Storage } from "@/services";
import React from "react";

export default function useUser(currentUser: any) {
  const localUser = Storage.get(process.env.REACT_APP_LocalSavedUser || "") || "";
  const [user, setCurrentUser] = React.useState<any>();
  const router = useRouter();

  async function loadCurrentUser() {
    if (!Storage.get(process.env.REACT_APP_LocalSavedUser || "")) {
      router.push("/onboarding");
    } else {
      setCurrentUser(JSON.parse(localUser));
    }
  }

  if (currentUser === undefined) {
    loadCurrentUser();
  } else {
    //console.log(currentUser.username)
    //console.log("Current User Obtained " + currentUser.user.email)
    if (currentUser.user.role === null || typeof currentUser.user.role === "undefined") {
      setRole("user");
    } else {
      //console.log("Setting user role " + currentUser.user.role)
      setRole(currentUser.user.role);
    }
  }
}
