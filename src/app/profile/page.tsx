"use client";

import { useRouter } from "next/navigation";
import React from "react";

import ProfileBaseView from "@/components/profile/Profile";

export default function Page() {
  const router = useRouter();
  const savedUser = process.env.REACT_APP_LocalSavedUser || "";

  const [user, setUser] = React.useState<any>(null);

  const loadCurrentUser = async () => {
    const localUser = localStorage.getItem(savedUser);

    if (!localUser) {
      router.push("/login");
    } else {
      setUser(JSON.parse(localUser));
    }
  };

  // TODO: Hook to load the current user
  React.useEffect(() => {
    loadCurrentUser();
  }, []);

  return (
    <div className="flex h-full w-full">
      {user ? <ProfileBaseView defaultUser={user} /> : <div> Loading Profile ...</div>}
    </div>
  );
}
