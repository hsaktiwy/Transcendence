import React, { useContext, useEffect, useState } from "react";
import ChatSession from "./ChatSession";
import Conversations from "./Conversations";
import {ChatSectionContext, Conversation, Message, User} from "../utils/ChatContext"
import {init_conv, initialized, received} from "../utils/ConversationsList"
import ChatFriendInfo from "./ChatFriendInfo";
import LoadingIndecator from "./Loading";
import { createContext } from "react";
import { WebSocketProvider } from "../utils/WSContext";


function ChatSection(){
    const [loading, setLoading] = useState<boolean>(true)
    const [convs, setConvs] = useState<Conversation[] | undefined>(undefined)
    const [active, setActive] = useState<Conversation>()
    const [activeSectionOnSm, setActiveSection] = useState<string>('conversations')
    const [showProfile, setShowProfile] = useState<boolean>(false)

    useEffect(()=>
    {
        init_conv(setLoading,setActive, setConvs);
    }, [loading, active])
    return(

        <ChatSectionContext.Provider value={{convs, setConvs, setActive, active, activeSectionOnSm, setActiveSection, showProfile, setShowProfile}}>
            {/* animate-fade-down ml-2 lg:ml-[140px]   mr-2 lg:mr-6 mt-6  mb-6 h-[calc(100vh-118px)] overflow-hidden relative */} 
            <WebSocketProvider>
                <div className=" animate-fade-down mx-auto mt-6  mb-6 h-[90%] shadow-md shadow-slate-300 rounded-md overflow-hidden relative">
                    {loading ?
                    (<LoadingIndecator/>) :
                    (<><Conversations/><ChatSession/><ChatFriendInfo/></>)}
                    {/* <div className="bg-[#898989] rounded-lg shadow-xl hidden lg:block lg:col-span-3 row-span-12">User</div> */}
                    
                </div>
            </WebSocketProvider>

        </ChatSectionContext.Provider>
    )
}

export default ChatSection