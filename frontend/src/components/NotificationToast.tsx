import React, { useEffect } from "react";
import { useContext } from "react";
import { NotificationPropreties } from "./UserContext";
import { UserContext } from "./UserContext";
import { RiNotification2Line } from "react-icons/ri";
import { IoPersonAddOutline } from "react-icons/io5";
import { RiGamepadLine } from "react-icons/ri";
import { BiMessageSquareDetail } from "react-icons/bi";
import { Link } from "react-router-dom";


export interface senderInterface {
    login: string;
    firstName: string;
    lastName: string;
    profile_pic: string;
    email: string;
    birthDay: string;

}
interface NotificationsList{
    items: NotificationPropreties[]
}
interface typeInterface{
    'system': JSX.Element;
    'friendship': JSX.Element,
    'gameInvitation': JSX.Element,
    'tournament': JSX.Element,
    'message': JSX.Element,
}
const notifType: typeInterface = {
    'system': <RiNotification2Line/>,
    'friendship': <IoPersonAddOutline/>,
    'gameInvitation': <RiGamepadLine/>,
    'tournament': <RiGamepadLine/>,
    'message': <BiMessageSquareDetail/>,
}

const NotificationToast: React.FC<NotificationsList> = ({ items }) =>{

    // const [remove, setRemove] = useState<boolean[]>([])

    const userContextConsumer = useContext(UserContext)

    if (!userContextConsumer)
        throw new Error("userContext must be used within a UserProvider");
    
    const removeItem = (itemId: number) =>{
        const newItems = items.filter(item => item.id !== itemId)
        userContextConsumer?.setNewNotification(newItems)
    }
    useEffect(() =>{

        const interval = setInterval(() =>{
            if (items.length)
                removeItem(items[0].id )
        }, Math.max(2000*(1/items.length), 300))
            
        return () => {
            clearInterval(interval)
        }
    }, [items])


    return(

        <div className="    font-poppins animate-notificationAnimation fixed z-40  bottom-[80px] lg:bottom-0 right-0  flex flex-col gap-4 m-4 w-[90%] sm:w-[500px] ">
  
        {
                    items.filter(item => !item.is_readed).map((item, index) =>{
                        return(
                            <Link to={item.type === 'friendship' ? `/profile/${item.sender.unique_id}` : (item.type === 'gameInvitation' ? '/game/RemoteGame': '/chat')} state={item.type === 'gameInvitation' ?  {room_name: item.room_name, my_user:userContextConsumer.userData?.unique_id}: { channel_id: item.channel_id }} onClick={() =>{
                                removeItem(item.id)}}>
            
                                <div  className={`  relative duration-200 transition-all    hover:scale-[1.02]  sm:hover:scale-105  cursor-pointer shadow-[0px_20px_77px_10px_rgba(94,_151,_169,_0.35)]  animate-notificationAnimation w-full sm:w-[500px] h-[120px]  bg-gradient-to-br from-[#2a3236] to-[#1e2124] backdrop-filter backdrop-blur-sm rounded-lg flex text-white `}>
                                    <div className="notif-icon bg-[#5E97A9] h-full flex justify-center items-center text-2xl p-4 text-white rounded-l-lg">
                                        {
                                            item.type === 'message' ? notifType.message : item.type === 'friendship' ? notifType.friendship : item.type === 'system' ? notifType.system : notifType.gameInvitation
                                        }
                                    </div>
                                    <div className="notif-contetn-container  p-4 flex flex-col gap-2 border-r-[1px] border-r-white/20 rounded-r-lg flex-1 relative">
                                        <h1 className="font-semibold sm:text-xl">
                                            {`You have a new ${item.type==='message' ? 'Message' :'Notification' }`}
                                        </h1>
                                        <div className="flex gap-4  items-center break-words">
                                            {
                                                (item.type === 'friendship' || item.type === 'message') &&
                                                <div className=" h-[35px] w-[35px] sm:h-[50px] sm:w-[50px]">
                                                    {/* <p>{usersDataArr.current.find(user=>item.sender === user.login)?.profile_pic}</p> */}
                                                    <img src={`${import.meta.env.VITE_axiosPath}${item.sender.profile_pic}`} alt="sender_image" className="h-full w-full object-cover rounded-full border-[2px] border-white/50"/>
                                                </div>
                                            }
                                            <p className="text-white/80 break-words">
                                                {item.content.length > 20 ? `${item.content.substring(0,20)}...` : item.content}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
        }

        </div>
    )
}

export default NotificationToast