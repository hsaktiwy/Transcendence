import React, { useState } from "react";
import { IoIosMore } from "react-icons/io";
import { HiPlus } from "react-icons/hi2";


import { RiSendPlaneFill } from "react-icons/ri";
import { IoArrowBackSharp } from "react-icons/io5";
import Conversations from "./Conversations";

function ChatSession(){

    const [backToMessages, setBackToMessages] = useState<boolean>(false)
    return(

        <div className="bg-[#2B2F32] rounded-lg shadow-xl col-span-10  lg:col-span-9 row-span-12 pt-4 pb-4 pr-12 pl-12 font-poppins flex flex-col justify-between overflow-hidden">
            <div id="conversation-header-container">
            <div id="conversation-header" className="text-white grid grid-cols-4 ">
                    <div id="friend-info" className="col-span-2 flex gap-8">
                        <span  className="inline-block text-4xl self-center lg:hidden cursor-pointer hover:text-[#5E97A9] duration-300"><IoArrowBackSharp/></span>
                        <img src="./src/assets/8.jpg" alt="user-pic" className="h-16 w-16 rounded-full" />
                        <div className="self-center hidden sm:block">
                            <p className="text-xl lg:text-2xl">User User</p>
                            <p className="text-md text-gray-400">@user23424</p>
                        </div>
                    </div>
                    <IoIosMore className="col-span-2 justify-self-end self-center text-4xl m-4 cursor-pointer hover:text-[#5E97A9] focus:text-[#5E97A9] duration-300"/>
                </div>
                <div className="bg-zinc-300 w-[100%] h-[1px] mt-4 rounded-full"></div>
            </div>
            <div className="text-white basis-[85%]  rounded-lg bg-[#404549]">
                
            </div>
            <div id="conversation-footer-container" className="flex justify-between items-center gap-4">
                <span>
                    <HiPlus className="bg-[#5E97A9] text-white rounded-full hover:bg-white hover:text-[#5E97A9] duration-300 text-5xl basis-[2.5%] cursor-pointer"/>
                </span>
                <input type="text" placeholder="Message" className=" rounded-full border-1 border-white focus:outline-none  bg-[#404549] pr-4 pl-8 pt-2 pb-2 focus:bg-slate-200  focus:border-black duration-300 basis-[95%]"/>
                <span>
                    <RiSendPlaneFill className="bg-[#5E97A9] text-white rounded-lg hover:bg-white hover:text-[#5E97A9] duration-300 text-5xl basis-[2.5%] cursor-pointer"/>
                </span>
            </div>

        </div>
    )
}
export default ChatSession