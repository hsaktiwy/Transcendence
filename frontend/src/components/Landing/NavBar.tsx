import React from "react";
import { motion } from "framer-motion";

const NavBar = () =>{
    return(
        <motion.nav
          initial={{y: -50, opacity: 0}}
          animate={{y: 0, opacity: 1}}
          className=" flex justify-between text-white z-20 items-center">
          <h1 className="text-4xl font-bold">LOGO</h1>
          <ul className="flex gap-8 text-lg font-medium ">
            <li className="px-7 sm:px-8 py-2 sm:py-3 text-white/80 opacity-80 duration-75 hover:opacity-100 cursor-pointer">Sign up</li>
            <li className="px-7 sm:px-8 py-2 sm:py-3 bg-[#5E97A9] rounded-md text-white opacity-80 duration-75 hover:opacity-100  cursor-pointer">Login</li>
          </ul>
   
        </motion.nav>
    )
}

export default NavBar