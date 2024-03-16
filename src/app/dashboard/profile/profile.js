'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import ProfileBaseView from '../../../ui/profile/Profile';

export default function Profile () {
    const [user, setUser] = useState(null)
    // const router = useRouter()
    // const data = router.query;
    // console.log("data on profile ", data)
  
    const loadCurrentUser = async () => {
      if (typeof localStorage !== 'undefined') {
        if (!localStorage.getItem(process.env.REACT_APP_LocalSavedUser)) {
          //   navigate("/onboarding");
        } else {
          //console.log("User is saved in Dashboard")
          //console.log(process.env.REACT_APP_LocalSavedUser)
          setUser(
            JSON.parse(
              localStorage.getItem(process.env.REACT_APP_LocalSavedUser)
            )
          );
          //   loadUsers(currentUser.token);
        }
      }
    };

    useEffect(() => {
      loadCurrentUser()
    }, [])

    return (
      <div className='flex h-full w-full'>
        {
          user != null && (
            <ProfileBaseView user={user} />
          )
        }
        {
          user == null && (
            <div> Loading Profile ...</div>
          )
        }
      </div>
    )
}