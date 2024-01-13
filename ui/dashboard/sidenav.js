'use client'
import Link from 'next/link';
import Image from 'next/image'
import NavLinks from '../../ui/dashboard/nav-links';
// import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
const Logo = '/logo.png'

export default function SideNav() {
const router = useRouter()
    const [currentUser, setCurrentUser] = useState(null)
    const handleMenuClick = event => {
        console.log(event.currentTarget.id);
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

      useEffect(()=>{
        loadCurrentUser()
      }, [])

  return (
    <div className="flex h-full flex-col px-3 py-1 md:px-2 bg-black">
        
      <Link
        className="mb-2 flex h-20 items-start justify-start rounded-md  p-4 md:h-40 "
        href="/dashboard"
      >
        <div className=" text-white">
          {/* <AcmeLogo /> */}
          <Image src={Logo} width={150} height={100}></Image>
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col  md:space-x-0 md:space-y-2 bg-black">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md md:block bg-black"></div>
        <form>
          <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-black p-3 text-sm font-medium hover:bg-appgreen hover:text-white md:flex-none md:justify-start md:p-2 md:px-3"
            onClick={(event)=>{
              event.preventDefault()
              console.log("Logout here")
              localStorage.setItem(process.env.REACT_APP_LocalSavedUser, null)
              router.push("/");
            }}
          >
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
