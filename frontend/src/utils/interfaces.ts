import { CallbackType } from "./types";
import { ProfileDataInterface } from "./UserDataInterface";

export enum ActionType{
    UNFRIEND,
    UNBLOCK,
    BLOCK,
    NONE
}

export interface Action{
    type : ActionType;
    Target_User_UniqueId: string | undefined;
    ConversationChannel: number | undefined;
}

export interface friendship{
    action:string,
    sender:ProfileDataInterface,
    status?: boolean
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

export interface MatchHistoryDataInterface{
    id:number;
    user_p1: ProfileDataInterface;
    user_p2: ProfileDataInterface;
    time:string;
    type:string;
    draw: boolean;
    score_p1:number;
    score_p2:number;
}
export interface twoGames
{
    Pong:MatchHistoryDataInterface[];
    Chess:MatchHistoryDataInterface[];
}  


export interface UserRankResponse {
    // user_id: string;  
    wins: number;     
    xp: number;       
    level: number;  

}
export interface ProfileRank
{
    rank:number;
    level:number;
}
export interface rankInterface
{
    profile:ProfileRank;
    user:ProfileDataInterface;
}