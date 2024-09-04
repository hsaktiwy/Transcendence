import React, { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";

function SecuritySettings(){
    const [hide, setHide] = useState<boolean[]>([false, false, false])
    const togglePassword = () =>{
        
    }
    return(
        <div className=" animate-fadeIn security-settings m-10 flex-1 bg-gradient-to-b from-slate-300/10 to-cyan-500/10 rounded-xl">
            <div className=" px-10 py-4 flex justify-between ">
                <h1 className="text-2xl font-semibold">Change Password</h1>
                <form action="" className="flex flex-col gap-8">
                    <div className="relative w-[700px]">
                        <label htmlFor="oldPassword"></label>
                        <input type={hide[0]  ? 'password' : 'text'} placeholder="Old Password" className="bg-black/35 backdrop-filter backdrop-blur-sm rounded-2xl py-2 px-4  w-full outline-none focus:outline-1 focus:outline-[#5E97A9]"/>
                        <div className=" p-4 text-lg duration-100  absolute right-1 text-white top-[50%] -translate-y-[50%] cursor-pointer " onClick={() =>{
                            setHide(!hide[])
                        }}>
                            {hide ? <LuEyeOff/> : <LuEye/>}
                        </div>
                    </div>
                    <div className="relative w-[700px]">
                        <label htmlFor="newPassword"></label>
                        <input type={hide[1]  ? 'password' : 'text'} placeholder="New Password" className="bg-black/35 backdrop-filter backdrop-blur-sm rounded-2xl py-2 px-4  w-full outline-none focus:outline-1 focus:outline-[#5E97A9]"/>
                        <div className=" p-4 text-lg duration-100  absolute right-1 text-white top-[50%] -translate-y-[50%] cursor-pointer " onClick={() =>{
                            setHide(!hide)
                        }}>
                            {hide ? <LuEyeOff/> : <LuEye/>}
                        </div>
                    </div>
                </form>
            </div>

        </div>
    )
}


export default SecuritySettings