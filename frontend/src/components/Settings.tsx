import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "./UserContext";
import ChatSection from "./ChatSection";

import { BACKEND } from "../utils/Constants";
import mailman from "../utils/AxiosFetcher";
import GeneralSettings from "./GeneralSettings";
import SecuritySettings from "./SecuritySettings";
import { FiEdit2 } from "react-icons/fi";
function Settings() {


    const userContextConsumer = useContext(UserContext)
    // const [userData, setUserData] = useState<UserDataInterface | null>(null)
    const [activeSettingSection , setActiveSettingsSection] = useState<string>('general')

    interface UserDataInterface {
        login: string;
        firstName: string;
        lastName: string;
        profile_pic: string;
        email: string;
        password: string;
        birthDay: string;
        toFA: boolean;
        toFAPass: string;
    }
    const fetchUserData = async () =>{
        try{
            const req = {
                url: BACKEND + `api/user/${userContextConsumer?.id}/`,
                method: 'GET'
            }
            const resp = await mailman(req)
            const {
                login,
                firstName,
                lastName,
                profile_pic,
                email,
                password,
                birthDay,
                toFA,
                toFAPass
            } = resp.data
            console.log("sss ====???? ",resp.data)

            userContextConsumer?.setUserData({
                login,
                firstName,
                lastName,
                profile_pic,
                email,
                password,
                birthDay,
                toFA,
                toFAPass
            })
            
        }
        catch (err){
            console.error("dddddd======????",err)
        }

    }
    if (!userContextConsumer)
        throw new Error("userContext must be used within a UserProvider");
    useEffect(() =>{
        fetchUserData()

    }, [userContextConsumer.id])
    return(

        <div className=" font-poppins absolute left-0 lg:left-[80px] top-[60px] w-[calc(100%-20px)] lg:w-[calc(100%-100px)] 2xl:w-[calc(80%)] my-[10px] mx-[10px] 2xl:mx-[8%] text-white bg-black/35 backdrop-filter backdrop-blur-sm  rounded-xl ">
                <div className="banner bg-gradient-to-b from-slate-300/10 to-cyan-500/10 h-[30vh] m-4 rounded-xl">
                </div>
                <div className=" group user-pic cursor-pointer h-[120px] w-[120px] absolute top-[20vh]  left-[50%] -translate-x-[50%] rounded-full  after:content-[''] after:absolute after:h-[120px] after:w-[120px] after:rounded-full   after:top-0 after:left-[50%] after:-translate-x-[50%] after:border-[5px] after:border-white after:bg-transparent after:hover:bg-black/45 ">
                    <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] z-40 hidden group-hover:block">
                        <FiEdit2/>
                    </div>
                    <img src={userContextConsumer.userData?.profile_pic} alt="user-pic" className="rounded-full object-cover h-full w-full"/>
                    <input type="file" accept="image/*" className=" absolute top-[50%] -translate-y-[50%] opacity-0 cursor-pointer z-50 border-[1px] border-black w-[120px] h-[120px] rounded-full"/>
                </div>
                <div className="settings-container flex flex-col  mt-10">
                    <div className="settings menu mt-10 mb-4 lg:mb-10 mx-4  flex flex-col items-center justify-start lg:justify-center ">
                        <ul className="flex flex-row  gap-8 flex-wrap items-center justify-center">
                            <li className= {`relative bg-gradient-to-b from-slate-300/10 to-cyan-500/10 py-2 px-6 rounded-t-xl rounded-b-md hover:opacity-50 duration-200 ${activeSettingSection === 'general' && 'after:content-[""] after:absolute after:h-[2px]  after:w-[100%] after:bg-[#5E97A9]  after:left-0 after:bottom-0  after:rounded-md'} cursor-pointer`} onClick={()=>{
                                setActiveSettingsSection("general")
                            }}>General Settings</li>
                            <li className={` relative bg-gradient-to-b from-slate-300/10 to-cyan-500/10 py-2 px-6 rounded-t-xl rounded-b-md hover:opacity-50 duration-200 ${activeSettingSection === 'security' && 'after:content-[""] after:absolute after:h-[2px]  after:w-[100%] after:bg-[#5E97A9]  after:left-0 after:bottom-0  after:rounded-md'} cursor-pointer `} onClick={()=>{
                                setActiveSettingsSection("security")
                            }}>Security Settings</li>
                        </ul>
                    </div>
                    {
                        activeSettingSection === 'general' ?
                        <GeneralSettings/> : <SecuritySettings/>
                    }
                </div>

        </div>
    )
}

export default Settings