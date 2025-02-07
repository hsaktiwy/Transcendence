import  { useContext} from 'react';


import SideBarV2 from './components/SideBarV2';

import NavBarV2 from './components/NavBarV2';


import { Outlet } from 'react-router-dom';
import { UserContext } from "./components/UserContext";
import NotificationToast from './components/NotificationToast';
import { AuthContext } from './components/AuhtenticationContext';



const Layout = () => {
  const userContextConsumer = useContext(UserContext)
  const AuthContextConsummer = useContext(AuthContext)
  if (!userContextConsumer)
   throw new Error("userContext must be used within a UserProvider");
  if (!AuthContextConsummer)
    throw new Error("error")

  return (
   
        
          <>
            
            
            {/* <Toaster position="top-right" richColors expand={true}  closeButton={true} toastOptions={{
              className: "bg-black/50 backdrop-filter backdrop-blur-sm text-white "
            }}/> */}
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
