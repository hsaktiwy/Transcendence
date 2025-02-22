import React, { createContext, useEffect } from "react";
import { UserDataInterface,ProfileDataInterface } from "../utils/UserDataInterface";
import { useContext, useState } from "react";


import mailman from "../utils/AxiosFetcher";
import { Action, friendship, MatchHistoryDataInterface, MiniNotification, UserRankResponse} from "@/utils/interfaces";
import { toast } from "react-toastify";

import { WebSocketContext } from "../utils/WSContext";
import { AuthContext } from "./AuhtenticationContext";
import LoadingIndecator from "./Loading";

import { useLocation, useNavigate } from "react-router-dom";

export interface NotificationPropreties{
    id: number;
    content: string;
    type: string;
    created: string;
    channel_id: number;
    friend_request_id: number;
    is_readed: boolean;
    sender: ProfileDataInterface;
    room_name?: string;
}
export interface NotificationStatePropreties{
    type: string,
    sender: ProfileDataInterface,
    state: string
}



interface UserContextInterface{
    // id: number | undefined;
    // setUserId: React.Dispatch<React.SetStateAction<number | undefined> >;
    userData: UserDataInterface | undefined
    setUserData: React.Dispatch<React.SetStateAction<UserDataInterface | undefined> >;
    profilePicChanged: boolean;
    setProfilePicChanged: React.Dispatch<React.SetStateAction<boolean> >;
    coverPicChanged: boolean;
    setCoverPicChanged: React.Dispatch<React.SetStateAction<boolean> >;
    notifications: NotificationPropreties[];
    setnotifications: React.Dispatch<React.SetStateAction<NotificationPropreties[] > >;
    newNotification: NotificationPropreties[];
    setNewNotification: React.Dispatch<React.SetStateAction<NotificationPropreties[] > >;
    notificationHandler: (data: NotificationPropreties) => void;
    action: Action | undefined;
    setAction:  React.Dispatch<React.SetStateAction<Action |  undefined> >;
    friendRequestSent: FriendRequestInterface[];
    setFriendRequestSent: React.Dispatch<React.SetStateAction<FriendRequestInterface[]> >;
    friendRequestReceived: FriendRequestInterface[];
    setFriendRequestReceived: React.Dispatch<React.SetStateAction<FriendRequestInterface[]> >;
    fetchNotification : () => void;
    friends: ProfileDataInterface[];
    setFriends: React.Dispatch<React.SetStateAction<ProfileDataInterface[]> >;
    fetchFriends : () => void;
    blockList: ProfileDataInterface[];
    setBlockList: React.Dispatch<React.SetStateAction<ProfileDataInterface[]> >;
    userMatchHistory: MatchHistoryDataInterface[];
    setUserMatchHistory: React.Dispatch<React.SetStateAction<MatchHistoryDataInterface[]> >;
    userRank: rankInterface[];
    setUserRank:React.Dispatch<React.SetStateAction<rankInterface[]> >;
    level :UserRankResponse  | undefined;
    setLevel:React.Dispatch<React.SetStateAction<UserRankResponse  | undefined> >;

    
}
interface FriendRequestInterface {
    id:number;
    sender:ProfileDataInterface;
    receiver:ProfileDataInterface;
    status:string;
    created_at:string
}


interface ProfileRank
{
    rank:number;
    level:number;
}
interface rankInterface
{
    profile:ProfileRank;
    user:ProfileDataInterface;
}

export const UserContext = createContext<UserContextInterface | undefined>(undefined)

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) =>{
    const Navigate = useNavigate()
    const AuthContextConsummer = useContext(AuthContext)
    const SocketContext = useContext(WebSocketContext)
    if (!SocketContext || !AuthContext)
        throw new Error('error')
    // const [id, setUserId] = useState<number | undefined>(undefined);
    const [userData, setUserData] = useState<UserDataInterface | undefined>(undefined);
    const [profilePicChanged, setProfilePicChanged] = useState<boolean>(false);
    const [coverPicChanged, setCoverPicChanged] = useState<boolean>(false);
    const [friendRequestSent, setFriendRequestSent] = useState<FriendRequestInterface[]>([])
    const [friendRequestReceived, setFriendRequestReceived] = useState<FriendRequestInterface[]>([])
    const [notifications, setnotifications] = useState<NotificationPropreties[]>([])
    const [newNotification, setNewNotification] = useState<NotificationPropreties[]>([])
    const [action, setAction] = useState<Action |  undefined>(undefined)
    const [friends, setFriends] = useState<ProfileDataInterface[]>([])
    const [ready, setReady] = useState<boolean>(false)
    const [blockList, setBlockList] = useState<ProfileDataInterface[]>([])
    const [userMatchHistory, setUserMatchHistory] = useState<MatchHistoryDataInterface[]>([]);
    const [userRank, setUserRank] = useState<rankInterface[]>([]);
    const [level, setLevel] = useState<UserRankResponse | undefined>();
    
    const location = useLocation()

  
    const PureNotification = (data:MiniNotification) =>
    {
        if (data.notification == 'Error')
            toast.error(data.content)

    }
    const rankData = async() =>
    {
        try{

            const req = {
               url: `/profile/get_top_rank/`,
               method: 'GET',
           };
           const resp = await mailman(req);
           if(resp.data.profiles)
            setUserRank(resp.data.profiles);
        }
        catch (err){
            console.error(" ",err)
        }
    }
    const matchHistoryData = async () =>{
        try
        {
            const req = {
                url: `/game/get_matches/${userData?.unique_id}/`,
                method: 'GET',
            };
            const resp = await mailman(req);
            if (resp.data.Game)
            setUserMatchHistory(resp.data.Game);
        }
        catch (error)
        {
            console.error(error)
        }
    }
    const fetchUserData = async () =>{

        try{
            const req = {
                url: `/api/user/`,
                method: 'GET',
                withCredentials: true,
            }
            const resp = await mailman(req)
            const respData: UserDataInterface = resp.data
            setUserData(respData)
            setProfilePicChanged(false)
            
        }
        catch (err){
            console.error(err)
        }
    }
    const fetchSentFriendRequest = async () =>{

        try{
            const req = {
                url: `/friendship/friend_requests_sent/`,
                method: 'GET',
                withCredentials: true,
            }
            const resp = await mailman(req)
            if (resp.data.length > 0){
                const data : FriendRequestInterface[] = resp.data
                setFriendRequestSent(data)
            }
            
        }
        catch (err){
            console.error(err)
        }
    }
    const fetchReceivedFriendRequest = async () =>{

        try{
            const req = {
                url: `/friendship/friend_requests_received/`,
                method: 'GET',
                withCredentials: true,
            }
            const resp = await mailman(req)
            if (resp.data.length > 0){
                const data : FriendRequestInterface[] = resp.data
                setFriendRequestReceived(data)
            }
        }
        catch (err){
            console.error(err)
        }
    }
    const getNewContent = (content: string, username: string) =>{
        const space = " "
        const index = content.indexOf(space)
        if (index !== -1){
            const contentSubStr = content.slice(index)
            return `${username} ${contentSubStr}`
        }
        return content

    }
    const getNotificationData = async (notifications: NotificationPropreties[]) =>{
        const tmp_senders: ProfileDataInterface[] = [];
        for(const notif of notifications){
            const str: string = " "
            if (notif.type === 'message' || notif.type === 'friendship' || notif.type === 'gameInvitation'){
                const index = notif.content.indexOf(str)
                const sender = notif.content.slice(0 , index)
                const sender_occurence = tmp_senders.filter((item)=>item.unique_id === sender)
                if (sender_occurence.length === 0)
                    {
                        try{
                            const req = {
                                url: `/api/users/${sender}/`,
                                method: 'GET',
                            }
                        const resp = await mailman(req)
                        notif.sender = resp.data
                        notif.content = getNewContent(notif.content, notif.sender.login)
                        tmp_senders.push(notif.sender)
                    }
                    catch (err){
                        console.error(err)
                    }
                }
                else{
                    notif.content = getNewContent(notif.content, sender_occurence[0].login)
                    notif.sender = sender_occurence[0]
                }

            }
        }
        return notifications
    }
    const fetchNotification = async () =>{

        try{
            const req = {
                url: `/api/user/notification/`,
                method: 'GET',
                withCredentials: true,
            }
            const resp = await mailman(req)
            let notificationData : NotificationPropreties[] = resp.data
            notificationData = await getNotificationData(notificationData)
            setnotifications(notificationData.sort((a, b)=> b.id - a.id))
            
        }
        catch (err){
            console.error(err)
        }

    }
    const fetchFriends = async () =>{
 
            try{
                const req = {
                    url: `/friendship/friend_list/`,
                    method: 'GET',
                    withCredentials: true,
                }
                const resp = await mailman(req)
                const friendsList: ProfileDataInterface[] = resp.data
                setFriends(friendsList)
            }
            catch (err){
                console.error(err)
            }
    
    }
    const fetchBlockList = async () =>{
 
        try{
            const req = {
                url: `/friendship/block_list/`,
                method: 'GET',
                withCredentials: true,
            }
            const resp = await mailman(req)
            const BlockList: ProfileDataInterface[] = resp.data
            setBlockList(BlockList)

        }
        catch (err){
            console.error(err)
        }

}
    const notificationHandler = (data: NotificationPropreties) => {

        data.content = getNewContent(data.content, data.sender.login)
        setnotifications(prev => [...prev, data].sort((a,b)=> b.id - a.id))
        setNewNotification(prev => [...prev, data])
        if (data.type === 'friendship')
        {
            fetchReceivedFriendRequest()
            fetchSentFriendRequest()
            fetchFriends()

        }
            
    }
    const removeGameInvite = async (notifs: NotificationPropreties[]) =>{
        try{
            for (let i = 0; i < notifs.length;i++){

                const req = {
                    url: `/profile/notification/${notifs[i].id}/`,
                    method: 'DELETE',
                    withCredentials: true,
                }
                await mailman(req)
            }
        }
        catch(err){
            console.error(err)
        }
    }
    const gameInviteHandler = (data: NotificationPropreties) => {
        data.content = `${data.sender.login} invites you to play a pong game`
        const notifToRemove = notifications.filter(notif=>notif.type === 'gameInvitation' && notif.sender.unique_id === data.sender.unique_id)
        if (notifToRemove.length>0)
            removeGameInvite(notifToRemove)
        let newArrNotif = notifications.filter(notif => notif.type !== 'gameInvitation' || notif.sender.unique_id !== data.sender.unique_id)
        newArrNotif.push(data)
        newArrNotif = newArrNotif.sort((a,b)=> b.id - a.id)
        let newArrNotifToast = newNotification.filter(notif => notif.type !== 'gameInvitation' || notif.sender.unique_id !== data.sender.unique_id)
        newArrNotifToast.push(data)
        newArrNotifToast = newArrNotifToast.sort((a,b)=> b.id - a.id)
        setnotifications(newArrNotif)
        setNewNotification(newArrNotifToast)
        // data.content = `${data.sender.login} invites you to play a pong game`
        // setnotifications(prev => [...prev, data].sort((a,b)=> b.id - a.id))
        // setNewNotification(prev => [...prev, data])
    }
    const updateFriendList = (user: ProfileDataInterface) =>{
        setFriends(prev => prev.filter(friend=> friend.unique_id !== user.unique_id))
    }
    const updateFriendShip = (info: friendship) =>{
        if(info.status=== undefined ){
            if (friends.find(friend=>friend.unique_id === info.sender.unique_id) !== undefined)
                setFriends(prev => prev.filter(friend=> friend.unique_id !== info.sender.unique_id))
            setBlockList(prev=>[...prev, info.sender])
            setnotifications(prev=>prev.filter(notif=>!notif.content.startsWith(info.sender.login)))
        }
        else{
            if (blockList.find(block=>block.unique_id === info.sender.unique_id) !== undefined)
                setBlockList(prev=> prev.filter(block=> block.unique_id!==info.sender.unique_id))
        }
    }
    const friendStateHandler = (data: NotificationStatePropreties) =>{
        if (data.sender.unique_id === userData?.unique_id && data.state === 'offline'){
            AuthContextConsummer?.setLoggedIn(false)
            Navigate('/home')
        }
        data.sender.state = data.state
        const friend  = data.sender as ProfileDataInterface
        friend.state = data.state
        const tmpFriends = friends.filter(friendElm=> friend.unique_id !== friendElm.unique_id)
        tmpFriends.push(friend)
        setFriends(tmpFriends)
    }
    const deleteNotifHandler = (id: number)=>{
        setnotifications(prev => prev.filter(notif=> notif.id !== id))
        setNewNotification(prev => prev.filter(notif=> notif.id !== id))
    }

    useEffect(()=>{
        SocketContext.AddChannel('NOTIFICATION_GAME_INVITE', gameInviteHandler)
    },[notifications,newNotification])
    useEffect(() =>{
        if (ready)
        {
            matchHistoryData()
            SocketContext.AddChannel('NOTIFICATION_DELETE', deleteNotifHandler)
            SocketContext.AddChannel('NOTIFICATION_ADD_FRIEND', notificationHandler)
            SocketContext.AddChannel('UPDATE_FRIEND_LIST', updateFriendList)
            SocketContext.AddChannel('UPDATE_FRIENDSHIP', updateFriendShip)
            SocketContext.AddChannel('NOTIFICATION_ACCEPT_FRIEND', notificationHandler)
            SocketContext.AddChannel('NOTIFICATION_GAME_INVITE', gameInviteHandler)
            if (location.pathname !== '/chat/' && location.pathname !== '/chat')
                SocketContext.AddChannel('NOTIFICATION_MESSAGE', notificationHandler)
            SocketContext.AddChannel('NOTIFICATION_STATE', friendStateHandler)
            SocketContext.AddChannel('NOTIFICATION', PureNotification)

        }
        return () => {
            SocketContext.RemoveChannel('NOTIFICATION_GAME_INVITE')
            SocketContext.RemoveChannel('UPDATE_FRIEND_LIST')
            SocketContext.RemoveChannel('UPDATE_FRIENDSHIP')
            SocketContext.RemoveChannel('NOTIFICATION_ADD_FRIEND')
            SocketContext.RemoveChannel('NOTIFICATION_ACCEPT_FRIEND')
            SocketContext.RemoveChannel('NOTIFICATION_MESSAGE')
            SocketContext.RemoveChannel('NOTIFICATION_STATE')
            SocketContext.RemoveChannel('NOTIFICATION')
        }
        
    }, [ready])
    
    useEffect(() => {
        if (AuthContextConsummer?.loggedIn){
            fetchNotification()
        }
    },[AuthContextConsummer?.loggedIn])

    const ajami = async() =>
    {
        await fetchUserData()
        await fetchFriends()
        await fetchReceivedFriendRequest()
        await fetchSentFriendRequest()
        await fetchBlockList()
        await rankData()
        setReady(true)
    }
    useEffect(() =>{
        if (AuthContextConsummer?.loggedIn){
            ajami();
            
        }
    }, [AuthContextConsummer?.loggedIn])
    return(
        <UserContext.Provider value={{userData, setUserData, profilePicChanged, setProfilePicChanged, coverPicChanged,setCoverPicChanged,notifications, setnotifications, newNotification, setNewNotification, notificationHandler, action, setAction, friendRequestSent, setFriendRequestSent, friendRequestReceived, setFriendRequestReceived, fetchNotification, friends, setFriends, fetchFriends, blockList, setBlockList, userMatchHistory, setUserMatchHistory, userRank, setUserRank, level, setLevel}}>
            {ready  ? children : <LoadingIndecator/>}
        </UserContext.Provider>
    )
}

export default UserProvider