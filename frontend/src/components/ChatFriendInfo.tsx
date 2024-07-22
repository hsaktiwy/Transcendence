import React, { useContext } from "react";
import {ChatSectionContext, ContextType, Conversation, Message} from "../utils/ChatContext"
import { IoCloseSharp } from "react-icons/io5";

function ChatFriendInfo(){
    const chatContext = useContext(ChatSectionContext)
    if (!chatContext)
     throw new Error('error')
    return(
        <div className={`font-poppins absolute rounded w-[100%] h-full  ${chatContext.showProfile ? 'translate-x-0' : 'translate-x-full'} transition-all duration-[300ms]  text-white `}>
            <div className="h-full w-full absolute -z-10 top-0 left-0 bg-black opacity-50 backdrop-blur-lg"></div>
            <div className=" bg-[#2B2F32] h-full w-full sm:w-[400px] absolute right-0 top-0 rounded text-black flex flex-col overflow-auto ">
                <div id="friend-info-header" className="text-[24px] absolute top-1 left-1">
                    <span className="text-white cursor-pointer" onClick={() =>{
                        chatContext.setShowProfile(!chatContext.showProfile)
                    }}>
                        <IoCloseSharp/>
                    </span>
                </div>
                <div id="friend-info-container" className="  py-4  mx-2    h-full flex flex-col justify-center items-center  gap-8">
                    <div className="w-[210px] h-[210px] p-4 ">
                        <img src={chatContext.active.user2.profile_pic} alt=""  className="rounded-full w-full h-full object-scale-down"/>
                    </div>
                    <div className="text-center text-white">
                        <h1 className="text-3xl font-semibold">{chatContext.active.user2.firstName + " " + chatContext.active.user2.lastName}</h1>
                        <p className="text-gray-500">{'@'+chatContext.active.user2.login}</p>
                    </div>
                    <div className="bg-black w-[80%] rounded-xl py-8  flex flex-col  justify-center items-center gap-8">
                        <div className="">
                            <button className="bg-[#5E97A9] text-white font-medium w-[180px] hover:text-[#5E97A9] hover:bg-white duration-300 rounded-lg px-6 py-2 text-xl">View Profile</button>
                        </div>
                        <div className="">
                            <button className="bg-[#2B2F32]  text-white font-medium w-[180px] hover:text-[#2B2F32] hover:bg-white duration-300 rounded-lg px-6 py-2 text-xl">Play Game</button>
                        </div>
                        <div className="">
                            <button className="bg-[#2B2F32]  text-yellow-300 font-medium w-[180px] hover:text-[#2B2F32] hover:bg-yellow-300 duration-300 rounded-lg px-6 py-2 text-xl">Unfriend</button>
                        </div>
                        <div className="">
                            <button className="bg-[#2B2F32]  text-red-500 font-medium w-[180px] hover:text-[#2B2F32] hover:bg-red-500 duration-300  rounded-lg px-6 py-2 text-xl">Block</button>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default ChatFriendInfo;