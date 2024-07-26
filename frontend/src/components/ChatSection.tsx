import React, { useContext, useEffect, useState } from "react";
import ChatSession from "./ChatSession";
import Conversations from "./Conversations";
import {ChatSectionContext, Conversation, Message, User} from "../utils/ChatContext"
import {convs} from "../utils/ConversationsList"
import ChatFriendInfo from "./ChatFriendInfo";
import NoActiveChat from "./NoActiveChat";
import ChatModal from "./ChatModal";

import { createContext } from "react";



function ChatSection(){
//     const users: User[] = [
//         {
//             id: 1,
//             firstName: "Amine",
//             lastName: "Alami",
//             username: "yopi",
//             profilePic: "./src/assets/8.jpg"
//         },
//         {
//             id: 2,
//             firstName: "Hamza",
//             lastName: "Hamza",
//             username: "piwai",
//             profilePic: "./src/assets/2.png"
//         }
        
//     ]
//    const convs: Conversation[] = [

//         {
//             channelId: 1,
//             user1: users[0],
//             user2: users[1],
//             messages: [
//                 {id: 1, sender: users[1], content: "hey"},
//                 {id: 2, sender: users[0], content: "hello"},
//                 {id: 3, sender: users[1], content: "how are you"},
//                 {id: 4, sender: users[0], content: "Loreorem ipsum dolor sit amet consectetur adipisicing elit. Unde voluptatibus vel eos non suscipit debitis quaerat laudantium facere eveniet porro? Consectetur consequatur porro repellendus nisi eum laudantium amet numquam accusamus!"},
//                 {id: 5, sender: users[1], content: "Loreorem ipsum dolor sit amet consectetur adipisicing elit. Unde voluptatibus vel eos non suscipit debitis quaerat laudantium facere eveniet porro? Consectetur consequatur porro repellendus nisi eum laudantium amet numquam accusamus!"},
//                 {id: 6, sender: users[0], content: "Loreorem ipsum dolor sit amet consectetur adipisicing elit. Unde voluptatibus vel eos non suscipit debitis quaerat laudantium facere eveniet porro? Consectetur consequatur porro repellendus nisi eum laudantium amet numquam accusamus!"},
//             ]
//         },
//         {
//             channelId: 2, 
//             user1: users[0],
//             user2: users[1],
//             messages: [
//                 {id: 1, sender: users[1], content: "hey"},
//                 {id: 2, sender: users[0], content: "hello"},
//             ]
//         },
//     ]

    const [active, setActive] = useState<Conversation | undefined>(undefined)
    const [activeSectionOnSm, setActiveSection] = useState<string>('conversations')
    const [showProfile, setShowProfile] = useState<boolean>(false)
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [modalMessage, setModalMessage] = useState<string>("")
    return(

        <ChatSectionContext.Provider value={{convs, setActive, active, activeSectionOnSm, setActiveSection, showProfile, setShowProfile, openModal, setOpenModal, modalMessage, setModalMessage}}>
            {/* animate-fade-down ml-2 lg:ml-[140px]   mr-2 lg:mr-6 mt-6  mb-6 h-[calc(100vh-118px)] overflow-hidden relative */} 
            {openModal && <ChatModal/>}
            <div className="rounded-xl  bg-black/35 backdrop-filter backdrop-blur-sm animate-fade-down absolute top-[60px]  left-0 lg:left-[80px] h-[calc(100%-80px)] w-[calc(100%-20px)] lg:w-[calc(100%-100px)] 2xl:w-[calc(80%)] my-[10px] mx-[10px] 2xl:mx-[8%]">
                <div className="  h-[100%] overflow-hidden relative ">
                    <Conversations/>
                    {!active && <NoActiveChat/>}
                    {active && <ChatSession/>}
                    {active && <ChatFriendInfo/>}
                    {/* <div className="bg-[#898989] rounded-lg shadow-xl hidden lg:block lg:col-span-3 row-span-12">User</div> */}
                    
                </div>
            </div>
        </ChatSectionContext.Provider>
    )
}

export default ChatSection