'use client'
import React, {useEffect, useState, useCallback} from 'react'
import { useRouter } from 'next/navigation'
import ProfileBaseView from '@/app/ui/profile/Profile';

function page() {

const [user, setUser] = useState(null)
    // const router = useRouter()
    // const data = router.query;
    // console.log("data on profile ", data)

    const loadCurrentUser = useCallback(async () => {
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
      });

      useEffect(()=>{
        loadCurrentUser()
      }, [])


    
  return (
    <div>
      {
        user != null &&(
            <ProfileBaseView  user={user}/>
        )
    }
    {
        user == null &&(
            <div> Loading Profile ...</div>
        )
    }
    </div>
    
  )
}

export default page
