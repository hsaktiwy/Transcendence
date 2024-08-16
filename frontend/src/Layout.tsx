import React, { ReactNode } from 'react';
import NavBar from "./components/NavBar";
import Sidebar from './components/Sidebar';
import SideBarV2 from './components/SideBarV2';
import NavarV2 from './components/NavBarV2';
import NavBarV2 from './components/NavBarV2';
import ChatModal from './components/ChatModal';
import { Toaster, toast } from 'sonner'
import { Outlet } from 'react-router-dom';
interface LayoutProps {
  children: ReactNode;
}

const Layout = () => {
  return (
   
        
          <>
            <Toaster position="top-right" richColors/>
            <SideBarV2/>
            <NavBarV2/>
            <Outlet/>
          {/* {children} */}
          </>
  );
};

export default Layout
