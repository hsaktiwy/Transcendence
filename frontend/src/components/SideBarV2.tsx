import React, { useState } from "react";

function SideBarV2(){
    const [showSideBar, setShowSideBar] = useState<boolean>(false)
    return (
        <>
            <div className=" z-30 absolute top-3 left-[20px] block lg:hidden cursor-pointer" onClick={()=>{
                setShowSideBar(!showSideBar)
            }}>
                {
                    !showSideBar ?                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" color="#ffffff" fill="none">
                    <path d="M4 5L16 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M4 12L20 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M4 19L12 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" color="#ffffff" fill="none">
                            <path d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                }

            </div>
            <aside className={`font-poppins h-full w-[80px] shadow-lg shadow-white/25 bg-[#1D1E22] fixed top-0 ${showSideBar ?'left-0' : '-left-1/2'} lg:left-0 text-white backdrop-filter backdrop-blur-md  flex flex-col items-center justify-between z-10 duration-800 transition-all`} >
                {/* <div id="logo" className="w-full h-[10%] mt-[100px] text-center">
                    <embed type="image/svg+xml" src="assets/svg/logo-2.svg" className="w-[80px] h-[80px]"></embed>
                </div> */}
                <div id="sidebar-menu" className="h-[80%] flex flex-col p-4 justify-center gap-[10%]">
                    <embed type="image/svg+xml" src="assets/svg/Overview.svg" className="w-[30px] h-[30px]"></embed>
                    <embed type="image/svg+xml" src="assets/svg/Vector.svg" className="w-[30px] h-[30px]"></embed>
                    <embed type="image/svg+xml" src="assets/svg/Message.svg" className="w-[30px] h-[30px]"></embed>
                    <embed type="image/svg+xml" src="assets/svg/game.svg" className="w-[30px] h-[30px]"></embed>

                    
                </div>
                <div id="log-out" className="mb-16 font-poppins text-center flex flex-col items-center justify-center gap-4 h-[10%]">
                    <embed type="image/svg+xml" src="assets/svg/Logout.svg" className="w-[30px] h-[30px]"></embed>
                    <h1 className="text-lg font-semibold text-white/40">Log out</h1>
                </div>
            </aside>
        </>
    )
}

export default SideBarV2