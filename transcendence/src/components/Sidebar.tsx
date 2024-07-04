import React from "react";
import { PiPingPong } from "react-icons/pi";


function Sidebar(){

    return(
        <aside className="absolute h-[95%] w-[10%] bg-[#2B2F32] top-10 left-5 rounded-xl">
            <div id="logo" className="">
                <img src="./src/assets/logo.png" alt="logo" />
            </div>
        </aside>
    )
}

export default Sidebar