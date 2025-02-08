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

export interface channelType {
    [key: string]: CallbackType;
}

export interface WebSocketContextType {
    AddChannel: (channelName: string, callback: CallbackType) => void;
    RemoveChannel: (channelName: string) => void;
    socket: React.MutableRefObject<WebSocket | undefined>
}

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