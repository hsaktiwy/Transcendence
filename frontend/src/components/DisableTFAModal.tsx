import React from "react";
import { useContext } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { UserContext } from "./UserContext";
import mailman from "@/utils/AxiosFetcher";
import { toast } from "sonner";
interface prop {
    dispatch: React.Dispatch<React.SetStateAction<boolean>>;
}

const DisableTFAModal: React.FC<prop> = ({dispatch}) =>{
    const userContextConsumer = useContext(UserContext)
    if (!userContextConsumer)
        throw new Error("userContext must be used within a UserProvider");
    const disableTFA = async () =>{
        try{
                const req = {
                    url: `/api/user/`,
                    method: 'PATCH',
                    data : {
                        two_factor_auth: false
                    }
                    
                }
                const response =  await mailman(req)
                if (response.status === 200){
                    toast.success('Two Factor Anthentication disabled succefully')
                    userContextConsumer.setUserData( prev => ({...prev!, two_factor_auth: false}))
                }
        }
        catch (err){
            toast.error("An error occured! Try again later")
        }
    }
    return(
        <div className="h-[100%] w-[100%] fixed  top-0 -left-0 backdrop-filter backdrop-blur-sm bg-black/40  z-50  flex justify-center items-center ">
            <div className=" bg-gradient-to-br from-[#323339] via-[#28292F] to-[#232628] w-[90%] sm:w-[500px] rounded-xl flex flex-col  gap-4 px-2 py-4 text-white   animate-jump ">
                <div className="flex justify-between text-lg sm:text-xl items-center text-white/70">
                    <h1 className="font-semibold p-4">Two Factor Authentication</h1>
                    <span className="p-4 text-3xl cursor-pointer hover:text-white duration-75" onClick={() =>{
                        dispatch(false)
                        userContextConsumer.setUserData( prev => ({...prev!, two_factor_auth: true}))
                    }}><IoCloseSharp/></span>
                </div>
                <div className=" flex flex-col items-center justify-center gap-4">
                    
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  color="#e53f3f" fill="none" className="w-[100px] lg:w-[150px] h-[100px] lg:h-[150px]">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" />
                        <path d="M11.992 15H12.001" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12 12L12 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <h1 className="text-lg lg:text-2xl font-bold text-center">Are you sure you want to disable Two Factor Authentication</h1>
                    <div className="flex justify-center gap-2 lg:gap-4 items-center flex-wrap">
                        <button type="button" className="m-6 rounded-3xl px-2 py-4  bg-white text-black text-base lg:text-lg  w-[150px] opacity-85 hover:opacity-100 duration-75 tracking-widest font-semibold" onClick={()=>{
                            disableTFA()
                            dispatch(false)
                            userContextConsumer.setUserData( prev => ({...prev!, two_factor_auth: true}))
                        }}>Confirm</button>
                        <button type="button" className="m-6 rounded-3xl px-2 py-4   text-white text-base lg:text-lg   border-[1px] w-[150px] opacity-85 hover:opacity-100  duration-75 tracking-widest font-semibold" onClick={()=>{
                            dispatch(false)
                            userContextConsumer.setUserData( prev => ({...prev!, two_factor_auth: true}))
                        }}>Discard</button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default DisableTFAModal