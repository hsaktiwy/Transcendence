import React, { useContext, useRef, useState,useEffect } from "react";
import {ChatSectionContext, ContextType, Conversation, Message} from "../utils/ChatContext"
import { IoIosMore } from "react-icons/io";
import { HiPlus } from "react-icons/hi2";


import { RiSendPlaneFill } from "react-icons/ri";
import { IoArrowBackOutline } from "react-icons/io5";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FiUser } from "react-icons/fi";

import { MdOutlineBlock } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";

import Conversations from "./Conversations";
import ChatModal from "./ChatModal";
import { WebSocketContext } from "../utils/WSContext";
import { BACKEND, CONVERSATION, MESSAGES_PACKET_SIZE, ws_url } from "../utils/Constants";
import mailman from "../utils/AxiosFetcher";

export const backendPath:string = BACKEND.substring(0, BACKEND.length - 1)
function ChatSession(){
    
    const chatContext =useContext(ChatSectionContext)
    if (!chatContext)
     throw new Error('error')
    const SocketContext = useContext(WebSocketContext)
    if (!SocketContext)
        throw new Error('error')

    const  [messageArray, setMessageArray] = useState<Message[] | undefined>(chatContext?.active?.messages)// hamza
    const [backToMessages, setBackToMessages] = useState<boolean>(false)
    const [message, setMessage] = useState('')// hamza
    const [update, setUpdate] = useState<boolean>(false)// hamza
    const [init ,setInit] = useState<boolean>(false)// hamza
    const  {AddChannel, RemoveChannel, socket} = SocketContext;// hamza
    const containerRef = useRef<HTMLDivElement | null>(null);// amine 
    const DropMenuRef = useRef<HTMLDivElement | null>(null);// amine 
    const [scrollPosition, setScrollPosition] = useState({scrollTop: -1, scrollLeft:-1})
    const testref = useRef<any>(null);// amine 
    const [loading, setLoading] = useState<boolean>(false)
    const [openDrop, setOpenDrop] = useState<boolean>(false)// amine 
    //amine
    useEffect(() => {
        // Scroll to the bottom whenever the messages array changes
        console.log('initial scroll');
        if (containerRef.current && chatContext.active?.scrollLeft === -1 && chatContext.active?.scrollTop === -1) {
            console.log('ola' + containerRef.current?.scrollLeft + ' ' + containerRef.current?.scrollHeight);

            //containerRef.current.scrollTop = containerRef.current.scrollHeight;

            const newScrollTop = containerRef.current.scrollHeight;
            const newScrollLeft = containerRef.current.scrollLeft;

            // Updating the active conversation's scroll properties
            chatContext.setActive((prevConv) => ({
                ...prevConv,
                scrollTop: newScrollTop,
                scrollLeft: newScrollLeft,
            }));

            chatContext.setConvs((prevConvs) => {
                return prevConvs.map((conv) =>
                    conv.channelId === chatContext.active?.channelId
                        ? { ...conv, scrollTop: newScrollTop, scrollLeft: newScrollLeft }
                        : conv
                );
            });
            setUpdate(true)
            console.log(chatContext.active);
        }
    }, [scrollPosition, messageArray, chatContext.active, chatContext.setActive, chatContext.setConvs]);


    useEffect(() => {
        // Scroll to the bottom whenever the messages array changes
        console.log('hahahaha --->')
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
          setUpdate(false)
        }

    }, [update]);
    //amine
    useEffect(() =>{
        const handleCloseMenu = (e:any) =>{
            // if ()
            //     console.log("d",e.target.parentElement.className)
            
            if(e.target  && e.target.parentElement && e.target.parentElement.className.split(' ')[0] !== 'drop')
            {
                if (openDrop)
                    setOpenDrop(false)
            }
          
        }
        window.addEventListener('click', (e) => handleCloseMenu(e))
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
            console.log(holder);
            socket.current.send(holder)
            setMessage('')
        }
    }
    const TryToSendMessage = (event: React.KeyboardEvent) =>
    {
        //console.log('event.key ' + event.key + ' message ' + message)
        if (event.key === 'Enter' && message.length > 0)
        {
            console.log((socket.current && socket.current.readyState === WebSocket.OPEN))
            if (socket.current && socket.current.readyState === WebSocket.OPEN)
            {
                let holder:string = JSON.stringify({type: 'NOTIFICATION_MESSAGE', to:`${chatContext.active?.user2.login}` , message : message})
                socket.current.send(holder)
                holder = JSON.stringify({type: 'MESSAGE', channel: 'CHATROOM' + chatContext.active?.channelId, message : message})
                socket.current.send(holder)
                console.log(holder);
                setMessage('')
            }
            else
                console.error('WebSocket connection is not open')
        }
    }
    const [inc, setInc] = useState(2222);
    // hamza
    useEffect(()=>
    {
        const UpdateCurrentConvs = (message_received, __channelId:number) =>
        {
            console.log('target tryin g to update it self ... '+ __channelId +' '+ chatContext.active?.channelId)
            if (__channelId == chatContext.active?.channelId)
            {
                console.log('Updated in process ...')
                chatContext.setActive((prevActive) => ({
                    ...prevActive,
                    messages: [...prevActive.messages, message_received]
                }));
                console.log('Updated success')
                setUpdate(true)
            }
            console.log('init')
        }
        AddChannel('CHATROOM', UpdateCurrentConvs)
        setInit(true)
        return () => {
        // Remove the CHATROOM call back function when we exist the chat section
            RemoveChannel('CHATROOM')
        }
    },[init, chatContext.active])

    useEffect(()=>
    {
        console.log('Update Current chat : ' + chatContext.active?.channelId);
        console.log(chatContext.active)
        setMessageArray(chatContext.active?.messages)
    }, [chatContext.active])
    
    // this function will update our conv list and add packet of old messages to it
    // const 
    const FecthOldMessages = async ()=>
    {
        try
        {
            const extracting = 'update/' + chatContext.active?.channelId + '/' + MESSAGES_PACKET_SIZE + '/' + chatContext.active?.next_packet_number + '/'
            const url = CONVERSATION + extracting
            console.log(url)
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
            if (chatContext.active?.last_packet < old_messages.next_packet_number)
            {
                console.log('wtf')
                console.log(old_messages)
                console.log(chatContext.active)
                chatContext.setActive((prevConv) => ({
                    ...prevConv,
                    last_packet: prevConv?.next_packet_number,
                    next_packet_number: old_messages.next_packet_number,
                    is_next_packet: old_messages.is_next_packet,
                    messages: [...old_messages.messages, ...prevConv.messages]
                }));
                chatContext.setConvs((prevConvs: Conversation[]) => {
                    const updatedConvs = prevConvs.map((conv)=> conv.channelId == chatContext.active?.channelId ?
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
        console.log(chatContext.active)
    }
    useEffect(()=>
    {
        const {scrollTop} =  scrollPosition
        if (scrollTop == 0 && chatContext.active?.is_next_packet)
        {
            FecthOldMessages()
        }
    }, [scrollPosition])
    // function hthat will check for scrol behavior
    const handleContainerScroll = ()=>{
        if (containerRef.current)
        {
            const {scrollTop, scrollLeft} = containerRef.current
            setScrollPosition({scrollTop, scrollLeft});
        }
    }

    return(
            <div  className={`   rounded-xl lg:rounded-none     font-poppins flex flex-col justify-between overflow-hidden absolute  lg:left-[30%] xl:left-[22%] ${chatContext.showProfile? `${chatContext.activeSectionOnSm==='chat' ? 'w-full' : 'w-0'} lg:w-[calc(70%-280px)] xl:w-[calc(78%-380px)] 2xl:w-[calc(78%-480px)] ` : `${chatContext.activeSectionOnSm==='chat' ? 'w-full' : 'w-0'} lg:w-[70%] xl:w-[78%] lg:rounded-r-xl`}  h-full transition-all duration-800
            `}>
                <div id="conversation-header-container" className="bg-black/35">
                    <div id="conversation-header" className="text-white grid grid-cols-4 px-4 py-[2px]">
                            <div id="friend-info" className="col-span-3 flex gap-2 sm:gap-4 lg:gap-8 items-center cursor-pointer">
                                <span className="inline-block lg:hidden text-[24px] mx-2 my-4 sm:m-4 cursor-pointer hover:text-[#5E97A9] focus:text-[#5E97A9] duration-300" onClick={() =>{
                                    setOpenDrop(false)
                                    chatContext.setActiveSection('conversations')
                                    chatContext.setActive(undefined)
                                }}>
                                <IoArrowBackOutline />
                                </span>
                                <img src={`${chatContext.active &&  `${backendPath +  chatContext.active.user2.profile_pic}`}`} alt="user-pic" className="w-[40px] h-[40px] rounded-full cursor-pointer" onClick={()=>{
                                    chatContext.setShowProfile(true)
                                }}/>
                                <div className="cursor-pointer" onClick={()=>{
                                    chatContext.setShowProfile(true)
                                }}>
                                    <p className=" text-[14px] font-semibold">{chatContext.active &&  chatContext.active.user2.firstName + " " + chatContext.active.user2.lastName}</p>
                                    <p className=" text-[12px] text-gray-400">{`@${chatContext.active &&  chatContext.active.user2.login}`}</p>
                                </div>
                            </div>
                            <div id='conv-header-menu ' className="drop relative col-span-1 flex justify-self-end items-center text-[24px]">
                                <span className="  m-4 cursor-pointer hover:text-[#5E97A9] focus:text-[#5E97A9] duration-300" onClick={()=>{
                                    setOpenDrop(false)
                                    chatContext.setShowProfile(true)
                                }}>
                                <IoMdInformationCircleOutline />
                                </span>
                                    <span  ref={testref}   className="drop  m-4 cursor-pointer hover:text-[#5E97A9] focus:text-[#5E97A9] duration-300" onClick={() =>{
                                        setOpenDrop(!openDrop)
                                    }}>
                                     <IoIosMore/>
                                    </span>
                                <div id='drop-menu' ref={DropMenuRef} className= {` ${!openDrop ? 'hidden': 'block' } rounded-b-lg absolute text-base right-[-10px]  top-[100%] bg-[#1D1E22]  transition-all duration-75 animate-fade-down `}>
                                    <ul className="w-80 py-4">
                                        <li className="m-4 flex gap-8 hover:text-[#5E97A9] duration-200 transition-all cursor-pointer ">
                                                <span className="inline-block text-xl"><FiUser/></span>
                                            <p>
                                                View Profile
                                            </p>
                                        </li>
                                        <li className="m-4 flex gap-8 hover:text-[#5E97A9] duration-200 transition-all cursor-pointer "  onClick={
                                            () => {
                                                chatContext.setOpenModal(true)
                                                chatContext.setModalMessage("block this user")
                                            }
                                        }>
                                                <span className="inline-block text-xl"><MdOutlineBlock/></span>
                                            <p>
                                                Block
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
                        messageArray?.map((msg, index): React.ReactNode => {
                            return(
                                <div key={index} id='message-container' className={` w-[80%] flex ${msg.sender.id === chatContext.active?.user1.id && "flex-row-reverse self-end"} items-end gap-4 mt-auto `}>
                                <img src={`${backendPath + msg.sender.profile_pic}`} alt="" className=" w-[50px] h-[50px] 2xl:w-[60px] 2xl:h-[60px] rounded-full cursor-pointer" onClick={()=>{
                                    setOpenDrop(false)
                                    chatContext.setShowProfile(true)
                                }}/>
                                <div id='message' className={`${msg.sender.id !== chatContext.active?.user1.id ? 'bg-[#5E97A9] rounded-br-2xl' : 'bg-slate-800 rounded-bl-2xl'}  py-2 px-4 rounded-t-2xl  text-base 2x:text-lg`}>
                                    <p >{msg.content}</p>
                                </div>
                            </div>
                            )
                            
                        })
                    }
                </div>
                <div id="conversation-footer-container" className="p-4 flex justify-between items-center gap-1 sm:gap-4 ">
                    <span className="bg-[#5E97A9] text-white rounded-full hover:bg-white hover:text-[#5E97A9] duration-300 text-2xl md:text-3xl lg:text-4xl basis-[2.5%] cursor-pointer p-0 sm:p-1">
                        <HiPlus/>
                    </span>
                    <input type="text" placeholder="Message" className=" rounded-full border-1 border-white focus:outline-none text-white bg-[#1D1E22]  text-sm sm:text-md pl-2 py-2 focus:text-black focus:bg-slate-200  focus:border-black duration-300 basis-[95%]" value={message} onChange={(e)=> setMessage(e.target.value)} onKeyDown={TryToSendMessage}/>
                    <span  onClick={sendMessage} className="bg-[#5E97A9] text-white rounded-lg hover:bg-white hover:text-[#5E97A9] duration-300 text-2xl md:text-3xl lg:text-4xl basis-[2.5%] cursor-pointer p-0 sm:p-1">
                        <RiSendPlaneFill />
                    </span>
                </div>

            </div>
    )
}
export default ChatSession