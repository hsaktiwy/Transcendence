import React from "react";
import { useContext } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { UserContext } from "./UserContext";
interface prop {
    dispatch: React.Dispatch<React.SetStateAction<boolean>>;
}

const TfaVerifiedModal:React.FC<prop> = ({dispatch}) =>{
    const userContextConsumer = useContext(UserContext)
    if (!userContextConsumer)
        throw new Error("userContext must be used within a UserProvider");
    return(
        <div className="h-[100%] w-[100%] fixed  top-0 -left-0 backdrop-filter backdrop-blur-sm bg-black/40  z-50 animate-delay-75  duration-75 animate-fade">
            <div className="mx-auto sm:mx-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-[#323339] via-[#28292F] to-[#232628] w-[90%] sm:w-[500px] rounded-xl flex flex-col  gap-4 px-2 py-4 text-white">
                <div className="flex justify-between text-lg sm:text-xl items-center text-white/70">
                    <h1 className="font-semibold p-4">Two Factor Authentication</h1>
                    <span className="p-4 text-3xl cursor-pointer hover:text-white duration-75" onClick={() =>{
                        dispatch(false)
                        userContextConsumer.setUserData( prev => ({...prev!, two_factor_auth: true}))
                    }}><IoCloseSharp/></span>
                </div>
                <div className=" flex flex-col items-center justify-center gap-4">
                    <div className="w-[100px] sm:w-[200px] h-[100px] sm:h-[200px] ">
                        <img src="assets/verified.png" alt="verified-img" className="w-full h-full object-cover"/>
                    </div>
                    <h1 className="text-xl sm:text-3xl font-bold text-center">Two Factor Authentication Verified</h1>
                    <button type="button" className="m-6 rounded-3xl px-1 sm:px-2 py-3 sm:py-4 w-[150px] sm:w-[90%] bg-white text-black text-base sm:text-2xl  opacity-85 hover:opacity-100 duration-75 tracking-widest font-bold" onClick={()=>{
                        dispatch(false)
                        userContextConsumer.setUserData( prev => ({...prev!, two_factor_auth: true}))
                    }}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default TfaVerifiedModal