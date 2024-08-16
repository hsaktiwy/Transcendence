import { CallbackType } from "./types";
export interface childrenInterface{
    children: React.ReactNode
}

// this will help us idenifying the channels element type in WSContext.ts 
export interface channelType {
    [key: string]: CallbackType;
}

export interface WebSocketContextType {
    AddChannel: (channelName: string, callback: CallbackType) => void; // ADD CALLBACK function that will gave us the ability to change the  targeted component data
    RemoveChannel: (channelName: string) => void;
    socket: React.MutableRefObject<WebSocket> | undefined
}

export const defaultContextValue: WebSocketContextType = {
    AddChannel: () => {},
    RemoveChannel: () => {},
    socket: undefined,
};