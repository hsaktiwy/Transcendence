import React from "react";
import Sidebar from "./Sidebar";
import NavBar from "./NavBar";


function Chat(){

    return(
        <div className="min-h-screen bg-[#000000] w-[95%] m-auto rounded-sm grid grid-cols-12 grid-rows-12 gap-2 p-4">
            <Sidebar />
            <NavBar/>
            <div className = "rounded-lg shadow-xl  col-span-11 row-span-11 grid grid-cols-12 grid-rows-12 gap-4">
                <div className="bg-[#4E4E4E] rounded-lg shadow-xl col-span-4 lg:col-span-3 row-span-12">conversations</div>
                <div className="bg-slate-500 rounded-lg shadow-xl col-span-8 lg:col-span-6 row-span-12">chat session</div>
                <div className="bg-[#CCCCCC] rounded-lg shadow-xl col-span-3 row-span-12 hidden lg:block">user-profile</div>
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