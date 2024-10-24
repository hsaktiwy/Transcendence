import React, { useEffect, useRef } from "react";

import { useState, useContext } from "react";
import { NotificationPropreties } from "./UserContext";
import { UserContext } from "./UserContext";
import { RiNotification2Line } from "react-icons/ri";
import { IoPersonAddOutline } from "react-icons/io5";
import { RiGamepadLine } from "react-icons/ri";
import { BiMessageSquareDetail } from "react-icons/bi";
import { axiosPath, BACKEND } from "../utils/Constants";
import mailman from "../utils/AxiosFetcher";
import { Link, useNavigate } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import ChatSection from "./ChatSection";

interface senderInterface {
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
    const [dataFetched, setdatafetched] = useState<boolean>(false)
    const userContextConsumer = useContext(UserContext)
    const navigate = useNavigate()
    if (!userContextConsumer)
        throw new Error("userContext must be used within a UserProvider");
    
    const removeItem = (itemId: number) =>{
        const newItems = items.filter(item => item.id !== itemId)
        userContextConsumer?.setNewNotification(newItems)
    }
    let usersDataArr= useRef<senderInterface[]>([])
    const fetchRequestSenderData =  async (items:  NotificationPropreties[]) =>{
            for(const item of items){
                if (!usersDataArr.current.find(user => item.sender === user.login)){
                    try{
                        const req = {
                            url: `/api/users/${item.sender}/`,
                            method: 'GET',
                        }
                        const resp = await mailman(req)
                        const userData: senderInterface = resp.data
                        usersDataArr.current.push(userData)
                        console.log("wewewe ====???? ",usersDataArr.current.find(user=>item.sender === user.login)?.profile_pic)
                    }
                    catch (err){
                        console.error("dddddd======????",err)
                    }
                }

            }

        setdatafetched(true)

    }
    useEffect(() =>{
        const requests = items.filter(item => item.type === 'friendship' || item.type === 'message' )
        fetchRequestSenderData(requests)
    },[])
    useEffect(() =>{

        // const requests = items.filter(item => item.type === 'friendship')
        // fetchRequestSenderData(requests)
        const interval = setInterval(() =>{
            if (items.length)
                removeItem(items[0].id )
        }, 7000)
            
        return () => {
            clearInterval(interval)
        }
    }, [items])
    return(

        <div className="    font-poppins animate-notificationAnimation fixed z-40  bottom-[80px] lg:bottom-0 right-0  flex flex-col gap-4 m-4 w-[90%] sm:w-[500px]">
  
        {
                    items.filter(item => !item.is_readed).map((item, index) =>{
                        return(
                            <Link to={'/chat'} state={{ channel_id: item.channel_id } }>
                                
                                <div  className={`  relative duration-200 transition-all    hover:scale-[1.02]  sm:hover:scale-105  cursor-pointer shadow-[0px_20px_77px_10px_rgba(94,_151,_169,_0.35)]  animate-notificationAnimation w-full sm:w-[500px] h-[120px]  bg-gradient-to-br from-[#2a3236] to-[#1e2124] backdrop-filter backdrop-blur-sm rounded-lg flex text-white `}>
                                    <div className="notif-icon bg-[#5E97A9] h-full flex justify-center items-center text-2xl p-4 text-white rounded-l-lg" onClick={()=>{
                                    navigate(`/chat/${item.channel_id}`)
                                }}>
                                        {
                                            item.type === 'message' ? notifType.message : item.type === 'friendship' ? notifType.friendship : item.type === 'system' ? notifType.system : notifType.gameInvitation
                                        }
                                    </div>
                                    <div className="notif-contetn-container  p-4 flex flex-col gap-2 border-r-[1px] border-r-white/20 rounded-r-lg flex-1 relative" onClick={()=>{
                                    navigate(`/chat/${item.channel_id}`)
                                }}>
                                        <h1 className="font-semibold sm:text-xl">
                                            {`You have a new ${item.type==='message' ? 'Message' :'Notification' }`}
                                        </h1>
                                        <div className="flex gap-4  items-center">
                                            {
                                                (item.type === 'friendship' || item.type === 'message') &&
                                                <div className=" h-[35px] w-[35px] sm:h-[50px] sm:w-[50px]">
                                                    {/* <p>{usersDataArr.current.find(user=>item.sender === user.login)?.profile_pic}</p> */}
                                                    <img src={`${axiosPath}${usersDataArr.current.find(user=>item.sender === user.login)?.profile_pic}`} alt="sender_image" className="h-full w-full object-cover rounded-full border-[2px] border-white/50"/>
                                                </div>
                                            }
                                            <p className="text-white/80">
                                                {item.channel_id}
                                                {item.content.length > 50 ? `${item.content.substring(0,50)}...` : item.content}
                                            </p>
                                        </div>
                                    </div>
                                        <div className="absolute right-2 text-2xl text-white/70 hover:text-white hover:scale-105 duration-75 z-[45] " onClick={() =>{
                                            removeItem(item.id)
                                        }}>
                                            <IoCloseOutline/>
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