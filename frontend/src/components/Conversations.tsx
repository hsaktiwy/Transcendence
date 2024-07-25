// import React from "react";

// function Conversations(){

//     interface Message{
//         id: number;
//         sender: string;
//         content: string;
//         profile_picture: string;
//     }
//     interface Conversations {
//         channelId: number;
//         messages: Message[];
//     }

//     const convs: Conversations[] = [

//         {
//             channelId: 1, 
//             messages: [
//                 {id: 2, sender: "Hamza", content: "hey", profile_picture: "./src/assets/8.jpg"},
//                 {id: 1, sender: "Amine", content: "hello", profile_picture: "./src/assets/8.jpg"},
//                 {id: 2, sender: "Hamza", content: "how are you", profile_picture: "./src/assets/8.jpg"},
//                 {id: 1, sender: "Amine", content: "Loreorem ipsum dolor sit amet consectetur adipisicing elit. Unde voluptatibus vel eos non suscipit debitis quaerat laudantium facere eveniet porro? Consectetur consequatur porro repellendus nisi eum laudantium amet numquam accusamus!", profile_picture: "./src/assets/8.jpg"},
//                 {id: 2, sender: "Hamza", content: "Loreorem ipsum dolor sit amet consectetur adipisicing elit. Unde voluptatibus vel eos non suscipit debitis quaerat laudantium facere eveniet porro? Consectetur consequatur porro repellendus nisi eum laudantium amet numquam accusamus!", profile_picture: "./src/assets/8.jpg"},
//                 {id: 1, sender: "Amine", content: "Loreorem ipsum dolor sit amet consectetur adipisicing elit. Unde voluptatibus vel eos non suscipit debitis quaerat laudantium facere eveniet porro? Consectetur consequatur porro repellendus nisi eum laudantium amet numquam accusamus!", profile_picture: "./src/assets/8.jpg"},
//             ]
//         },
//         {
//             channelId: 2, 
//             messages: [
//                 {id: 2, sender: "Hamza", content: "hey", profile_picture: "./src/assets/8.jpg"},
//                 {id: 1, sender: "Amine", content: "hello", profile_picture: "./src/assets/8.jpg"},
//             ]
//         },
//         {
//             channelId: 3, 
//             messages: [
//                 {id: 1, sender: "Amine", content: "hello", profile_picture: "./src/assets/8.jpg"},
//                 {id: 2, sender: "Hamza", content: "hey", profile_picture: "./src/assets/8.jpg"},
//             ]
//         }
//     ]
   
// return(
//     <div className="bg-[#323232] rounded-lg shadow-xl col-span-3 row-span-12 px-0 sm:px-2 pt-4 font-poppins lg:flex lg:flex-col overflow-auto">
//             <div className="messages-header-container hidden lg:text-xl text-white lg:flex flex-col items-center gap-8">
//                 <h1>Messages</h1>
//                 <div className="bg-zinc-300 w-[100%] h-[1px] mt-4 rounded-full"></div>
//             </div>
//             <div id="messages-conatiner" className="text-white my-2 flex flex-col gap-2 ">
//                 <div className=" mb-4 flex justify-center xl:justify-start gap-6">

//                     <img src="./src/assets/8.jpg" alt="friend-pic" className="rounded-full  object-contain w-12 h-12  lg:w-10 lg:h-10 2xl:w-16 2xl:h-16" />
//                     <div className="self-center hidden lg:block">
//                         <h1 className="text-sm xl:text-md 2xl:text-lg">Lorem ipsum</h1>
//                         <p className="text-gray-300 text-xs lg:text-md">Lorem ipsum dolor sit amet...</p>
//                     </div>
//                 </div>
//                 <div className=" mb-4 flex justify-center xl:justify-start gap-6">

//                     <img src="./src/assets/8.jpg" alt="friend-pic" className="rounded-full  object-contain w-12 h-12  lg:w-10 lg:h-10 2xl:w-16 2xl:h-16" />
//                     <div className="self-center hidden lg:block">
//                         <h1 className="text-sm xl:text-md 2xl:text-lg">Lorem ipsum</h1>
//                         <p className="text-gray-300 text-xs lg:text-md">Lorem ipsum dolor sit amet...</p>
//                     </div>
//                 </div>
//                 <div className=" mb-4 flex justify-center xl:justify-start gap-6">

//                     <img src="./src/assets/8.jpg" alt="friend-pic" className="rounded-full  object-contain w-12 h-12  lg:w-10 lg:h-10 2xl:w-16 2xl:h-16" />
//                     <div className="self-center hidden lg:block">
//                         <h1 className="text-sm xl:text-md 2xl:text-lg">Lorem ipsum</h1>
//                         <p className="text-gray-300 text-xs lg:text-md">Lorem ipsum dolor sit amet...</p>
//                     </div>
//                 </div>
//                 <div className=" mb-4 flex justify-center xl:justify-start gap-6">

//                     <img src="./src/assets/8.jpg" alt="friend-pic" className="rounded-full  object-contain w-12 h-12  lg:w-10 lg:h-10 2xl:w-16 2xl:h-16" />
//                     <div className="self-center hidden lg:block">
//                         <h1 className="text-sm xl:text-md 2xl:text-lg">Lorem ipsum</h1>
//                         <p className="text-gray-300 text-xs lg:text-md">Lorem ipsum dolor sit amet...</p>
//                     </div>
//                 </div>
//             </div>
//     </div>
// )

// }

// export default Conversations
import React, { useContext, useEffect, useState } from "react";
import {ChatSectionContext, ContextType, Conversation, Message} from "../utils/ChatContext"
import { WebSocketContext } from "../utils/WSContext";
import { convs } from "../utils/ConversationsList";

let inc:number=  22222
function Conversations(){
   const chatContext =useContext(ChatSectionContext)
   if (!chatContext)
    throw new Error('error')
//    const SocketContext =useContext(WebSocketContext)

//    const socket = SocketContext.socket

//     useEffect(()=>
//     {
//         socket.current.onmessage = (message) => {
//             console.log('????>>>>>>')
//             const { type, ...data } = JSON.parse(message.data)
//             const channelName: string = data.channel
//             console.log('type :' + type + '\n- ---> data :' + data.message )
//             if (channelName.startsWith('CHATROOM'))
//             {
//                 const message_received:Message = {
//                     id: inc++,
//                     sender: data.user,
//                     content: data.message,
//                 }
//                 console.log('????2>>>>>>')
//                 const channelId:number = parseInt(channelName.split('CHATROOM')[1])
//                 chatContext.convs[channelId].messages.push(message_received)
//             }

//         }
//     }, [socket])

return(
    <div className={`bg-[#222222] rounded border-r-[1px] border-white  border-opacity-50 absolute ${chatContext.activeSectionOnSm === 'conversations' ? 'w-[100%]' : 'w-0'} lg:w-[30%] xl:w-[22%] h-full  pt-4 font-poppins flex flex-col gap-6 overflow-auto duration-800  transition-all`}>
            <div className="messages-header-container text-lg font-semibold  text-white flex flex-col items-center gap-2">
                <h1 className="self-start ml-4">All Chats</h1>
                <div className="bg-zinc-300 w-[100%] h-[1px] lg:mt-5 rounded-full opacity-50"></div>
            </div>

            {/* <div className="online-friends-container">
                <h1 className="text-white font-semibold mt-4 ml-4">Online Friends</h1>
                <div className="online-friends my-8 flex gap-2 overflow-y-auto">
                    {
                        chatContext.convs.map((conv, index) : React.ReactNode =>{
                            return(
                                <div key={index} className="relative">
                                    <div className="absolute bg-green-500 h-2 w-2 rounded-full bottom-0 right-0"></div>
                                    <img src={conv.user2.profile_pic} alt="friend-pic" className="w-[40x] h-[40px] rounded-full " />
                                </div>
                            )
                        })
                    }
                </div>
            </div> */}
            <div id="messages-conatiner" className="text-white my-2 flex flex-col gap-2 ">
                {/* <div className=" mb-4 flex justify-center xl:justify-start gap-6"> */}
                    {
                        chatContext.convs.map((conv, index): React.ReactNode => {
                            interface convData{
                                lastMessage: string;
                                picture: string;
                                friendName: string;
                            }
                            const currentConvData: convData = {
                                lastMessage: conv.messages[conv.messages.length - 1].content,
                                picture: conv.user2.profile_pic,
                                friendName: conv.user2.firstName +  " " +conv.user2.lastName
                            }
                            return(
                                
                                <div key={index} className={` ${conv.channelId === chatContext.active.channelId ? "bg-black border-l-2 border-[#5E97A9]  " : ""} mb-4 flex justify-start gap-6 cursor-pointer hover:bg-black duration-150 rounded p-4 `} onClick={() =>{
                                    console.error(conv.channelId)
                                    chatContext.setActive(conv)
                                    chatContext.setActiveSection('chat')
                                }}>
                                        <img src={currentConvData.picture} alt="friend-pic" className="rounded-full  w-[40px] h-[40px]" />
                                        <div className="self-center ">
                                            <h1 className="text-md font-semibold">{currentConvData.friendName}</h1>
                                            <p className="text-gray-300 text-sm">{currentConvData.lastMessage.length >= 20 ? currentConvData.lastMessage.substring(0,20) + "..." : currentConvData.lastMessage}</p>
                                            
                                        </div>
                                        
                                    </div>
                               

                            )
                        })
                    }
                    {/* <img src="./src/assets/8.jpg" alt="friend-pic" className="rounded-full  object-contain w-12 h-12  lg:w-10 lg:h-10 2xl:w-16 2xl:h-16" />
                    <div className="self-center hidden lg:block">
                        <h1 className="text-sm xl:text-md 2xl:text-lg">Lorem ipsum</h1>
                        <p className="text-gray-300 text-xs lg:text-md">Lorem ipsum dolor sit amet...</p>
                    </div> */}
                {/* </div> */}
            </div>
    </div>
)

}

export default Conversations