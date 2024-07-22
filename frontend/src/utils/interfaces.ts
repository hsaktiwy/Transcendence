import { CallbackType } from "./types";
export interface childrenInterface{
    children: React.ReactNode
}

// this will help us idenifying the channels element type in WSContext.ts 
export interface channelType {
[key: string]: CallbackType;
}

export interface WebSocketContextType {
    addMessageHandler: (channelName: string, callback: CallbackType) => void;
    removeChannel: (channelName: string) => void;
    socket: React.MutableRefObject<WebSocket | undefined>
}
  