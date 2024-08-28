import React, { ReactNode, useContext } from 'react';
import NavBar from "./components/NavBar";
import Sidebar from './components/Sidebar';
import SideBarV2 from './components/SideBarV2';
import NavarV2 from './components/NavBarV2';
import NavBarV2 from './components/NavBarV2';
import ChatModal from './components/ChatModal';
import { Toaster, toast } from 'sonner'
import { Outlet } from 'react-router-dom';
import { UserContext } from "./components/UserContext";
import NotificationToast from './components/NotificationToast';
interface LayoutProps {
  children: ReactNode;
}

const Layout = () => {
  const userContextConsumer = useContext(UserContext)
  if (!userContextConsumer)
   throw new Error("userContext must be used within a UserProvider");
  return (
   
        
          <>
            
            
            <Toaster position="top-right" richColors expand={true}  closeButton={true} toastOptions={{
              className: "bg-black/50 backdrop-filter backdrop-blur-sm text-white "
            }}/>
            <SideBarV2/>
            <NavBarV2/>
            {userContextConsumer.newNotification.length > 0 && <NotificationToast items={userContextConsumer.newNotification}/>}
            {/* <NotificationToast items={userContextConsumer.notifications}/> */}
            <Outlet/>
          {/* {children} */}
          </>
  );
};

export default Layout
