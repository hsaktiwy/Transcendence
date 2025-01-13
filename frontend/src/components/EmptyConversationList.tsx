import React from "react";

const EmptyConversationList = () =>{
    return(
        <div className=" flex flex-col gap-8 items-center justify-center ">
            <img src="noMessage.png" alt="no-message-img" className="object-cover w-[150px]" />
            <div className=" flex flex-col items-center justify-cente text-center gap-3">
                <h1 className="text-white/80 text-2xl font-semibold">You don't have any previous message</h1>
                <p className="text-lg font-light text-white/70">Try to start a conversation now</p>
            </div>
        </div>
    )
}
export default  EmptyConversationList