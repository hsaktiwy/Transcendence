import  { useContext, useEffect, useState } from "react";
import ChatSession from "./ChatSession";
import Conversations from "./Conversations";
import {ChatSectionContext, Conversation, Message, User} from "../utils/ChatContext"
import {init_conv} from "../utils/ConversationsList"
import ChatFriendInfo from "./ChatFriendInfo";
import NoActiveChat from "./NoActiveChat";
import LoadingIndecator from "./Loading";
import ChatModal from "./ChatModal";
import { WebSocketContext } from "../utils/WSContext";

import { NotificationPropreties, UserContext } from "./UserContext";
import { useLocation } from "react-router-dom";
import { ProfileDataInterface } from "@/utils/UserDataInterface";
import mailman from "@/utils/AxiosFetcher";


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
    const  {blockList} = userContextConsumer
    const {AddChannel,RemoveChannel} = SocketContext
    const updateConvsState = () =>{
        if (convs && convs.length){
            const {friends} = userContextConsumer
            let tmpConvs: Conversation[] = []
            for(let i = 0; i < convs.length; i++){
                let currentConv = convs[i]
                const elm = currentConv.user2 as ProfileDataInterface
                let friendInList:ProfileDataInterface | undefined = undefined
                if (friends.length > 0)
                     friendInList = friends.find(friend => friend.unique_id === elm.unique_id)
                if (friends.length > 0 && friendInList != undefined)
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
        updateConvsState()
    }, [userContextConsumer.friends])

    useEffect(()=>{
        if (convs && blockList.length >0){
            let updateActive : Conversation | undefined = undefined
            const newConvs = convs.map((conv)=>{
                let userFound = blockList.find(block=>block.unique_id === conv.user2.unique_id)
                if (userFound !== undefined){
                    conv.user2.block = true
                    if(userFound.unique_id === active?.user2.unique_id)
                        updateActive = conv
                }
                return conv
            })
            setConvs(newConvs)
            if (updateActive !== undefined)
                setActive(updateActive)
        }
    },[blockList])
    const UpdateConvs = (data:any)=>
    {
        const message_received: Message = {
            id: data.message_id,
            sender: data.user,
            content: data.message,
            isread: false,
            timestamp: data.timestamp
        };
        
        const channelId:number = data.channel;
        setConvs((prevConvs) => {
            if (prevConvs){
                const updatedConvs = prevConvs.map((conv) =>{
                    const last_update:string = data.LastUpdate
                   if (conv.channelId === channelId)
                        return { ...conv, LastUpdate: last_update ,messages: [...conv.messages, message_received], new_message: 1 as 0 | 1 }
                    else
                        return conv
                }
                );
                updatedConvs.sort((a, b)=>{
                    const DateA = new Date(a.LastUpdate) 
                    const DateB = new Date(b.LastUpdate)
                    return DateB.getTime() - DateA.getTime();
                })
                return updatedConvs
            }
            return prevConvs
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
            if (convs != undefined)
            {
                let list_conv:Conversation[] = [fetched_conv, ...convs]
                setConvs(list_conv)
            }
            else
            {
                let list_conv:Conversation[] = [fetched_conv]
                setConvs(list_conv)
            }
            
        }
        catch(e){
            console.error(e)
        }
    }

    const Update_chat_notif = (data:NotificationPropreties)=>{
        const channel_id = data.channel_id
        if (convs)
        {
            if (convs?.filter(conv => conv.channelId === channel_id).length === 0)
                get_conversation(channel_id)
        }
        else
            get_conversation(channel_id)
    }

    useEffect(() =>{
        if (loading == false)
        {
            updateConvsState()
            RemoveChannel('NOTIFICATION_MESSAGE')
            AddChannel('UPDATE_CHAT_NOTIF', Update_chat_notif)
            AddChannel('CHAT', UpdateConvs)
        }
        return () => {
            // Remove the CHAT call back function when we exist the chat section
            AddChannel('NOTIFICATION_MESSAGE', userContextConsumer.notificationHandler)
            RemoveChannel('CHAT')
            RemoveChannel('UPDATE_CHAT_NOTIF')
        }
    },[loading])
  
    useEffect(()=>
    {
        if (location?.state?.channel_id)
        {
            const {channel_id} = location.state 
            setChannelId(channel_id)
            init_conv(setLoading,setActive, setConvs, channel_id);
            setActiveSection('chat')
        }
        else
            init_conv(setLoading,setActive, setConvs, channelId);
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