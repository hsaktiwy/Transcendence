import { CallbackType } from "./types";

export enum ActionType{
    UNFRIEND,
    UNBLOCK,
    BLOCK,
    NONE
}

export interface Action{
    type : ActionType;
    Target_User_Login: string | undefined;
    ConversationChannel: number | undefined;
}

export interface friendship{
    action:string,
    sender:string,
}

export interface MiniNotification{
    type: string,
    content: string,
    notification: string,
}


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

export interface LoseWins
{
    wins:number;
    lose:number;
}

export interface weekly_match_data
{
    week_start:string;
    week_end:string;
    match_count:number;
}
export interface LinechartData
{
    user:string;
    weekly_match_data: weekly_match_data[];
}

export interface RadarChartInterFace
{
    wins:number;
    lose:number;
    _wins:number;
    _lose:number;
}