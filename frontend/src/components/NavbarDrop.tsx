import React, { useContext } from "react";
import { FiUser } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { CgLogOut } from "react-icons/cg";
import { UserContext } from "./UserContext";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuhtenticationContext";
import { toast } from "react-toastify";
interface prop {
    display: boolean
}

const NavBarDrop = (info: prop) =>{

    const userContextConsumer  = useContext(UserContext)
    const authContextConsumer  = useContext(AuthContext)
    if (!userContextConsumer || !authContextConsumer)
        throw new Error('error')

    return (

        <div className={`${info.display ? 'flex' : 'hidden'} absolute -right-4  top-[40px] h-[220px] w-[200px] bg-gradient-to-br from-[#2a3236] to-[#1e2124] backdrop-filter backdrop-blur-sm  rounded-xl z-50 text-white font-poppins overflow-visible  flex-col r items-center py-4 px-6 justify-center gap-8`}>
            <Link to={`/profile/${userContextConsumer.userData?.login}`} className="w-full flex justify-between text-2xl opacity-50 hover:opacity-100 duration-75">
                    <span className="text-2xl">
                        <FiUser/>
                    </span>
                    <p className="font-medium text-lg w-[115px]"> View Profile</p>
   
            </Link>
            <Link to='/settings' className="w-full flex justify-between text-2xl opacity-50 hover:opacity-100 duration-75">
                
                    <span className="text-2xl">
                        <IoSettingsOutline/>
                    </span>
                    <p className="font-medium text-lg w-[115px]"> Settings</p>
    
            </Link>
            <div  className="w-full flex justify-between text-2xl opacity-50 hover:opacity-100 duration-75 text-red-500" onClick={()=>{
                authContextConsumer.setLoggedIn(false)
                toast.info('User Logged Out')

            }}>
                <span className="text-3xl">
                    <CgLogOut/>
                </span>
                <p className="font-medium text-lg w-[115px]"> Log out</p>
            </div>
        </div>
    )
}

export default NavBarDrop