import React, { useState } from "react";
import { IoIosMore } from "react-icons/io";
import { HiPlus } from "react-icons/hi2";


import { RiSendPlaneFill } from "react-icons/ri";

import Conversations from "./Conversations";

function ChatSession(){
    interface Message{
        id: number;
        sender: string;
        content: string;
        profilePicture: string;
    }

    const messageArray: Message[] = [
        {id: 2, sender: "Hamza", content: "hey", profilePicture: "./src/assets/8.jpg"},
        {id: 1, sender: "Amine", content: "hello", profilePicture: "./src/assets/8.jpg"},
        {id: 2, sender: "Hamza", content: "how are you", profilePicture: "./src/assets/8.jpg"},
        {id: 1, sender: "Amine", content: "Loreorem ipsum dolor sit amet consectetur adipisicing elit. Unde voluptatibus vel eos non suscipit debitis quaerat laudantium facere eveniet porro? Consectetur consequatur porro repellendus nisi eum laudantium amet numquam accusamus!", profilePicture: "./src/assets/8.jpg"},
    ]
    const [backToMessages, setBackToMessages] = useState<boolean>(false)
    return(

        <div className="bg-[#2B2F32] rounded-lg shadow-xl col-span-9 row-span-12 py-2 lg:py-4 px-1 sm:px-4 lg:px-12  font-poppins flex flex-col justify-between overflow-hidden">
            <div id="conversation-header-container">
                <div id="conversation-header" className="text-white grid grid-cols-4 ">
                        <div id="friend-info" className="col-span-2 flex gap-4 lg:gap-8 items-center">
                            <img src="./src/assets/8.jpg" alt="user-pic" className="h-12 w-12 lg:h-16 lg:w-16 rounded-full" />
                            <div >
                                <p className=" text-md sm:text-lg md:text-xl lg:text-2xl">User User</p>
                                <p className=" text-sm sm:text-md text-gray-400">@user23424</p>
                            </div>
                        </div>
                        <span className="col-span-2 justify-self-end self-center text-4xl m-4 cursor-pointer hover:text-[#5E97A9] focus:text-[#5E97A9] duration-300">
                        <IoIosMore />
                        </span>
                </div>
                <div className="bg-zinc-300 w-[100%] h-[1px] lg:mt-4 rounded-full"></div>
            </div>
            <div className="text-white basis-[85%]  text-xs sm:text-sm lg:text-lg rounded-lg bg-[#404549] overflow-auto p-5 flex flex-col gap-4">
                {
                    messageArray.map((msg, index): React.ReactNode => {
                        return(
                        <div key={index} id='message-container' className={` min-h-[140px] flex ${msg.id === 1 && "justify-end flex-row-reverse self-end"} items-end gap-4 `}>
                            <img src="./src/assets/8.jpg" alt="" className="w-10 h-10 lg:w-12 lg:h-12 rounded-full" />
                            <div id='message' className={`${msg.id !== 1 ? 'bg-[#5E97A9]' : 'bg-slate-800 '}  p-4 rounded-2xl overflow-hidden`}>
                                <p >{msg.content}</p>
                            </div>
                        </div>
                        )

                    })
                }
            </div>
            <div id="conversation-footer-container" className="flex justify-between items-center gap-1 sm:gap-4 ">
                <span className="bg-[#5E97A9] text-white rounded-full hover:bg-white hover:text-[#5E97A9] duration-300 text-2xl md:text-3xl lg:text-4xl basis-[2.5%] cursor-pointer p-0 sm:p-1">
                    <HiPlus/>
                </span>
                <input type="text" placeholder="Message" className=" rounded-full border-1 border-white focus:outline-none  bg-[#404549]  text-sm sm:text-md pl-2 py-2 focus:bg-slate-200  focus:border-black duration-300 basis-[95%]"/>
                <span className="bg-[#5E97A9] text-white rounded-lg hover:bg-white hover:text-[#5E97A9] duration-300 text-2xl md:text-3xl lg:text-4xl basis-[2.5%] cursor-pointer p-0 sm:p-1">
                    <RiSendPlaneFill />
                </span>
            </div>

        </div>
    )
}
export default ChatSession