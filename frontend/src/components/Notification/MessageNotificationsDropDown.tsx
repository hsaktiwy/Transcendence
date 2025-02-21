
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

import { RiNotification2Line, RiTimeFill } from "react-icons/ri";
import { IoPersonAddOutline } from "react-icons/io5";
import { RiGamepadLine } from "react-icons/ri";
import { BiMessageSquareDetail } from "react-icons/bi";
import { NotificationPropreties } from "../UserContext";

import mailman from "../../utils/AxiosFetcher";

import { RiInbox2Line } from "react-icons/ri";
import { toast } from "react-toastify";
import { formatDate } from "@/utils/textFromatting";
import { WebSocketContext } from "@/utils/WSContext";

interface prop {
    display: boolean
}

export interface senderInterface {
    login: string;
    firstName: string;
    lastName: string;
    profile_pic: string;
    email: string;
    state: string;
    last_visit: string;
   

}
interface typeInterface{
    'system': JSX.Element;
    'friendship': JSX.Element,
    'gameInvitation': JSX.Element,
    'tournament': JSX.Element,
    'message': JSX.Element,
}

export const notifType: typeInterface = {
    'system': <RiNotification2Line/>,
    'friendship': <IoPersonAddOutline/>,
    'gameInvitation': <RiGamepadLine/>,
    'tournament': <RiGamepadLine/>,
    'message': <BiMessageSquareDetail/>,
}
const MessageNotificationsDropDown = (info: prop) =>{
    const userContextConsumer = useContext(UserContext)
    const WSContext = useContext(WebSocketContext)
    if (!userContextConsumer || !WSContext)
        throw new Error("userContext must be used within a UserProvider");
    const LOGO = '/tennis-fire-logo.jpeg'

    let linkToChat = ''
    const removeNotification = async (notification: NotificationPropreties) =>{
        try{
                const req = {
                    url: `/profile/notification/${notification.id}/`,
                    method: 'DELETE',
                    withCredentials: true,
                }
                const resp = await mailman(req)
                if (resp.status === 204){
                    const message = {
                        type: "NOTIF_DELETE",
                        id: notification.id
                    }
                    WSContext.socket.current?.send(JSON.stringify(message))
                    userContextConsumer.setnotifications(prev => prev.filter(notif=>notif.id !== notification.id))
                }
                
            
        }
        catch(e){
            toast.error("Error occured")
        }
    }
    return(
        <ul
        className={`${info.display ? 'flex' : 'hidden'}  ${userContextConsumer.notifications.filter(item=>item.is_readed===false && item.type === 'message').length === 0 && 'justify-center'} absolute -right-[10rem] md:-right-4  top-[40px] h-[250px] w-[290px] bg-gradient-to-br from-[#2a3236] to-[#1e2124]   rounded-xl z-50 text-white font-poppins overflow-auto  flex-col items-center py-4 px-6  gap-6 border border-white/30`}
        >
        {
            userContextConsumer.notifications.filter(item=>item.is_readed===false && item.type === 'message').length > 0 ? 
            (userContextConsumer.notifications.filter(item=>item.is_readed===false && item.type === 'message').map((item, index) =>{
                        
                        linkToChat = `/chat/`;
                        return (
                            
                         
                                <Link to={`${linkToChat}` } state={{channel_id : item.channel_id}} 
                                className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-[#595b5d] break-words"
                                key={index + 1} onClick={() =>{
                                    removeNotification(item)
                                }}
                                >
                                    
                                    <img
                                    alt="notif-sender-pic"
                                    src={item.type==='message' ? import.meta.env.VITE_axiosPath + item.sender.profile_pic : LOGO}
                                    className="relative inline-block h-10 w-10 rounded-full object-cover object-center"
                                    />
                                    <div className="flex flex-col gap-1 ml-4">
                                    <p className="text-slate-100 font-medium break-words">
                                        {item.content.length > 20 ? `${item.content.substring(0,20)}...` : item.content}
                                    </p>
                                    <p className="text-slate-400 text-sm flex items-center">
                                        <RiTimeFill/>
                                        {formatDate(item.created)}
                                    </p>
                                    </div>
                                </Link>     
                        
        
                        )
                   

            }))
            : <ul className="justify-self-center flex flex-col justify-center items-center text-slate-100 gap-5">
                <span className="text-4xl">
                    <RiInbox2Line/>
                </span>
                <h1 className=" text-slate-100/80 font-semibold text-lg">No Messages yet !</h1>
             </ul>
            }
        </ul>
    )
}
export default MessageNotificationsDropDown