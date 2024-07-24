import React, { useContext } from "react";
import {ChatSectionContext, ContextType, Conversation, Message} from "../utils/ChatContext"
import { IoCloseSharp } from "react-icons/io5";
import { BsTrophy } from "react-icons/bs";
import { PiPingPongFill } from "react-icons/pi";
import { IoMdStats } from "react-icons/io";



function ChatFriendInfo(){
    const chatContext = useContext(ChatSectionContext)
    if (!chatContext)
     throw new Error('error')
    return(
        <div className={` bg-[#2B2F32] border-l-[1px] border-white/50 font-poppins  rounded  absolute top-0   h-full  ${chatContext.showProfile ? 'right-0 w-full  lg:w-[279px]' : 'w-0 -right-32'} transition-all duration-[300ms]  text-white overflow-auto`}>
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
                    {/* <div className="bg-white w-[100%] h-[1px] lg:mt-[28px] rounded-full"></div> */}
            </div>
            <div id="friend-info" className=" m-4 bg-[#1D1E22] rounded-lg flex flex-col justify-center ">
                <div className=" p-4 profile-info-header flex flex-col justify-center items-center">
                    <img src={chatContext.active.user2.profilePic} alt="" className="rounded-full w-28 h-28"  />
                    <h1 className=" mt-4 font-semibold">{chatContext.active.user2.firstName + " " + chatContext.active.user2.lastName}</h1>
                    <p className="text-gray-400">{"@" + chatContext.active.user2.username}</p>
                    <h2 className="">Level: <span>{chatContext.active.user2.level}</span></h2>
                    <div className={` relative m-3 w-full h-3 bg-[#444444] rounded-full after:content-[''] after:absolute after:top-0 after:left-0 after:bg-[#5E97A9] after:${
                        'w-[' + ((chatContext.active.user2.level - (Math.floor(chatContext.active.user2.level))) * 100).toFixed().toString() + '%]'} after:h-full after:rounded-full`}>
                    </div>
                </div>
            </div>
            <div id='friend-achievement-games' className=" animate-fade-right m-4 bg-[#1D1E22] rounded-lg p-4 over">
                <div className="h-[90px] relative m-2  rounded p-2">
                    <span className="block text-6xl text-[#5E97A9] absolute  right-0 top-1/2 -translate-y-1/2">
                        <PiPingPongFill/>
                    </span>
                    <div className="w-1/2 absolute top-0 left-0 bg-[#444444] p-2 rounded-lg">
                        <p className="font-extrabold text-3xl text-[#5E97A9]">50</p>
                        <p className="text-xl font-semibold pl-4">
                            GAMES
                        </p>
                    </div>

                </div>
            </div>
            <div id='friend-achievement-wins' className=" animate-fade-right m-4 bg-[#1D1E22] rounded-lg p-4">
                <div className="h-[90px] relative m-2  rounded p-2">
                    <span className="block text-6xl text-[#5E97A9] absolute  right-0 top-1/2 -translate-y-1/2">
                        <BsTrophy/>
                    </span>
                    <div className="w-1/2 absolute top-0 left-0 bg-[#444444] p-2 rounded-lg">
                        <p className="font-extrabold text-3xl text-[#5E97A9]">30</p>
                        <p className="text-xl font-semibold pl-4">
                            WINS
                        </p>
                    </div>

                </div>
            </div>
            <div id='friend-achievement-ratio' className=" animate-fade-right m-4 bg-[#1D1E22] rounded-lg p-4">
                <div className="h-[90px] relative m-2  rounded p-2">
                    <span className="block text-6xl text-[#5E97A9] absolute  right-0 top-1/2 -translate-y-1/2">
                        <IoMdStats/>
                    </span>
                    <div className=" w-1/2 absolute top-0 left-0 bg-[#444444] p-2 rounded-lg">
                        <p className="font-extrabold text-3xl text-[#5E97A9]">60%</p>
                        <p className="text-xl font-semibold pl-4">
                            RATIO
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ChatFriendInfo;