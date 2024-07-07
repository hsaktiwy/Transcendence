import React from "react";

import { IoNotificationsOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { IoIosArrowDropdown } from "react-icons/io";
import { CiMenuBurger } from "react-icons/ci";


function NavBar(){
    return(
        <div className=" bg-[#2B2F32] rounded-lg shadow-xl  col-span-12 lg:col-span-11 row-span-1 grid grid-cols-3 items-center ">
            <span className="text-white col-span-1 lg:hidden  px-8 text-3xl"> <CiMenuBurger/> </span>
            <input type="text" placeholder="Search" className="w-[60%] hidden lg:block justify-self-end col-span-1 rounded-full border-1 border-white focus:outline-none h-[50%] bg-[#404549] pr-4 pl-8 pt-2 pb-2 focus:bg-slate-200  focus:border-black duration-300"/>
            <div className="col-span-2 lg:col-span-1 flex items-center justify-evenly justify-self-center lg:justify-self-end">
                <ul className="flex text-[#FFFFFF] bg-[#404549] text-[2.2rem] rounded-2xl gap-12 lg:gap-4 ">
                    <li className="cursor-pointer lg:pr-3 lg:pl-3"><IoNotificationsOutline /></li>
                    <li className="cursor-pointer lg:pr-3 lg:pl-3"><AiOutlineMessage /></li>
                    <li className="flex gap-1 text-xl items-center cursor-pointer lg:pr-3 lg:pl-3">
                        <img src="./src/assets/8.jpg" alt="user" className=" h-10 w-10 rounded-full" />
                        <IoIosArrowDropdown className="text-xl"/>
                    </li>
                </ul>
            </div>
        </div>
    )

}

export default NavBar