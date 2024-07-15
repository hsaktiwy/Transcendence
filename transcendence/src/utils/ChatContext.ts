import { createContext } from "react";

export interface User{
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    profilePic: string;
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
}
export interface ContextType {
    convs: Conversation[];
    setActive: React.Dispatch<React.SetStateAction<Conversation>>;
    active: Conversation
    activeSectionOnSm: string;
    setActiveSection: React.Dispatch<React.SetStateAction<string >>;
    showProfile: boolean;
    setShowProfile: React.Dispatch<React.SetStateAction<boolean >>;
}

export const ChatSectionContext = createContext<ContextType | undefined>(undefined)
