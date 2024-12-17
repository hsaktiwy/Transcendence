import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext, NotificationPropreties } from "../UserContext";
import { senderInterface, notifType, formatDate } from "../NavBarModal";
import { axiosPath } from "@/utils/Constants";
import { Link } from "react-router-dom";
import { WebSocketContext } from "@/utils/WSContext";
import mailman from "@/utils/AxiosFetcher";
interface NotificationProps{
    index: number;
    notifications: NotificationPropreties[];
    item: NotificationPropreties;
    sender: senderInterface | undefined;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean> >
}
const  mark_notification_as_readed = (index:number)=>{

}
const FriendRequestNotification:React.FC<NotificationProps> = ({index, notifications, item, sender, setOpenModal})=>{
    const userContextConsumer = useContext(UserContext)
    const SocketConsumer = useContext(WebSocketContext)
    if (!userContextConsumer || !SocketConsumer)
        throw new Error('out of scope')
    const [accepted, setAccepted] = useState<boolean | undefined>(undefined)

    const Accept = async (friend_req_id:number)=>{
        try{
            const req = {
                url: `/friendship/request/status/set/accept/${friend_req_id}`,
                method: 'GET',
            }
            await mailman(req)
            const notification = {
                type: 'NOTIFICATION_ACCEPT_FRIEND',
                to : sender?.login
            }
            const message = JSON.stringify(notification)
            SocketConsumer.socket?.current?.send(message)
        }
        catch(e){
            console.log(e)
        }
    }
    useEffect(()=>{
        console.log(sender)
        if(item.friend_request_id !== -1 && userContextConsumer.friendRequestReceived.find(fq=>fq.id === item.friend_request_id && fq.status === 'pending'))
            setAccepted(false)
},[])
    return(
            <div className={`font-poppins ${index < userContextConsumer.notifications.filter(item=>item.is_readed===false && item.type !== 'message').length - 1 &&`border-b-[1px] border-[#5E97A9]/85`} min-h-[100px]`}>
                            <div className="px-2 sm:px-4 py-4 flex gap-8 items-center  justify-center sm:justify-between flex-wrap ">
                                <div className="  w-[60px] h-[60px] relative ">
                                    <img src={axiosPath + sender?.profile_pic} alt="test" className=" rounded-full border-[1px] border-white/25 h-full w-full object-cover"/>
                                    <span className=" absolute text-sm bg-[#5E97A9] p-[2px] sm:p-[4px] text-white rounded-full bottom-0 right-0">
                                            {notifType.friendship} 
                                    </span>
                                </div>
                                <div className="flex flex-col gap-4 items-center sm:items-start overflow-visible">
                                    <h1 className="text-sm sm:text-base font-medium text-center sm:text-start w-[250px] sm:w-[300px] text-white tracking-wide">
                                        {accepted === true ? `You and ${sender?.login} are Friends Now! Enjoy` : item.content}
                                    </h1>
                                    <div className=" font-light flex justify-center">
                                        <div className= {`${accepted === false ? 'flex' : 'hidden'} gap-3 sm:gap-6 text-sm sm:text-base flex-wrap justify-center sm:justify-start`} >
                                            <button className=" bg-[#5E97A9] text-white rounded-lg px-2 sm:px-4 py-[1px] sm:py-2 opacity-100  hover:opacity-70 duration-100  w-[100px] sm:w-[124px] " onClick={()=>{
                                                Accept(item.friend_request_id)

                                                setAccepted(true)
                                            }
                                        }>
                                                Accept
                                            </button>
                                            <Link to={`/profile/${item.sender}`} onClick={() =>{

                                                setOpenModal(false)
                                            }}>
                                                <button className="text-white/70 rounded-lg px-2 sm:px-4 py-[1px] sm:py-2 opacity-100  hover:opacity-70 duration-100 bg-[#2B2F32]/50 border-[1px] border-[#5E97A9]/80 w-[100px] sm:w-[124px]">
                                                    View Profile
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden sm:block text-sm  text-white w-[80px] text-center" >
                                    <p >
                                        {formatDate(item.created)}
                                    </p>
                                </div>
                            </div>
            </div>
    )
}

export default FriendRequestNotification