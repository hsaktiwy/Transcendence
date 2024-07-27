import { createContext } from "react";

export interface User{
    id: number;
    firstName: string;
    lastName: string;
    login: string;
    profile_pic: string;
}
export interface Message{
    id: number;
    sender: User;
    content: string;
}
export interface Conversation {
    channelId: number;
    user1: User;
    user2: User;
    messages: Message[];
    LastUpdate: string
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
