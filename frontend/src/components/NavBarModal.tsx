import React from "react";
import { useContext, useRef, useState,useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import { IoCloseOutline } from "react-icons/io5";
import { RiNotification2Line } from "react-icons/ri";
import { IoPersonAddOutline } from "react-icons/io5";
import { RiGamepadLine } from "react-icons/ri";
import { BiMessageSquareDetail } from "react-icons/bi";


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
    const userContextConsumer = useContext(UserContext)
    if (!userContextConsumer)
        throw new Error("userContext must be used within a UserProvider");

    useEffect(() =>{
        console.log('blabla a cbi')
        console.log(userContextConsumer.notifications)
    },[])
    return(
        <div className=" h-[100%] w-[100%] fixed  top-0 -left-0 backdrop-filter bg-black/40 backdrop-blur-sm z-50 ">
        <div className=" mx-auto sm:mx-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2   bg-slate-100 w-[90%] sm:w-[550px] rounded-md flex flex-col justify-center     z-50 overflow-hidden">
            <div className="notif-header p-6 flex justify-between bg-white">

                <h1 className="text-2xl sm:text-3xl font-semibold font-poppins">{`Notifications (${userContextConsumer.notifications.filter(item=>item.is_readed===false && item.type !== 'message').length})`}</h1>
                <span className="text-xl sm:text-4xl  opacity-60 hover:opacity-100 hover:scale-110 duration-100 cursor-pointer" onClick={() =>{
                    setOpenModal(false)
                }}>
                    <IoCloseOutline/>
                </span>
            </div>
            <div className="max-h-[50vh] overflow-y-auto overflow-x-hidden bg-slate-100 ">

            {
                userContextConsumer.notifications.filter(item=>item.is_readed===false && item.type !== 'message').map((item) =>{
                    return(
                        <div key={item.id} className=" font-poppins border-b-[1px] border-[#5E97A9]/85 min-h-[100px]">
                            <div className="px-2 sm:px-4 py-4 flex gap-8 items-center justify-center sm:justify-start flex-wrap">
                                <div className="  w-[60px] h-[60px] relative ">
                                    <img src="/1.jpg" alt="test" className=" rounded-full border-[1px] border-black/25 h-full w-full object-cover"/>
                                    <span className=" absolute text-sm bg-[#5E97A9] p-[2px] sm:p-[4px] text-white rounded-full bottom-0 right-0">
                                        {notifType.friendship}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-4 ">
                                    <h1 className="font-semibold text-center sm:text-start">
                                        {item.content}
                                    </h1>
                                    <div className=" font-light flex justify-center">
                                        <div className=" flex gap-3 sm:gap-6 text-sm sm:text-base flex-wrap justify-center sm:justify-start ">
                                            <button className=" bg-[#5E97A9] text-white rounded-lg px-2 sm:px-4 py-[1px] sm:py-2 opacity-70  hover:opacity-100 duration-100  w-[100px] sm:w-[124px]">
                                                Accept
                                            </button>
                                            <Link to={`/profile/${item.sender}`}>
                                                <button className="rounded-lg px-2 sm:px-4 py-[1px] sm:py-2 opacity-50  hover:opacity-100 duration-100 bg-white/50 border-[1px] border-black/10 w-[100px] sm:w-[124px]">
                                                    View Profile
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                        <div className="hidden sm:block text-sm">
                                            <p>
                                                2 hours ago
                                            </p>
                                        </div>
                            </div>
                        </div>
                        )
                    })
                }
            </div>
        </div>
    </div>

    )

}

export default NavBarModal