import React from "react";


function LandingPage(){

    return(
        <div className="   2xpx-[100px] min-h-[100vh] py-4 ">
            <div className="nav-container  flex justify-between my-8">
                <div className="logo mx-4 text-4xl font-bold text-white">
                    LOGO
                </div>
                <ul className="flex gap-3  items-center text-xl font-semibold">
                    <li className="px-8 py-3 text-white/80 opacity-80 duration-75 hover:opacity-100 cursor-pointer">Sign up</li>
                    <li className="px-8 py-3 bg-[#5E97A9] rounded-md text-white opacity-80 duration-75 hover:opacity-100  cursor-pointer">Login</li>
                </ul>

            </div>

        </div>
    )
}



export default LandingPage