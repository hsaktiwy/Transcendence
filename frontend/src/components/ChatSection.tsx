import React, { useContext, useEffect, useState } from "react";
import ChatSession from "./ChatSession";
import Conversations from "./Conversations";
import {ChatSectionContext, Conversation, Message, User} from "../utils/ChatContext"
import {init_conv, initialized, received} from "../utils/ConversationsList"
import { useParams } from "react-router-dom";
import ChatFriendInfo from "./ChatFriendInfo";
import NoActiveChat from "./NoActiveChat";
import LoadingIndecator from "./Loading";
import ChatModal from "./ChatModal";
import { WebSocketContext, WebSocketProvider } from "../utils/WSContext";
import { createContext } from "react";
import { NotificationPropreties, UserContext } from "./UserContext";
import { useLocation } from "react-router-dom";
import { ProfileDataInterface } from "@/utils/UserDataInterface";
import mailman from "@/utils/AxiosFetcher";
import { Underline } from "lucide-react";

function ChatSection(){
    const location = useLocation()
    const [channelId, setChannelId] = useState<number| undefined>(undefined)
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
    const updateConvsState = () =>{
        if (convs && convs.length){
            const {friends} = userContextConsumer
            let tmpConvs: Conversation[] = []
            for(let i = 0; i < convs.length; i++){
                let currentConv = convs[i]
                const elm = currentConv.user2 as ProfileDataInterface
                let friendInList:ProfileDataInterface | undefined = undefined
                if (friends.length)
                     friendInList = friends.find(friend => friend.login === elm.login)
                if (friendInList != undefined)
                {
                    const newFriendState: User = {...friendInList, id: currentConv.user2.id} 
                    currentConv = {...currentConv, user2: newFriendState}
                    tmpConvs.push(currentConv)
                }
                else{
                    const notFriend = currentConv.user2
                    notFriend.state = 'none'
                    tmpConvs.push({...currentConv, user2: notFriend})
                }
            }
            setConvs(tmpConvs)
        }
    }
    useEffect(()=>{
        console.log("dada")
        updateConvsState()
    }, [userContextConsumer.friends])
    useEffect(()=>{
        if (active && convs && convs?.filter(conv=>conv.user2.id===active?.user2.id).length > 0)
            setActive((prev)=>{
                        if (!prev)
                            return undefined
                        const newUserState = convs?.filter(conv=>conv.user2.id===prev?.user2.id)[0].user2
                        return({...prev, user2: newUserState})
                    }
            )
    }, convs)
    const UpdateConvs = (data:any)=>
    {
        console.log('Update convs ...')
        const message_received: Message = {
            id: data.message_id,
            sender: data.user,
            content: data.message,
            isread: false,
            timestamp: data.timestamp
        };
        // Assuming chatContext.setConvs is a state update function
        const channelId = data.channel;
        setConvs((prevConvs: Conversation[]) => {
            const updatedConvs = prevConvs.map(conv =>
                conv.channelId === channelId
                    ? { ...conv, LastUpdate: data.LastUpdate ,messages: [...conv.messages, message_received], new_message: 1 }
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
    const get_conversation = async (channel_id:number)=>{
        try{

            const req = {
                url: 'chat/conversation/'+channel_id+'/'+import.meta.env.VITE_MESSAGES_PACKET_SIZE+'/',
                method: "GET",
                withCredentials: true,
            }
            const rep  = await mailman(req)
            const fetched_conv:Conversation =  rep.data.conv as Conversation
            console.log(fetched_conv)
            console.log('conv', convs)
            let list_conv:Conversation[] = convs ? convs : []
            list_conv.push(fetched_conv)
            setConvs(list_conv)
            
        }
        catch(e){
            console.log('Error : in ChatModel get {'+ 'chat/conversation/'+channel_id+'/'+import.meta.env.VITE_MESSAGES_PACKET_SIZE+'/' +'} :\n')
            console.log(e)
        }
    }
    const Update_chat_notif = (data:NotificationPropreties)=>{
        if (data)
        {
            const channel_id = data.channel_id
            if (convs)
            {
                if (convs?.filter(conv => conv.channelId === channel_id).length === 0)
                    get_conversation(channel_id)
            }
            else
                get_conversation(channel_id)
        }
    }
    useEffect(() =>{
        if (loading == false)
            updateConvsState()
    },[loading])
    useEffect(()=>{
        if (active)
            userContextConsumer.setnotifications(prev=>prev.filter(notif=>notif.channel_id !== active.channelId))
    },[active])
  
    useEffect(()=>
    {
        RemoveChannel('NOTIFICATION_MESSAGE')
        AddChannel('UPDATE_CHAT_NOTIF', Update_chat_notif)
        AddChannel('CHAT', UpdateConvs)
        if (location?.state?.channel_id)
        {
            const {channel_id} = location.state 
            setChannelId(channel_id)
            init_conv(setLoading,setActive, setConvs, channel_id);
            setActiveSection('chat')
        }
        else
            init_conv(setLoading,setActive, setConvs, channelId);
        console.log("wala ", convs)

        // create a function that will update the general data
        // updateConvsState()
        return () => {
            // Remove the CHAT call back function when we exist the chat section
            AddChannel('NOTIFICATION_MESSAGE', userContextConsumer.notificationHandler)
            RemoveChannel('CHAT')
            RemoveChannel('UPDATE_CHAT_NOTIF')
        }
    }, [])

    return(
        
        <ChatSectionContext.Provider value={{convs, setConvs, setActive, active, activeSectionOnSm, setActiveSection, showProfile, setShowProfile, openModal, setOpenModal, modalMessage, setModalMessage}}>
                {openModal && <ChatModal/>} 
                <div className="    bg-white/5 backdrop-filter backdrop-blur-md border border-white/20  rounded-3xl   absolute top-[60px]  left-0 lg:left-[142px] h-[calc(100%-100px)] w-[calc(100%-20px)] lg:w-[calc(100%-162px)] 2xl:w-[calc(80%)] my-[20px] mx-[10px] 2xl:mx-[8%]">
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