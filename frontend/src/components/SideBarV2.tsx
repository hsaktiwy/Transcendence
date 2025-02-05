import React, { useContext, useState } from "react";
import { Link } from 'react-router-dom'
import { UserContext } from "./UserContext";
import { GiSettingsKnobs } from "react-icons/gi";
import { AuthContext } from "./AuhtenticationContext";
import { WebSocketContext } from "@/utils/WSContext";
import { toast } from "react-toastify";
import { CgLogOut } from "react-icons/cg";
import { FiUser } from "react-icons/fi";


function SideBarV2(){
    const [showSideBar, setShowSideBar] = useState<boolean>(false)
    const userContextConsumer = useContext(UserContext)
    const authContextConsumer  = useContext(AuthContext)
    const WsContextConsumer  = useContext(WebSocketContext)
    if (!userContextConsumer || !authContextConsumer || !WsContextConsumer)
        throw new Error('error')
    const {socket} = WsContextConsumer

    return (
        
        <aside className={`font-poppins w-full lg:h-full lg:w-[120px] shadow-lg mb-7 flex justify-center items-center z-50`}>
        <div className="font-poppins h-[60px] w-full lg:h-[98%] lg:w-[120px]    z-50  bg-gradient-to-br from-[#2a3236] to-[#1e2124] fixed bottom-0 lg:rounded-2xl lg:ml-3 lg:top-2 2xl:top-3 left-0 text-white flex flex-row lg:flex-col items-center justify-center ">
            <div id="sidebar-menu" className="w-[100%] lg:w-auto  h-auto lg:h-[80%] flex flex-row lg:flex-col p-4 justify-center gap-[10%]">
                <Link to="/" className=" cursor-pointer w-[30px] h-[30px] ">
                    <img src="/assets/svg/Overview.svg" alt="Home Icon" className="w-full h-full" />
                </Link>
                {/* <embed type="image/svg+xml" src="/assets/svg/Vector.svg" className="w-[30px] h-[30px]"></embed> */}
                <Link to={`/profile/${userContextConsumer?.userData?.unique_id}`} className=" cursor-pointer w-[30px] h-[30px] ">
                    <FiUser className="w-full h-full text-white/75"/>
                </Link>
                <Link to="/chat" className=" cursor-pointer w-[30px] h-[30px] ">
                    <img src="/assets/svg/Message.svg" alt="Message Icon" className="w-full h-full" />
                </Link>
                <Link to="/game" className=" cursor-pointer w-[30px] h-[30px] ">
                    <img src="/assets/svg/game.svg" alt="Message Icon" className="w-full h-full" />
                </Link>
                {/* <embed type="image/svg+xml" src="/assets/svg/game.svg" className="w-[30px] h-[30px]"></embed> */}
                <Link to="/settings" className=" cursor-pointer w-[30px] h-[30px] ">
                        <div className="text-3xl font-bold">
                            <GiSettingsKnobs/>
                        </div>
                </Link>

                
            </div>
            <div id="log-out" className=" text-white/40 hover:text-red-500 duration-75 cursor-pointer mb-16 font-poppins text-center hidden lg:flex flex-col items-center justify-center gap-4 h-[10%] " onClick={() =>{
                const stateObj = {
                    type: "NOTIFICATION_STATE",
                    state: "offline"
                }
                socket?.current.send(JSON.stringify(stateObj))
                authContextConsumer.setLoggedIn(false)
                toast.info('User Logged Out')
                
            }}>
                <span className="text-3xl">
                    <CgLogOut/>
                </span>
                <h1 className="text-lg font-semibold ">Log out</h1>
            </div>
        </div>    
    </aside>
    )
}

export default SideBarV2
