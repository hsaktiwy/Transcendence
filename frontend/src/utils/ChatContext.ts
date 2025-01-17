import { createContext } from "react";

export interface User{
    id: number;
    login:string;
    email:string;
    firstName:string;
    lastName:string;
    state:string;
    last_visit:string | null;
    profile_pic:string;
    CoverProfile: string;
}

export interface Message{
    id: number;
    sender: User | undefined;
    content: string;
    isread:boolean;
    timestamp:string
}

export interface Conversation {
    channelId: number;
    user1: User;
    user2: User;
    messages: Message[];
    LastUpdate: string
    last_packet: number
    next_packet_number: number
    is_next_packet: number
    scrollTop: number
    scrollLeft: number
    status: 0 | 1
    new_message: 0|1
    packet_max_size: Number
}

export interface ContextType {
    convs: Conversation[] | undefined;
    setConvs: React.Dispatch<React.SetStateAction<Conversation[] | undefined>>
    setActive: React.Dispatch<React.SetStateAction<Conversation | undefined>>
    active: Conversation | undefined
    activeSectionOnSm: string
    setActiveSection: React.Dispatch<React.SetStateAction<string >>;
    showProfile: boolean;
    setShowProfile: React.Dispatch<React.SetStateAction<boolean >>;
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean >>;
    modalMessage: string;
    setModalMessage: React.Dispatch<React.SetStateAction<string >>;
}

export const ChatSectionContext = createContext<ContextType | undefined>(undefined)
