import React from "react";
import { useContext, useRef, useState,useEffect } from "react";
import {ChatSectionContext, ContextType, Conversation, Message} from "../utils/ChatContext"
import { Navigate, Link } from "react-router-dom";
function ChatModal(){
    const chatContext =useContext(ChatSectionContext)
    if (!chatContext)
     throw new Error('error')

    return(
        <div className="h-[100%] w-[100%] fixed  top-0 -left-0 backdrop-filter bg-black/40 backdrop-blur-sm z-50 animate-delay-75  duration-75">
                <div className="mx-auto sm:mx-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#ffffff]  w-[90%] sm:w-[500px] rounded-md flex flex-col items-center gap-4 text-center px-2 py-4 ">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="60" height="60" color="#5E97A9" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" />
                        <path d="M11.992 15H12.001" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12 12L12 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <p className="text-lg font-medium">{`Are you sure you want to ${chatContext.modalMessage}?`}</p>
                    <div className="flex gap-4 flex-wrap items-center justify-center ">
                        <Link to='/'>
                            <button className="hover:opacity-70 cursor-pointer duration-150 transition-all bg-[#5E97A9] rounded-md text-white px-6 py-4 text-lg font-medium">Yes, I'm sure</button>
                        </Link>
                        <button className="hover:opacity-70 cursor-pointer duration-150 transition-all text-black bg-[#ffffff] border-[1px] border-black/10 rounded-md  px-6 py-4 text-lg font-medium" onClick={() =>{
                            chatContext.setOpenModal(false)
                        }}>
                            No, cancel
                        </button>
                    </div>
                </div>
        </div>
    )
}

export default ChatModal