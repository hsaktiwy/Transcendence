import { ChangeEvent, useContext, useState } from "react";
import { UserContext } from "./UserContext";

import { cookies } from "../auth/Cookie";

import mailman from "../utils/AxiosFetcher";
import GeneralSettings from "./GeneralSettings";
import SecuritySettings from "./SecuritySettings";
import { FiEdit2 } from "react-icons/fi";
import { toast } from "react-toastify";

import { UserDataInterface } from "../utils/UserDataInterface";
function Settings() {

    let csrfToken:string = cookies.get('csrftoken');
    const userContextConsumer = useContext(UserContext)
    // const [userData, setUserData] = useState<UserDataInterface | null>(null)
    const [activeSettingSection , setActiveSettingsSection] = useState<string>('general')

    if (!userContextConsumer)
        throw new Error("userContext must be used within a UserProvider");
    const handleProfilChanged = async (e: ChangeEvent<HTMLInputElement>) =>{
        e.preventDefault()

        if (e.target.files && e.target.files[0]){
            let uploadUrl=  `/api/user/upload_pic/`
            if(e.target.id === 'CoverProfile')
                uploadUrl = `/api/user/CoverProfile/`

            const formData = new FormData();
            formData.append(e.target.id, e.target.files[0]);

            try{
                

                const req = {
                    url: uploadUrl,
                    method: 'PATCH',
                    data : formData,
                    withCredentials: true,
                    headers : {
                        'Content-Type': 'multipart/form-data',
                        'X-CSRFToken': csrfToken,
                    }
                  }
                const response =  await mailman(req)
                if (response.status === 200)
                {
                    const newUserData = response.data as UserDataInterface
                    if (e.target.id !== 'CoverProfile'){
                        toast.success('Profile picture changed succesfully')
                    }
                    else{
                        toast.success('Cover picture changed succesfully')
                    }
                    userContextConsumer.setUserData(newUserData!)

                }
            }
            catch (err){
                toast.error('Error occurred ! Try again')
            }
        }
        else
            toast.error("No file selected")
    }
    return(

        <div className=" border border-white/20 min-h-[calc(100vh-100px)] font-poppins absolute overflow-hidden top-[60px]  left-0 lg:left-[142px]  w-[calc(100%-20px)] lg:w-[calc(100%-162px)] 2xl:w-[calc(80%)] my-[20px] mx-[10px] 2xl:mx-[8%] text-white bg-white/5  backdrop-filter backdrop-blur-sm rounded-xl ">
                <div className={`banner relative  h-[300px] m-8 rounded-xl border border-white/20`}>
                    <div className="top-0 left-0  group absolute rounded-xl  h-full w-full cursor-pointer  z-10 after:content-[''] after:absolute after:h-full after:w-full    after:top-0 after:left-0   after:rounded-xl after:bg-transparent after:hover:bg-black/45">
                        <div className="absolute text-xl right-[3%] top-[10%]  z-40 hidden group-hover:block">
                            <FiEdit2/>
                        </div>
                        <img src={`${import.meta.env.VITE_axiosPath}${userContextConsumer.userData?.CoverProfile}`} alt="user-pic" className="rounded-xl object-cover h-full w-full"/>
                        <input id='CoverProfile' type="file" accept='image/*' onChange={handleProfilChanged} className="border bg-white absolute top-[50%] -translate-y-[50%] opacity-0 cursor-pointer z-50  border-black w-full h-full rounded-xl" />
                    </div>
                <div className="relative h-[300px] bg-black/25 rounded-xl left-0 top-0 bg-"></div>
                    <div className=" z-20 group user-pic cursor-pointer h-[160px] w-[160px] absolute top-[200px]  left-[50%] -translate-x-[50%] rounded-full  after:content-[''] after:absolute after:h-[160px] after:w-[160px] after:rounded-full   after:top-0 after:left-[50%] after:-translate-x-[50%] after:border-[5px] after:border-white after:bg-transparent after:hover:bg-black/45 ">
                        <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] z-40 hidden group-hover:block">
                            <FiEdit2/>
                        </div>
                        <img src={`${import.meta.env.VITE_axiosPath}${userContextConsumer.userData?.profile_pic}`} alt="user-pic" className="rounded-full object-cover h-full w-full"/>
                        <input id='profile_pic' type="file" accept='image/*' onChange={handleProfilChanged} className="border bg-white absolute top-[50%] -translate-y-[50%] opacity-0 cursor-pointer z-50  border-black w-[160px] h-[160px] rounded-full" />
                    </div>
                </div>
                <div className="settings-container flex flex-col  my-10">
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