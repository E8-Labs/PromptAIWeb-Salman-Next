import React from 'react';
import SideNav from '../ui/dashboard/sidenav';
import TopNav from '../ui/dashboard/topnav';
// import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import 'bootstrap/dist/css/bootstrap.min.css';

export default function Layout({ children }) {
  return (
    React.createElement("div", { className: "flex h-screen flex-col md:flex-row md:overflow-hidden " },
      React.createElement("div", { className: "w-full flex-none md:w-64" },
        React.createElement(SideNav, null)
      ),
      React.createElement("div", { className: "w-full h-screen flex-col" },
        React.createElement(TopNav, null),
        React.createElement("div", { className: "flex flex-col h-full w-full p-0   md:p-0 " }, children)
      ),
      // React.createElement("div", { className: " flex-none " },
        
      // ),
      
    )
  );
}