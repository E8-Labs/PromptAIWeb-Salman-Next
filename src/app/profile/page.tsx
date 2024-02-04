"use client";

import React from "react";

import ProfileBaseView from "app/ui/profile/Profile";

function Page() {
  const savedUser = process.env.REACT_APP_LocalSavedUser || "";

  const [user, setUser] = React.useState(null);
  const loadCurrentUser = async () => {
    const localUser = localStorage.getItem(savedUser);

    if (!localUser) {
      //   navigate("/onboarding");
    } else {
      //console.log("User is saved in Dashboard")
      //console.log(process.env.REACT_APP_LocalSavedUser)

      setUser(JSON.parse(localUser));
    }
  };

  React.useEffect(() => {
    loadCurrentUser();
  }, []);

  return (
    <div className="flex h-full w-full">
      {user != null && <ProfileBaseView user={user} />}
      {user == null && <div> Loading Profile ...</div>}
    </div>
  );
}

export default Page;
