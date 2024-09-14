import React, { useContext, useState } from "react";
import { Link } from 'react-router-dom'
import { UserContext } from "./UserContext";
function SideBarV2(){
    const [showSideBar, setShowSideBar] = useState<boolean>(false)
    const userContextConsumer = useContext(UserContext)
    if (!userContextConsumer)
        throw new Error("userContext must be used within a UserProvider");
    return (
        
            <aside className={`font-poppins w-full lg:h-full lg:w-[120px] shadow-lg mb-7 flex justify-center items-center`}>
                <div className="font-poppins h-[60px] w-full lg:h-[98%] lg:w-[120px]  bg-[#222427] bg-gradient-to-br from-[#2a3236] to-[#1e2124] backdrop-filter backdrop-blur-sm fixed bottom-0 lg:rounded-2xl lg:ml-3 lg:top-2 2xl:top-3 left-0 text-white flex flex-row lg:flex-col items-center justify-center ">
                    <div id="sidebar-menu" className="w-[100%] lg:w-auto  h-auto lg:h-[80%] flex flex-row lg:flex-col p-4 justify-center gap-[10%]">
                        <Link to="/" className=" cursor-pointer w-[30px] h-[30px] ">
                            <img src="/assets/svg/Overview.svg" alt="Home Icon" className="w-full h-full" />
                        </Link>
                        {/* <embed type="image/svg+xml" src="/assets/svg/Vector.svg" className="w-[30px] h-[30px]"></embed> */}
                        <Link to={`/profile/${userContextConsumer?.userData?.login}`} className=" cursor-pointer w-[30px] h-[30px] ">
                            <img src="/assets/svg/Vector.svg" alt="Message Icon" className="w-full h-full" />
                        </Link>
                        <Link to="/chat" className=" cursor-pointer w-[30px] h-[30px] ">
                            <img src="/assets/svg/Message.svg" alt="Message Icon" className="w-full h-full" />
                        </Link>
                        <embed type="image/svg+xml" src="/assets/svg/game.svg" className="w-[30px] h-[30px]"></embed>

                        
                    </div>
                    <div id="log-out" className="mb-16 font-poppins text-center hidden lg:flex flex-col items-center justify-center gap-4 h-[10%]">
                        <embed type="image/svg+xml" src="/assets/svg/Logout.svg" className="w-[30px] h-[30px]"></embed>
                        <h1 className="text-lg font-semibold text-white/40">Log out</h1>
                    </div>
                </div>    
            </aside>
    )
}

export default SideBarV2