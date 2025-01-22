import React from "react";
import { TbMessagesOff } from "react-icons/tb";

const EmptyConversationList = () =>{
    return(
        <div className=" h-[60%] flex flex-col gap-8 items-center justify-center ">
            <TbMessagesOff className="text-[80px] text-white/60 "/>
            <div className=" flex flex-col items-center justify-cente text-center gap-3">
                <h1 className="text-white/80 text-2xl font-semibold">You don't have any previous message</h1>
                <p className="text-lg font-light text-white/70">Try to start a conversation now</p>
            </div>
        </div>
    )
}
export default  EmptyConversationList