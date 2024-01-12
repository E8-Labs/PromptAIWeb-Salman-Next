'use client';


import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';


import { usePathname } from 'next/navigation';

import Link from 'next/link';
import clsx from 'clsx';


import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
const dashboardLogo = '/dashboard.svg';
const userIcon = '/user-icon.svg';
const headphoneIcon = '/headphone.svg';
const usersIcon = '/users.svg';
const privacyIcon = '/privacy.svg';
const termIcon = '/terms.svg';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Dashboard', href: '/dashboard', icon: dashboardLogo },
  {
    name: 'ChatGpt',
    href: '/dashboard/invoices',
    icon: userIcon,
  },
  { name: 'Customer Support', href: '/dashboard/support', icon: headphoneIcon },
  { name: 'Community Forums', href: '/dashboard/community', icon: headphoneIcon },
  { name: 'Privacy Policy', href: '/dashboard/privacy', icon: privacyIcon },
  { name: 'Terms & Conditions', href: '/dashboard/terms', icon: termIcon },
];

export default function NavLinks() {

  const pathName = usePathname();
  console.log("Pathname is ", pathName)

  return (
    <div className='bg-black gap-5'>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={{
              pathname: link.href,
              
            }}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md  p-5 text-sm font-medium hover:bg-appgreen hover:text-white md:flex-none md:justify-start md:p-2 md:px-3 bg-black',
              {
                'bg-red text-white': pathName === link.href,
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
