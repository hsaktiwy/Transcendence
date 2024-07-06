import React from "react";

import { IoNotificationsOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";


function NavBar(){
    return(
        <div className=" rounded-lg shadow-xl col-span-11 row-span-1 flex justify-end items-center gap-36">
            <input type="text" placeholder="Search" className="rounded-full border-1 border-white focus:outline-none h-[50%] bg-[#404549] pr-4 pl-8 pt-2 pb-2 focus:bg-slate-200  focus:border-black duration-300 w-[40%]"/>
            <div className="w-[40%] h-[100%] flex items-center justify-evenly">
                <ul className="flex text-[#aca8a8] bg-[#404549] text-[2.5rem] rounded-lg gap-8 p-2">
                    <li><IoNotificationsOutline /></li>
                    <li><AiOutlineMessage /></li>
                    <li></li>
                </ul>
            </div>
        </div>
    )

}

export default NavBar