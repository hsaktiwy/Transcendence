import React from "react";
import Sidebar from "./Sidebar";
import NavBar from "./NavBar";
import ChatSession from "./ChatSession";

function Chat(){

    return(
        <div className=" h-screen bg-[rgba(0,0,0,0.7)] w-[95%] m-auto rounded-sm grid grid-cols-12 grid-rows-12 gap-2 p-4 relative">
            <NavBar/>
            <Sidebar/>
            <div className = "rounded-lg shadow-xl  col-span-12 lg:col-span-11 row-span-11 grid grid-cols-12 grid-rows-12 gap-4">
                <div className="bg-[#FFFFFF] rounded-lg shadow-xl hidden lg:block lg:col-span-4 row-span-12">conversations</div>
                <ChatSession/>
            </div>
            {/* <div className="bg-green-500 rounded-lg shadow-xl min-h-[50px]">conversations</div>
            <div className="bg-purple-500 rounded-lg shadow-xl min-h-[50px]">chat-component</div> */}
            {/* <div className="bg-teal-500 rounded-lg shadow-xl min-h-[50px]">friend-infos</div> */}
            {/* <div className="bg-yellow-500 rounded-lg shadow-xl min-h-[50px]"></div>
            <div className="bg-blue-500 rounded-lg shadow-xl min-h-[50px]"></div>
            <div className="bg-indigo-500 rounded-lg shadow-xl min-h-[50px]"></div>
            <div className="bg-slate-500 rounded-lg shadow-xl min-h-[50px]"></div> */}
        </div>
    )
}
export default Chat