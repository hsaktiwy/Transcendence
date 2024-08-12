import React, { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { FiEdit2 } from "react-icons/fi";

function GeneralSettings(){
    const userContextConsumer = useContext(UserContext)
    if (!userContextConsumer)
        throw new Error("userContext must be used within a UserProvider");
    return(
        <div className="animate-fadeIn general-settings m-10 flex-1 bg-gradient-to-b from-slate-300/10 to-cyan-500/10 rounded-xl p-8 flex justify-center flex-wrap gap-6">
            
            <div className="flex gap-4 justify-center items-center flex-wrap">
                <div className="flex  items-center gap-4 flex-wrap justify-center">
                    <h3 className="w-[100px]">First Name:</h3>
                    <div className=" cursor-pointer group relative bg-black/35 backdrop-filter backdrop-blur-sm  rounded-2xl py-1 px-4 flex justify-start items-start w-[220px]">
                        <p>{userContextConsumer?.userData?.firstName}</p>
                        <div className=" duration-100 invisible group-hover:visible absolute right-1 text-white/35 top-[50%] -translate-y-[50%]">
                            <FiEdit2/>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4 flex-wrap justify-center">
                    <h3 className="w-[100px]">Last Name:</h3>
                    <div className=" cursor-pointer group relative bg-black/35 backdrop-filter backdrop-blur-sm  rounded-2xl py-1 px-4 flex justify-start items-start w-[220px]">
                        <p>{userContextConsumer?.userData?.lastName}</p>
                        <div className=" duration-100 invisible group-hover:visible absolute right-1 text-white/35 top-[50%] -translate-y-[50%]">
                            <FiEdit2/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap-4 justify-center items-center flex-wrap">
                <div className="flex  items-center gap-4 flex-wrap justify-center">
                    <h3 className="w-[100px]">Email:</h3>
                    <div className=" cursor-pointer group relative bg-black/35 backdrop-filter backdrop-blur-sm  rounded-2xl py-1 px-4 flex justify-start items-start w-[220px]">
                        <p>{userContextConsumer?.userData?.email}</p>
                        <div className=" duration-100 invisible group-hover:visible absolute right-1 text-white/35 top-[50%] -translate-y-[50%]">
                            <FiEdit2/>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4 flex-wrap justify-center">
                    <h3 className="w-[100px]">Username:</h3>
                    <div className=" cursor-pointer group relative bg-black/35 backdrop-filter backdrop-blur-sm  rounded-2xl py-1 px-4 flex justify-start items-start w-[220px]">
                        <p>{userContextConsumer?.userData?.login}</p>
                        <div className=" duration-100 invisible group-hover:visible absolute right-1 text-white/35 top-[50%] -translate-y-[50%]">
                            <FiEdit2/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default GeneralSettings