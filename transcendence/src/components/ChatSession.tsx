import React, { useContext, useState } from "react";
import {ChatSectionContext, ContextType, Conversation, Message} from "../utils/ChatContext"
import { IoIosMore } from "react-icons/io";
import { HiPlus } from "react-icons/hi2";


import { RiSendPlaneFill } from "react-icons/ri";

import Conversations from "./Conversations";

function ChatSession(){
    const chatContext =useContext(ChatSectionContext)
    if (!chatContext)
     throw new Error('error')
    // interface Message{
    //     id: number;
    //     sender: string;
    //     content: string;
    //     profilePicture: string;
    // }

    // const messageArray: Message[] = [
    //     {id: 2, sender: "Hamza", content: "hey", profilePicture: "./src/assets/8.jpg"},
    //     {id: 1, sender: "Amine", content: "hello", profilePicture: "./src/assets/8.jpg"},
    //     {id: 2, sender: "Hamza", content: "how are you", profilePicture: "./src/assets/8.jpg"},
    //     {id: 1, sender: "Amine", content: "Loreorem ipsum dolor sit amet consectetur adipisicing elit. Unde voluptatibus vel eos non suscipit debitis quaerat laudantium facere eveniet porro? Consectetur consequatur porro repellendus nisi eum laudantium amet numquam accusamus!", profilePicture: "./src/assets/8.jpg"},
    //     {id: 2, sender: "Hamza", content: "Loreorem ipsum dolor sit amet consectetur adipisicing elit. Unde voluptatibus vel eos non suscipit debitis quaerat laudantium facere eveniet porro? Consectetur consequatur porro repellendus nisi eum laudantium amet numquam accusamus!", profilePicture: "./src/assets/8.jpg"},
    //     {id: 1, sender: "Amine", content: "Loreorem ipsum dolor sit amet consectetur adipisicing elit. Unde voluptatibus vel eos non suscipit debitis quaerat laudantium facere eveniet porro? Consectetur consequatur porro repellendus nisi eum laudantium amet numquam accusamus!", profilePicture: "./src/assets/8.jpg"},

    // ]
    const messageArray: Message[] = chatContext.active.messages 
    const [backToMessages, setBackToMessages] = useState<boolean>(false)
    return(

        <div className="bg-[#2B2F32] animate-fade-down rounded-lg shadow-xl col-span-10 lg:col-span-9 row-span-12 py-2 lg:py-4 px-1 sm:px-4 lg:px-12  font-poppins flex flex-col justify-between overflow-hidden">
            <div id="conversation-header-container">
                <div id="conversation-header" className="text-white grid grid-cols-4 ">
                        <div id="friend-info" className="col-span-2 flex gap-4 lg:gap-8 items-center">
                            <img src={`${chatContext.active.user2.profilePic}`} alt="user-pic" className="w-8 h-8 sm:w-10 sm:h-10 md:h-12 md:w-12 lg:h-16 lg:w-16 rounded-full" />
                            <div >
                                <p className=" text-sm sm:text-lg md:text-xl lg:text-2xl">{chatContext.active.user2.firstName + " " + chatContext.active.user2.lastName}</p>
                                <p className=" text-xs sm:text-md text-gray-400">{`@${chatContext.active.user2.username}`}</p>
                            </div>
                        </div>
                        <span className="col-span-2 justify-self-end self-center text-sm sm:text-lg md:text-xl lg:text-xl m-4 cursor-pointer hover:text-[#5E97A9] focus:text-[#5E97A9] duration-300">
                        <IoIosMore />
                        </span>
                </div>
                <div className="bg-zinc-300 w-[100%] h-[1px] lg:mt-4 rounded-full"></div>
            </div>
            <div className="text-white basis-[85%]  text-xs sm:text-sm lg:text-base rounded-lg bg-[#404549]  p-3 sm:p-5 flex flex-col gap-4 overflow-auto ">
                {
                    messageArray.map((msg, index): React.ReactNode => {
                        return(
                        <div key={index} id='message-container' className={`min-h-[180px]  max-h-[187px] flex ${msg.sender.id === 1 && "justify-end flex-row-reverse self-end"} items-end gap-4 `}>
                            <img src={`${msg.sender.profilePic}`} alt="" className="hidden sm:block w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full" />
                            <div id='message' className={`${msg.sender.id !== 1 ? 'bg-[#5E97A9]' : 'bg-slate-800 '}  p-4 rounded-2xl max-h-[100%] overflow-y-auto overflow-x-hidden`}>
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