import React from "react";
import { IoSearchOutline } from "react-icons/io5";


function NavBarV2(){
    return(
        <div className=" h-[4%] w-[calc(100%-145px)]   text-white absolute top-[35px] left-[145px] flex justify-between">
            <div id="nav-search-bar" className="relative w-[40%]">
                <span className="left-[7%] text-[32px] absolute inline-block ">
                    <IoSearchOutline/>
                </span>
                <input type="text" placeholder="Search" className="text-white rounded-full mx-4 px-4 py-1 w-[50%] focus:w-[90%] absolute left-[10%] outline-none transition-all duration:300 bg-transparent focus:backdrop-filter focus:backdrop-blur-3xl border-[1px] border-white" />
            </div>
            <div className="flex">
                <div>
                    
                </div>
                <div>Item</div>
                <div>Item</div>
            </div>
        </div>
    )
}

export default NavBarV2