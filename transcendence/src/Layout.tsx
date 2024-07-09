import React, { ReactNode } from 'react';
import NavBar from "./components/NavBar";
import Sidebar from './components/Sidebar';
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="bg-black w-screen h-screen  relative">
      <NavBar/>
      {children}
    </div>
  );
};

export default Layout
