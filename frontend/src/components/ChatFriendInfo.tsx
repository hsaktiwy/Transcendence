import React, { useContext } from "react";
import {ChatSectionContext, ContextType, Conversation, Message} from "../utils/ChatContext"
import { IoCloseSharp } from "react-icons/io5";

function ChatFriendInfo(){
    const chatContext = useContext(ChatSectionContext)
    if (!chatContext)
     throw new Error('error')
    return(
        <div className={` bg-[#2B2F32] border-l-[1px] border-white/50 font-poppins  rounded  absolute top-0 right-0  h-full  ${chatContext.showProfile ? 'w-full  lg:w-[379px]' : 'w-0'} transition-all duration-[300ms]  text-white `}>
            {/* <div className="h-full w-full absolute -z-10 top-0 left-0 bg-black/50 "></div> */}
            <div className=" bg-[#1D1E22]   w-full  overflow-auto relative   ">
                <div id="friend-info-header" className=" m-4 text-[24px] text-white flex justify-between items-center">

                    <h1 className="text-xl font-semibold">Contact Info</h1>
                    <span className="block text-white cursor-pointer" onClick={() =>{
                        chatContext.setShowProfile(!chatContext.showProfile)
                    }}>
                        <IoCloseSharp/>
                    </span>
                </div>
                    <div className="bg-white w-[100%] h-[1px] lg:mt-[28px] rounded-full"></div>
            </div>
            <div id="friend-info" className="m-4 bg-[#1D1E22] rounded-lg">
                <div className=" p-4 profile-info-header flex flex-col justify-center items-center">
                    <img src={chatContext.active.user2.profilePic} alt="" className="rounded-full w-28 h-28"  />
                    <h1 className=" mt-4 font-semibold">{chatContext.active.user2.firstName + " " + chatContext.active.user2.lastName}</h1>
                    <p className="text-gray-400">{"@" + chatContext.active.user2.username}</p>
                    <h2 className="m-2">Level: <span>{chatContext.active.user2.level}</span></h2>
                    <div className={` relative m-3 w-full h-3 bg-[#444444] rounded-full after:content-[''] after:absolute after:top-0 after:left-0 after:bg-[#5E97A9] after:${'w-[' + ((chatContext.active.user2.level - (Math.floor(chatContext.active.user2.level))) * 100) + '%]' } after:h-full after:rounded-full `}>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatFriendInfo;