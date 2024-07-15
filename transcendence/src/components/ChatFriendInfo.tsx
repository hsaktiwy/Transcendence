import React, { useContext } from "react";
import {ChatSectionContext, ContextType, Conversation, Message} from "../utils/ChatContext"
import { IoCloseSharp } from "react-icons/io5";

function ChatFriendInfo(){
    const chatContext = useContext(ChatSectionContext)
    if (!chatContext)
     throw new Error('error')
    return(
        <div className={`absolute rounded w-[100%] h-full  ${chatContext.showProfile ? 'translate-x-0' : 'translate-x-full'} transition-all duration-[300ms]  text-white`}>
            <div className="h-full w-full absolute -z-10 top-0 left-0 bg-black opacity-50"></div>
            <div className=" bg-white h-full w-[400px] absolute right-0 top-0 rounded text-black">
                <span className="cursor-pointer" onClick={() =>{
                    chatContext.setShowProfile(!chatContext.showProfile)
                }}>
                    <IoCloseSharp/>
                </span>

            </div>
        </div>
    )
}

export default ChatFriendInfo;