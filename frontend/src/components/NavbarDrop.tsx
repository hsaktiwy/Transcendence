import React from "react";
import { FiUser } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { CgLogOut } from "react-icons/cg";
interface prop {
    display: boolean
}

const NavBarDrop = (info: prop) =>{

    return (

        <div className={`${info.display ? 'flex' : 'hidden'} absolute -right-4  top-[40px] h-[220px] w-[200px] bg-gradient-to-br from-[#2a3236] to-[#1e2124] backdrop-filter backdrop-blur-sm  rounded-xl z-50 text-white font-poppins overflow-visible  flex-col r items-center py-4 px-6 justify-center gap-8`}>
            <div className="w-full flex justify-between text-2xl opacity-50 hover:opacity-100 duration-75">
                <span className="text-2xl">
                    <FiUser/>
                </span>
                <p className="font-medium text-lg w-[115px]"> View Profile</p>
            </div>
            <div className="w-full flex justify-between text-2xl opacity-50 hover:opacity-100 duration-75">
                <span className="text-2xl">
                    <IoSettingsOutline/>
                </span>
                <p className="font-medium text-lg w-[115px]"> Settings</p>
            </div>
            <div className="w-full flex justify-between text-2xl opacity-50 hover:opacity-100 duration-75">
                <span className="text-3xl">
                    <CgLogOut/>
                </span>
                <p className="font-medium text-lg w-[115px]"> Log out</p>
            </div>
        </div>
    )
}

export default NavBarDrop