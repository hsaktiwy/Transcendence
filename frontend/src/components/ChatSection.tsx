import React, { useContext, useEffect, useState } from "react";
import ChatSession from "./ChatSession";
import Conversations from "./Conversations";
import {ChatSectionContext, Conversation, Message, User} from "../utils/ChatContext"
import {init_conv, initialized, received} from "../utils/ConversationsList"
import ChatFriendInfo from "./ChatFriendInfo";
import NoActiveChat from "./NoActiveChat";
import LoadingIndecator from "./Loading";
import ChatModal from "./ChatModal";
import { WebSocketContext, WebSocketProvider } from "../utils/WSContext";
import { createContext } from "react";
import { UserContext } from "./UserContext";

function ChatSection(){
    const [loading, setLoading] = useState<boolean>(true)
    const [convs, setConvs] = useState<Conversation[] | undefined>(undefined)
    const [active, setActive] = useState<Conversation | undefined>(undefined)
    const [activeSectionOnSm, setActiveSection] = useState<string>('conversations')
    const [showProfile, setShowProfile] = useState<boolean>(false)
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [modalMessage, setModalMessage] = useState<string>("")
    const SocketContext = useContext(WebSocketContext)
    const userContextConsumer = useContext(UserContext)
    if (!userContextConsumer)
        throw new Error("userContext must be used within a UserProvider");
    if (!SocketContext)
        throw new Error('error')
    const {AddChannel,RemoveChannel, socket} = SocketContext

    useEffect(()=>
    {
        init_conv(setLoading,setActive, setConvs);
        // create a function that will update the general data
        const UpdateConvs = (data:any)=>
        {
            console.log('Update convs ...')
            const message_received: Message = {
                id: data.message_id,
                sender: data.user,
                content: data.message,
            };
            // Assuming chatContext.setConvs is a state update function
            const channelId = data.channel;
            setConvs((prevConvs: Conversation[]) => {
                const updatedConvs = prevConvs.map(conv =>
                    conv.channelId === channelId
                        ? { ...conv, LastUpdate: data.LastUpdate ,messages: [...conv.messages, message_received] }
                        : conv
                );
                updatedConvs.sort((a, b)=>{
                    const DateA = new Date(a.LastUpdate) 
                    const DateB = new Date(b.LastUpdate)
                    console.log(DateA)
                    console.log(DateB)
                    return DateB - DateA;
                })
                console.log('Updated convs:', updatedConvs);
                return updatedConvs
            })
        }
        RemoveChannel('NOTIFICATION_MESSAGE')
        AddChannel('CHAT', UpdateConvs)
        return () => {
            // Remove the CHAT call back function when we exist the chat section
            AddChannel('NOTIFICATION_MESSAGE', userContextConsumer.notificationHandler)
            RemoveChannel('CHAT')
        }
    }, [loading, active])

    return(
        
        <ChatSectionContext.Provider value={{convs, setConvs, setActive, active, activeSectionOnSm, setActiveSection, showProfile, setShowProfile, openModal, setOpenModal, modalMessage, setModalMessage}}>
                {openModal && <ChatModal/>} 
                <div className="   bg-gradient-to-l from-[#2a3236] to-[#1e2124] backdrop-filter backdrop-blur-sm  rounded-xl   absolute top-[60px]  left-0 lg:left-[142px] h-[calc(100%-100px)] w-[calc(100%-20px)] lg:w-[calc(100%-162px)] 2xl:w-[calc(80%)] my-[20px] mx-[10px] 2xl:mx-[8%]">
                    <div className="  h-[calc(100%-60px)] lg:h-[100%] overflow-hidden relative ">
                        {loading ?
                        (<LoadingIndecator/>) :
                        (<><Conversations/>
                        {!active && <NoActiveChat/>}
                        {active && <ChatSession/>}
                        {active && <ChatFriendInfo/>}</>)}
                    </div>
       
                </div>


        </ChatSectionContext.Provider>
    )
}

export default ChatSection