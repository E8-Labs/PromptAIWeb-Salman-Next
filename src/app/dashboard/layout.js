import React from 'react';
import SideNav from '../../ui/dashboard/sidenav';
import TopNav from '../../ui/dashboard/topnav';

export default function Layout({ children }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="w-full h-screen flex-col">
        <TopNav />
        <div className="flex flex-col h-full w-full p-0   md:p-0">
          {children}
        </div>
      </div>
    </div>
  );
}