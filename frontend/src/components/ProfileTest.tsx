import React from "react";
import { UserDataInterface, ProfileDataInterface } from "../utils/UserDataInterface";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "./UserContext";
import { BACKEND } from "../utils/Constants";
import mailman from "../utils/AxiosFetcher";
import { NotificationPropreties } from "./UserContext";
import { WebSocketContext } from "../utils/WSContext";
const ProfileTest  = () =>{
    const SocketContext = useContext(WebSocketContext)
    if (!SocketContext)
        throw new Error('error')
   const [profileData, setProfileData] = useState<UserDataInterface | ProfileDataInterface | undefined>(undefined)
   const {username} = useParams();
   const userContextConsumer = useContext(UserContext)
   if (!userContextConsumer)
    throw new Error("userContext must be used within a UserProvider");
   const fetchUserData = async () =>{
    try{
        const req = {
            url: BACKEND + `api/user/${username}/`,
            method: 'GET',
        }
        const resp = await mailman(req)
        const {
            login,
            firstName,
            lastName,
            profile_pic,
            email,
            birthDay,
        } = resp.data
        console.log("sss ====???? ",resp.data)

        setProfileData({
            login,
            firstName,
            lastName,
            profile_pic,
            email,
            birthDay,
        })
        
    }
    catch (err){
        console.error("dddddd======????",err)
    }

}
   useEffect(() =>{
    if (userContextConsumer?.userData?.login !== username){
        fetchUserData()
    }
    else{
        setProfileData(userContextConsumer?.userData)
    }
   },[])

    return(
        <div className="min-h-[calc(100vh-100px)] font-poppins absolute overflow-hidden left-0 lg:left-[80px] top-[60px] w-[calc(100%-20px)] lg:w-[calc(100%-100px)] 2xl:w-[calc(80%)] my-[20px] mx-[10px] 2xl:mx-[8%] text-white bg-black/35 backdrop-filter backdrop-blur-sm  rounded-xl flex justify-center items-center ">
            <div className="w-[50%] bg-black/30 flex flex-col items-center p-4 rounded-xl gap-4">
                <div className="w-[120px] h-[120px]">
                    <img src={profileData?.profile_pic} alt="user-image" className="h-full w-full object-cover rounded-full"/>
                </div>
                <h1>{`${profileData?.firstName} ${profileData?.lastName}`}</h1>
                {
                    userContextConsumer.userData?.login !== profileData?.login &&
                    <div className="relative flex gap-8 flex-wrap justify-center items-center">
                        <button type="submit" className="w-[150px] bg-[#5E97A9]/70 px-4 py-2 rounded-xl" onClick={() =>{
                            
                            const notification = {
                                type: 'NOTIFICATION_ADD_FRIEND',
                                to : username
                            }
                            const message = JSON.stringify(notification)
                            SocketContext.socket.current?.send(message)
                        }}>
                            Add friend
                        </button>
                        <button type="button" className="w-[150px] bg-black/35 px-4 py-2 rounded-xl">
                            Message
                        </button>
                     </div>
                }


            </div>
        </div>
    )
}
export default ProfileTest