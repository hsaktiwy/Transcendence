import React, { useContext, useState} from "react";
import {ChatSectionContext, Message} from "../utils/ChatContext"
import { UserContext } from "./UserContext";
import { formatDate2 } from "@/utils/textFromatting";
import EmptyConversationList from "./EmptyConversationList";

function Conversations(){
    const backendPath:string = import.meta.env.VITE_BACKEND.substring(0, import.meta.env.VITE_BACKEND.length - 1)
    const chatContext =useContext(ChatSectionContext)
    if (!chatContext)
        throw new Error('error')
    const userContextConsumer = useContext(UserContext)
    if (!userContextConsumer)
        throw new Error('error')
    const NoneMessage: Message = {
        id: 0,
        sender: undefined, 
        content: "No messages available",
        isread: true,
        timestamp: "2000-01-01T12:00"
        };
    const [searchTerm, setSearchTerm] = useState<string>('')
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setSearchTerm(e.target.value)
    }
    // const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>)=>{
    //     setSearchTerm('')
    // }
    // useEffect(()=>{
    //     if (chatContext.active && searchTerm.length>0)
    //         setSearchTerm('')
    // },[chatContext?.active])
return(
<div className={`    border-r-white/20 border-0 lg:border-r   absolute ${chatContext.activeSectionOnSm === 'conversations' ? 'w-[100%]' : 'w-0'} lg:w-[30%] xl:w-[22%] h-full   font-poppins flex flex-col gap-6 overflow-auto duration-800  transition-all rounded-l-3xl rounded-r-xl lg:rounded-r-none `}>
            <div className="messages-header-container   font-semibold  text-white flex flex-col   gap-4 py-4">
                <h1 className=" ml-8 text-2xl">Messages</h1>
                <div className="p-4 font-light relative ">
                    <input value={searchTerm} type="text" placeholder="Search" className=" px-5 py-3 bg-transparent w-full border border-white/20 rounded-full outline-none z-10" onChange={handleOnChange} />
                    {
                        searchTerm.length > 0 && chatContext.convs && chatContext.convs.filter(conv=>conv.user2.login.includes(searchTerm)).length > 0 &&
                        <div className="absolute  mt-5 left-[50%] -translate-x-[50%] w-[100%] h-[800px]   flex flex-col gap-2">
                            {
                                chatContext.convs.filter(conv=>conv.user2.login.includes(searchTerm)).map((item, index)=>{
                                    return(
                                        <div key={index} className={`h-[100px] relative mb-4 flex justify-start gap-6 cursor-pointer hover:bg-black/25 duration-150 rounded p-4 `} onClick={() =>{
                                            setSearchTerm('')
                                            chatContext.setActive(item)
                                            chatContext.setActiveSection('chat')
                                    }}>
                                
                                        <div className="relative inline-block">
                                            <img src={backendPath + item.user2.profile_pic} alt="friend-pic" className={`aspect-square rounded-full object-cover w-[50px] h-[50px] 2xl:w-[60px] 2xl:h-[60px]   `} />
                                        </div>
                                        <div className=" flex flex-col gap-3">
                                            <h1 className="text-sm xxl:text-lg font-semibold">{`${item.user2.firstName} ${item.user2.lastName}`}</h1>
                                            <p className="tex-sm text-white/75">{`@${item.user2.login}`}</p>
                                        </div>
                                    </div>  
                                    )
                                })
                            }
                        </div> 
                    //     :
                    //     <div className="absolute  mt-5 left-[50%] -translate-x-[50%] w-[100%] h-[800px]   flex flex-col gap-2">
                            
                    //         <h1>No Conversation found</h1>
                    //     </div>
                        }
                </div>
            </div>
            {
                chatContext.convs?.filter(conv => conv.messages.length > 0).length ?
                <div id="messages-conatiner" className={ ` text-white my-2 ${searchTerm.length > 0 ? 'hidden' : 'flex'} flex-col gap-2 `}>
                {
                    chatContext.convs?.filter(conv => conv.messages.length > 0 ).map((conv, index): React.ReactNode => {
                        interface convData{
                            lastMessage: Message;
                            picture: string;
                            friendName: string;
                            new_message: number;
                        }
                        const currentConvData: convData = {
                            lastMessage: (conv.messages && conv.messages.length != 0)  ? conv.messages[conv.messages.length - 1] : NoneMessage,
                            picture: conv.user2?.profile_pic,
                            friendName: conv.user2?.firstName +  " " +conv.user2?.lastName,
                            new_message:  conv.new_message
                        }
                        return(
                            
                            <div key={index} className={` ${conv.channelId === chatContext.active?.channelId ? " relative bg-black/25 border-l-2 border-[#5E97A9]  " : ""}  h-[100px] relative mb-4 flex justify-start gap-6 cursor-pointer hover:bg-black/25 duration-150 rounded p-4 `} onClick={() =>{
                                    chatContext.setActive(conv)
                                    chatContext.setActiveSection('chat')
                            }}>
                        
                            <div className="relative inline-block">
                                <img src={backendPath + currentConvData.picture} alt="friend-pic" className={`aspect-square rounded-full object-cover w-[50px] h-[50px] 2xl:w-[60px] 2xl:h-[60px] outline ${conv.user2.state ==='online' || conv.user2.state === 'in_game' ? 'outline-green-500' : conv.user2.state === 'offline' ? 'outline-red-500' : 'outline-[#5e98a9c9]'}  `} />
                            </div>                                    
                                    <div className="self-center flex-1">
                                        <div className="flex justify-between items-center">
                                            <h1 className="text-sm xxl:text-lg font-semibold">{currentConvData.friendName}</h1>
                                            {currentConvData.new_message!==0 &&  
                                    <div className=" rounded-full  w-[10px] h-[10px] bg-[#5E97A9]    text-sm font-light text-center">
                                    </div> }
                                        </div>
                                        <div className="flex justify-between items-center w-full ">
                                            <p className="text-gray-300 text-[12px] xxl:text-base"><span className={`${(currentConvData.lastMessage.sender && currentConvData.lastMessage.sender.unique_id === userContextConsumer.userData?.unique_id) ? 'inline-block' :'hidden'} mr-3`}>You : </span>{(currentConvData.lastMessage.sender && currentConvData.lastMessage?.content.length >= 10) ? currentConvData?.lastMessage?.content.substring(0,10) + "..." : ((currentConvData.lastMessage.sender) ? currentConvData?.lastMessage.content : <span className='text-red-400'>Can't see Data</span>)}</p>
                                            <p className="text-white/50">{formatDate2(currentConvData.lastMessage.timestamp, true)}</p>
                                        </div>
                                        
                                    </div>
                            </div>
                        )
                    }) 
                }
                </div> : searchTerm.length ===0 && <EmptyConversationList/>
            }
    </div>
)

}

export default Conversations