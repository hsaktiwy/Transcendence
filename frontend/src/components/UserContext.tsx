import React, { createContext, useEffect, useRef } from "react";
import { UserDataInterface,ProfileDataInterface } from "../utils/UserDataInterface";
import { useContext, useState } from "react";
import { cookies } from "../auth/Cookie";
import { BACKEND } from "../utils/Constants";
import mailman from "../utils/AxiosFetcher";
import { Action, ActionType, MiniNotification} from "@/utils/interfaces";
import { toast } from "react-toastify";
import NotificationToast from "./NotificationToast";
import { WebSocketContext } from "../utils/WSContext";
import { AuthContext } from "./AuhtenticationContext";
import LoadingIndecator from "./Loading";
import { backendPath } from "./ChatSession";
import { useLocation, useNavigate } from "react-router-dom";

export interface NotificationPropreties{
    id: number;
    content: string;
    type: string;
    created: string;
    channel_id: number;
    friend_request_id: number;
    is_readed: boolean;
    sender: ProfileDataInterface
}
export interface NotificationStatePropreties{
    type: string,
    sender: ProfileDataInterface,
    state: string
}


const getProfilePicPath = (str:string) =>{
    if (str.startsWith('/media/'))
        return backendPath+str
    return str
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
    notificationReaded: boolean;
    setNotificationReaded: React.Dispatch<React.SetStateAction<boolean> >;
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
    // matches: LoseWins | undefined;
    // setMatches : React.Dispatch<React.SetStateAction<LoseWins | undefined>>;

    
}
interface FriendRequestInterface {
    id:number;
    sender:ProfileDataInterface;
    receiver:ProfileDataInterface;
    status:string;
    created_at:string
}

interface MatchHistoryDataInterface{
    id:number;
    user_p1: ProfileDataInterface;
    user_p2: ProfileDataInterface;
    time:string;
    type:string;
    score_p1:number;
    score_p2:number;
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
    const [notificationReaded, setNotificationReaded] = useState<boolean>(false);
    const [action, setAction] = useState<Action |  undefined>(undefined)
    const [friends, setFriends] = useState<ProfileDataInterface[]>([])
    const [ready, setReady] = useState<boolean>(false)
    const [blockList, setBlockList] = useState<ProfileDataInterface[]>([])
    const [userMatchHistory, setUserMatchHistory] = useState<MatchHistoryDataInterface[]>([]);
    const [userRank, setUserRank] = useState<rankInterface[]>([]);
    // const [matches, setMatches] = useState<LoseWins | undefined>()
    

  
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
           console.log('print data  hre  ->>>', resp.data)
        }
        catch (err){
            console.error(" ",err)
        }
    }
    const matchHistoryData = async () =>{
        const req = {
            url: `/game/get_matches/PONG`,
            method: 'GET',
          };
          const resp = await mailman(req);
        if (resp.data.Game)
          setUserMatchHistory(resp.data.Game);
    }
    const fetchUserData = async () =>{

        try{
            const req = {
                url: `/api/user/`,
                method: 'GET',
                withCredentials: true,
            }
            const resp = await mailman(req)

            const {
                login,
                email,
                firstName,
                lastName,
                state,
                last_visit,
                profile_pic,
                CoverProfile,
                two_factor_auth,

            } = resp.data
            setUserData({
                login,
                email,
                firstName,
                lastName,
                state,
                last_visit,
                profile_pic,
                CoverProfile,
                two_factor_auth
            })
            console.log('hana->>',resp.data)
            setProfilePicChanged(false)
            
        }
        catch (err){
            console.error("dddddd======????",err)
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
                console.log("sent friend req ",resp.data)
                setFriendRequestSent(data)
            }
            
        }
        catch (err){
            console.error("dddddd======????",err)
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
                console.log("received friend req ",resp.data)
                setFriendRequestReceived(data)
            }
        }
        catch (err){
            console.error("dddddd======????",err)
        }
    }
    const getNotificationData = async (notifications: NotificationPropreties[]) =>{
        const tmp_senders: ProfileDataInterface[] = [];
        for(const notif of notifications){
            const str: string = " "
            if (notif.type === 'message' || notif.type === 'friendship' || notif.type === 'gameInvitation'){
                const index = notif.content.indexOf(str)
                const sender = notif.content.slice(0 , index)
                const sender_occurence = tmp_senders.filter((item)=>item.login === sender)
                if (sender_occurence.length === 0)
                {
                    try{
                        const req = {
                            url: `/api/users/${sender}/`,
                            method: 'GET',
                        }
                        const resp = await mailman(req)
                        notif.sender = resp.data
                        tmp_senders.push(notif.sender)
                    }
                    catch (err){
                        console.error("error while fetching sender data ======????",err)
                    }
                }
                else
                    notif.sender = sender_occurence[0]

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
            console.log(notificationData)
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
                console.log(friendsList)
                setFriends(friendsList)
            }
            catch (err){
                console.error("dddddd======????",err)
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
            console.error("dddddd======????",err)
        }

    }
    // const fetchMatches = async () =>
    // {
    //     try{
    //         if (userData?.login)
    //         {
    //             const req = {
    //                 url: `/profile/get_win_lose/${userData?.login}/`,
    //                 method: 'GET',
    //                 withCredentials: true,
    //             }
    //             const resp = await mailman(req);
    //             console.log('print win and lose : \n', resp.data, userData?.login);
    //             setMatches(resp.data);
    //         }
    //     }
    //     catch (err){
    //         console.error("dddddd======????",err)
    //     }
    // }
    const notificationHandler = (data: NotificationPropreties) => {

        setnotifications(prev => [...prev, data].sort((a,b)=> b.id - a.id))
        setNewNotification(prev => [...prev, data])
        if (data.type === 'friendship')
        {
            fetchReceivedFriendRequest()
            fetchSentFriendRequest()
            fetchFriends()

        }
            
    }
    const friendStateHandler = (data: NotificationStatePropreties) =>{
        if (data.sender.login === userData?.login && data.state === 'offline'){
            AuthContextConsummer?.setLoggedIn(false)
            Navigate('/home')
        }

        console.log(friends)
        data.sender.state = data.state
        const friend  = data.sender as ProfileDataInterface
        //friend.state = data.state
        const tmpFriends = friends.filter(friendElm=> friend.login !== friendElm.login)
        tmpFriends.push(friend)
        setFriends(tmpFriends)
    }
    useEffect(() =>{
        console.log(location.pathname)
        if (ready)
        {       
            SocketContext.AddChannel('NOTIFICATION_ADD_FRIEND', notificationHandler)
            SocketContext.AddChannel('NOTIFICATION_ACCEPT_FRIEND', notificationHandler)
            if (location.pathname !== '/chat/' && location.pathname !== '/chat')
                SocketContext.AddChannel('NOTIFICATION_MESSAGE', notificationHandler)
            SocketContext.AddChannel('NOTIFICATION_STATE', friendStateHandler)
            SocketContext.AddChannel('NOTIFICATION', PureNotification)
            // const stateObj = {
            //     type: "NOTIFICATION_STATE",
            //     state: "online"
            // }
            // SocketContext.socket?.current.send(JSON.stringify(stateObj))

        }
        return () => {
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
    },[AuthContextConsummer?.loggedIn, notificationReaded])

    const ajami = async() =>
    {
        await fetchUserData()
        // await fetchMatches()
        await fetchFriends()
        await fetchReceivedFriendRequest()
        await fetchSentFriendRequest()
        await fetchBlockList()
        await matchHistoryData()
        await rankData()
        setReady(true)
    }
    useEffect(() =>{
        if (AuthContextConsummer?.loggedIn){
            // fetchUserData()
     
            // fetchFriends()
            // fetchReceivedFriendRequest()
            // fetchSentFriendRequest()
            // setReady(true)
            ajami();
            
        }
    }, [AuthContextConsummer?.loggedIn])
    return(
        <UserContext.Provider value={{userData, setUserData, profilePicChanged, setProfilePicChanged, coverPicChanged,setCoverPicChanged,notifications, setnotifications, newNotification, setNewNotification, notificationHandler, notificationReaded, setNotificationReaded, action, setAction, friendRequestSent, setFriendRequestSent, friendRequestReceived, setFriendRequestReceived, fetchNotification, friends, setFriends, fetchFriends, blockList, setBlockList, userMatchHistory, setUserMatchHistory, userRank, setUserRank, /*matches, setMatches*/}}>
            {/* { newNotification.length > 0 && <NotificationToast items={newNotification}/>} */}
            {ready  ? children : <LoadingIndecator/>}
            {/* { children } */}
        </UserContext.Provider>
    )
}

export default UserProvider