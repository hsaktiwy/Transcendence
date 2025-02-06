import React from "react";
import { TbMessagesOff } from "react-icons/tb";

const EmptyConversationList = () =>{
    return(
        <div className=" h-[60%] flex flex-col gap-8 items-center justify-center grayscale">
            {/* <TbMessagesOff className="text-[80px] text-white/60 "/> */}
            <img src="/icons/hugo-mailbox.svg" className="pr-8" />
            <div className=" flex flex-col items-center justify-cente text-center gap-3 grayscale">
                <h1 className="text-white/80 text-xl font-semibold">Looks like you're the popular one here. no messages yet!</h1>
                <p className="text-lg font-light text-white/70">Try to start a conversation now</p>
            </div>
        </div>
    )
}
export default  EmptyConversationList