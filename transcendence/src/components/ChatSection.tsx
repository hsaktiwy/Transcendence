import React, { useContext, useState } from "react";
import ChatSession from "./ChatSession";
import Conversations from "./Conversations";
import {ChatSectionContext, Conversation, Message, User} from "../utils/ChatContext"
import {convs} from "../utils/ConversationsList"


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
    const [activeSectionOnSm, setActiveSection] = useState<React.ReactNode>(<ChatSession/>)
    return(

        <ChatSectionContext.Provider value={{convs, setActive, active, activeSectionOnSm, setActiveSection}}>
            <div className=" animate-fade-down ml-1 lg:ml-[140px]   mr-1 lg:mr-6 my-6 grid grid-cols-12 grid-rows-12 gap-2 lg:gap-4 h-[calc(100vh-128px)] overflow-hidden">
                <Conversations/>
                <ChatSession/>
                {/* <div className="bg-[#898989] rounded-lg shadow-xl hidden lg:block lg:col-span-3 row-span-12">User</div> */}
                
            </div>
        </ChatSectionContext.Provider>
    )
}

export default ChatSection