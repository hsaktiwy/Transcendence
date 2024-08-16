import React, { useState } from "react";
import { Link } from 'react-router-dom'
function SideBarV2(){
    const [showSideBar, setShowSideBar] = useState<boolean>(false)
    return (
        
            <aside className={`font-poppins h-[60px] w-full lg:h-full lg:w-[80px] shadow-lg shadow-white/25 bg-black/35 backdrop-filter backdrop-blur-sm fixed bottom-0 lg:top-0 left-0 text-white backdrop-filter backdrop-blur-md  flex flex-row lg:flex-col items-center justify-between z-10  `} >
                {/* <div id="logo" className="w-full h-[10%] mt-[100px] text-center">
                    <embed type="image/svg+xml" src="assets/svg/logo-2.svg" className="w-[80px] h-[80px]"></embed>
                </div> */}
                <div id="sidebar-menu" className="w-[100%] lg:w-auto  h-auto lg:h-[80%] flex flex-row lg:flex-col p-4 justify-center gap-[10%]">
                    <Link to="/" className=" cursor-pointer w-[30px] h-[30px] ">
                        <img src="assets/svg/Overview.svg" alt="Home Icon" className="w-full h-full" />
                    </Link>
                    <embed type="image/svg+xml" src="assets/svg/Vector.svg" className="w-[30px] h-[30px]"></embed>
                    <Link to="/chat" className=" cursor-pointer w-[30px] h-[30px] ">
                        <img src="assets/svg/Message.svg" alt="Message Icon" className="w-full h-full" />
                    </Link>
                    <embed type="image/svg+xml" src="assets/svg/game.svg" className="w-[30px] h-[30px]"></embed>

                    
                </div>
                <div id="log-out" className="mb-16 font-poppins text-center hidden lg:flex flex-col items-center justify-center gap-4 h-[10%]">
                    <embed type="image/svg+xml" src="assets/svg/Logout.svg" className="w-[30px] h-[30px]"></embed>
                    <h1 className="text-lg font-semibold text-white/40">Log out</h1>
                </div>
            </aside>
    )
}

export default SideBarV2