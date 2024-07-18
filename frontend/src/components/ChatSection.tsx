import React, { useContext, useState } from "react";
import ChatSession from "./ChatSession";
import Conversations from "./Conversations";
import {ChatSectionContext, Conversation, Message, User} from "../utils/ChatContext"
import {convs} from "../utils/ConversationsList"
import ChatFriendInfo from "./ChatFriendInfo";

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

    const [active, setActive] = useState<Conversation>(convs[0])
    const [activeSectionOnSm, setActiveSection] = useState<string>('conversations')
    const [showProfile, setShowProfile] = useState<boolean>(false)
    return(

        <ChatSectionContext.Provider value={{convs, setActive, active, activeSectionOnSm, setActiveSection, showProfile, setShowProfile}}>
            {/* animate-fade-down ml-2 lg:ml-[140px]   mr-2 lg:mr-6 mt-6  mb-6 h-[calc(100vh-118px)] overflow-hidden relative */} 
            <div className=" animate-fade-down mx-auto mt-6  mb-6 h-[90%] shadow-md shadow-slate-300 rounded-md overflow-hidden relative">
                <Conversations/>
                <ChatSession/>
                <ChatFriendInfo/>
                {/* <div className="bg-[#898989] rounded-lg shadow-xl hidden lg:block lg:col-span-3 row-span-12">User</div> */}
                
            </div>
        </ChatSectionContext.Provider>
    )
}

export default ChatSection