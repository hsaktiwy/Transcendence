import React, { useState } from "react";

import { IoNotificationsOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { IoIosArrowDropdown } from "react-icons/io";
import { CiMenuBurger } from "react-icons/ci";
import { IoMenuSharp } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import Sidebar from "./Sidebar";
import { RiHome5Line } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { PiPingPong } from "react-icons/pi";
import { PiPingPongLight } from "react-icons/pi";
import { IoLogOutOutline } from "react-icons/io5";

function NavBar(){
    const [open, setOpen] = useState<boolean>(false)
    return(
       <>
        <div className=" rounded-lg shadow-xl w-[100%] h-[80px] flex justify-center items-center gap-8 overflow-hidden invisible">
            <span className="text-white text-4xl basis-[5%] lg:hidden px-4" onClick={() => {setOpen(!open)}}> {!open ? <IoMenuSharp/> : <IoCloseSharp/>} </span>
            <div className=" basis-[55%] lg:basis-[75%] flex justify-center">
                <input type="text" placeholder="Search" className=" w-[50%] rounded-full border-1 border-white focus:outline-none  bg-[#404549] pr-4 pl-8 pt-2 pb-2 focus:bg-slate-200  focus:border-black duration-300"/>
            </div>
            {/* <div className="flex items-center justify-evenly justify-self-center lg:justify-self-end "> */}
            <div id="nav-menu" className=" basis-[35%] lg:basis-[20%] rounded-full bg-[#404549] text-white flex items-center text-4xl justify-around gap-4">
                <span>
                    <IoNotificationsOutline/>
                </span>
                <span className="hidden sm:inline">
                    <AiOutlineMessage/>
                </span>
                <div className="basis-16">
                    <img src="./src/assets/8.jpg" alt="user-pic" className=" w-8 h-8 lg:w-9 lg:h-9 object-center rounded-full"/>
                </div>
            </div>
            {/* </div> */}
        </div>
        <div className={` bg-[rgba(0,0,0,0.7)] lg:bg-[#404549] text-white font-poppins h-[calc(100vh-80px)] w-screen lg:w-[120px]   top-[80px] transition ease-in duration-200 ${open ? " translate-x-[0%]" : "translate-x-[-110%] "} lg:translate-x-[0%] absolute  flex flex-col invisible`}>
            <div>
                logo
            </div>
            {/* <div className="basis-[15%] ">
                LOGO
            </div>
            <ul className="basis-[70%]  flex flex-col justify-around items-center text-3xl">
                <li className=" w-full  flex justify-center items-center gap-8 p-4">
                    <span><RiHome5Line/></span>
                    <span> Home</span>
                </li >
                <li className="w-full  flex justify-center items-center gap-8 p-4">
                    <span><FaRegUser/></span>
                    <span> Profile</span>
                </li>
                <li className="w-full  flex justify-center items-center gap-8 p-4">
                    <span><PiPingPong /></span>
                    <span> Game</span>
                </li>
            </ul>
            <div className="basis-[15%] text-3xl flex justify-center items-end gap-8 p-4">
                <span className="text-4xl">
                    <IoLogOutOutline/>
                </span>
                <span>Log out</span>
            </div> */}
        </div>
       </>
       
    )

}

export default NavBar