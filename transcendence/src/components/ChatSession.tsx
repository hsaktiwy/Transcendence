import React, { useContext, useState } from "react";
import {ChatSectionContext, ContextType, Conversation, Message} from "../utils/ChatContext"
import { IoIosMore } from "react-icons/io";
import { HiPlus } from "react-icons/hi2";


import { RiSendPlaneFill } from "react-icons/ri";
import { IoArrowBackOutline } from "react-icons/io5";
import { IoMdInformationCircleOutline } from "react-icons/io";

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

        <div className={`bg-[url('https://e1.pxfuel.com/desktop-wallpaper/141/941/desktop-wallpaper-wide-q-gothic-gothic-background.jpg')] bg-cover bg-no-repeat animate-fade-down rounded shadow-xl    font-poppins flex flex-col justify-between overflow-hidden absolute right-0 ${chatContext.activeSectionOnSm === 'chat' ? 'w-[100%]' : 'w-0'} lg:w-[70%] xl:w-[78%] h-full transition-all duration-800 
        `}>
            <div id="conversation-header-container" className="">
                <div id="conversation-header" className="text-white grid grid-cols-4 px-4">
                        <div id="friend-info" className="col-span-3 flex gap-2 sm:gap-4 lg:gap-8 items-center cursor-pointer">
                            <span className="inline-block lg:hidden text-[24px] mx-2 my-4 sm:m-4 cursor-pointer hover:text-[#5E97A9] focus:text-[#5E97A9] duration-300" onClick={() =>{
                                chatContext.setActiveSection('conversations')
                            }}>
                            <IoArrowBackOutline />
                            </span>
                            <img src={`${chatContext.active.user2.profilePic}`} alt="user-pic" className="w-[46px] h-[46px] rounded-full cursor-pointer" onClick={()=>{
                                chatContext.setShowProfile(true)
                            }}/>
                            <div className="cursor-pointer" onClick={()=>{
                                chatContext.setShowProfile(true)
                            }}>
                                <p className=" text-[14px] font-semibold">{chatContext.active.user2.firstName + " " + chatContext.active.user2.lastName}</p>
                                <p className=" text-[12px] text-gray-400">{`@${chatContext.active.user2.username}`}</p>
                            </div>
                        </div>
                        <div id='conv-header-menu' className="col-span-1 flex justify-self-end items-center text-[24px]">
                            <span className=" m-4 cursor-pointer hover:text-[#5E97A9] focus:text-[#5E97A9] duration-300" onClick={()=>{
                                chatContext.setShowProfile(true)
                            }}>
                            <IoMdInformationCircleOutline />
                            </span>
                            <span className="  m-4 cursor-pointer hover:text-[#5E97A9] focus:text-[#5E97A9] duration-300">
                            <IoIosMore />
                            </span>
                        </div>
                </div>
                <div className="bg-zinc-300 w-[100%] h-[1px] lg:mt-4 rounded-full opacity-50"></div>
            </div>
            {/* <div className="text-white basis-[85%]  h-64 text-[14px] rounded-lg   p-3 sm:p-5 flex flex-col gap-10 overflow-auto justify-end">
                {
                    messageArray.map((msg, index): React.ReactNode => {
                        return(
                        <div key={index} id='message-container' className={` w-[80%]  flex ${msg.sender.id === 1 && "justify-end flex-row-reverse self-end"} items-end gap-4 `}>
                            <img src={`${msg.sender.profilePic}`} alt="" className="hidden sm:block w-[40px] h-[40px] rounded-full" />
                            <div id='message' className={`${msg.sender.id !== 1 ? 'bg-[#5E97A9] rounded-br-2xl' : 'bg-slate-800 rounded-bl-2xl'}  py-2 px-4 rounded-t-2xl  `}>
                                <p >{msg.content}</p>
                            </div>
                        </div>
                        )
                    })
                }
            </div> */}
                        <div className="text-white basis-[85%]  text-[14px] rounded-lg   p-3 sm:p-5 flex flex-col gap-10 overflow-y-auto overflow-x-hidden ">
                {
                    messageArray.map((msg, index): React.ReactNode => {
                        return(
                        <div key={index} id='message-container' className={` w-[80%] flex ${msg.sender.id === 1 && "flex-row-reverse self-end"} items-end gap-4 mt-auto `}>
                            <img src={`${msg.sender.profilePic}`} alt="" className=" w-[40px] h-[40px] rounded-full cursor-pointer" onClick={()=>{
                                chatContext.setShowProfile(true)
                            }}/>
                            <div id='message' className={`${msg.sender.id !== 1 ? 'bg-[#5E97A9] rounded-br-2xl' : 'bg-slate-800 rounded-bl-2xl'}  py-2 px-4 rounded-t-2xl  `}>
                                <p >{msg.content}</p>
                            </div>
                        </div>
                        )

                    })
                }
            </div>
            <div id="conversation-footer-container" className="p-4 flex justify-between items-center gap-1 sm:gap-4 ">
                <span className="bg-[#5E97A9] text-white rounded-full hover:bg-white hover:text-[#5E97A9] duration-300 text-2xl md:text-3xl lg:text-4xl basis-[2.5%] cursor-pointer p-0 sm:p-1">
                    <HiPlus/>
                </span>
                <input type="text" placeholder="Message" className=" rounded-full border-1 border-white focus:outline-none  bg-[#2B2F32]  text-sm sm:text-md pl-2 py-2 focus:bg-slate-200  focus:border-black duration-300 basis-[95%]"/>
                <span className="bg-[#5E97A9] text-white rounded-lg hover:bg-white hover:text-[#5E97A9] duration-300 text-2xl md:text-3xl lg:text-4xl basis-[2.5%] cursor-pointer p-0 sm:p-1">
                    <RiSendPlaneFill />
                </span>
            </div>

        </div>
    )
}
export default ChatSession