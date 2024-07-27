import React, { useContext, useEffect, useState } from "react";
import ChatSession from "./ChatSession";
import Conversations from "./Conversations";
import {ChatSectionContext, Conversation, Message, User} from "../utils/ChatContext"
import {init_conv, initialized, received} from "../utils/ConversationsList"
import ChatFriendInfo from "./ChatFriendInfo";
import NoActiveChat from "./NoActiveChat";
import LoadingIndecator from "./Loading";
import ChatModal from "./ChatModal";
import { WebSocketProvider } from "../utils/WSContext";
import { createContext } from "react";


function ChatSection(){
    const [loading, setLoading] = useState<boolean>(true)
    const [convs, setConvs] = useState<Conversation[] | undefined>(undefined)
    const [active, setActive] = useState<Conversation | undefined>(undefined)
    const [activeSectionOnSm, setActiveSection] = useState<string>('conversations')
    const [showProfile, setShowProfile] = useState<boolean>(false)
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [modalMessage, setModalMessage] = useState<string>("")
    useEffect(()=>
    {
        init_conv(setLoading,setActive, setConvs);
    }, [loading, active])
    return(

        <ChatSectionContext.Provider value={{convs, setConvs, setActive, active, activeSectionOnSm, setActiveSection, showProfile, setShowProfile, openModal, setOpenModal, modalMessage, setModalMessage}}>
            {/* animate-fade-down ml-2 lg:ml-[140px]   mr-2 lg:mr-6 mt-6  mb-6 h-[calc(100vh-118px)] overflow-hidden relative */} 
            <WebSocketProvider>
                <div className="rounded-xl  bg-black/35 backdrop-filter backdrop-blur-sm animate-fade-down absolute top-[60px]  left-0 lg:left-[80px] h-[calc(100%-80px)] w-[calc(100%-20px)] lg:w-[calc(100%-100px)] 2xl:w-[calc(80%)] my-[10px] mx-[10px] 2xl:mx-[8%]">
                    <div className="  h-[100%] overflow-hidden relative ">
                        {loading ?
                        (<LoadingIndecator/>) :
                        (<><Conversations/>
                        {!active && <NoActiveChat/>}
                        {active && <ChatSession/>}
                        {active && <ChatFriendInfo/>}</>)}
                        {/* <div className="bg-[#898989] rounded-lg shadow-xl hidden lg:block lg:col-span-3 row-span-12">User</div> */}
                        </div>
                </div>
            </WebSocketProvider>

        </ChatSectionContext.Provider>
    )
}

export default ChatSection