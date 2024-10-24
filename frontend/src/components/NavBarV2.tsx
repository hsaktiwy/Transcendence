import React, {useContext, useState} from "react";
import { IoSearchOutline } from "react-icons/io5";
import { UserContext } from "./UserContext";
import { IoNotificationsOutline } from "react-icons/io5";
import { TbMessage } from "react-icons/tb";
import NavBarModal from "./NavBarModal";
import {axiosPath} from "../utils/Constants"
import { FiUser } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";


function NavBarV2(){
    const [isSearchBarActive, setSearchBar] = useState<boolean>(false)
    const [openModal, setOpenModal] = useState<boolean>(false)
    const userContextConsumer = useContext(UserContext)
    if (!userContextConsumer)
        throw new Error("userContext must be used within a UserProvider");
    return(
        <>
        {
            openModal ?  <NavBarModal type='allo' setOpenModal={setOpenModal} /> :
            
            <div className={` h-[60px]  w-[calc(100%-20px)] lg:w-[calc(100%-160px)] 2xl:w-[calc(90%)]  mx-[20px]  lg:mx-[4%] 2xl:mx-[3%] my-[10px] text-white absolute top-0 left-0 lg:left-[80px] flex ${isSearchBarActive ? 'justify-start ' : 'justify-between'} lg:justify-between items-center`}>
                <div id="nav-search-bar" className={`relative ${isSearchBarActive ? 'w-[100%]' : 'w-[40%]'} lg:w-[40%] `}>
                    <span className="text-white/40 left-[20px] lg:left-[40px] text-[32px] absolute   cursor-pointer top-[70%] -translate-y-[70%]" onClick={() => setSearchBar(
                            (current) => !current
                        )}>
                            <IoSearchOutline/>
                        </span>
                        <div>

                        </div>
                        <input type="text" placeholder="Search" className={`text-white rounded-full mx-10  ${isSearchBarActive ? '  w-[calc(70%)] px-4 py-1' : 'w-0'} bg-gradient-to-tr from-[#2f3a41] to-[#2B2F32] bg-[#2B2F32] h-10 lg:w-[50%]  lg:px-4 lg:py-1 focus:lg:w-[90%] absolute top-[70%] -translate-y-[70%] left-[10%] lg:left-[10%] outline-none transition-all duration:300 bg-transparent focus:backdrop-filter focus:backdrop-blur-3xl `} />
                        {/* <input type="text" placeholder="Search" className="mx-12 h-10 w-96 px-4 bg-gradient-to-tr from-[#2f3a41] to-[#2B2F32] rounded-2xl border-none "/> */}
                        <div className="bg-red-500 absolute w-full h-[100px] top-[15px] left-[47px] z-50">
                            cc
                        </div>
                    </div>
                    <div className={`  gap-0 xl:w-44  px-4 bg-gradient-to-bl mt-1 from-[#1D1E22] to-[#1f2123] rounded-2xl lg:gap-6  xl:mr-9 text-white/60  w-[70%] sm:w-[45%] md:w-[40%] lg:w-auto justify-between items-center  self-start p-2 ${isSearchBarActive ? 'hidden' : 'flex'} lg:flex`}>
                        <div className=" relative cursor-pointer hover:text-white duration-100 transition-all" onClick={() =>{
                                setOpenModal(true)
                            }}>
                                <div className={` ${userContextConsumer.notifications.filter(item=>item.is_readed===false && item.type !== 'message').length ? 'block' : 'hidden'} text-sm font-poppins font-semibold flex justify-center absolute rounded-full h-[18px] w-[18px] bg-red-600 text-white  bottom-0 right-0`}>
                                    {userContextConsumer.notifications.filter(item=>item.is_readed===false && item.type !== 'message').length }
                                </div>
                                <span className="text-3xl">
                                    <IoNotificationsOutline/>
                                </span>
                            </div>
                            <div className="cursor-pointer hover:text-white duration-100 transition-all">
                                <span className="text-3xl">
                                    <TbMessage/>
                                </span>
                            </div>
                            <div className="w-[30px] h-[30px] cursor-pointer relative bg-red-700">
                                <img src={`${axiosPath}${userContextConsumer.userData?.profile_pic}`} alt="user-pic" className="w-full h-full rounded-full object-fill" />
                                <div className="hidden absolute -right-4  top-[40px] h-[220px] w-[200px] bg-gradient-to-br from-[#2a3236] to-[#1e2124] backdrop-filter backdrop-blur-sm  rounded-xl z-50 text-white font-poppins overflow-visible  flex-col r items-center py-4 px-6 justify-center gap-8">
                                    <div className="w-full flex justify-between text-2xl opacity-80 hover:opacity-100 duration-75">
                                        <span className="text-2xl">
                                            <FiUser/>
                                        </span>
                                        <p className="font-medium text-lg w-[115px]"> View Profile</p>
                                    </div>
                                    <div className="w-full flex justify-between text-2xl opacity-80 hover:opacity-100 duration-75">
                                        <span className="text-2xl">
                                            <IoSettingsOutline/>
                                        </span>
                                        <p className="font-medium text-lg w-[115px]"> Settings</p>
                                    </div>
                                    <div className="w-full flex justify-between text-2xl opacity-80 hover:opacity-100 duration-75">
                                        <span className="text-2xl">
                                            <FiUser/>
                                        </span>
                                        <p className="font-medium text-lg w-[115px]"> View Profile</p>
                                    </div>

                                </div>
                            </div>
                    
                        </div>
                    </div>
                }
        </>
       
    )
}

export default NavBarV2