import React, { ReactNode } from 'react';
import NavBar from "./components/NavBar";
import Sidebar from './components/Sidebar';
import SideBarV2 from './components/SideBarV2';
import NavarV2 from './components/NavBarV2';
import NavBarV2 from './components/NavBarV2';
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className=" w-full h-full relative bg-[#131313] ">
        {/* <div className='absolute top-0 left-0 h-full w-full  bg-black backdrop-filter backdrop-blur-sm opacity-30'></div> */}
        {/* <NavBar/> */}
       
            {/* <SideBarV2/>
            <NavBarV2/> */}
          {children}
    </div>
  );
};

export default Layout
