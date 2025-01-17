import React, { useContext, useRef, useState,useEffect, useCallback } from "react";
import {ChatSectionContext, Conversation, Message} from "../utils/ChatContext"
import { IoIosMore } from "react-icons/io";

import { IoPersonRemoveOutline } from "react-icons/io5";
import { RiSendPlaneFill } from "react-icons/ri";
import { IoArrowBackOutline } from "react-icons/io5";
import { IoMdInformationCircleOutline } from "react-icons/io";


import { MdOutlineBlock } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";


import { WebSocketContext } from "../utils/WSContext";
import { Action, ActionType} from "@/utils/interfaces";
import mailman from "../utils/AxiosFetcher";
import { UserContext } from "./UserContext";
import { formatDate2 } from "./NavBarModal";


export const backendPath:string = import.meta.env.VITE_BACKEND.substring(0, import.meta.env.VITE_BACKEND.length - 1)
function ChatSession(){
    
    const chatContext =useContext(ChatSectionContext)
    const userContext = useContext(UserContext)
    if (!chatContext || !userContext)
     throw new Error('error')
    const SocketContext = useContext(WebSocketContext)
    if (!SocketContext)
        throw new Error('error')


    const [message, setMessage] = useState('')// hamza
    const [update, setUpdate] = useState<boolean>(false)// hamza
    const  {AddChannel, RemoveChannel, socket} = SocketContext;// hamza
    const containerRef = useRef<HTMLDivElement | null>(null);// amine 
    const DropMenuRef = useRef<HTMLDivElement | null>(null);// amine 
    const [scrollPosition, setScrollPosition] = useState({scrollTop: -1, scrollLeft:-1})
    const [openDrop, setOpenDrop] = useState<boolean>(false)// amine 
    const [Status, setStatus] = useState<string>("Block")

    // for testing
    const [rcount, setRCount] = useState<number>(0)
    // end
    const BlockStatusCheck = async ()=>
    {
        try{
            const req = {
                url:'friendship/is/BLOCKED/'+ chatContext.active?.user2.login,
                method: 'GET',
                withCredentials:true,
            }
            const resp = await mailman(req)
            const  responce:boolean = resp.data['status']
            setStatus((responce) ? 'UnBlock' : 'Block')
            // console.log(resp)
        }
        catch(err)
        {
            console.log("Block status ", err)
        }
    }

    useEffect(()=>{
        setRCount((re)=>(re+1))
        BlockStatusCheck()
    },[userContext.action, chatContext.active])
    //amine
    
    
    useEffect(() =>{
        setRCount((re)=>(re+1))
        // Scroll to the bottom whenever the messages array changes
        if (update && containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
            setUpdate(false)
        }
    }, [update]);
    //amine
    useEffect(() =>{
        setRCount((re)=>(re+1))
        const handleCloseMenu = (e:any) =>
        {
            if(e.target && e.target.parentElement && e.target.parentElement.className.split(' ')[0] !== 'drop')
            {
                if (openDrop)
                    setOpenDrop(false)
            }
        }
        if (openDrop)
        {
            // BlockStatusCheck()
            window.addEventListener('click', handleCloseMenu)
        }
        return () =>{
            window.removeEventListener('click', handleCloseMenu)
        }
    },[openDrop])

    // hamza
    const sendMessage = () =>
    {
        if (message.length > 0)
        {
            const holder:string = JSON.stringify({type: 'MESSAGE', channel: 'CHATROOM' + chatContext.active?.channelId, message : message})
            socket?.current.send(holder)
            setMessage('')
        }
    }

    const TryToSendMessage = (event: React.KeyboardEvent) =>
    {
        if (event.key === 'Enter' && message.length > 0)
        {
            if (socket?.current && socket?.current.readyState === WebSocket.OPEN)
            {
                let holder:string = JSON.stringify({type: 'NOTIFICATION_MESSAGE', to:`${chatContext.active?.user2.login}` , message : message, channel_id: chatContext.active?.channelId})
                socket?.current.send(holder)
                holder = JSON.stringify({type: 'MESSAGE', channel: 'CHATROOM' + chatContext.active?.channelId, message : message})
                socket?.current.send(holder)
                setMessage('')
            }
            else
                console.error('WebSocket connection is not open')
        }
    }
    // hamza
    const UpdateCurrentConvs = useCallback((message_received: Message , __channelId: number) => {
            if (__channelId === chatContext.active?.channelId) {
                console.log('messagr received:  ', message_received)
                chatContext.setActive((prevActive) => prevActive && ({
                ...prevActive,
                new_message: 1,
                messages: [...prevActive.messages, message_received]
                }));
                setUpdate(true);
            }
        }, [chatContext.active?.channelId, chatContext.setActive]);
    useEffect(()=>
    {
        setRCount((re)=>(re+1))
        AddChannel('CHATROOM', UpdateCurrentConvs)
        BlockStatusCheck()
        return () => {
            // Remove the CHATROOM call back function when we exist the chat section
            RemoveChannel('CHATROOM')
        }
    },[])// empty dependency to call this useEffect one time
                                
    // when we rerender the page
    const SendWebSocketToDefine = ()=>
    {
        try
        {
            const req = {
                type: "READ",
                channel: chatContext.active?.channelId,
                first_index: (chatContext.active?.messages && chatContext.active?.messages.length) ? chatContext.active?.messages[0].id: -1
            }
            // console.log(JSON.stringify(req))
            SocketContext.socket?.current.send(JSON.stringify(req))
            chatContext.active?.new_message==0
            chatContext.setConvs((prevConvs) => {
            return prevConvs?.map((conv) =>
                    conv.channelId === chatContext.active?.channelId
                ? { ...conv, new_message:0 }
                : conv
                );
            });
        }
        catch (e)
        {
            console.log("Error in the ready message sheck : "+e)
        }
    }

    useEffect(() => {
        setRCount((re)=>(re+1))
        // Scroll to the bottom whenever the messages array changes (but in our case we are interested only in
        // one the first render where chatContext.active.scrollLeft = -1 &&  chatContext.active.scrollTop = -1)
        if (chatContext.active?.status == 0 && containerRef.current && chatContext.active.scrollLeft == -1 &&  chatContext.active.scrollTop == -1) {

            //containerRef.current.scrollTop = containerRef.current.scrollHeight;
            const newScrollTop = containerRef.current.scrollHeight;
            const newScrollLeft = containerRef.current.scrollLeft;
            // Updating the active conversation's scroll properties
            chatContext.setActive((prevConv) => (prevConv && {
                ...prevConv,
                scrollTop: newScrollTop,
                scrollLeft: newScrollLeft,
            }));

            chatContext.setConvs((prevConvs) => {
                return prevConvs?.map((conv) =>
                    conv.channelId === chatContext.active?.channelId
                        ? { ...conv, scrollTop: newScrollTop, scrollLeft: newScrollLeft }
                        : conv
                );
            });
            setUpdate(true)
            // console.log(chatContext.active);
        }
    }, []);


    useEffect(()=>
    {
        setRCount((re)=>(re+1))
        if (chatContext.active?.new_message == 1)
            SendWebSocketToDefine()
    }, [chatContext.active])
    // this function will update our conv list and add packet of old messages to it
    // const 
    const FetchOldMessages = async ()=>
        {
            try
            {
                const extracting = 'update/' + chatContext.active?.channelId + '/' + import.meta.env.VITE_MESSAGES_PACKET_SIZE + '/' + chatContext.active?.next_packet_number + '/'
                const url = import.meta.env.VITE_CONVERSATION + extracting
                // console.log(url)
                const request = {
                    url: url,
                    method: 'GET',
                    // withCredentials: true
                }
                const response = await mailman(request)
                interface conversation_type {
                messages : Message[]
                next_packet_number : number
                is_next_packet: number
            }
            const old_messages:conversation_type  = response.data as conversation_type
            if ( chatContext.active && old_messages && old_messages.is_next_packet && chatContext.active?.last_packet < old_messages.next_packet_number)
            {
                // console.log(old_messages)
                // console.log(chatContext.active)
                if (containerRef.current)
                    containerRef.current.scrollTop = chatContext.active.scrollTop;
                chatContext.setActive((prevConv) => (prevConv && {
                    ...prevConv,
                    last_packet: prevConv?.next_packet_number,
                    next_packet_number: old_messages.next_packet_number,
                    is_next_packet: old_messages.is_next_packet,
                    messages: [...old_messages.messages, ...prevConv.messages]
                }));
                chatContext.setConvs((prevConvs: Conversation[] | undefined) => {
                    const updatedConvs = prevConvs?.map((conv)=> conv.channelId == chatContext.active?.channelId ?
                        {...conv, 
                        last_packet: conv?.next_packet_number,
                        next_packet_number: old_messages.next_packet_number,
                        is_next_packet: old_messages.is_next_packet,
                        messages: [...old_messages.messages, ...conv.messages]
                        }
                    : conv
                    )
                    return updatedConvs
                })
            }
        }
        catch(error)
        {
            console.log(error)
        }
        // console.log(chatContext.active)
    }
    useEffect(()=>
    {
        setRCount((re)=>(re+1))
        const {scrollTop} =  scrollPosition
        if (chatContext.active?.status == 0 && scrollTop == 0 && chatContext.active?.is_next_packet)
        {
            FetchOldMessages()
        }
    }, [scrollPosition])

    // function hthat will check for scrol behavior
    const handleContainerScroll = ()=>{
        if (containerRef.current)
        {
            const {scrollTop, scrollLeft} = containerRef.current
            if (scrollTop == 0 && scrollLeft == 0)
                setScrollPosition({scrollTop, scrollLeft});
        }
    }

    // testing purpose
    useEffect(()=>
    {
        console.log("render time:", rcount)
    },[rcount])
    //
    return(
            <div  className={`  rounded-xl lg:rounded-3xl     font-poppins flex flex-col justify-between overflow-hidden absolute  lg:left-[30%] xl:left-[22%] ${chatContext.showProfile? `${chatContext.activeSectionOnSm==='chat' ? 'w-full' : 'w-0'} lg:w-[calc(70%-280px)] xl:w-[calc(78%-380px)] 2xl:w-[calc(78%-480px)] ` : `${chatContext.activeSectionOnSm==='chat' ? 'w-full' : 'w-0'} lg:w-[70%] xl:w-[78%] rounded-r-xl`}  h-full transition-all duration-800
            `}>
                <div id="conversation-header-container" className="border-b border-white/20 ">
                    <div id="conversation-header" className="text-white grid grid-cols-4 px-4 py-[2px]">
                            <div id="friend-info" className="col-span-3 flex gap-2 sm:gap-4 lg:gap-4 items-center cursor-pointer">
                                <span className="inline-block lg:hidden text-[24px] mx-2 my-4 sm:m-4 cursor-pointer hover:text-[#5E97A9] focus:text-[#5E97A9] duration-300" onClick={() =>{
                                    setOpenDrop(false)
                                    chatContext.setActiveSection('conversations')
                                    chatContext.setActive(undefined)
                                }}>
                                <IoArrowBackOutline />
                                </span>
                                <img src={`${chatContext.active &&  `${backendPath +  chatContext.active.user2.profile_pic}`}`} alt="user-pic" className=" w-[40px] h-[40px] aspect-square rounded-full object-cover cursor-pointer" onClick={()=>{
                                    chatContext.setShowProfile(true)
                                }}/>
                                <div className="cursor-pointer " onClick={()=>{
                                    chatContext.setShowProfile(true)
                                }}>
                                    <p className=" text-[14px] font-semibold">{chatContext.active &&  chatContext.active.user2.firstName + " " + chatContext.active.user2.lastName}</p>
                                    <p className=" text-[12px] text-gray-400">{`@${chatContext.active &&  chatContext.active.user2.login}`}</p>
                                </div>
                            </div>
                            <div id='conv-header-menu ' className="drop relative col-span-1  flex justify-self-end items-center text-[24px]">
                                <span className="  m-4 cursor-pointer hover:text-[#5E97A9] focus:text-[#5E97A9] duration-300" onClick={()=>{
                                    setOpenDrop(false)
                                    chatContext.setShowProfile(true)
                                }}>
                                <IoMdInformationCircleOutline />
                                </span>
                                    <span    className="drop  m-4 cursor-pointer  hover:text-[#5E97A9] focus:text-[#5E97A9] duration-300" onClick={() =>{
                                        setOpenDrop(!openDrop)
                                    }}>
                                     <IoIosMore/>
                                    </span>
                                <div id='drop-menu' ref={DropMenuRef} className= {` ${!openDrop ? 'hidden': 'block' } rounded-lg   absolute text-base right-[-10px]  top-[100%] bg-gradient-to-br from-[#283137] to-[#242729] border border-white/30  transition-all duration-20 animate-fade-down `}>
                                    <ul className="w-80 py-4">
                                        <li className="m-4 flex gap-8 hover:text-[#5E97A9] duration-200 transition-all cursor-pointer " onClick={() =>{
                                                chatContext.setOpenModal(true)
                                                chatContext.setModalMessage("unfriend this user")
                                                const action:Action = {type: ActionType.UNFRIEND, Target_User_Login: chatContext.active?.user2.login, ConversationChannel:chatContext.active?.channelId};
                                                userContext?.setAction(action)
                                                }}>
                                                <span className="inline-block text-xl"><IoPersonRemoveOutline /></span>
                                                
                                            <p>
                                                Unfriend
                                            </p>
                                        </li>
                                        <li className="m-4 flex gap-8 hover:text-[#5E97A9] duration-200 transition-all cursor-pointer "  onClick={
                                            () => {
                                                chatContext.setOpenModal(true)
                                                chatContext.setModalMessage("block this user")
                                                const action:Action = {type: (Status=='Block' ? ActionType.BLOCK : ActionType.UNBLOCK), Target_User_Login: chatContext.active?.user2.login, ConversationChannel:chatContext.active?.channelId};
                                                userContext?.setAction(action)
                                            }
                                        }>
                                                <span className="inline-block text-xl"><MdOutlineBlock/></span>
                                            <p>
                                                {Status}
                                            </p>
                                        </li>
                                        <li className="m-4 flex gap-8 hover:text-[#5E97A9] duration-200 transition-all cursor-pointer "  onClick={
                                            () => {
                                                chatContext.setOpenModal(true)
                                                chatContext.setModalMessage("delete this conversation")
                                            }
                                        }>
                                                <span className="inline-block text-xl"><IoTrashOutline/></span>
                                            <p>
                                                Delete Conversation
                                            </p>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                    </div>
                    {/* <div className="bg-white w-[100%] h-[1px] lg:mt-4 rounded-full "></div> */}
                </div>
                    <div ref={containerRef} onScroll={handleContainerScroll} className=" text-white basis-[85%]  text-[14px] rounded-lg   p-3 sm:p-5 flex flex-col gap-10 overflow-y-auto overflow-x-hidden ">
                    {/* #{loading ? <MessageLoading/> : <></>} */}
                    {
                        chatContext.active?.messages?.map((msg, index): React.ReactNode => {
                            return(
                                <div key={index} id='message-container' className={` w-[80%] flex ${msg.sender?.id === chatContext.active?.user1.id && "flex-row-reverse self-end"} items-end gap-4 mt-auto `}>
                                <img src={`${backendPath + msg?.sender?.profile_pic}`} alt="" className=" w-[50px] h-[50px] 2xl:w-[60px] 2xl:h-[60px] aspect-square rounded-full object-cover rounded-full cursor-pointer" onClick={()=>{
                                    setOpenDrop(false)
                                    chatContext.setShowProfile(true)
                                }}/>
                                <div id='message' className={`${msg?.sender?.id !== chatContext.active?.user1.id ? 'bg-[#5E97A9] rounded-br-2xl' : 'bg-slate-800 rounded-bl-2xl'}  py-2 px-4 rounded-t-2xl  text-base 2x:text-lg flex flex-col justify-between min-w-[90px]`}>
                                    <p>{msg?.content}</p>
                                    <p className=" text-right text-white/50 text-[13px]">{formatDate2(msg?.timestamp)}</p>
                                </div>
                            </div>
                            )
                            
                        })
                    }
                </div>
                <div id="conversation-footer-container" className="py-4 px-16 flex justify-between items-center gap-1 sm:gap-4  ">
                    {/* <span className="bg-[#5E97A9] text-white rounded-full hover:bg-white hover:text-[#5E97A9] duration-300 text-2xl md:text-3xl lg:text-4xl basis-[2.5%] cursor-pointer p-0 sm:p-1">
                        <HiPlus/>
                    </span> */}
                    <input type="text" placeholder="Message" className=" bg-transparent rounded-full border border-white/20 focus:outline-none text-white   text-sm sm:text-md px-4 py-4  basis-[95%]" value={message} onChange={(e)=> setMessage(e.target.value)} onKeyDown={TryToSendMessage}/>
                    <span  onClick={sendMessage} className="bg-[#5E97A9] text-white rounded-lg  hover:bg-white hover:text-[#5E97A9] duration-300 text-2xl md:text-3xl lg:text-4xl basis-[2.5%] cursor-pointer p-0 sm:p-1">
                        <RiSendPlaneFill />
                    </span>
                </div>

            </div>
    )
}
export default ChatSession