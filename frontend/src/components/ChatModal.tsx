import React from "react";
import { useContext, useRef, useState,useEffect } from "react";
import {ChatSectionContext, ContextType, Conversation, Message} from "../utils/ChatContext"
import { Navigate, Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import { ActionType } from "@/utils/interfaces";
import mailman from "@/utils/AxiosFetcher";
function ChatModal(){
    const chatContext = useContext(ChatSectionContext)
    const userContext = useContext(UserContext)
    if (!chatContext || ! userContext)
     throw new Error('error')
    const DoAction = async ()=>
    {
        try{
            if ( userContext?.action?.type != ActionType.NONE)
            {
                const action:string = userContext?.action?.type == ActionType.BLOCK ? "block" : (userContext?.action?.type == ActionType.UNBLOCK ? "unblock": (userContext?.action?.type == ActionType.UNFRIEND ? "unfriend" :'none'))
                const req = {
                    url: "friendship/"+action+"/"+userContext?.action?.Target_User_UniqueId,
                    method: "GET",
                    withCredentials: true,
                }
                const resp = await mailman(req)
                console.log(resp)
                userContext.setAction({type:ActionType.NONE, Target_User_UniqueId:undefined,ConversationChannel:undefined})
                chatContext.setOpenModal(false)
                // LOOP OVER ALL THE USERS and get the user that hold our messages and then change the status to like 1
                if (action == 'block')
                {
                    // update the active 
                    chatContext.setActive((prevActive) => (prevActive && ({
                        ...prevActive,
                        status: 1,
                        messages: []
                    })))
                    // update the main one
                    chatContext.setConvs((prevConvs) =>{
                        return (prevConvs && prevConvs?.map((conv)=>(conv &&  userContext.action?.ConversationChannel && (conv.channelId == userContext.action?.ConversationChannel ? {...conv, messages:[], status:1} : conv))))
                    })
                }
                else if (action == 'unblock')
                {
                    console.log('action : ' + action)
                    // get the old messages
                    try{
                        const req = {
                            url: 'chat/conversation/'+userContext?.action?.ConversationChannel+'/'+import.meta.env.VITE_MESSAGES_PACKET_SIZE+'/',
                            method: "GET",
                            withCredentials: true,
                        }
                        const rep  = await mailman(req)
                        const fetched_conv:Conversation =  rep.data.conv as Conversation
                        console.log(fetched_conv)
                        chatContext.setActive(fetched_conv)
                        chatContext.setConvs((prevConvs) =>{
                            if (!prevConvs) return [fetched_conv] as Conversation[]
                            return (prevConvs && prevConvs?.map((conv)=>(conv &&  userContext.action?.ConversationChannel && (conv.channelId == userContext.action?.ConversationChannel ? fetched_conv : conv)))) as Conversation[]
                        })
                    }
                    catch(e){
                        console.log('Error : in ChatModel get {'+ 'chat/conversation/'+userContext?.action?.ConversationChannel+'/'+import.meta.env.VITE_MESSAGES_PACKET_SIZE+'/' +'} :\n')
                        console.log(e)
                    }
                }
            }
            else
                console.log('action None')
        }
        catch(err)
        {
            console.log(err)
        }
    }
    return(
        <div className="h-[100%] w-[100%] fixed  top-0 -left-0 backdrop-filter bg-black/40 backdrop-blur-sm z-50 animate-delay-75  duration-75">
                <div className="mx-auto sm:mx-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#ffffff]  w-[90%] sm:w-[500px] rounded-md flex flex-col items-center gap-4 text-center px-2 py-4 ">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="60" height="60" color="#5E97A9" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M11.992 15H12.001" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 12L12 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="text-lg font-medium">{`Are you sure you want to ${chatContext.modalMessage}?`}</p>
                    <div className="flex gap-4 flex-wrap items-center justify-center ">
                        <button className="hover:opacity-70 cursor-pointer duration-150 transition-all bg-[#5E97A9] rounded-md text-white px-6 py-4 text-lg font-medium" onClick={DoAction}>Yes, I'm sure</button>
                        <button className="hover:opacity-70 cursor-pointer duration-150 transition-all text-black bg-[#ffffff] border-[1px] border-black/10 rounded-md  px-6 py-4 text-lg font-medium" onClick={() =>{
                            chatContext.setOpenModal(false)
                        }}>
                            No, cancel
                        </button>
                    </div>
                </div>
        </div>
    )
}

export default ChatModal