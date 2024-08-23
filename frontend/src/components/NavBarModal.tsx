import React from "react";
import { useContext, useRef, useState,useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import { IoCloseOutline } from "react-icons/io5";
import { RiNotification2Line } from "react-icons/ri";
import { IoPersonAddOutline } from "react-icons/io5";
import { RiGamepadLine } from "react-icons/ri";
import { BiMessageSquareDetail } from "react-icons/bi";
import { NotificationPropreties } from "./UserContext";
import { BACKEND } from "../utils/Constants";
import mailman from "../utils/AxiosFetcher";
import { PiMaskSadLight } from "react-icons/pi";



function formatDate(date: Date | string): string {
    const now = new Date();
    const inputDate = new Date(date);
    const diffMs = now.getTime() - inputDate.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60)); // Difference in minutes
    const diffHrs = Math.floor(diffMins / 60); // Difference in hours
    const diffDays = Math.floor(diffHrs / 24); // Difference in days

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

interface senderInterface {
    login: string;
    firstName: string;
    lastName: string;
    profile_pic: string;
    email: string;
    birthDay: string;

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

interface ModalPropInterface{
    type: string;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean> >
}
const NavBarModal : React.FC<ModalPropInterface> = ({type, setOpenModal}) =>{
    const [dataFetched, setdatafetched] = useState<boolean>(false)
    const userContextConsumer = useContext(UserContext)
    if (!userContextConsumer)
        throw new Error("userContext must be used within a UserProvider");
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
                        console.error(err)
                    }
                }

            }

        setdatafetched(true)

    }
    useEffect(() =>{
        fetchRequestSenderData(userContextConsumer.notifications.filter(item=>item.is_readed===false && item.type !== 'message'))
    },[])
    return(
        <div className=" h-[100%] w-[100%] fixed  top-0 -left-0 backdrop-filter bg-black/40 backdrop-blur-sm z-50 ">
        <div className=" scale-90 mx-auto sm:mx-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2   bg-slate-100 w-[90%] sm:w-[550px] rounded-2xl flex flex-col justify-center     z-50 overflow-hidden shadow-[2px_5px_18px_12px_rgba(94,151,169,0.36)]">
            <div className="notif-header p-6 flex justify-between bg-[#1D1E22] text-white/80 border-b-[1px] border-b-white/30">

                <h1 className="text-2xl sm:text-3xl font-semibold font-poppins">{`Notifications (${userContextConsumer.notifications.filter(item=>item.is_readed===false && item.type !== 'message').length})`}</h1>
                <span className="text-xl sm:text-4xl  opacity-60 hover:opacity-100 hover:scale-110 duration-100 cursor-pointer" onClick={() =>{
                    setOpenModal(false)
                }}>
                    <IoCloseOutline/>
                </span>
            </div>
            <div className="max-h-[60vh] overflow-y-auto overflow-x-hidden bg-[#2B2F32] ">

            {
                userContextConsumer.notifications.filter(item=>item.is_readed===false && item.type !== 'message').length > 0 ? 
                (userContextConsumer.notifications.filter(item=>item.is_readed===false && item.type !== 'message').map((item) =>{
                    return(
                        <div key={item.id} className=" font-poppins border-b-[1px] border-[#5E97A9]/85 min-h-[100px]">
                            <div className="px-2 sm:px-4 py-4 flex gap-8 items-center  justify-center sm:justify-between flex-wrap ">
                                <div className="  w-[60px] h-[60px] relative ">
                                    <img src={usersDataArr.current.find(user=>item.sender === user.login)?.profile_pic} alt="test" className=" rounded-full border-[1px] border-white/25 h-full w-full object-cover"/>
                                    <span className=" absolute text-sm bg-[#5E97A9] p-[2px] sm:p-[4px] text-white rounded-full bottom-0 right-0">
                                        {notifType.friendship}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-4 items-center sm:items-start overflow-visible">
                                    <h1 className="text-sm sm:text-base font-medium text-center sm:text-start w-[250px] sm:w-[300px] text-white tracking-wide">
                                        {item.content}
                                    </h1>
                                    <div className=" font-light flex justify-center">
                                        <div className=" flex gap-3 sm:gap-6 text-sm sm:text-base flex-wrap justify-center sm:justify-start ">
                                            <button className=" bg-[#5E97A9] text-white rounded-lg px-2 sm:px-4 py-[1px] sm:py-2 opacity-100  hover:opacity-70 duration-100  w-[100px] sm:w-[124px] ">
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
                    })) : <div className="h-[50vh] flex justify-center items-center">
                                <h1 className=" text-white/85 font-semibold text-3xl">No Notifications yet !</h1>
                            </div>
                }
            </div>
        </div>
    </div>

    )

}

export default NavBarModal