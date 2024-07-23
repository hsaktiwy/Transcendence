import React from "react";


function SideBarV2(){
    return (
        <aside className="rounded-md font-poppins h-[95%] w-[140px] shadow-lg shadow-white/25 bg-black/25 fixed top-0 left-0 text-white backdrop-filter backdrop-blur-md my-8 flex flex-col items-center justify-between z-50">
            <div id="logo" className="w-full h-[10%] my-4 text-center">
                <embed type="image/svg+xml" src="assets/svg/logo.svg" className="w-[90%] h-full m-auto"></embed>
                <div className="h-[1px] w-full bg-white/25 "></div>
            </div>
            <div id="sidebar-menu" className="h-[80%] flex flex-col p-4 justify-center gap-[10%]">
                <embed type="image/svg+xml" src="assets/svg/Overview.svg"></embed>
                <embed type="image/svg+xml" src="assets/svg/Vector.svg"></embed>
                <embed type="image/svg+xml" src="assets/svg/Message.svg"></embed>
                <embed type="image/svg+xml" src="assets/svg/game.svg"></embed>

                
            </div>
            <div id="log-out" className="mb-16 font-poppins text-center flex flex-col items-center justify-center gap-4 h-[10%]">
                <embed type="image/svg+xml" src="assets/svg/Logout.svg" className="w-[45px]"></embed>
                <h1 className="text-xl font-bold text-white/40">Log out</h1>
            </div>
        </aside>
    )
}

export default SideBarV2