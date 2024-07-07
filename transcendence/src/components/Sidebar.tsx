import React, { useState } from "react";
import { PiPingPong } from "react-icons/pi";
import { PiPingPongLight } from "react-icons/pi";

import { FaRegUser } from "react-icons/fa";


import { RiHome5Line } from "react-icons/ri";

import { IoLogOutOutline } from "react-icons/io5";


function Sidebar(){

    const [active, setActive] = useState<string>('home')
    return(
        <aside className="bg-[#2B2F32] text-white font-poppins rounded-lg shadow-xl  col-span-1 row-span-12 hidden lg:block">
            {/* <div id="logo" className="invisible sm:visible  text-center h-[10%]">
                <h1 className="text-[25px] text-white">LOGO</h1>
                <div className="w-[100%] bg-white h-[2px]"></div>
            </div>
            <div className="h-[90%]">
                <ul className="h-[100%] flex flex-col justify-center gap-20 lg:mt-8">
                    <li onClick={() => setActive('home')} className={`text-xl pb-4 pt-4 flex justify-center gap-4 items-start cursor-pointer  ${active === 'home' ? 'text-[#ffffff]' : 'text-[#aca8a8]'}`}>
                        <RiHome5Line className="text-[2.5rem]"/>
                    </li>
                    <li onClick={() => setActive('profile')} className={`text-xl pb-4 pt-4 flex justify-center gap-4 items-start cursor-pointer ${active === 'profile' ? 'text-[#ffffff]' : 'text-[#aca8a8]'}`}>
                        <FaRegUser className="text-[2.5rem]"/>
                    </li>
                    <li onClick={() => setActive('pong')} className={`text-xl pb-4 pt-4 flex justify-center gap-4 items-start cursor-pointer ${active === 'pong' ? 'text-[#ffffff]' : 'text-[#aca8a8]'}`}>
                        <PiPingPongLight className="text-[2.5rem]"/>
                    </li>
                    <li onClick={() => setActive('logout')} className={`mt-60 text-xl pb-4 pt-4 flex justify-center gap-4 items-start cursor-pointer ${active === 'logout' ? 'text-[#ffffff]' : 'text-[#aca8a8]'}`}>
                        <IoLogOutOutline className="text-[2.5rem]"/>
                    </li>
                </ul>
            </div> */}

        </aside>
    )
}

export default Sidebar