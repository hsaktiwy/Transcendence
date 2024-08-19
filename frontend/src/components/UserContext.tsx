import React, { createContext, useEffect, useRef } from "react";
import { UserDataInterface } from "../utils/UserDataInterface";
import { useContext, useState } from "react";
import { cookies } from "../auth/Cookie";
import { BACKEND } from "../utils/Constants";
import mailman from "../utils/AxiosFetcher";
import { toast } from "sonner";
import NotificationToast from "./NotificationToast";
import { WebSocketContext } from "../utils/WSContext";

export interface NotificationPropreties{
    id: number;
    content: string;
    type: string;
    created: string;
    is_readed: boolean;
    id_user_fk: number
}
interface UserContextInterface{
    id: number | undefined;
    setUserId: React.Dispatch<React.SetStateAction<number | undefined> >;
    userData: UserDataInterface | undefined
    setUserData: React.Dispatch<React.SetStateAction<UserDataInterface | undefined> >;
    profilePicChanged: boolean;
    setProfilePicChanged: React.Dispatch<React.SetStateAction<boolean> >;
    notifications: NotificationPropreties[];
    setnotifications: React.Dispatch<React.SetStateAction<NotificationPropreties[] > >
    newNotification: boolean;
    setNewNotification: React.Dispatch<React.SetStateAction<boolean>>

}

export const UserContext = createContext<UserContextInterface | undefined>(undefined)

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) =>{

    const SocketContext = useContext(WebSocketContext)
    if (!SocketContext)
        throw new Error('error')
    let csrfToken:string = cookies.get('csrftoken');
    const [id, setUserId] = useState<number | undefined>(undefined);
    const [userData, setUserData] = useState<UserDataInterface | undefined>(undefined);
    const [profilePicChanged, setProfilePicChanged] = useState<boolean>(false);
    const [notifications, setnotifications] = useState<NotificationPropreties[]>([])
    const [newNotification, setNewNotification] = useState<boolean>(false)
    const fetchUserData = async () =>{

        try{
            const req = {
                url: BACKEND + `api/user/${id}/`,
                method: 'GET',
                withCredentials: true,
                headers : {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRFToken': csrfToken,
                }
            }
            const resp = await mailman(req)
            // toast.success('Welcome!', {
            //     id: toastId, // Use the same toast ID to update the existing toast
            // });
            // setTimeout(() => {
            //     toast.dismiss(toastId);
            // }, 5000);
            const {
                login,
                firstName,
                lastName,
                profile_pic,
                email,
                password,
                birthDay,
                toFA,
                toFAPass
            } = resp.data
            console.log("sss ====???? ",resp.data)

            setUserData({
                login,
                firstName,
                lastName,
                profile_pic,
                email,
                password,
                birthDay,
                toFA,
                toFAPass
            })
            setProfilePicChanged(false)
            
        }
        catch (err){
            console.error("dddddd======????",err)
        }

    }
    const fetchNotification = async () =>{

        try{
            const req = {
                url: BACKEND + `api/user/${id}/notification/`,
                method: 'GET',
                withCredentials: true,
                headers : {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRFToken': csrfToken,
                }
            }
            const resp = await mailman(req)
            // toast.success('Welcome!', {
            //     id: toastId, // Use the same toast ID to update the existing toast
            // });
            // setTimeout(() => {
            //     toast.dismiss(toastId);
            // }, 5000);
            const notificationData : NotificationPropreties[] = resp.data


            setnotifications(notificationData)
            
        }
        catch (err){
            console.error("dddddd======????",err)
        }

    }
    useEffect(() =>{
        if (id === undefined){
            const savedId = localStorage.getItem("id")
            if (savedId !== null)
                setUserId(Number(savedId))
        }
        const notificationHandler = (data: NotificationPropreties) => {
            console.log(data)

                setnotifications(prev => [...prev, data])
                setNewNotification(true)
        }
        SocketContext.AddChannel('NOTIFICATION', notificationHandler)
        return () => {
            SocketContext.RemoveChannel('NOTIFICATION')
        }

    }, [])
    useEffect(() =>{
        if (id !== undefined){
            fetchUserData()
            fetchNotification()
        }
    }, [id, profilePicChanged])
    return(
        <UserContext.Provider value={{id, setUserId, userData, setUserData, profilePicChanged, setProfilePicChanged, notifications, setnotifications, newNotification, setNewNotification}}>
            {notifications.length > 0 && newNotification && <NotificationToast items={notifications}/>}
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider