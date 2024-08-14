import React, {useContext, useState} from "react";
import { IoSearchOutline } from "react-icons/io5";
import { UserContext } from "./UserContext";
import { IoNotificationsOutline } from "react-icons/io5";
import { TbMessage } from "react-icons/tb";


function NavBarV2(){
    const userContextConsumer = useContext(UserContext)
    const [isSearchBarActive, setSearchBar] = useState<boolean>(false)
    if (!userContextConsumer)
        throw new Error("userContext must be used within a UserProvider");
    return(
        <div className={` h-[60px] overflow-hidden w-[calc(100%-20px)] lg:w-[calc(100%-100px)] 2xl:w-[calc(80%)] mx-[10px] 2xl:mx-[8%] my-[20px] text-white absolute top-0 left-0 lg:left-[80px] flex ${isSearchBarActive ? 'justify-start ' : 'justify-between'} lg:justify-between items-center`}>
            <div id="nav-search-bar" className={`relative ${isSearchBarActive ? 'w-[100%]' : 'w-[40%]'} lg:w-[40%] `}>
                <span className="text-white/40 left-[20px] lg:left-[40px] text-[32px] absolute   cursor-pointer top-[70%] -translate-y-[70%]" onClick={() => setSearchBar(
                    (current) => !current
                )}>
                    <IoSearchOutline/>
                </span>
                <input type="text" placeholder="Search" className={`text-white rounded-full mx-10  ${isSearchBarActive ? 'w-[calc(70%)] border-[2px] border-white/40 px-4 py-1' : 'w-0'}  lg:w-[50%] lg:border-[2px] lg:border-white/40 lg:px-4 lg:py-1 focus:lg:w-[90%] absolute top-[70%] -translate-y-[70%] left-[10%] lg:left-[10%] outline-none transition-all duration:300 bg-transparent focus:backdrop-filter focus:backdrop-blur-3xl `} />
            </div>
            <div className={`gap-0 lg:gap-6 bg-[#2B2F32] text-white/60  w-[70%] sm:w-[45%] md:w-[40%] lg:w-auto justify-between items-center rounded-lg self-start p-2 ${isSearchBarActive ? 'hidden' : 'flex'} lg:flex`}>
                <div className="cursor-pointer hover:text-white duration-100 transition-all">
                    <span className="text-3xl">
                        <IoNotificationsOutline/>
                    </span>
                </div>
                <div className="cursor-pointer hover:text-white duration-100 transition-all">
                    <span className="text-3xl">
                        <TbMessage/>
                    </span>
                </div>
                <div className="w-[30px] h-[30px] cursor-pointer relative">
                    <img src={userContextConsumer.userData?.profile_pic} alt="user-pic" className="w-full h-full rounded-full object-fill" />
                    <div className=" hidden fixed right-[10px] 2xl:right-[8%] top-[75px] h-[250px] w-[200px] bg-black/45 backdrop-filter backdrop-blur-sm  rounded-xl z-50 text-black overflow-visible">
                        
                    </div>
                </div>

            </div>
        </div>
    )
}

export default NavBarV2