import React from "react";
import { useContext, useRef, useState,useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { IoCloseOutline } from "react-icons/io5";
import { RiNotification2Line } from "react-icons/ri";
import { IoPersonAddOutline } from "react-icons/io5";
import { RiGamepadLine } from "react-icons/ri";
import { BiMessageSquareDetail } from "react-icons/bi";
import { NotificationPropreties } from "../UserContext";
// import { import.meta.env.VITE_axiosPath, BACKEND } from "../../utils/Constants";
import mailman from "../../utils/AxiosFetcher";
import { PiMaskSadLight } from "react-icons/pi";
import { Loading__ } from "@/auth/Login";
import { RiInbox2Line } from "react-icons/ri";
interface prop {
    display: boolean
}
export function formatDate2(dateString: Date | string) {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMs = now.getTime() - date.getTime();
    
    // If the date is less than 1 minute ago
    if (diffInMs < 60000) {
        return 'just now';
    }

    // If the date is within the last 24 hours
    const diffInHours = diffInMs / (1000 * 60 * 60);
    if (diffInHours < 24) {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    // For dates older than 24 hours, format as dd/mm/yyyy hh:mm
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export function formatDate(date: Date | string): string {
    const now = new Date();
    const inputDate = new Date(date);
    const diffMs = now.getTime() - inputDate.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60)); 
    const diffHrs = Math.floor(diffMins / 60); 
    const diffDays = Math.floor(diffHrs / 24); 

    if (diffDays === 0) {
        if (diffHrs < 1) {
            if (diffMins < 1) {
                return 'just now';
            } else {
                return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
            }
        } else {
            return `${diffHrs} hour${diffHrs > 1 ? 's' : ''} ago`;
        }
    } else if (diffDays === 1) {
        return 'yesterday';
    } else {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return inputDate.toLocaleDateString(undefined, options);
    }
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
const NotificationDropDown = (info: prop) =>{
    // const [dataFetched, setdatafetched] = useState<boolean>(false)
    const userContextConsumer = useContext(UserContext)
    if (!userContextConsumer)
        throw new Error("userContext must be used within a UserProvider");
    const LOGO = 'https://static.vecteezy.com/system/resources/previews/013/959/227/non_2x/table-tennis-fire-logosilhouette-ping-pong-club-line-art-logos-or-icons-illustration-vector.jpg'
//     let usersDataArr= useRef<senderInterface[]>([])
//     const fetchRequestSenderData =  async (items:  NotificationPropreties[]) =>{
//         for(const item of items){
//             if (!usersDataArr.current.find(user => item.sender === user.login)){
//                 try{
//                     const req = {
//                         url: `/api/users/${item.sender}/`,
//                         method: 'GET',
//                     }
//                     const resp = await mailman(req)
//                     console.log(resp)
//                     const userData: senderInterface = resp.data
//                     usersDataArr.current.push(userData)
//                 }
//                 catch (err){
//                     console.error(err)
//                 }
//             }

//         }

//     setdatafetched(true)
// }



// useEffect(() =>{
//     fetchRequestSenderData(userContextConsumer.notifications.filter(item=>item.is_readed===false && item.type !== 'message' && item.type !== 'system'))
// },[])
    function getFirstWord(inputString:string) {
        if (typeof inputString !== 'string' || !inputString.trim()) {
            return 'Invalid input'; // Handle non-string or empty input
        }

        // Split the string by spaces and return the first non-empty element
        const words = inputString.trim().split(/\s+/);
        return words[0];
    }
    let linkProfile = ''

    return(
        <ul
      
        data-popover="notifications-menu"
        data-popover-placement="bottom"
        className={`${info.display ? 'flex' : 'hidden'}  ${userContextConsumer.notifications.filter(item=>item.is_readed===false && item.type !== 'message').length === 0 && 'justify-center'} absolute -right-[10rem] md:-right-4  top-[40px] h-[250px] w-[290px] bg-gradient-to-br from-[#2a3236] to-[#1e2124] transition-all duration-10s animate-fade-down  rounded-xl z-50 text-white font-poppins overflow-auto  flex-col items-center py-4 px-6  gap-6 border border-white/30`}
        >
        {
            userContextConsumer.notifications.filter(item=>item.is_readed===false && item.type !== 'message').length > 0 ? 
            (userContextConsumer.notifications.filter(item=>item.is_readed===false && item.type !== 'message').map((item, index) =>{
                        
                        linkProfile = '/';
                        if(item.type === 'friendship')
                            linkProfile = `/profile/${item.sender.login}`;
                        return (
                            
                         
                                <Link to={`${linkProfile}`}
                                className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-[#333b3f]"
                                key={index + 1}
                                >
                                    
                                    <img
                                    alt="notif-sender-pic"
                                    src={item.type==='friendship' ? import.meta.env.VITE_axiosPath + item.sender.profile_pic : LOGO}
                                    className="relative inline-block h-10 w-10 aspect-square rounded-full object-cover object-center"
                                    />
                                    <div className="flex flex-col gap-1 ml-4">
                                    <p className="text-slate-100 font-medium">
                                        {item.content}
                                    </p>
                                    <p className="text-slate-500 text-sm flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1 text-slate-400">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z" clipRule="evenodd" />
                                        </svg>

                                        {formatDate(item.created)}
                                    </p>
                                    </div>
                                </Link>     
                        
        
                        )
                   

            }))
                // <>
                // <li
                // role="menuitem"
                // className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
                // >
                //     <img
                //     alt="tania andrew"
                //     src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
                //     className="relative inline-block h-10 w-10 rounded-full object-cover object-center"
                //     />
                //     <div className="flex flex-col gap-1 ml-4">
                //     <p className="text-slate-800 font-medium">
                //         Tania send you a message
                //     </p>
                //     <p className="text-slate-500 text-sm flex items-center">
                //         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1 text-slate-400">
                //         <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z" clip-rule="evenodd" />
                //         </svg>
                
                //         13 minutes ago
                //     </p>
                //     </div>
                // </li>
                // <li
                // role="menuitem"
                // className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
                // >
                //     <img
                //     alt="natali craig"
                //     src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1061&amp;q=80"
                //     className="relative inline-block h-10 w-10 rounded-full object-cover object-center"
                //     />
                //     <div className="flex flex-col gap-1 ml-4">
                //     <p className="text-slate-800 font-medium">
                //         Natali replied to your email.
                //     </p>
                //     <p className="text-slate-500 text-sm flex items-center">
                //         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1 text-slate-400">
                //         <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z" clip-rule="evenodd" />
                //         </svg>
                //         1 hour ago
                //     </p>
                //     </div>
                // </li>
                // <li
                // role="menuitem"
                // className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
                // >
                //     <img
                //     alt="paypal"
                //     src="https://dwglogo.com/wp-content/uploads/2016/08/PayPal_Logo_Icon.png"
                //     className="relative inline-block h-10 w-10 rounded-full  object-cover object-center"
                //     />
                //     <div className="flex flex-col gap-1 ml-4">
                //     <p className="text-slate-800 font-medium">
                //         You&apos;ve received a payment.
                //     </p>
                //     <p className="text-slate-500 text-sm flex items-center">
                //         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1 text-slate-400">
                //         <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z" clip-rule="evenodd" />
                //         </svg>
                //         5 hours ago
                //     </p>
                //     </div>
                // </li> 
                // </>
            : <ul className="justify-self-center flex flex-col justify-center items-center text-slate-100 gap-5">
                <span className="text-4xl">
                    <RiInbox2Line/>
                </span>
                <h1 className=" text-slate-100/80 font-semibold text-lg">No Notifications yet !</h1>
             </ul>
            }
        </ul>
    )
}
export default NotificationDropDown