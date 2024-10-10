import React, { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";

function SecuritySettings(){
    const [hide, setHide] = useState<boolean[]>([true, true])
    const togglePassword = () =>{
        
    }
    return(
        <div className=" animate-fadeIn security-settings m-10 flex-1 bg-gradient-to-b from-slate-300/10 to-cyan-500/10 rounded-xl flex flex-col gap-10">
            <div className=" px-10 py-4 flex justify-between ">
                <h1 className="text-2xl font-semibold">Change Password</h1>
                <form action="" className="flex flex-col gap-8 ">
                    <div className="relative w-[700px]">
                        <label htmlFor="oldPassword"></label>
                        <input type={hide[0]  ? 'password' : 'text'} placeholder="Old Password" className="bg-black/35 backdrop-filter backdrop-blur-sm rounded-2xl py-2 px-4  w-full outline-none focus:outline-1 focus:outline-[#5E97A9]"/>
                        <div className=" p-4 text-lg duration-100  absolute right-1 text-white top-[50%] -translate-y-[50%] cursor-pointer " onClick={() =>{
                            setHide(prev => {
                                const newArr = [...prev]
                                newArr[0] = !newArr[0]
                                return newArr
                            })
                        }}>
                            {hide[0] ? <LuEyeOff/> : <LuEye/>}
                        </div>
                    </div>
                    <div className="relative w-[700px]">
                        <label htmlFor="newPassword"></label>
                        <input type={hide[1]  ? 'password' : 'text'} placeholder="New Password" className="bg-black/35 backdrop-filter backdrop-blur-sm rounded-2xl py-2 px-4  w-full outline-none focus:outline-1 focus:outline-[#5E97A9]"/>
                        <div className=" p-4 text-lg duration-100  absolute right-1 text-white top-[50%] -translate-y-[50%] cursor-pointer " onClick={() =>{
                            setHide(prev => {
                                const newArr = [...prev]
                                newArr[1] = !newArr[1]
                                return newArr
                            })
                        }}>
                            {hide[1] ? <LuEyeOff/> : <LuEye/>}
                        </div>
                    </div>

                    <div className="submit-container self-end flex gap-6">

                        <button className="w-[150px] bg-[#5E97A9]/70 px-4 py-2 rounded-xl  opacity-70 hover:opacity-100 hover:scale-105 duration-75">Save Changes</button>
                        <button className="w-[150px]  px-4 py-2 rounded-xl  bg-black/35 opacity-70 hover:opacity-100 hover:scale-105 duration-75">Cancel</button>

                    </div>
                </form>
            </div>
            <div className="px-10 py-4 flex justify-between">
                <div className="flex flex-col gap-4 ">
                    <h1 className="text-2xl font-semibold">Two Factory Authentication</h1>
                    <p className="text-white/70 text-lg">Enable two factory authentication for a secure experience</p>
                    <p className="px-6">1- Scan the QR CODE using Google Authenticator</p>
                    <div className="h-[500px] w-[500px]">
                        <img src="qr.png" alt="qr-code" className="w-full h-full object-cover"/>
                    </div>
                    <p className="px-6">2- Enter the Code</p>
                </div>
            </div>
        </div>
    )
}


export default SecuritySettings