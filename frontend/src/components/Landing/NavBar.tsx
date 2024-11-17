import React from "react";

const NavBar = () =>{
    return(
        <nav className=" flex justify-between text-white">
          <h1 className="text-4xl font-bold">LOGO</h1>
          <ul className="flex gap-8 text-lg font-semibold ">
            <li className="px-7 sm:px-8 py-2 sm:py-3 text-white/80 opacity-80 duration-75 hover:opacity-100 cursor-pointer">Sign up</li>
            <li className="px-7 sm:px-8 py-2 sm:py-3 bg-[#5E97A9] rounded-md text-white opacity-80 duration-75 hover:opacity-100  cursor-pointer">Login</li>
          </ul>
   
        </nav>
    )
}

export default NavBar