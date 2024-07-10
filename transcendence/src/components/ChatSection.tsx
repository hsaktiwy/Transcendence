import React from "react";
import ChatSession from "./ChatSession";
import Conversations from "./Conversations";
function ChatSection(){
    return(

        <div className=" ml-1 lg:ml-[140px]   mr-1 lg:mr-6 my-6 grid grid-cols-12 grid-rows-12 gap-2 lg:gap-4 h-[calc(100vh-128px)] overflow-hidden">
            <Conversations/>
            <ChatSession/>
            {/* <div className="bg-[#898989] rounded-lg shadow-xl hidden lg:block lg:col-span-3 row-span-12">User</div> */}
            
        </div>
    )
}

export default ChatSection