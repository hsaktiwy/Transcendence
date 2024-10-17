import React, { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { GoQuestion } from "react-icons/go";
import { BsPhoneFlip } from "react-icons/bs";
import TwoFA from "./TwoFA";


function SecuritySettings(){
    const [hide, setHide] = useState<boolean[]>([true, true, true])
    const togglePassword = () =>{
        
    }
    return(
        <div className="  security-settings m-4 sm:m-10 flex-1   bg-gradient-to-b from-slate-300/10 to-cyan-500/10 rounded-xl flex flex-col gap-10">
            <div className=" px-4 sm:px-10 py-4 flex justify-center 2xl:justify-between  items-center 2xl:items-start gap-8 2xl:gap-0 relative flex-col 2xl:flex-row ">
                <h1 className="text-3xl pt-4 text-center sm:text-start">Change Password</h1>
                {/* <div className="absolute top-0 left-0 w-full h-full backdrop-filter backdrop-blur-[2px] z-40  flex justify-center items-center">
                    <div className="p-10 bg-gradient-to-br from-[#323339] via-[#28292F] to-[#232628] text-white text-lg font-semibold rounded-xl w-[700px] text-center">
                        <h1 className="text-2xl font-semibold ">You are using a third-party Authentication you can't change the account passoword</h1>
                    </div>
                </div> */}

                <form action="" className="flex flex-col gap-8  ">
                    <div className="relative w-full 2xl:w-[780px] m-4 sm:m-0">
                        <label htmlFor="oldPassword"></label>
                        <input type={hide[0]  ? 'password' : 'text'} placeholder="Old Password" className="bg-black/35 backdrop-filter backdrop-blur-sm rounded-2xl py-2 px-4  w-[90%] sm:w-full outline-none focus:outline-1 focus:outline-[#5E97A9]"/>
                        <div className=" p-4 text-lg duration-100  absolute right-[10%] sm:right-1 text-white top-[50%] -translate-y-[50%] cursor-pointer " onClick={() =>{
                            setHide(prev => {
                                const newArr = [...prev]
                                newArr[0] = !newArr[0]
                                return newArr
                            })
                        }}>
                            {hide[0] ? <LuEyeOff/> : <LuEye/>}
                        </div>
                    </div>
                    <div className="relative w-full 2xl:w-[780px] m-4 sm:m-0">
                        <label htmlFor="newPassword"></label>
                        <input type={hide[1]  ? 'password' : 'text'} placeholder="New Password" className="bg-black/35 backdrop-filter backdrop-blur-sm rounded-2xl py-2 px-4  w-[90%] sm:w-full outline-none focus:outline-1 focus:outline-[#5E97A9]"/>
                        <div className=" p-4 text-lg duration-100  absolute right-[10%] sm:right-1 text-white top-[50%] -translate-y-[50%] cursor-pointer " onClick={() =>{
                            setHide(prev => {
                                const newArr = [...prev]
                                newArr[1] = !newArr[1]
                                return newArr
                            })
                        }}>
                            {hide[1] ? <LuEyeOff/> : <LuEye/>}
                        </div>
                    </div>
                        <div className="flex justify-start items-center text-white/70 opacity-70 gap-5 px-4">
                            <span className="inline-block  text-xl"><GoQuestion/></span>
                            <p className=" ">Your Password must be different to previously used password</p>
                        </div>
                    <div className="relative w-full 2xl:w-[780px] m-4 sm:m-0">
                        <label htmlFor="confirmNewPassword"></label>
                        <input type={hide[2]  ? 'password' : 'text'} placeholder="Confirm New Password" className="bg-black/35 backdrop-filter backdrop-blur-sm rounded-2xl py-2 px-4  w-[90%] sm:w-full outline-none focus:outline-1 focus:outline-[#5E97A9]"/>
                        <div className=" p-4 text-lg duration-100  absolute right-[10%] sm:right-1 text-white top-[50%] -translate-y-[50%] cursor-pointer " onClick={() =>{
                            setHide(prev => {
                                const newArr = [...prev]
                                newArr[2] = !newArr[2]
                                return newArr
                            })
                        }}>
                            {hide[2] ? <LuEyeOff/> : <LuEye/>}
                        </div>
                    </div>

                    <div className="submit-container self-center 2xl:self-end flex gap-6 flex-wrap items-center justify-center">

                        <button className="w-[150px] bg-[#5E97A9]/70 px-4 py-2 rounded-xl  opacity-70 hover:opacity-100 hover:scale-105 duration-75">Save Changes</button>
                        <button className="w-[150px]  px-4 py-2 rounded-xl  bg-black/35 opacity-70 hover:opacity-100 hover:scale-105 duration-75">Cancel</button>

                    </div>
                </form>
            </div>
            <TwoFA/>
        </div>
    )
}


export default SecuritySettings