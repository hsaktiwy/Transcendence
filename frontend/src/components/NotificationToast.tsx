import React, { useEffect, useRef } from "react";

import { useState, useContext } from "react";
import { NotificationPropreties } from "./UserContext";
import { UserContext } from "./UserContext";
import { RiNotification2Line } from "react-icons/ri";
import { IoPersonAddOutline } from "react-icons/io5";
import { RiGamepadLine } from "react-icons/ri";
import { BACKEND } from "../utils/Constants";
import mailman from "../utils/AxiosFetcher";
import { Link } from "react-router-dom";

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
    'message': <RiGamepadLine/>,
}

const NotificationToast: React.FC<NotificationsList> = ({ items }) =>{

    // const [remove, setRemove] = useState<boolean[]>([])
    const [dataFetched, setdatafetched] = useState<boolean>(false)
    const userContextConsumer = useContext(UserContext)
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
                            url: BACKEND + `api/user/${item.sender}/`,
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
        }, 6000)
            
        return () => {
            clearInterval(interval)
        }
    }, [items])
    return(

        <div className="   border-[1px] border-black font-poppins animate-notificationAnimation fixed z-50  bottom-0 right-0  flex flex-col gap-4 m-4">
  
        {
                    items.filter(item => !item.is_readed).map((item, index) =>{
                        return(
                        <Link to={`/profile/${item.sender}`}>
                            <div key={index} className={`  relative duration-200 transition-all opacity-80   hover:scale-105 hover:opacity-100 cursor-pointer shadow-[0px_20px_207px_10px_rgba(94,_151,_169,_0.35)]  animate-notificationAnimation w-[500px] h-[100px] bg-gradient-to-b from-gray-300 via-sky-50 to-cyan-50 rounded-lg flex`}>
                                <div className="notif-icon bg-[#5E97A9]/70 h-full flex justify-center items-center text-2xl p-4 text-white/70 rounded-l-lg">
                                    {notifType.friendship}
                                </div>
                                <div className="notif-contetn-container  p-4">
                                    <h1 className="font-semibold text-lg">
                                        {`You have a new ${item.type==='message' ? 'Message' :'Notification' }`}
                                    </h1>
                                    <div className="flex gap-4 justify-center items-center">
                                        {
                                            (item.type === 'friendship' || item.type === 'message') &&
                                            <div className=" h-[40px] w-[40px]">
                                                {/* <p>{usersDataArr.current.find(user=>item.sender === user.login)?.profile_pic}</p> */}
                                                <img src={usersDataArr.current.find(user=>item.sender === user.login)?.profile_pic} alt="sender_image" className="object-cover rounded-full border-[2px] border-black"/>
                                            </div>
                                        }
                                        <p>
                                            {item.content}
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