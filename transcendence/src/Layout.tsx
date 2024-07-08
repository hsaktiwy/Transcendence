import React, { ReactNode } from 'react';
import NavBar from "./components/NavBar";
import Sidebar from './components/Sidebar';
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="bg-black w-screen h-screen  p-4 relative">
      <NavBar/>

    </div>
  );
};

export default Layout
