'use client';

import { usePathname } from 'next/navigation';

import Link from 'next/link';
import clsx from 'clsx';
// import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import 'bootstrap/dist/css/bootstrap.min.css';



const dashboardLogo = '/dashboard.svg';
const userIcon = '/user-icon.svg';
const headphoneIcon = '/headphone.svg';
const usersIcon = '/users.svg';
// const privacyIcon = '/privacy.svg';
// const termIcon = '/terms.svg';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Dashboard', href: '/dashboard', icon: dashboardLogo },
  {
    name: 'ChatGpt',
    href: '/dashboard',
    icon: userIcon,
  },
  
];

 function NavSideLinks() {

  const pathName = usePathname();
  console.log("Pathname is ", pathName)

  return (
    <div className='bg-appgreen gap-5 w-full'>
      {links.map((link, index) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name + index}
            href={{
              pathname: link.href,
              
            }}
            className={clsx(
              'flex h-[48px] text-white  grow items-center justify-center gap-2 rounded-md  p-5 text-sm font-medium hover:bg-appgreenlight300 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3 bg-appgreen ',
              {
                'bg-appgreenlight700 text-white': (pathName === link.href && link.name != "ChatGpt"),
              },
            )}
          >
            {/* <LinkIcon className="w-6" /> */}
            <img className="icon w-6" src={link.icon}></img>
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </div>
  );
}


const links2 = [
  // { name: 'Dashboard', href: '/dashboard', icon: dashboardLogo },
  
  { name: 'Customer Support', href: '/dashboard/support', icon: headphoneIcon },
  // { name: 'Community Forums', href: '/dashboard/community', icon: headphoneIcon },
  // { name: 'Privacy Policy', href: '/dashboard/privacy', icon: privacyIcon },
  // { name: 'Terms & Conditions', href: '/dashboard/terms', icon: termIcon },
  
];
function NavSideLinks2() {

  const pathName = usePathname();
  console.log("Pathname is ", pathName)

  return (
    <div className='bg-appgreen gap-5 w-full'>
      {links2.map((link, index) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name + index}
            href={{
              pathname: link.href,
              
            }}
            className={clsx(
              'flex h-[48px] text-white  grow items-center justify-center gap-2 rounded-md  p-5 text-sm font-medium hover:bg-appgreenlight300 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3 bg-appgreen ',
              {
                'bg-appgreenlight700 text-white': pathName === link.href,
              },
            )}
          >
            {/* <LinkIcon className="w-6" /> */}
            <img className="icon w-6" src={link.icon}></img>
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </div>
  );
}


export {NavSideLinks, NavSideLinks2}