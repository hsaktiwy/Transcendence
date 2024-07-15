// import React from "react";

// function Conversations(){

//     interface Message{
//         id: number;
//         sender: string;
//         content: string;
//         profilePicture: string;
//     }
//     interface Conversations {
//         channelId: number;
//         messages: Message[];
//     }

//     const convs: Conversations[] = [

//         {
//             channelId: 1, 
//             messages: [
//                 {id: 2, sender: "Hamza", content: "hey", profilePicture: "./src/assets/8.jpg"},
//                 {id: 1, sender: "Amine", content: "hello", profilePicture: "./src/assets/8.jpg"},
//                 {id: 2, sender: "Hamza", content: "how are you", profilePicture: "./src/assets/8.jpg"},
//                 {id: 1, sender: "Amine", content: "Loreorem ipsum dolor sit amet consectetur adipisicing elit. Unde voluptatibus vel eos non suscipit debitis quaerat laudantium facere eveniet porro? Consectetur consequatur porro repellendus nisi eum laudantium amet numquam accusamus!", profilePicture: "./src/assets/8.jpg"},
//                 {id: 2, sender: "Hamza", content: "Loreorem ipsum dolor sit amet consectetur adipisicing elit. Unde voluptatibus vel eos non suscipit debitis quaerat laudantium facere eveniet porro? Consectetur consequatur porro repellendus nisi eum laudantium amet numquam accusamus!", profilePicture: "./src/assets/8.jpg"},
//                 {id: 1, sender: "Amine", content: "Loreorem ipsum dolor sit amet consectetur adipisicing elit. Unde voluptatibus vel eos non suscipit debitis quaerat laudantium facere eveniet porro? Consectetur consequatur porro repellendus nisi eum laudantium amet numquam accusamus!", profilePicture: "./src/assets/8.jpg"},
//             ]
//         },
//         {
//             channelId: 2, 
//             messages: [
//                 {id: 2, sender: "Hamza", content: "hey", profilePicture: "./src/assets/8.jpg"},
//                 {id: 1, sender: "Amine", content: "hello", profilePicture: "./src/assets/8.jpg"},
//             ]
//         },
//         {
//             channelId: 3, 
//             messages: [
//                 {id: 1, sender: "Amine", content: "hello", profilePicture: "./src/assets/8.jpg"},
//                 {id: 2, sender: "Hamza", content: "hey", profilePicture: "./src/assets/8.jpg"},
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
import React, { useContext, useState } from "react";
import {ChatSectionContext, ContextType, Conversation, Message} from "../utils/ChatContext"
function Conversations(){
   const chatContext =useContext(ChatSectionContext)
   if (!chatContext)
    throw new Error('error')
  
return(
    <div className="bg-[#323232] rounded-lg shadow-xl col-span-2 lg:col-span-3 row-span-12 px-0 sm:px-2 pt-4 font-poppins lg:flex lg:flex-col overflow-auto">
            <div className="messages-header-container hidden lg:text-xl text-white lg:flex flex-col items-center gap-8">
                <h1>Messages</h1>
                <div className="bg-zinc-300 w-[100%] h-[1px] mt-4 rounded-full"></div>
            </div>
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
                                picture: conv.user2.profilePic,
                                friendName: conv.user2.firstName +  " " +conv.user2.lastName
                            }
                            return(
                                
                                <div key={index} className={` ${conv.channelId === chatContext.active.channelId ? "bg-black" : ""} mb-4 flex justify-center lg:justify-start gap-6 cursor-pointer hover:bg-black duration-150 rounded-2xl p-4`} onClick={() =>{
                                    chatContext.setActive(conv)
                                }}>
                                        <img src={currentConvData.picture} alt="friend-pic" className="rounded-full  object-contain w-12 h-12  lg:w-10 lg:h-10 2xl:w-16 2xl:h-16" />
                                        <div className="self-center hidden lg:block">
                                            <h1 className="text-sm xl:text-md 2xl:text-lg">{currentConvData.friendName}</h1>
                                            <p className="text-gray-300 text-xs lg:text-md">{currentConvData.lastMessage.length >= 50 ? currentConvData.lastMessage.substring(0,50) + "..." : currentConvData.lastMessage}</p>
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